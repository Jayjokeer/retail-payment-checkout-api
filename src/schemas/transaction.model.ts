import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  PrimaryKey,
  Default,
  IsUUID,
} from 'sequelize-typescript';
import { Customer } from './customers.model';

@Table
export class Transaction extends Model<Transaction> {
  @IsUUID(4)
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  id: string;

  @ForeignKey(() => Customer)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  customerId: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  amount: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  reference: string;

  @Column({
    type: DataType.ENUM('Pending', 'Success', 'Failed'),
    defaultValue: 'Pending',
  })
  status: string;
}
