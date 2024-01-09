import { MiddlewareConsumer } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BActionInModule } from './controller/booking/b-action-in/b-action-in.module';
import { BActionOutModule } from './controller/booking/b-action-out/b-action-out.module';
import { GetBookingInfoModule } from './controller/booking/get-booking-info/get-booking-info.module';
import { GetBookingOutInfoModule } from './controller/booking/get-booking-out-info/get-booking-out-info.module';
import { GetImageModule } from './controller/image/get-image/get-image.module';
import { LPRBCheckInModule } from './controller/lpr/b-check-in/b-check-in.module';
import { LPRBCheckOutModule } from './controller/lpr/b-check-out/b-check-out.module';
import { LptBSaveInModule } from './controller/lpr/lpr-b-save-in/lpr-b-save-in.module';
import { LptBSaveOutModule } from './controller/lpr/lpr-b-save-out/lpr-b-save-out.module';
import { ParcelModule } from './controller/parcel/parcel.module';
import { ResetVisitorModule } from './controller/reset-data/reset-visitor/reset-visitor.module';
import { SosModule } from './controller/sos/sos/sos.module';
import { ActionInModule } from './controller/visitor/action-in/action-in.module';
import { GetInModule } from './controller/visitor/action-out/get-in/get-in.module';
import { ActionOutSaveModule } from './controller/visitor/action-out/save/action-out.module';
import { VisitorGetPriceofcardlossModule } from './controller/visitor/card-loss/visitor-get-priceofcardloss/visitor-get-priceofcardloss.module';
import { VisitorSaveCardlossModule } from './controller/visitor/card-loss/visitor-save-cardloss/visitor-save-cardloss.module';
import { CheckCardModule } from './controller/visitor/check-card/check-card.module';
import { VsEstampModule } from './controller/visitor/estamp/vs-estamp.module';
import { GetCartypeCategoryAllModule } from './controller/visitor/get-cartype-category-all/get-cartype-category-all.module';
import { GetCartypeCategoryModule } from './controller/visitor/get-cartype-category/get-cartype-category.module';
import { GetCartypeModule } from './controller/visitor/get-cartype/get-cartype.module';
import { GetDepartmentTypeModule } from './controller/visitor/get-department-type/get-department-type.module';
import { GetHomeModule } from './controller/visitor/get-home/get-home.module';
import { GetIndividualTypeModule } from './controller/visitor/get-individual-type/get-individual-type.module';
import { GetSlipModule } from './controller/visitor/get-slip/get-slip.module';
import { GetSlotModule } from './controller/visitor/get-slot/get-slot.module';
import { VisitorPendantModule } from './controller/visitor/visitor-pendant/visitor-pendant.module';
import { loggerMiddleware } from './middleware/logger.middleware';
import { GetVisitorOutHistoryModule } from './get-visitor-out-history/get-visitor-out-history.module';
import { BypassModule } from './controller/lpr/bypass/bypass.module';
import { EstampModule } from './controller/estamp/estamp.module';

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
    , CheckCardModule
    , GetSlipModule
    , BActionInModule
    , GetBookingInfoModule
    , GetBookingOutInfoModule
    , BActionOutModule
    , GetCartypeCategoryAllModule
    , VsEstampModule
    , SosModule
    , ParcelModule
    , LPRBCheckInModule
    , LPRBCheckOutModule
    , LptBSaveInModule
    , LptBSaveOutModule, GetVisitorOutHistoryModule, BypassModule, EstampModule
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
