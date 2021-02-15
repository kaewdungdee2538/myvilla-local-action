import { Module } from '@nestjs/common';
import { dbConnection } from 'src/pg_database/pg.database';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';
import { ResetVisitorController } from './reset-visitor.controller';
import { ResetVisitorService } from './reset-visitor.service';

@Module({
  controllers: [ResetVisitorController],
  providers: [
    ResetVisitorService
    ,dbConnection
    ,ErrMessageUtilsTH
  ]
})
export class ResetVisitorModule {}
