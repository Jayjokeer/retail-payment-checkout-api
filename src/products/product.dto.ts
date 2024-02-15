import { IsString, Length, IsNumber } from 'class-validator';

export class ProductDto {
  @IsString()
  @Length(5, 255)
  name: string;

  @IsString()
  @Length(10, 500)
  description: string;

  @IsNumber()
  price: number;
}
