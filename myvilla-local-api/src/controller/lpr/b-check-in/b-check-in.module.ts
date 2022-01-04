import { MiddlewareConsumer, Module } from '@nestjs/common';
import { vsDefaultMiddleware } from 'src/middleware/default/default.middleware';
import { LPRBookingCheckInMiddleware } from 'src/middleware/lpr/b-check-in/lpr_b_check_in.middleware';
import { dbConnection } from 'src/pg_database/pg.database';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';
import { FormatDataUtils } from 'src/utils/format_data.utils';
import { LPRBCheckInController } from './b-check-in.controller';
import { LPRBCheckInService } from './b-check-in.service';

@Module({
  controllers: [LPRBCheckInController],
  providers: [
    LPRBCheckInService
    , dbConnection
    , FormatDataUtils
    , ErrMessageUtilsTH
  ]
})
export class LPRBCheckInModule {
  configure(consumer:MiddlewareConsumer){
    consumer
    .apply(vsDefaultMiddleware,LPRBookingCheckInMiddleware)
    .forRoutes('bannayuu/api/lpr/booking/check-in/get');
  }
}
