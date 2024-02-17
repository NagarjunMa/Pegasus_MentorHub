import { IsNumber, IsOptional, IsString } from "class-validator";

export class GetUsersFilterDto {

    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    rating?: number;

    @IsOptional()
    @IsString()
    interest?: string;

}