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
import {
    OrderInput,
    OMResponse,
    MicroserviceNames,
    ProductInput,
    Product,
} from 'apps/models';
import { Observable } from 'rxjs';

@Controller('products')
export class ProductsController {
    constructor(
        @Inject(MicroserviceNames.ProductService)
        private productClient: ClientProxy,
    ) {}

    @Get()
    products(): Observable<OMResponse> {
        return this.productClient
            .send('get_all_products', '')
            .pipe((res) => res);
    }

    @Get(':id')
    getProductByID(@Param('id') id: string): Observable<OMResponse> {
        return this.productClient
            .send('get_product_by_id', id)
            .pipe((res) => res);
    }

    @Post()
    createProduct(@Body() productInput: ProductInput): Observable<OMResponse> {
        return this.productClient
            .send('create_product', productInput)
            .pipe((res) => res);
    }

    @Put(':id')
    updateProduct(
        @Param('id') product_id: string,
        @Body() productInput: ProductInput,
    ): Observable<OMResponse> {
        return this.productClient
            .send('update_product', {
                id: product_id,
                productData: productInput,
            })
            .pipe((res) => res);
    }

    @Delete(':id')
    deleteProduct(@Param('id') product_id: string): Observable<OMResponse> {
        return this.productClient
            .send('delete_product', product_id)
            .pipe((res) => res);
    }
}
