import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { CustomersService } from 'src/customers/customers.service';
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private customersService: CustomersService) {
    super();
  }
  validate(email: string, password: string) {
    const user = this.customersService.loginCustomer(email, password);
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
