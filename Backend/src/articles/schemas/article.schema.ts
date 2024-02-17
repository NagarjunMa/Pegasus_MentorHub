import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Exclude } from "class-transformer";
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "src/user/schemas/user.schema";

export type ArticleDocument = HydratedDocument<Article>;

@Schema({ timestamps: true })
export class Article {

    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    content: string;

    @Prop()
    image: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    @Exclude({ toPlainOnly: true })
    user: User;

    @Prop({ required: true })
    author: string;

    @Prop()
    authorProfilePic: string;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);