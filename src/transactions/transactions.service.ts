import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import axios from 'axios';
import { Transaction } from 'src/schemas/transaction.model';
import { TransactionDto } from './transaction.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction)
    private transactionModel: typeof Transaction,
  ) {}
  async initiatePayment(transaction: TransactionDto): Promise<any> {
    const { amount, email } = transaction;
    const reference = uuidv4();
    try {
      const response = await axios.post(
        'https://api.flutterwave.com/v3/payments',
        {
          amount,
          customer: {
            email: email,
          },
          tx_ref: reference,
          currency: 'NGN',
          payment_options: 'card',
          redirect_url: process.env.REDIRECT_URL,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: process.env.FLUTTERWAVE_SECRET_KEY,
          },
        },
      );
      const payload = {
        customerId: transaction.customerId,
        amount: amount,
        reference: reference,
      };
      await this.transactionModel.create(payload);

      return response.data;
    } catch (error) {
      return { status: 'error', message: error.message };
    }
  }
  async verifyPayment(tx_ref: string, transaction_id: string): Promise<any> {
    try {
      const transaction = await this.transactionModel.findOne({
        where: { reference: tx_ref },
      });

      if (!transaction) {
        return new HttpException('Transaction not found', 404);
      }

      const { data } = await axios.get(
        `https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`,
        {
          headers: {
            Authorization: process.env.FLUTTERWAVE_SECRET_KEY,
            'content-type': 'application/json',
            'cache-control': 'no-cache',
          },
        },
      );
      transaction.status = data.status;
      await this.transactionModel.update(transaction, {
        where: { reference: tx_ref },
      });

      return { status: data.status, message: 'Payment verified successfully' };
    } catch (error) {
      return { status: 'error', message: error.message };
    }
  }
}
