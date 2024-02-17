import { Prop, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type InterestDocument = HydratedDocument<Interest>;

export class Interest {
    
    @Prop({ required: true })
    title: string;
}

export const InterestSchema = SchemaFactory.createForClass(Interest);