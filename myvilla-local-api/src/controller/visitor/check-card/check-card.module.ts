import { MiddlewareConsumer, Module } from '@nestjs/common';
import { CardManageService } from 'src/middleware/card-manage/card-manage.service';
import { vsCheckCardMiddleware } from 'src/middleware/visitor/check-card/vs_check_card.middleware';
import { dbConnection } from 'src/pg_database/pg.database';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';
import { FormatDataUtils } from 'src/utils/format_data.utils';
import { CheckCardController } from './check-card.controller';
import { CheckCardService } from './check-card.service';

@Module({
  controllers: [CheckCardController],
  providers: [
    CheckCardService
    ,dbConnection
    ,ErrMessageUtilsTH
    ,FormatDataUtils
    ,CardManageService
  ]
})
export class CheckCardModule {
  configure(consumer:MiddlewareConsumer){
    consumer
    .apply(vsCheckCardMiddleware)
    .forRoutes('bannayuu/api/visitor/check-card/*');
  }
}
