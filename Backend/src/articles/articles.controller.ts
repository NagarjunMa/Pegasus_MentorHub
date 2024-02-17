import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { ArticlesService } from './articles.service';
import { Article } from './schemas/article.schema';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ProtectedGuard } from 'src/user/guards/protected.guard';
import { TransformInterceptor } from 'src/transform.interceptor';

@Controller('articles')
@UseGuards(ProtectedGuard)
export class ArticlesController {
    constructor(private articlesService: ArticlesService) { }

    @Post()
    @UsePipes(ValidationPipe)
    @UseInterceptors(new TransformInterceptor())
    createArticle(
        @Body() createArticleDto: CreateArticleDto,
        @Req() request
    ): Promise<Article> {
        const user = request.user;
        return this.articlesService.createArticle(createArticleDto, user);
    }

    @Get('/mentee')
    getArticlesOfMentee(@Req() request): Promise<Article[]> {
        const user = request.user;
        return this.articlesService.getArticlesByMenteeSubscription(user);
    }

    @Get(':id')
    @UseInterceptors(new TransformInterceptor())
    getArticleById(
        @Param('id') id: string,
        @Req() request
    ): Promise<Article> {
        const userId = request.user._id;
        return this.articlesService.getArticleById(id, userId);
    }
    
    @Get()
    getAllArticles(
        @Req() request
    ): Promise<Article[]> {
        const userId = request.user._id;
        return this.articlesService.getAllArticles(userId);
    }

    @Patch(':id')
    updateArticle(
        @Param('id') id: string,
        @Body() updateArticleDto: UpdateArticleDto,
        @Req() request
    ): Promise<Article> {
        const userId = request.user._id;
        return this.articlesService.updateArticle(id, updateArticleDto, userId);
    }

    @Delete(':id')
    deleteArticleById(@Param('id') id: string, @Req() request) {
        const userId = request.user._id;
        return this.articlesService.deleteArticleById(id, userId);
    }
}
