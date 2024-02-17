import { Model } from 'mongoose';
import { ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument, Interest, InterestDocument } from './schemas';
import * as argon from 'argon2';
import { JwtPayload, Tokens, TokenWithData } from 'src/auth/types';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EmailService } from 'src/email/email.service';
import { UserRole } from './user-role.enum';
import { UpdateMentorAvailabilityDto, UpdateMentorDto, UpdateUserDto, CreateUserDto, GetUsersFilterDto } from './dto';
import { ArticlesService } from '../articles/articles.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Interest.name) private interestModel: Model<InterestDocument>,
    private jwtService: JwtService,
    private config: ConfigService,
    private emailService: EmailService,
    private articleService: ArticlesService,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<TokenWithData> {
    const hash = await argon.hash(createUserDto.password);
    createUserDto.password = hash;
    const user = await this.findOneByEmail(createUserDto.email);
    if (user) throw new HttpException('User already exists', HttpStatus.CONFLICT);
    try {
      const createdUser = new this.userModel(createUserDto);
      createdUser.save();
      const tokens = await this.getTokens(createdUser.id, createdUser.email);
      await this.updateRtHash(createdUser.id, tokens.refresh_token);
      await this.emailService.sendUserConfirmation("testtoken", `${createdUser.firstName} ${createdUser.lastName}`, createdUser.email);
      return {
        ...tokens,
        userData: createdUser,
      };
    } catch (err) {
      console.log('err: ', err);
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Error creating user',
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string) {
    return this.userModel.findById(id).exec();
  }

  async findOneByEmail(email: string) {
    return this.userModel.findOne({
      email: email
    }).exec();
  }

  async getUsersByFilter(filterDto: GetUsersFilterDto): Promise<User[]> {
    const { name, rating, interest } = filterDto;
    const query = this.userModel.find({ role: UserRole.MENTOR });

    if (name) {
      query.find({
        $or: [
          { firstName: new RegExp(name.toString(), 'i') },
          { lastName: new RegExp(name.toString(), 'i') },
        ]
      });
    }

    if (rating) {
      query.where('rating').gte(rating);
    }

    if (interest) {
      query.find({ 'interests.title': new RegExp(interest, 'i') });
    }

    return await query.exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
    return user;
  }

  async updateCurrentUser(id: string, updateUserDto: UpdateUserDto) {
    if(updateUserDto === null) {
      throw new ForbiddenException();
    }
    const user = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
    return user;
  }

  async logout(userId: string): Promise<boolean> {
    await this.userModel.updateMany({
      id: userId,
      hashedRt: {
        $ne: null,
      },
    }, {
      hashedRt: null,
    });
    return true;
  }

  async remove(id: string) {
    return this.userModel.findByIdAndDelete(id).exec();
  }


  async forgotPassword(email: string): Promise<boolean> {
    console.log('email: ', email);
    const user = await this.findOneByEmail(email);
    // if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    if (user) {
      const token = await this.jwtService.signAsync({ email: email }, {
        secret: this.config.get<string>('FP_SECRET'),
        expiresIn: '15m',
      });
      await this.emailService.sendForgotPassword(user.email, token);
    }
    return true;
  }

  async updateRtHash(userId: string, rt: string): Promise<void> {
    const hash = await argon.hash(rt);
    this.userModel
      .findByIdAndUpdate(userId, { hashedRt: hash }, { new: true })
      .exec();
  }

  async getTokens(userId: string, email: string): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: userId,
      email: email,
    };

    // console.log('this.config.get<string>(AT_SECRET): ', this.config.get<string>('AT_SECRET'));
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('AT_SECRET'),
        expiresIn: 3600,
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('RT_SECRET'),
        expiresIn: '7d',
      }),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  async refreshTokens(userId: string, rt: string): Promise<Tokens> {
    const user = await this.userModel.findById(userId).exec()
    if (!user || !user.hashedRt)
      throw new ForbiddenException('Access Denied');

    const rtMatches = await argon.verify(user.hashedRt, rt);
    if (!rtMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refresh_token);

    return tokens;
  }

  async findAllInterests(): Promise<Interest[]> {
    return await this.interestModel.find().exec();
  }

  async getSuggestedMentors(userId: string): Promise<User[]> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    const interests = user.interests;
    if (!interests || interests.length === 0) {
      const mentors = await this.userModel.find({ role: UserRole.MENTOR }).exec();
      return mentors;
    }
    let mentors = await this.userModel.find({
      interests: {
        $in: interests,
      },
      role: UserRole.MENTOR,
    }).exec();
    if(!mentors || mentors.length === 0) {
      mentors = await this.userModel.find({ role: UserRole.MENTOR }).exec();
    }
    return mentors;
  }

  async addMentors(userId: string, updateMentorDto: UpdateMentorDto): Promise<User> {
    const mentors = updateMentorDto.mentorIds;
    if (!mentors || mentors.length === 0) throw new HttpException('No mentors provided', HttpStatus.BAD_REQUEST);
    this.userModel
      .findByIdAndUpdate(userId, { mentors }, { new: true })
      .exec();
    const user = await this.userModel.findById(userId).exec();
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return user;

  }

  async mentorAvailabilty(userId: string, updateMentorAvailabilityDto: UpdateMentorAvailabilityDto): Promise<User> {
    const availableDates = updateMentorAvailabilityDto.availability;
    if (!availableDates || availableDates.length === 0) throw new HttpException('No availability provided', HttpStatus.BAD_REQUEST);
    return await this.userModel
      .findByIdAndUpdate(userId, { availableDates }, { new: true })
      .exec();
  }

  async getMentorsForMentee(mentee: User): Promise<User[]> {
    const mentorIds: [string] = mentee.mentorIds;
    return await this.userModel.find({ '_id': { $in: mentorIds } });
  }

  async getMentorAvailability(user: User) {
    const mentors = await this.getMentorsForMentee(user);
    let result = {};
    for(let mentor of mentors) {
      const name = `${mentor.firstName} ${mentor.lastName}`;
      for(let date of mentor.availableDates) {
        if(result[date]) {
          let obj = {
            type: "success",
            content: `${mentor.firstName} ${mentor.lastName}`,
          }
          result[date].push(obj);
          continue;
        } else {
          result[date] = [];
          let obj = {
            type: "success",
            content: `${mentor.firstName} ${mentor.lastName}`,
          }
          result[date].push(obj);
        }
      }
    }
    return result;
  }

  async getEverything(user: User) {
    const postsData = await this.articleService.getArticlesByMenteeSubscription(user);
    const mentorAvailabilty = await this.getMentorAvailability(user);
    return {
      postsData,
      mentorAvailabilty,
    }
  }

}
