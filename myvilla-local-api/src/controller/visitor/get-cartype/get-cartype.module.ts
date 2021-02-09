import { MiddlewareConsumer, Module } from '@nestjs/common';
import { vsGetHomeMiddleware } from 'src/middleware/visitor/get-home/vs_get_home.middleware';
import { dbConnection } from 'src/pg_database/pg.database';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';
import { FormatDataUtils } from 'src/utils/format_data.utils';
import { GetCartypeController } from './get-cartype.controller';
import { GetCartypeService } from './get-cartype.service';

@Module({
  controllers: [GetCartypeController],
  providers: [GetCartypeService
    ,dbConnection
    ,ErrMessageUtilsTH
    ,FormatDataUtils
  ]
})
export class GetCartypeModule {
  configure(consumer:MiddlewareConsumer){
    consumer
    .apply(vsGetHomeMiddleware)
    .forRoutes('bannayuu/api/visitor/get-cartype/*');
  }
}
