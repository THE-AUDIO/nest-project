import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as morgan from 'morgan';
import * as dotenv from 'dotenv'
import { DurationInterceptor } from './interceptors/duration/duration.interceptor';
import { ConfigService } from '@nestjs/config';
async function bootstrap() {
      const app = await NestFactory.create(AppModule);
      const configService = app.get(ConfigService)// instance du config service

      const  corsOption = {
          origin:['http://localhost:4200']
      }
      app.enableCors(corsOption)
      app.use(morgan('dev'))
      dotenv.config()
      app.use(
        (req: Request, res: Response, next) =>{
          console.log('app.use');
          next()
          
        }
      )

      app.useGlobalPipes(new ValidationPipe(

        {
          transform: true,// transform le body en getpaginedDto 
          whitelist: true,// delete an elt not in list
          forbidNonWhitelisted: true, // send a error if a user enter a bad thing

        }))
        app.useGlobalInterceptors(new DurationInterceptor())
      await app.listen(configService.get('APP_PORT'));
}
bootstrap();
