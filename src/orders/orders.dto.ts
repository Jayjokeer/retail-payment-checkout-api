import { IsNumber, IsString } from 'class-validator';
import { Product } from 'src/schemas/product.model';

export class OrderDto {
  @IsString()
  userId: string;

  @IsNumber()
  price: number;

  products: Product[];
}
