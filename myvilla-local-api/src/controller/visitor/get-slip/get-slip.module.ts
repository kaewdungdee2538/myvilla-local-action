import { MiddlewareConsumer, Module } from '@nestjs/common';
import { vsDefaultMiddleware } from 'src/middleware/default/default.middleware';
import { vsGetHomeMiddleware } from 'src/middleware/visitor/get-home/vs_get_home.middleware';
import { vsGetSlipInMiddleware } from 'src/middleware/visitor/get-slip/vs_get_slip_in.middleware';
import { dbConnection } from 'src/pg_database/pg.database';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';
import { FormatDataUtils } from 'src/utils/format_data.utils';
import { GetSlipController } from './get-slip.controller';
import { GetSlipService } from './get-slip.service';

@Module({
  controllers: [GetSlipController],
  providers: [
    GetSlipService
    ,dbConnection
    ,ErrMessageUtilsTH
    ,FormatDataUtils
  ]
})
export class GetSlipModule {
  configure(consumer:MiddlewareConsumer){
    consumer
    .apply(vsDefaultMiddleware,vsGetHomeMiddleware,vsGetSlipInMiddleware)
    .forRoutes('bannayuu/api/visitor/get-slip/*');
  }
}
