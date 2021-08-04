import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('orders')
export class OrderEntity {
    @PrimaryColumn({ nullable: false })
    order_id: string;

    @Column({ nullable: false })
    product_id: string;

    @Column({ default: 0, nullable: false })
    quantity: number;

    @Column({ nullable: false })
    customer_id: string;

    @Column({ nullable: false })
    price: number;

    @Column({ nullable: false })
    status: string;

    @Column({ default: () => 'CURRENT_TIMESTAMP', type: 'timestamp' })
    created_at: Date;
}
