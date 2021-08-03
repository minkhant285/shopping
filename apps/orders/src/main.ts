import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { OrdersModule } from './orders.module';

async function bootstrap() {
  const app = await NestFactory.create(OrdersModule);
  const appPort = process.env.ORDERS_APP_PORT || 4002;
  const microServicePort =
    parseInt(process.env.ORDERS_MICROSERVICE_PORT) || 4100;

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      port: microServicePort,
    },
  });

  app.enableCors({
    origin: '*',
  });

  await app.startAllMicroservices();
  await app.listen(appPort, () =>
    console.log(`Order Service running at ${appPort}`),
  );

  // const app = await NestFactory.createMicroservice(OrdersModule, {
  //   transport: Transport.TCP,
  //   options: {
  //     port: appPort,
  //   },
  // });
  // app
  //   .listen()
  //   .then(() =>
  //     console.log(
  //       `Order server listening at ${process.env.HOST}:${appPort}...`,
  //     ),
  //   )
  //   .catch((err) => console.log(`Order server failed to start! Error: ${err}`));
}
bootstrap();
