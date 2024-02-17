import { Injectable, CanActivate, ExecutionContext, Inject, forwardRef, HttpException, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';

@Injectable()
export class ProtectedGuard implements CanActivate {
    constructor(
        @Inject(forwardRef(() => UserService))
        private readonly userService: UserService
    ) {

    }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if(!request.headers.authorization){
        return false;
    }
    const token = request
        ?.get('authorization')
        ?.replace('Bearer', '')
        .trim();
        const base64Payload = token.split('.')[1];
        const payloadBuffer = Buffer.from(base64Payload, 'base64');
        const updatedJwtPayload = JSON.parse(payloadBuffer.toString());
        if(!updatedJwtPayload['sub']){
            return false;
        }
        const user = await this.userService.findOne(updatedJwtPayload['sub']);
        if(!user){
            throw new HttpException({
            status: HttpStatus.UNAUTHORIZED,
            error: 'Credentials are not valid',
            }, HttpStatus.UNAUTHORIZED);
        }
        const expiresIn = updatedJwtPayload['exp'] - Math.floor(Date.now() / 1000);
        if(expiresIn < 0){
            return false;
        }
        request.user = user;
        return true;
  }  
}