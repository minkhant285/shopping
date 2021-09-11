import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product, ProductInput, ProductsEntity } from 'apps/models';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(ProductsEntity)
        private readonly productsRepository: Repository<ProductsEntity>,
    ) {}

    getHello(): string {
        return 'Hello World!';
    }

    async createProduct(productData: ProductInput): Promise<Product> {
        return await this.productsRepository.save(productData);
    }

    async getProducts(): Promise<Product[]> {
        return await this.productsRepository.find();
    }

    async getProductByID(id: string): Promise<Product> {
        return await this.productsRepository.findOne(id);
    }

    async updateProduct(
        id: string,
        updateData: Product,
    ): Promise<UpdateResult> {
        return await this.productsRepository.update(id, updateData);
    }

    async deleteProduct(product_id: string): Promise<DeleteResult> {
        return await this.productsRepository.delete(product_id);
    }
}
