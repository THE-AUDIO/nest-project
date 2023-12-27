import { MiddlewareConsumer, Module, NestMiddleware, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { FirstMiddleware } from './midelwares/first/first.middleware';
import { logger } from './midelwares/first/logger.middleware';
import { HelmetMiddleware } from '@nest-middlewares/helmet';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CvModule } from './cv/cv.module';
import * as dotenv from 'dotenv'
import { myEntity } from './cv/entities/entity/cv.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'node:path';
dotenv.config()
@Module({
  imports: [
    TodoModule,
    ConfigModule.forRoot({
      isGlobal:true
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [myEntity],
      synchronize: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads')
    }),
    CvModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
 
 configure(consumer: MiddlewareConsumer) {

  consumer.apply(FirstMiddleware).forRoutes(
    'hello',
    {path:'todo' , method: RequestMethod.GET},
    {path:'todo*' , method: RequestMethod.DELETE}

  )
  .apply(logger).forRoutes('')
  .apply(HelmetMiddleware).forRoutes('')
   
 }
  
}
