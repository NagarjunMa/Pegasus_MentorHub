import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import * as argon from 'argon2';
import { Tokens, TokenWithData } from './types';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly emailService: EmailService
        ) {}

   async signinLocal(loginUserDto: AuthDto): Promise<TokenWithData>{
        const user = await this.userService.findOneByEmail(loginUserDto.email);
    
        if (!user) throw new ForbiddenException('Access Denied');
    
        const passwordMatches = await argon.verify(user.password, loginUserDto.password);
        if (!passwordMatches) throw new ForbiddenException('Access Denied');
    
        const tokens = await this.userService.getTokens(user.id, user.email);
        await this.userService.updateRtHash(user.id, tokens.refresh_token);

        return {
            ...tokens,
            userData: user,
        };
    }

    async logout(userId: string): Promise<boolean>{
        return this.userService.logout(userId);
    }
    async refreshTokens(userId: string, rt: string): Promise<Tokens>{
        return this.userService.refreshTokens(userId, rt);
    }

    async forgotPassword(email: string): Promise<boolean>{
        return this.userService.forgotPassword(email);
    }
}
