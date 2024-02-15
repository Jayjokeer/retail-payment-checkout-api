import {
  Column,
  Model,
  Table,
  DataType,
  PrimaryKey,
  Default,
  IsUUID,
  BelongsToMany,
} from 'sequelize-typescript';
import { Product } from './product.model';
import { OrderStatus } from './enums/order-status.enum';

@Table
export class Order extends Model<Order> {
  @IsUUID(4)
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  id: string;

  @Column({ allowNull: false })
  userId: number;

  @Column({ allowNull: false, defaultValue: Date.now() })
  createdAt: Date;

  @Column({
    type: DataType.ENUM(
      'PENDING',
      'PLACED',
      'SHIPPED',
      'DELIVERED',
      'CANCELED',
    ),
    defaultValue: DataType.ENUM('PENDING'),
  })
  status: OrderStatus;

  @BelongsToMany(() => Product, { through: 'OrderProduct' })
  products: Product[];

  @Column(DataType.DECIMAL)
  price: number;
}
