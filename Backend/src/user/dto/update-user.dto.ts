import { PartialType } from '@nestjs/mapped-types';
import { IsOptional } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsOptional()
    about: string;

    @IsOptional()
    interests: string[];

    @IsOptional()
    profilePic: string;

    @IsOptional()
    mentorIds: string[];

}
