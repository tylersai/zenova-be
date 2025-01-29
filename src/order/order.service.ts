import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './order.schema';
import { Model } from 'mongoose';
import { CreateOrderPayload } from './dto/create-order';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private readonly oderModel: Model<Order>,
  ) {}

  async getAll() {
    return this.oderModel.find({}).exec();
  }

  async getByEmail(email: string) {
    return this.oderModel.find({ email }).sort({ createdAt: -1 }).exec();
  }

  async createOrder(orderPayload: CreateOrderPayload) {
    const order = await new this.oderModel(orderPayload).save();
    return order;
  }
}
