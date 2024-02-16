import { HttpException, Injectable } from '@nestjs/common';
import { CustomerDto } from './customer.dto';
import { Customer } from 'src/schemas/customers.model';
import { InjectModel } from '@nestjs/sequelize';
import { comparePassword, hashPassword } from 'src/utils/encyption.util';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CustomersService {
  injector: any;
  constructor(
    @InjectModel(Customer)
    private customerModel: typeof Customer,
    private jwtService: JwtService,
  ) {}

  async registerCustomer(customer: CustomerDto): Promise<Customer> {
    const emailExists = await this.customerModel.findOne({
      where: { email: customer.email },
    });
    if (emailExists) throw new HttpException('Email already exists', 409);
    const password = await hashPassword(customer.password);
    customer.password = password;
    return await this.customerModel.create(customer);
  }
  async loginCustomer(email: string, password: string): Promise<string> {
    const user = await this.customerModel.findOne({ where: { email } });
    if (!user) throw new HttpException('User not found', 404);

    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) throw new HttpException('Invalid credentials', 403);
    const payload = {
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      sub: user.id,
    };
    return this.jwtService.sign(payload);
  }
}
