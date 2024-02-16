import {
  Column,
  Model,
  Table,
  DataType,
  PrimaryKey,
  Default,
  IsUUID,
} from 'sequelize-typescript';

@Table
export class Customer extends Model<Customer> {
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

  @Column({
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column
  phoneNumber: string;

  @Column({ allowNull: false })
  password: string;

  @Column({ allowNull: false, defaultValue: Date.now() })
  createdAt: Date;
}
