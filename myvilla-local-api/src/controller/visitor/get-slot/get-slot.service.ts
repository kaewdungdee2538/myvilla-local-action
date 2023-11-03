import { Body, Injectable } from '@nestjs/common';
import { dbConnection } from 'src/pg_database/pg.database';
import { StatusException } from 'src/utils/callback.status';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';

@Injectable()
export class GetSlotService {
  constructor(
    private readonly dbconnecttion: dbConnection,
    private readonly errMessageUtilsTh: ErrMessageUtilsTH,
  ) {}

  async getSlotNotUse(@Body() body) {
    console.log({ body });
    const building_id = body.company_id;
    const guardhouse_id = body.guardhouse_id;
    let sql = `select min(visitor_slot_number) as visitor_slot_number,min(visitor_slot_id) as visitor_slot_id from m_visitor_slot where status_flag ='N'`;
    sql += ` and company_id = $1`;

    const querys = {
      text: sql,
      values: [building_id],
    };
    const result = await this.dbconnecttion.getPgData(querys);
    console.log(result);
    return this.returnService(result);
  }

  async getSlotNotUseAll(@Body() body) {
    console.log({ body });
    const building_id = body.company_id;
    const guardhouse_id = body.guardhouse_id;
    let sql = `select visitor_slot_number::integer,visitor_slot_id::integer from m_visitor_slot where status_flag ='N'`;
    sql += ` and company_id = $1  order by visitor_slot_number limit 100`;

    const querys = {
      text: sql,
      values: [building_id],
    };
    const res = await this.dbconnecttion.getPgData(querys);
    console.log(res);
    if (await res.error) {
      throw new StatusException(
        {
          error: res.error,
          result: null,
          message: this.errMessageUtilsTh.errGetSlotVisitorNumberIsFail,
          statusCode: 200,
        },
        200,
      );
    } else if (
      res.result &&
      Array.isArray(res.result) &&
      res.result.length > 0 &&
      res.result[0].visitor_slot_number
    ) {
      throw new StatusException(
        {
          error: null,
          result: res.result,
          message: this.errMessageUtilsTh.messageSuccess,
          statusCode: 200,
        },
        200,
      );
    } else {
      //กรณีไม่มี slot ว่าง
      throw new StatusException(
        {
          error: this.errMessageUtilsTh.errGetSlotVistiorNumberNotValue,
          result: null,
          message: this.errMessageUtilsTh.errGetSlotVistiorNumberNotValue,
          statusCode: 200,
        },
        200,
      );
    }
  }

  async getSlotNotUseById(@Body() body) {
    console.log({ body });
    const building_id = body.company_id;
    const guardhouse_id = body.guardhouse_id;
    const visitor_slot_number = body.visitor_slot_number;
    let sql = `select min(visitor_slot_number) as visitor_slot_number,min(visitor_slot_id) as visitor_slot_id from m_visitor_slot where status_flag ='N'`;
    sql += ` and company_id = $1 and visitor_slot_number = $2`;

    const querys = {
      text: sql,
      values: [building_id, visitor_slot_number],
    };
    const result = await this.dbconnecttion.getPgData(querys);
    console.log(result);
    return this.returnService(result);
  }

  async returnService(result: any) {
    if (await result.error) {
      throw new StatusException(
        {
          error: result.error,
          result: null,
          message: this.errMessageUtilsTh.errGetSlotVisitorNumberIsFail,
          statusCode: 200,
        },
        200,
      );
    } else if (
      result.result &&
      Array.isArray(result.result) &&
      result.result.length > 0 &&
      result.result[0].visitor_slot_number
    ) {
      throw new StatusException(
        {
          error: null,
          result: {
            visitor_slot_number: parseInt(result.result[0].visitor_slot_number),
            visitor_slot_id: parseInt(result.result[0].visitor_slot_id),
          },
          message: this.errMessageUtilsTh.messageSuccess,
          statusCode: 200,
        },
        200,
      );
    } else {
      //กรณีไม่มี slot ว่าง
      throw new StatusException(
        {
          error: this.errMessageUtilsTh.errGetSlotVistiorNumberNotValue,
          result: null,
          message: this.errMessageUtilsTh.errGetSlotVistiorNumberNotValue,
          statusCode: 200,
        },
        200,
      );
    }
  }
}
