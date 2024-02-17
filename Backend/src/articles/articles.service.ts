import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article, ArticleDocument } from './schemas/article.schema';

@Injectable()
export class ArticlesService {

    constructor(
        @InjectModel(Article.name) private articleModel: Model<ArticleDocument>,
    ) { }

    async createArticle(createArticleDto: CreateArticleDto, user: User): Promise<Article> {
        const { title, content, image } = createArticleDto;
        const article = await this.articleModel.create({
            title,
            content,
            image,
            user,
            author: user.firstName + ' ' + user.lastName,
            authorProfilePic: user.profilePic,
        });

        await article.save();
        return article;
    }

    async getArticleById(id: string, userId: string): Promise<Article> {
        const found = await this.articleModel.findById(id).where('user').equals(userId).exec();
        if (!found) {
            throw new NotFoundException(`Article with ID ${id} not found`);
        }
        return found;
    }

    async getAllArticles(userId: string): Promise<Article[]> {
        return await this.articleModel.find().where('user').equals(userId).exec();
    }

    async updateArticle(id: string, updateArticleDto: UpdateArticleDto, userId: string): Promise<Article> {
        const found = await this.getArticleById(id, userId);
        const article = await this.articleModel.findByIdAndUpdate(
            id, updateArticleDto, { new: true }
        ).exec();
        return article;

    }

    async deleteArticleById(id: string, userId: string) {
        const found = await this.getArticleById(id, userId);
        return await this.articleModel.deleteOne({ id }).exec();
    }

    async getArticlesByMenteeSubscription(user: User): Promise<Article[]> {
        const mentorIds = user.mentorIds;
        let articles = [];
        for (let mentorId of mentorIds) {
            const mentorArticles = await this.getAllArticles(mentorId);
            if (mentorArticles.length != 0) {
                articles.push(...mentorArticles);
            }
        }
        return articles;
    }

}
