import { NestFactory } from '@nestjs/core';
import { PaymentModule } from './payment.module';

async function bootstrap() {
  const app = await NestFactory.create(PaymentModule);
  await app.listen(4002, () =>
    console.log(`Payment Service running at ${4002}`),
  );
}
bootstrap();
