import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class OrdersService {
  constructor(@Inject('PAYMENT_SERVICE') private client: ClientProxy) {}

  getHello(): string {
    this.client.emit('payment_created', 'payment');
    return 'Order Service is running!';
  }
}
