import { MiddlewareConsumer, Module } from '@nestjs/common';
import { vsDefaultMiddleware } from 'src/middleware/default/default.middleware';
import { vsGetCartypeCategoryMiddleware } from 'src/middleware/visitor/get-cartype-category/vs_get_cartype_category.middleware';
import { vsGetHomeMiddleware } from 'src/middleware/visitor/get-home/vs_get_home.middleware';
import { dbConnection } from 'src/pg_database/pg.database';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';
import { FormatDataUtils } from 'src/utils/format_data.utils';
import { GetCartypeCategoryController } from './get-cartype-category.controller';
import { GetCartypeCategoryService } from './get-cartype-category.service';

@Module({
  controllers: [GetCartypeCategoryController],
  providers: [
    GetCartypeCategoryService
    ,dbConnection
    ,ErrMessageUtilsTH
    ,FormatDataUtils
  ]
})
export class GetCartypeCategoryModule {
  configure(consumer:MiddlewareConsumer){
    consumer
    .apply(vsDefaultMiddleware,vsGetHomeMiddleware,vsGetCartypeCategoryMiddleware)
    .forRoutes('bannayuu/api/visitor/get-cartype-category/*');
  }
}
