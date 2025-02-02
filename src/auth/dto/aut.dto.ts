import { IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator';

export class AuthDTO {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
}
