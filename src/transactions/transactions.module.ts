import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Transaction } from 'src/schemas/transaction.model';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([Transaction])],
  providers: [TransactionsService, JwtService],
  controllers: [TransactionsController],
})
export class TransactionsModule {}
