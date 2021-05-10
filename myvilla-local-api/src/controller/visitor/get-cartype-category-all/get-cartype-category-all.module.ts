import { MiddlewareConsumer, Module } from '@nestjs/common';
import { vsDefaultMiddleware } from 'src/middleware/default/default.middleware';
import { vsGetHomeMiddleware } from 'src/middleware/visitor/get-home/vs_get_home.middleware';
import { dbConnection } from 'src/pg_database/pg.database';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';
import { FormatDataUtils } from 'src/utils/format_data.utils';
import { GetCartypeCategoryAllController } from './get-cartype-category-all.controller';
import { GetCartypeCategoryAllService } from './get-cartype-category-all.service';

@Module({
  controllers: [GetCartypeCategoryAllController],
  providers: [
    GetCartypeCategoryAllService
    ,dbConnection
    ,ErrMessageUtilsTH
    ,FormatDataUtils
  ]
})
export class GetCartypeCategoryAllModule {
  configure(consumer:MiddlewareConsumer){
    consumer
    .apply(vsDefaultMiddleware,vsGetHomeMiddleware)
    .forRoutes('bannayuu/api/visitor/get-cartype-category-all/*');
  }
}
