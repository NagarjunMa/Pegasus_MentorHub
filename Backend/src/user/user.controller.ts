import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UsePipes, UseGuards, Req, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { TokenWithData } from 'src/auth/types';
import { Public } from 'src/common/decorators';
import { Interest, User } from './schemas';
import { ProtectedGuard, OnlyMentorGuard } from './guards';
import { UpdateMentorDto, UpdateMentorAvailabilityDto, UpdateUserDto, CreateUserDto, GetUsersFilterDto } from './dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}


  @Get('interests')
  getAllInterests(): Promise<Interest[]> {
    return this.userService.findAllInterests();
  }

  @Get('suggestedMentors')
  @UseGuards(ProtectedGuard)
  getSuggestedMentors(@Req() request): Promise<User[]> {
    const user = request.user;
    return this.userService.getSuggestedMentors(user._id);
  }

  @Patch('addMentors')
  @UseGuards(ProtectedGuard)
  addMentors(@Req() req, @Body() updateMentorDto: UpdateMentorDto): Promise<User> {
    return this.userService.addMentors(req.user._id, updateMentorDto);
  }

  @Patch('mentorAvailabilty')
  @UseGuards(OnlyMentorGuard)
  mentorAvailabilty(@Req() req, @Body() updateMentorDto: UpdateMentorAvailabilityDto) {
    return this.userService.mentorAvailabilty(req.user._id, updateMentorDto);
  }

  @Get('everything')
  @UseGuards(ProtectedGuard)
  getEverything(@Req() request){
    const user = request.user;
    return this.userService.getEverything(user);
  }

  @Public()
  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createUserDto: CreateUserDto): Promise<TokenWithData> {
    return this.userService.create(createUserDto);
  }


  @Patch()
  @UseGuards(ProtectedGuard)
  updateCurrentUser(@Req() request, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateCurrentUser(request.user._id, updateUserDto);
  }


  @Get('mentors')
  @UseGuards(ProtectedGuard)
  getMentorsForMentee(@Req() request): Promise<User[]> {
    const mentee = request.user;
    return this.userService.getMentorsForMentee(mentee);
  }

  @Get('slotAvailability')
  @UseGuards(ProtectedGuard)
  getMentorAvailability(@Req() request) {
    const user = request.user;
    return this.userService.getMentorAvailability(user);
  }

  @Get()
  getMentorsByFilters(@Query() filterDto: GetUsersFilterDto): Promise<User[]> {
    return this.userService.getUsersByFilter(filterDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Get()
  @UseGuards(ProtectedGuard)
  getCurrentLoggedInUser(@Req() request) {
    return request.user;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

 
}
