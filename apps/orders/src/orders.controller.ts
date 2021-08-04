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
        let result: OMResponse;
        const returnData = await this.orderService.getOrders();

        if (returnData) {
            result = {
                status: HttpStatus.OK,
                message: 'Get_all_orders_success',
                data: returnData,
            };
        } else {
            result = {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Get_all_orders_fail',
                data: null,
            };
        }
        return result;
    }

    @MessagePattern('order_by_id')
    async orderById(id: string): Promise<OMResponse> {
        let result: OMResponse;
        const returnData = await this.orderService.getOrderByID(id);

        if (returnData) {
            result = {
                status: HttpStatus.OK,
                message: 'Get_order_with_id_success',
                data: returnData,
            };
        } else {
            result = {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Get_order_with_id_fail',
                data: null,
            };
        }
        return result;
    }

    // @Get('status/:id')
    @MessagePattern('check_order_status')
    async checkOrderStatus(id: string): Promise<OMResponse> {
        let result: OMResponse;
        const returnData = await this.orderService.getOrderStatus(id);
        if (returnData) {
            result = {
                status: HttpStatus.OK,
                message: 'Check_stauts_success',
                data: returnData,
            };
        } else {
            result = {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Check_status_fail',
                data: null,
            };
        }
        return result;
    }

    // @Post('create')
    @MessagePattern('create_order')
    async createOrder(orderBody: OrderInput): Promise<OMResponse> {
        orderBody['order_id'] = uuidv4();
        orderBody['status'] = OrderStatus.Create;
        let result: OMResponse;
        const returnData = await this.orderService.createOrder(orderBody);
        if (returnData) {
            result = {
                status: HttpStatus.OK,
                message: 'create_order_success',
                data: returnData,
            };
        } else {
            result = {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'create_order_fail',
                data: null,
            };
        }
        return result;
    }

    // @Put('cancel/:id')
    @MessagePattern('cancel_order')
    async cancelOrder(id: string): Promise<OMResponse> {
        let result: OMResponse;
        const returnData = await this.orderService.controlOrderStatus(
            id,
            OrderStatus.Cancel,
        );
        if (returnData) {
            result = {
                status: HttpStatus.OK,
                message: 'Check_stauts_success',
                data: returnData,
            };
        } else {
            result = {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Check_status_fail',
                data: null,
            };
        }
        return result;
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
}
