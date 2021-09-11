import {
    Body,
    Controller,
    Delete,
    Get,
    Inject,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { OrderInput, OMResponse } from 'apps/models';
import { Observable } from 'rxjs';
import { AppService } from './app.service';

@Controller('orders')
export class AppController {
    constructor(
        private readonly appService: AppService,
        @Inject('ORDER_SERVICE') private orderClient: ClientProxy,
        @Inject('PAYMENT_SERVICE') private paymentClient: ClientProxy,
    ) {}

    // @Get()
    // getHello(): string {
    //     this.orderClient.emit('test_gateway', 'testing');
    //     this.paymentClient.emit('payment_created', 'created');
    //     return this.appService.getHello();
    // }

    @Get()
    orders(): Observable<OMResponse> {
        return this.orderClient.send('get_all_orders', '').pipe((res) => res);
    }

    @Get(':id')
    getOrderByID(@Param('id') id: string): Observable<OMResponse> {
        return this.orderClient.send('order_by_id', id).pipe((res) => res);
    }

    @Get('customer/:id')
    getOrderByCID(@Param('id') id: string): Observable<OMResponse> {
        return this.orderClient
            .send('orders_by_customer_id', id)
            .pipe((res) => res);
    }

    @Get('status/:id')
    checkOrderStatus(@Param('id') id: string): Observable<OMResponse> {
        return this.orderClient
            .send('check_order_status', id)
            .pipe((res) => res);
    }

    @Post('create')
    createOrder(@Body() orderBody: OrderInput): Observable<OMResponse> {
        return this.orderClient
            .send('create_order', orderBody)
            .pipe((res) => res);
    }

    @Delete('cancel/:id')
    cancelOrder(@Param('id') id: string): Observable<OMResponse> {
        return this.orderClient.send('cancel_order', id).pipe((res) => res);
    }
}
