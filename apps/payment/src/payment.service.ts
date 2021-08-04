import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MicroserviceNames, OrderType } from 'apps/models';

@Injectable()
export class PaymentService {
    constructor(
        @Inject(MicroserviceNames.PaymentService) private client: ClientProxy,
    ) {}
    getHello(): string {
        this.client.send('payment_status', 'success');
        return 'Hello World!';
    }

    createPayment(data: OrderType) {
        console.log(data);
        if (Math.random() > 0.5) {
            this.client.emit('payment_status_accept', data);
            setTimeout(() => {
                this.client.emit('deliver_product', data);
            }, 10000);
        } else {
            this.client.emit('payment_status_reject', data);
        }
    }
}
