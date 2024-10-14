import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3001);
  console.log('Cliente microservice is listening on port 3001');
}

bootstrap();
