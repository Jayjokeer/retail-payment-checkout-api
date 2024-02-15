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

  @Column
  name: string;

  @Column
  description: string;

  @Column
  price: number;

  @BelongsToMany(() => Order, { through: 'OrderProduct' })
  orders: Order[];

  @Column({ allowNull: false, defaultValue: Date.now() })
  createdAt: Date;
}
