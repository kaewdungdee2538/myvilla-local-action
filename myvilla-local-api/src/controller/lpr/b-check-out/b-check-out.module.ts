import { HttpModule, MiddlewareConsumer, Module } from '@nestjs/common';
import { CalTimediffService } from 'src/controller/cal-timediff/cal-timediff.service';
import { vsDefaultMiddleware } from 'src/middleware/default/default.middleware';
import { LPRBookingCheckOutMiddleware } from 'src/middleware/lpr/b-check-out/lpr_b_check_out.middleware';
import { BasicAuthMiddleware } from 'src/middleware/auth/basic-auth.middleware';
import { dbConnection } from 'src/pg_database/pg.database';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';
import { FormatDataUtils } from 'src/utils/format_data.utils';
import { LoadSettingLocalUtils } from 'src/utils/load_setting_local.utils';
import { LPRBCheckOutController } from './b-check-out.controller';
import { LPRBCheckOutService } from './b-check-out.service';

@Module({
  imports: [HttpModule],
  controllers: [LPRBCheckOutController],
  providers: [
    LPRBCheckOutService,
    dbConnection,
    FormatDataUtils,
    ErrMessageUtilsTH,
    LoadSettingLocalUtils,
    CalTimediffService,
  ],
})
export class LPRBCheckOutModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        BasicAuthMiddleware,
        vsDefaultMiddleware,
        LPRBookingCheckOutMiddleware,
      )
      .forRoutes('bannayuu/api/lpr/booking/check-out/get');
  }
}
