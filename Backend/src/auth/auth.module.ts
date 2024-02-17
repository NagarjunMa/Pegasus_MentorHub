import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { AtStrategy, RtStrategy } from './strategies';
import { JwtModule } from '@nestjs/jwt';
import { EmailModule } from 'src/email/email.module';
import { ArticlesModule } from 'src/articles/articles.module';

@Module({
  imports: [
    forwardRef(() => UserModule),
    JwtModule.register({}),
    EmailModule,
    forwardRef(() => ArticlesModule)
  ],
  providers: [AuthService, AtStrategy, RtStrategy, UserService],
  controllers: [AuthController]
})
export class AuthModule {}
