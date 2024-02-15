import { IsEmail, IsString, MinLength } from 'class-validator';

export class CustomerDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  @MinLength(8)
  password: string;
}
