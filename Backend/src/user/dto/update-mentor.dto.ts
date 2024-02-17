import { IsArray, IsNotEmpty } from 'class-validator';

export class UpdateMentorDto {
    @IsArray()
    @IsNotEmpty()
    mentorIds: string[];
}