import { MiddlewareConsumer, Module } from '@nestjs/common';
import { bGetBookingInfoMiddleware } from 'src/middleware/booking/get-booking-info/b_get_booking_info.middleware';
import { bGetBookingOutInfoMiddleware } from 'src/middleware/booking/get-booking-out-info/b_get_booking_out_info.middleware';
import { vsGetHomeMiddleware } from 'src/middleware/visitor/get-home/vs_get_home.middleware';
import { dbConnection } from 'src/pg_database/pg.database';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';
import { FormatDataUtils } from 'src/utils/format_data.utils';
import { LoadSettingLocalUtils } from 'src/utils/load_setting_local.utils';
import { GetBookingOutInfoController } from './get-booking-out-info.controller';
import { GetBookingOutInfoService } from './get-booking-out-info.service';

@Module({
  controllers: [GetBookingOutInfoController],
  providers: [
    GetBookingOutInfoService
    ,dbConnection
    ,FormatDataUtils
    ,ErrMessageUtilsTH
    ,dbConnection
    ,LoadSettingLocalUtils
  ]
})
export class GetBookingOutInfoModule {
  configure(consumer:MiddlewareConsumer){
    consumer
    .apply(vsGetHomeMiddleware,bGetBookingInfoMiddleware,bGetBookingOutInfoMiddleware)
    .forRoutes('bannayuu/api/booking/get-booking-out-info/*');
  }
}