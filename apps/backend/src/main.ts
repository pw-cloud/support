import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getAvailablePort } from './port';

async function bootstrap() {
  const requestedPort = Number(process.env.PORT ?? 3000);
  const port = await getAvailablePort(requestedPort);
  const corsOrigin = process.env.CORS_ORIGIN ?? 'http://localhost:5173';

  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: corsOrigin,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(port, '0.0.0.0');
}

void bootstrap();
