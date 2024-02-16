import {
  Column,
  Model,
  Table,
  PrimaryKey,
  Default,
  IsUUID,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { Order } from './order.model';

@Table
export class Product extends Model<Product> {
  @IsUUID(4)
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  id: string;

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: true })
  price: number;

  @ForeignKey(() => Order)
  orderId: string;
  orders: Order[];

  @Column({ allowNull: false, defaultValue: Date.now() })
  createdAt: Date;
}
