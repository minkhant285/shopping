import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MicroserviceNames, OrderEntity } from 'apps/models';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
            isGlobal: true,
        }),
        ClientsModule.register([
            {
                name: MicroserviceNames.PaymentService,
                transport: Transport.TCP,
                options: {
                    port:
                        parseInt(<string>process.env.PAYMENT_APP_PORT) || 4002,
                },
            },
        ]),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: parseInt(<string>process.env.POSTGRES_PORT),
            database: process.env.POSTGRES_DATABASE,
            username: process.env.POSTGRES_USERNAME,
            password: process.env.POSTGRES_PASSWORD,
            autoLoadEntities: true,
            synchronize: true,
        }),
        TypeOrmModule.forFeature([OrderEntity]),
    ],
    controllers: [OrdersController],
    providers: [OrdersService],
})
export class OrdersModule {}
