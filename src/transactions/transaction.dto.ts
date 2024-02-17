import { IsString, IsNumber, IsEmail } from 'class-validator';

export class TransactionDto {
  @IsString()
  customerId: string;

  @IsNumber()
  amount: number;

  @IsEmail()
  email?: string;
}
