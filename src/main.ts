import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe(
    {
      transform: true,// transform le body en getpaginedDto 
      whitelist: true,// delete an elt not in list
      forbidNonWhitelisted: true, // send a error if a user enter a bad thing

    }
    ))
  await app.listen(3000);
}
bootstrap();
