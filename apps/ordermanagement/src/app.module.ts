import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MicroserviceNames } from 'apps/models';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './products.controller';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
            isGlobal: true,
        }),
        ClientsModule.register([
            {
                name: MicroserviceNames.OrderService,
                transport: Transport.TCP,
                options: {
                    port:
                        parseInt(
                            <string>process.env.ORDERS_MICROSERVICE_PORT,
                        ) || 4100,
                },
            },
            {
                name: MicroserviceNames.PaymentService,
                transport: Transport.TCP,
                options: {
                    port:
                        parseInt(
                            <string>process.env.PAYMENT_MICROSERVICE_PORT,
                        ) || 4100,
                },
            },
            {
                name: MicroserviceNames.ProductService,
                transport: Transport.TCP,
                options: {
                    port:
                        parseInt(
                            <string>process.env.PRODUCTS_MICROSERVICE_PORT,
                        ) || 4102,
                },
            },
        ]),
    ],
    controllers: [AppController, ProductsController],
    providers: [AppService],
})
export class AppModule {}
