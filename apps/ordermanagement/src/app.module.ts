import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MicroserviceNames } from 'apps/models';
import { AppController } from './app.controller';
import { AppService } from './app.service';

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
                        parseInt(<string>process.env.PAYMENT_APP_PORT) || 4002,
                },
            },
        ]),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
