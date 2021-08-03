import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('orders')
export class OrderEntity {
    @PrimaryColumn({ nullable: false })
    orderID: string;

    @Column({ nullable: false })
    productID: string;

    @Column({ default: 0, nullable: false })
    quantity: number;

    @Column({ nullable: false })
    customerID: string;

    @Column({ nullable: false })
    price: number;

    @Column({ nullable: false })
    status: string;

    @Column({ default: () => 'CURRENT_TIMESTAMP', type: 'timestamp' })
    createdAt: Date;
}
