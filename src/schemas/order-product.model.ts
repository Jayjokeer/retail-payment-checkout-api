import {
  Table,
  Column,
  Model,
  ForeignKey,
  PrimaryKey,
  Default,
  IsUUID,
  DataType,
} from 'sequelize-typescript';
import { Order } from './order.model';
import { Product } from './product.model';

@Table
export class OrderProduct extends Model<OrderProduct> {
  @IsUUID(4)
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  id: string;

  @ForeignKey(() => Order)
  orderId: string;

  @ForeignKey(() => Product)
  productId: string;

  @Column({ allowNull: false })
  quantity: number;

  @Column({ allowNull: false, defaultValue: Date.now() })
  createdAt: Date;
}
