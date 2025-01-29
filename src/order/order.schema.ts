import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Address, CartItem } from './dto/create-order';

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    },
  },
})
export class Order extends Document {
  @Prop({
    type: Array<CartItem>,
    default: [],
  })
  cartItems: CartItem[];

  @Prop({
    type: Number,
    min: 0,
  })
  subTotal: number;
  @Prop({
    type: Number,
    min: 0,
  })
  shippingFee: number;
  @Prop({
    type: Number,
    min: 0,
  })
  discount: number;
  @Prop({
    type: Number,
    min: 0,
  })
  totalPayment: number;

  @Prop({
    type: String,
  })
  userId?: string;
  @Prop({
    type: String,
  })
  name: string;
  @Prop({
    type: String,
    required: true,
  })
  email: string;

  @Prop({
    type: Address,
  })
  address: Address;

  @Prop({
    type: String,
  })
  paymentMethod?: 'card' | 'cod' | 'banking';

  @Prop({
    type: String,
    default: 'unpaid',
  })
  status: 'unpaid' | 'paid' = 'unpaid';
}

export const OrderSchema = SchemaFactory.createForClass(Order);
