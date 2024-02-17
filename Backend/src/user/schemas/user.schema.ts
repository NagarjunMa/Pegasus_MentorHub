import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { type } from 'os';
import { UserRole } from '../user-role.enum';
import { Interest } from './interest.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {

    @Prop({ required: true })
    firstName: string;

    @Prop()
    lastName: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true })
    role: UserRole;

    @Prop()
    about: string;

    @Prop()
    interests: [];

    @Prop()
    profilePic: string;

    @Prop()
    hashedRt: string;

    @Prop()
    mentorIds: [string];

    @Prop()
    availableDates: [string];

    @Prop()
    rating: number;

}

export const UserSchema = SchemaFactory.createForClass(User);
