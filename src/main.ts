import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,//deja la data que se espera y remueve la data que no existe
    forbidNonWhitelisted: true,
  }));

  await app.listen(3000);
}
bootstrap();
