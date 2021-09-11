import {
    Body,
    Controller,
    Get,
    HttpStatus,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { OMResponse, OrderInput, OrderStatus, OrderType } from 'apps/models';
import { from, Observable, of } from 'rxjs';
import { OrdersService } from './orders.service';
import { v4 as uuidv4 } from 'uuid';

@Controller('orders')
export class OrdersController {
    constructor(private readonly orderService: OrdersService) {}

    @Get()
    @MessagePattern('get_all_orders')
    async orders(): Promise<OMResponse> {
        const returnData = await this.orderService.getOrders();
        console.log(returnData);
        return await this.responseToGateWay(returnData);
    }

    @MessagePattern('order_by_id')
    async orderById(id: string): Promise<OMResponse> {
        const returnData = await this.orderService.getOrderByID(id);
        return await this.responseToGateWay(returnData);
    }

    @MessagePattern('orders_by_customer_id')
    async orderByCId(id: string): Promise<OMResponse> {
        return await this.responseToGateWay(
            await this.orderService.getOrderByCustomerID(id),
        );
    }

    // @Get('status/:id')
    @MessagePattern('check_order_status')
    async checkOrderStatus(id: string): Promise<OMResponse> {
        const returnData = await this.orderService.getOrderStatus(id);
        return await this.responseToGateWay(returnData);
    }

    // @Post('create')
    @MessagePattern('create_order')
    async createOrder(orderBody: OrderInput): Promise<OMResponse> {
        // orderBody['order_id'] = uuidv4();
        orderBody['status'] = OrderStatus.Create;
        const returnData = await this.orderService.createOrder(orderBody);
        return await this.responseToGateWay(returnData);
    }

    // @Put('cancel/:id')
    @MessagePattern('cancel_order')
    async cancelOrder(id: string): Promise<OMResponse> {
        const returnData = await this.orderService.controlOrderStatus(
            id,
            OrderStatus.Cancel,
        );
        return await this.responseToGateWay(returnData);
    }

    @MessagePattern('test_gateway')
    testing(data: string) {
        console.log(data);
    }

    @EventPattern('payment_status_reject')
    decline(paymentData: OrderType) {
        this.orderService.controlOrderStatus(
            paymentData.order_id,
            OrderStatus.Cancel,
        );
        console.log(`Your payment is declined ${paymentData.order_id}`);
    }

    @EventPattern('payment_status_accept')
    paymentAccept(paymentData: OrderType) {
        this.orderService.controlOrderStatus(
            paymentData.order_id,
            OrderStatus.Confirm,
        );
        console.log(`Payment Status: confirmed`);
    }

    @EventPattern('deliver_product')
    deliver(paymentData: OrderType) {
        this.orderService.controlOrderStatus(
            paymentData.order_id,
            OrderStatus.Deliver,
        );
        console.log(`Your product is delivered `);
    }

    async responseToGateWay(dataArg: any): Promise<OMResponse> {
        let result: OMResponse;
        if (dataArg) {
            result = {
                status: HttpStatus.OK,
                message: 'Success',
                data: dataArg,
            };
        } else {
            result = {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Fail',
                data: null,
            };
        }
        return result;
    }
}
