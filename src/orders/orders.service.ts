import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from 'src/schemas/order.model';
import { OrderDto } from './orders.dto';
import { OrderStatus } from 'src/schemas/enums/order-status.enum';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order) private readonly orderModel: typeof Order) {}

  async createOrder(data: OrderDto) {
    return await this.orderModel.create(data);
  }

  async updateOrder(id: string, status: OrderStatus) {
    const order = await this.orderModel.findByPk(id);
    if (!order) throw new HttpException('Order not found', 404);
    if (status === OrderStatus.DELIVERED)
      throw new HttpException(
        "Can't change the status of an already delivered order",
        400,
      );
    order.status = status;
    await order.save();
    return order;
  }
}
