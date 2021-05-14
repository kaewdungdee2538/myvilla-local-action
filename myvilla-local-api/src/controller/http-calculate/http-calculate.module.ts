import { HttpCalculateController } from './http-calculate.controller';
import { HttpCalculateService } from './http-calculate.service';
import { HttpService, Logger, Module, OnModuleInit, HttpModule } from '@nestjs/common';
import { dbConnection } from 'src/pg_database/pg.database';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';

@Module({
  imports:[
    HttpModule
  ],
  controllers: [HttpCalculateController],
  providers: [HttpCalculateService
    ,dbConnection
    ,ErrMessageUtilsTH
    ,HttpService
    ,HttpModule
  ],
  exports:[
    HttpModule,HttpService
  ]
})
export class HttpCalculateModule {}
