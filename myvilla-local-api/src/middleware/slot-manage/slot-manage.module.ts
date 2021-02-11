import { Module } from '@nestjs/common';
import { dbConnection } from 'src/pg_database/pg.database';
import { SlotManageController } from './slot-manage.controller';
import { SlotManageService } from './slot-manage.service';

@Module({
  controllers: [SlotManageController],
  providers: [
    SlotManageService
    ,dbConnection
  ]
})
export class SlotManageModule {}
