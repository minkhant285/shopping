import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class ProductsEntity {
    @PrimaryGeneratedColumn('uuid')
    product_id: string;

    @Column({ nullable: false })
    product_name: string;

    @Column({ nullable: false })
    description: string;

    @Column({ default: 0, nullable: false })
    price: number;

    @Column({ nullable: false })
    photo_url: string;

    @Column({ nullable: false })
    owner_id: string;

    @Column()
    hasInStock: boolean;

    @Column({ default: 0 })
    rating: number;

    @Column({ nullable: false })
    product_category: string;

    @Column({ default: () => 'CURRENT_TIMESTAMP', type: 'timestamp' })
    created_at: Date;
}
