import { MiddlewareConsumer } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { GetImageModule } from './controller/image/get-image/get-image.module';
import { ResetVisitorModule } from './controller/reset-data/reset-visitor/reset-visitor.module';
import { ActionInModule } from './controller/visitor/action-in/action-in.module';
import { GetInModule } from './controller/visitor/action-out/get-in/get-in.module';
import { ActionOutSaveModule } from './controller/visitor/action-out/save/action-out.module';
import { VisitorGetPriceofcardlossModule } from './controller/visitor/card-loss/visitor-get-priceofcardloss/visitor-get-priceofcardloss.module';
import { VisitorSaveCardlossModule } from './controller/visitor/card-loss/visitor-save-cardloss/visitor-save-cardloss.module';
import { GetCartypeCategoryModule } from './controller/visitor/get-cartype-category/get-cartype-category.module';
import { GetCartypeModule } from './controller/visitor/get-cartype/get-cartype.module';
import { GetDepartmentTypeModule } from './controller/visitor/get-department-type/get-department-type.module';
import { GetHomeModule } from './controller/visitor/get-home/get-home.module';
import { GetIndividualTypeModule } from './controller/visitor/get-individual-type/get-individual-type.module';
import { GetSlotModule } from './controller/visitor/get-slot/get-slot.module';
import { VisitorPendantModule } from './controller/visitor/visitor-pendant/visitor-pendant.module';
import { loggerMiddleware } from './middleware/logger.middleware';

@Module({
  imports: [
    AuthModule
    , ActionInModule
    , GetSlotModule
    , GetHomeModule
    , GetCartypeModule
    , GetCartypeCategoryModule
    , GetInModule
    , GetImageModule
    , ActionOutSaveModule
    , GetDepartmentTypeModule
    , GetIndividualTypeModule
    , ResetVisitorModule
    , VisitorPendantModule
    , VisitorGetPriceofcardlossModule
    , VisitorSaveCardlossModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(loggerMiddleware,)
      .forRoutes('*');
  }
}
