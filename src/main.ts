import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { ConfigService } from 'common/config.service';

async function bootstrap() {
  const configService = new ConfigService();
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    configService.rabbitConfig,
  );

  await app.listen();
  console.info(`Microservice is running`);
}
bootstrap();
