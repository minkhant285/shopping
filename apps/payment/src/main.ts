import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { PaymentModule } from './payment.module';

async function bootstrap() {
  // const app = await NestFactory.create(PaymentModule);

  const appPort = process.env.PAYMENT_APP_PORT || 4002;

  // app.connectMicroservice({
  //   transport: Transport.TCP,
  //   options: { retryAttemps: 10, retryDelay: 3000 },
  // });

  // app.enableCors({
  //   origin: '*',
  // });

  // await app.listen(appPort, () =>
  //   console.log(`Payment Service running at ${appPort}`),
  // );
  const app = await NestFactory.createMicroservice(PaymentModule, {
    transport: Transport.TCP,
    options: {
      port: appPort,
    },
  });
  app
    .listen()
    .then(() =>
      console.log(
        `Payment server listening at ${process.env.HOST}:${appPort}...`,
      ),
    )
    .catch((err) =>
      console.log(`Payment server failed to start! Error: ${err}`),
    );
}
bootstrap();
