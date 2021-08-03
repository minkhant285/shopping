import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { OrderInput } from '../../models';
import {
  ClientProxy,
  EventPattern,
  MessagePattern,
} from '@nestjs/microservices';

@Controller()
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    @Inject('PAYMENT_SERVICE') private client: ClientProxy,
  ) {}

  @Get()
  getHello(): string {
    return this.paymentService.getHello();
  }

  @Post()
  postData(@Body() data: OrderInput): OrderInput {
    return data;
  }

  @EventPattern('order_created')
  orderCreate(data: string) {
    console.log(`Order Created: ${data}`);
  }

  @MessagePattern('payment_created')
  paymentCreate(data: string) {
    this.client.emit('payment_status', Math.random() < 0.5);
    console.log(`payment Created: ${data}`);
  }
}
