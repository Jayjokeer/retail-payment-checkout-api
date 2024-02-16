import { Body, Controller, Post } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomerDto } from './customer.dto';
import { Customer } from 'src/schemas/customers.model';
@Controller('customers')
export class CustomersController {
  constructor(private readonly customerService: CustomersService) {}

  @Post('/register')
  async createCustomer(@Body() customer: CustomerDto): Promise<Customer> {
    return this.customerService.registerCustomer(customer);
  }

  @Post('/login')
  async loginCustomer(
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<string> {
    const token = await this.customerService.loginCustomer(email, password);
    return token;
  }
}
