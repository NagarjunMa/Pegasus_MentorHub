import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { Article, ArticleSchema } from './schemas/article.schema';

@Module({
  imports:[
    forwardRef(() =>AuthModule),
    forwardRef(() => UserModule),
    MongooseModule.forFeature([
      { name: Article.name, schema: ArticleSchema },
    ])
  ],
  controllers: [ArticlesController],
  providers: [ArticlesService],
  exports: [ArticlesService, MongooseModule.forFeature([
    { name: Article.name, schema: ArticleSchema },
  ])]
})
export class ArticlesModule {}
