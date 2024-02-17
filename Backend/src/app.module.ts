import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmailModule } from './email/email.module';
import { configValidationSchema } from './config.schema';
import { ArticlesModule } from './articles/articles.module';
@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (ConfigService: ConfigService) => ({
        uri: ConfigService.get<string>('DB_URI'),
      })
    }),
    UserModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true, validationSchema: configValidationSchema }),
    EmailModule,
    ArticlesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
