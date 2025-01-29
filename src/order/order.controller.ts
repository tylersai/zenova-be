import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderPayload } from './dto/create-order';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async getAll() {
    return this.orderService.getAll();
  }

  @Get(':email')
  async getByEmail(@Param('email') email: string) {
    return this.orderService.getByEmail(email);
  }

  @Post()
  async placeOrder(@Body() payload: CreateOrderPayload) {
    return this.orderService.createOrder(payload);
  }
}
