import { Module } from '@nestjs/common';
import { EstampController } from './estamp.controller';
import { EstampService } from './estamp.service';
import { dbConnection } from 'src/pg_database/pg.database';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';
import { FormatDataUtils } from 'src/utils/format_data.utils';

@Module({
  controllers: [EstampController],
  providers: [EstampService 
    ,dbConnection
    ,ErrMessageUtilsTH
    ,FormatDataUtils
  ]
})
export class EstampModule {}
