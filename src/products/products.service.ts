import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '../schemas/product.model';
import { InjectModel } from '@nestjs/sequelize';
import { ProductDto } from './product.dto';
@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product)
    private productModel: typeof Product,
  ) {}
  async createProduct(product: ProductDto): Promise<Product> {
    return await this.productModel.create(product);
  }

  async findAllProducts(): Promise<Product[]> {
    return await this.productModel.findAll();
  }

  async findOneProduct(id: string): Promise<Product> {
    const product = await this.productModel.findByPk(id);
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  async updateProduct(id: string, product: ProductDto): Promise<Product> {
    const [rowsUpdated, [updatedProduct]] = await this.productModel.update(
      product,
      {
        where: { id },
        returning: true,
      },
    );
    if (rowsUpdated === 0) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return updatedProduct;
  }

  async deleteProduct(id: string): Promise<string> {
    const rowsDeleted = await this.productModel.destroy({ where: { id } });
    if (rowsDeleted === 0) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return 'Product Deleted Successfully';
  }
}
