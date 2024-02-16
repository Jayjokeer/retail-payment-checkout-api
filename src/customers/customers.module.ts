import { Module } from '@nestjs/common';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Customer } from 'src/schemas/customers.model';
import { DatabaseConfigModule } from 'src/config.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from 'src/strategies/local.strategies';

@Module({
  imports: [
    PassportModule,
    SequelizeModule.forFeature([Customer]),
    DatabaseConfigModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [CustomersController],
  providers: [CustomersService, LocalStrategy],
})
export class CustomersModule {}
