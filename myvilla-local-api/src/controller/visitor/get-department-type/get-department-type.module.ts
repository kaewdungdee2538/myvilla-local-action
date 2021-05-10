import { MiddlewareConsumer, Module } from '@nestjs/common';
import { vsDefaultMiddleware } from 'src/middleware/default/default.middleware';
import { vsGetHomeMiddleware } from 'src/middleware/visitor/get-home/vs_get_home.middleware';
import { dbConnection } from 'src/pg_database/pg.database';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';
import { FormatDataUtils } from 'src/utils/format_data.utils';
import { GetDepartmentTypeController } from './get-department-type.controller';
import { GetDepartmentTypeService } from './get-department-type.service';

@Module({
  controllers: [GetDepartmentTypeController],
  providers: [
    GetDepartmentTypeService
    ,dbConnection
    ,ErrMessageUtilsTH
    ,FormatDataUtils
  ]
})
export class GetDepartmentTypeModule {
  configure(consumer:MiddlewareConsumer){
    consumer
    .apply(vsDefaultMiddleware,vsGetHomeMiddleware)
    .forRoutes('bannayuu/api/visitor/get-department-type/*');
  }
}
