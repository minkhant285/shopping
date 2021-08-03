import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class PaymentService {
  constructor(@Inject('PAYMENT_SERVICE') private client: ClientProxy) {}
  getHello(): string {
    this.client.send('payment_status', 'success');
    return 'Hello World!';
  }
}
