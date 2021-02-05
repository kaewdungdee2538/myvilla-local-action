import { MiddlewareConsumer } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ActionInModule } from './controller/visitor/action-in/action-in.module';
import { loggerMiddleware } from './middleware/logger.middleware';

@Module({
  imports: [AuthModule,ActionInModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer:MiddlewareConsumer){
    consumer
    .apply(loggerMiddleware,)
    .forRoutes('*');
  }
}
