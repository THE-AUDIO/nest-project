import { MiddlewareConsumer, Module, NestMiddleware, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { FirstMiddleware } from './midelwares/first/first.middleware';
import { logger } from './midelwares/first/logger.middleware';
import { HelmetMiddleware } from '@nest-middlewares/helmet';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    TodoModule,
    ConfigModule.forRoot({
      isGlobal:true
    })
  
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
