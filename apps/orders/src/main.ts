import { NestFactory } from '@nestjs/core';
import { OrdersModule } from './orders.module';

async function bootstrap() {
  const app = await NestFactory.create(OrdersModule);
  await app.listen(4001, () => console.log(`Order Service running at ${4001}`));
}
bootstrap();
