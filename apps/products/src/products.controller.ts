import { Controller, Get, HttpStatus } from '@nestjs/common';
import { OMResponse, Product, ProductInput } from 'apps/models';
import { from, Observable } from 'rxjs';
import { ProductsService } from './products.service';
import { v4 as uuidv4 } from 'uuid';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get()
    @MessagePattern('get_all_products')
    async orders(): Promise<OMResponse> {
        let result: OMResponse;
        const returnData = await this.productsService.getProducts();
        return await this.responseToGateWay(returnData);
    }

    @MessagePattern('get_product_by_id')
    async orderById(id: string): Promise<OMResponse> {
        const returnData = await this.productsService.getProductByID(id);
        return await this.responseToGateWay(returnData);
    }

    @MessagePattern('create_product')
    async createProduct(productInput: ProductInput): Promise<OMResponse> {
        const returnData = await this.productsService.createProduct(
            productInput,
        );
        return await this.responseToGateWay(returnData);
    }

    @MessagePattern('update_product')
    async updateProduct(updateData: {
        id: string;
        productData: Product;
    }): Promise<OMResponse> {
        const returnData = await this.productsService.updateProduct(
            updateData.id,
            updateData.productData,
        );
        return await this.responseToGateWay(returnData);
    }

    @MessagePattern('delete_product')
    async deleteById(id: string): Promise<OMResponse> {
        const returnData = await this.productsService.deleteProduct(id);
        return await this.responseToGateWay(returnData);
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
