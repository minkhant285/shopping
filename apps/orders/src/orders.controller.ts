import { Controller, Get } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { OrdersService } from './orders.service';

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  getHello(): string {
    return this.ordersService.getHello();
  }

  @EventPattern('create_order')
  orderCreate(data: string) {
    this.getHello();
    console.log(`Order Created: ${data}`);
  }

  @EventPattern('payment_status')
  payment(data: string) {
    console.log(`Payment Status: ${data}`);
  }
}
