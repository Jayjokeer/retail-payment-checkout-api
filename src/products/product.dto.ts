import { IsString, Length, IsNumber } from 'class-validator';

export class ProductDto {
  @IsString()
  @Length(5, 255)
  name: string;

  @IsNumber()
  price: number;
}
