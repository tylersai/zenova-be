import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderPayload } from './dto/create-order';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async getAll() {
    return this.orderService.getAll();
  }

  @UseGuards(AuthGuard)
  @Get('my-orders')
  async getMyOrders(@Req() request: Request) {
    return this.orderService.getByEmail(request['user'].email);
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
