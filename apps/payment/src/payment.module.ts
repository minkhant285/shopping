import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MicroserviceNames } from 'apps/models';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';

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
                        parseInt(
                            <string>process.env.ORDERS_MICROSERVICE_PORT,
                        ) || 4100,
                },
            },
        ]),
    ],
    controllers: [PaymentController],
    providers: [PaymentService],
})
export class PaymentModule {}
