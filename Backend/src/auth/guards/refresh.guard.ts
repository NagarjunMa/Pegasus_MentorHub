import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';


@Injectable()
export class RefereshGuard implements CanActivate {
    constructor() {}

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
        
        const dataWithToken = {
            ...updatedJwtPayload,
            refreshToken: token
        }

        request.user = dataWithToken;
        return true;
  }  
}