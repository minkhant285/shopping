import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy, EventPattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('ORDER_SERVICE') private orderClient: ClientProxy,
    @Inject('PAYMENT_SERVICE') private paymentClient: ClientProxy,
  ) {}

  @Get()
  getHello(): string {
    this.orderClient.emit('create_order', 'new order');
    this.paymentClient.emit('order_created', 'created');
    return this.appService.getHello();
  }

  // @EventPattern('order_created')
  // orderCreate(data: string) {
  //   this.client.emit('order_created', 'created');
  //   console.log(`Order Created: ${data}`);
  // }
}
