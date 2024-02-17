import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode, HttpStatus, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, LogoutDto } from './dto';
import { Tokens, TokenWithData } from './types';
import { Public, GetCurrentUserId, GetCurrentUser } from '../common/decorators';
import { RefereshGuard } from './guards/refresh.guard';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @Post('local/signin')
    @HttpCode(HttpStatus.OK)
    signinLocal(@Body() loginUserDto: AuthDto): Promise<TokenWithData> {
        return this.authService.signinLocal(loginUserDto);
    }

    @Public()
    @Post('forgot-password')
    forgotPassword(@Body('email') email: string): Promise<boolean> {
        return this.authService.forgotPassword(email);
    }

    @Post('logout')
    @HttpCode(HttpStatus.OK)
    logout(@Req() req: Request) {
        const user = req.user;
        const token = req?.body?.headers?.Authorization;
        // const token = req
        // ?.get('authorization')
        // ?.replace('Bearer', '')
        // .trim();
        const base64Payload = token.split('.')[1];
        const payloadBuffer = Buffer.from(base64Payload, 'base64');
        const updatedJwtPayload = JSON.parse(payloadBuffer.toString());

        return this.authService.logout(updatedJwtPayload['sub']);
    }

    @Public()
    @UseGuards(RefereshGuard)
    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    refreshTokens(
        @GetCurrentUserId() userId: string,
        @GetCurrentUser('refreshToken') refreshToken: string,
    ): Promise<Tokens> {
        return this.authService.refreshTokens(userId, refreshToken);
    }
}
