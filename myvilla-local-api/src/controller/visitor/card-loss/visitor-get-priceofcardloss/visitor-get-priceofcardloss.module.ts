import { MiddlewareConsumer, Module } from '@nestjs/common';
import { vsDefaultMiddleware } from 'src/middleware/default/default.middleware';
import { vsGetHomeMiddleware } from 'src/middleware/visitor/get-home/vs_get_home.middleware';
import { dbConnection } from 'src/pg_database/pg.database';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';
import { FormatDataUtils } from 'src/utils/format_data.utils';
import { VisitorGetPriceofcardlossController } from './visitor-get-priceofcardloss.controller';
import { VisitorGetPriceofcardlossService } from './visitor-get-priceofcardloss.service';

@Module({
  controllers: [VisitorGetPriceofcardlossController],
  providers: [VisitorGetPriceofcardlossService,dbConnection,FormatDataUtils,ErrMessageUtilsTH]
})
export class VisitorGetPriceofcardlossModule {
  configure(consumer:MiddlewareConsumer){
    consumer
    .apply(vsDefaultMiddleware,vsGetHomeMiddleware)
    .forRoutes('bannayuu/api/visitor/cardloss/get-priceofcardloss/*');
  }
}
