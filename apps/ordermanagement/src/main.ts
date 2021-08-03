import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const appPort = process.env.GATEWAY_APP_PORT || 4000;

  app.connectMicroservice({
    transport: Transport.TCP,
    port: appPort,
    options: { retryAttemps: 10, retryDelay: 3000 },
  });

  app.enableCors({
    origin: '*',
  });

  await app.listen(appPort, () => console.log(`Gateway running at ${appPort}`));
}
bootstrap();
