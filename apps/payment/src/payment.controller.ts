import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { OrderInput, OrderType } from '../../models';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) {}

    @Get()
    getHello(): string {
        return this.paymentService.getHello();
    }

    @Post()
    postData(@Body() data: OrderInput): OrderInput {
        return data;
    }

    @EventPattern('order_created')
    orderCreate(data: OrderType) {
        this.paymentService.createPayment(data);
    }
}
