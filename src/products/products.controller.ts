import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from '../schemas/product.model';
import { ProductDto } from './product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async createProduct(@Body() product: ProductDto): Promise<Product> {
    return this.productsService.createProduct(product);
  }

  @Get()
  async getAllProducts(): Promise<Product[]> {
    return await this.productsService.findAllProducts();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Product> {
    const product = await this.productsService.findOneProduct(id);
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() product: ProductDto,
  ): Promise<Product> {
    return this.productsService.updateProduct(id, product);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<string> {
    return await this.productsService.deleteProduct(id);
  }
}
