import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { MicroserviceNames, OrderEntity, OrderInput } from 'apps/models';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(OrderEntity)
        private readonly orderRepository: Repository<OrderEntity>,
        @Inject(MicroserviceNames.PaymentService)
        private readonly client: ClientProxy,
    ) {}

    async getOrders(): Promise<any[]> {
        return await this.orderRepository.find();
    }

    async getOrderByID(id: string): Promise<any> {
        return await this.orderRepository.findOne(id);
    }

    async createOrder(orderData: OrderInput): Promise<any> {
        this.client.emit('order_created', orderData);
        return await this.orderRepository.save(orderData);
    }

    async getOrderStatus(orderID: string): Promise<string> {
        let result: { status: string } = await this.orderRepository
            .createQueryBuilder('orders')
            .select(['orders.status'])
            .where('orders.order_id = :orderID', { orderID })
            .getOne();

        if (result) {
            return result.status;
        } else {
            return 'not found';
        }
    }

    async controlOrderStatus(
        orderID: string,
        status: string,
    ): Promise<UpdateResult> {
        return await this.orderRepository
            .createQueryBuilder('orders')
            .update('orders', { status })
            .where('order_id = :orderID', { orderID })
            .returning(['order_id', 'product_id'])
            .execute();
    }
}
