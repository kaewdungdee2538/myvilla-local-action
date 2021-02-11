import { Module } from '@nestjs/common';
import { dbConnection } from 'src/pg_database/pg.database';
import { CardManageController } from './card-manage.controller';
import { CardManageService } from './card-manage.service';

@Module({
  controllers: [CardManageController],
  providers: [
    CardManageService
    ,dbConnection
  ]
})
export class CardManageModule {}
