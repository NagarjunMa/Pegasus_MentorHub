import { IsNotEmpty } from "class-validator";

export class LogoutDto {
  @IsNotEmpty()
  id: number;
}