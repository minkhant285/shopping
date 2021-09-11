import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { ProductsModule } from './products.module';

async function bootstrap() {
    // const app = await NestFactory.create(PaymentModule);

    const appPort = process.env.PRODUCTS_MICROSERVICE_PORT || 4102;
    const app = await NestFactory.createMicroservice(ProductsModule, {
        transport: Transport.TCP,
        options: {
            port: appPort,
        },
    });
    app.listen()
        .then(() =>
            console.log(
                `Products server listening at ${process.env.HOST}:${appPort}...`,
            ),
        )
        .catch((err) =>
            console.log(`Products server failed to start! Error: ${err}`),
        );
}
bootstrap();
