import { IsArray, IsNotEmpty } from 'class-validator';

export class UpdateMentorAvailabilityDto {
    @IsArray()
    @IsNotEmpty()
    availability: string[];
}