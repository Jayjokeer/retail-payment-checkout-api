import { Injectable } from '@nestjs/common';
import { CustomerDto } from './customer.dto';
import { Customer } from 'src/schemas/customers.model';
import { InjectModel } from '@nestjs/sequelize';
import { hashPassword } from 'src/utils/encyption.util';
@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customer)
    private productModel: typeof Customer,
  ) {}
  async createCustomer(customer: CustomerDto): Promise<Customer> {
    const password = await hashPassword(customer.password);
    customer.password = password;
    return await this.productModel.create(customer);
  }
}
