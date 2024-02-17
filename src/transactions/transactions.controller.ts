import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionDto } from './transaction.dto';
import { JwtAuthGuard } from 'src/middleware/authGuard';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionService: TransactionsService) {}

  @Post('/initiate-payment')
  @UseGuards(JwtAuthGuard)
  async initializeTransaction(
    @Body() transaction: TransactionDto,
  ): Promise<string> {
    return this.transactionService.initiatePayment(transaction);
  }

  @Get('/verify-payment')
  async verifyPayment(
    @Query('tx_ref') tx_ref: string,
    @Query('transaction_id') transaction_id: string,
  ): Promise<string> {
    return await this.transactionService.verifyPayment(tx_ref, transaction_id);
  }
}
