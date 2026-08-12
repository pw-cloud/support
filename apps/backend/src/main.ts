import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getAvailablePort } from './port';

async function bootstrap() {
  const requestedPort = Number(process.env.PORT ?? 3000);
  const port = await getAvailablePort(requestedPort);

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(port);
}

bootstrap();
