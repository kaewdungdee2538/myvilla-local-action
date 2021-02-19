import { MiddlewareConsumer, Module } from '@nestjs/common';
import { bGetBookingInfoMiddleware } from 'src/middleware/booking/get-booking-info/b_get_booking_info.middleware';
import { vsGetHomeMiddleware } from 'src/middleware/visitor/get-home/vs_get_home.middleware';
import { dbConnection } from 'src/pg_database/pg.database';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';
import { FormatDataUtils } from 'src/utils/format_data.utils';
import { GetBookingInfoController } from './get-booking-info.controller';
import { GetBookingInfoService } from './get-booking-info.service';

@Module({
  controllers: [GetBookingInfoController],
  providers: [
    GetBookingInfoService
    ,dbConnection
    ,FormatDataUtils
    ,ErrMessageUtilsTH
  ]
})
export class GetBookingInfoModule {
  configure(consumer:MiddlewareConsumer){
    consumer
    .apply(vsGetHomeMiddleware,bGetBookingInfoMiddleware)
    .forRoutes('bannayuu/api/booking/get-booking-info/*');
  }
}
