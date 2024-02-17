import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrderDto } from './orders.dto';
import { Order } from 'src/schemas/order.model';
import { OrderStatus } from 'src/schemas/enums/order-status.enum';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}
  @Post()
  async createOrder(@Body() order: OrderDto): Promise<Order> {
    return this.ordersService.createOrder(order);
  }
  @Get(':id')
  async updateOrderStatus(
    @Body() status: OrderStatus,
    @Param('id') id: string,
  ): Promise<Order> {
    return await this.ordersService.updateOrder(id, status);
  }
}
