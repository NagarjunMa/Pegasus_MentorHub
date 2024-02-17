import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { Interest, InterestSchema } from './schemas/interest.schema';
import { ArticlesModule } from 'src/articles/articles.module';
import { ArticlesService } from 'src/articles/articles.service';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Interest.name, schema: InterestSchema },
    ]),
    JwtModule.register({}),
    forwardRef(() => ArticlesModule)
  ],
  controllers: [UserController],
  providers: [UserService, ArticlesService],
  exports: [MongooseModule.forFeature([
    { name: User.name, schema: UserSchema },
    { name: Interest.name, schema: InterestSchema },
  ]), UserService]
})
export class UserModule {}