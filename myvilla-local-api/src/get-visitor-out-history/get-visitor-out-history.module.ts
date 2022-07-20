import { MiddlewareConsumer, Module } from '@nestjs/common';
import { GetVisitorOutHistoryController } from './get-visitor-out-history.controller';
import { GetVisitorOutHistoryService } from './get-visitor-out-history.service';
import { dbConnection } from 'src/pg_database/pg.database';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';
import { FormatDataUtils } from 'src/utils/format_data.utils';
import { vsDefaultMiddleware } from 'src/middleware/default/default.middleware';
import {DateTimeGetMiddleware} from 'src/middleware/time/datetime-get.middleware'

@Module({
  controllers: [GetVisitorOutHistoryController],
  providers: [GetVisitorOutHistoryService, dbConnection, ErrMessageUtilsTH, FormatDataUtils]
})
export class GetVisitorOutHistoryModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(vsDefaultMiddleware, DateTimeGetMiddleware)
      .forRoutes('bannayuu/api/visitor/get-visitor-out/*');
  }
}
