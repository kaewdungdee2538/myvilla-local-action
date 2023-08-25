import { Body, Injectable, HttpService } from '@nestjs/common';
import { dbConnection } from 'src/pg_database/pg.database';
import { StatusException } from 'src/utils/callback.status';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';
import { AxiosResponse } from 'axios';
import { configfile } from 'src/conf/config-setting';

@Injectable()
export class ActionInService {
  constructor(
    private readonly dbconnecttion: dbConnection,
    private readonly errMessageUtilsTh: ErrMessageUtilsTH,
    private httpService: HttpService,
  ) {}

  async ActionSaveIn(
    files: any,
    @Body() body,
    visitor_slot_id: string,
    cardObj: any,
    getHomeID: any,
    getEmployeeID: any,
    getCartype: any,
  ) {
    console.log(getEmployeeID);
    const visitor_record_code = await this.getUuidFormPg();
    const visitor_slot_number = body.visitor_slot_number;
    const card_id = !cardObj ? 0 : cardObj.card_id;
    const card_code = !cardObj ? '' : cardObj.card_code;
    const card_name = !cardObj ? '' : cardObj.card_name;
    const cartype_id = getCartype.cartype_id;
    const cartype_name_contraction = getCartype.cartype_name_contraction;
    const cartype_name_th = getCartype.cartype_name_th;
    const cartype_name_en = getCartype.cartype_name_en;
    const visitor_info = body.visitor_info;
    const action_info = body.action_info;
    const images = files;
    const img_visitor_in = {
      images,
    };
    const company_id = body.company_id;
    const guardhouse_in_id = body.guardhouse_in_id;
    const guardhouse_in_code = body.guardhouse_in_code;
    const license_plate = body.license_plate;
    const employee_in_id = body.employee_in_id;
    const employee_in_info = getEmployeeID;
    const home_id = getHomeID.home_id;
    const home_info = {
      home_id: getHomeID.home_id,
      home_code: getHomeID.home_code,
      home_name: getHomeID.home_name,
      home_address: getHomeID.home_address,
      home_type: getHomeID.home_type,
      home_data: getHomeID.home_data,
      home_remark: getHomeID.home_remark,
      home_privilege_line_amount: getHomeID.home_privilege_line_amount,
      home_privilege_card_amount: getHomeID.home_privilege_card_amount,
    };
    const cartype_category_id = getCartype.cartype_category_id;
    const cartype_category_info = body.cartype_category_info;
    console.log(visitor_record_code);

    let sql1 = `insert into t_visitor_record(`;
    sql1 += 'visitor_slot_id';
    sql1 += ',card_code,card_name';
    sql1 +=
      ',cartype_id,cartype_name_contraction,cartype_name_th,cartype_name_en';
    sql1 += ',visitor_info';
    sql1 += ',action_info';
    sql1 += ',img_visitor_in';
    sql1 += ',action_type';
    sql1 += ',company_id';
    sql1 += ',guardhouse_in_id,guardhouse_in_code';
    sql1 += ',datetime_action';
    sql1 += ',parking_in_datetime';
    sql1 += ',license_plate';
    sql1 += ',visitor_slot_number';
    sql1 += ',employee_in_id';
    sql1 += ',employee_in_info';
    sql1 += ',home_id,home_info';
    sql1 += ',card_id';
    sql1 += ',cartype_category_id,cartype_category_info';
    sql1 += ',visitor_record_code';
    sql1 += ') values(';
    sql1 += `$1`;
    sql1 += `,$2,$3`;
    sql1 += `,$4,$5,$6,$7`;
    sql1 += `,$8`;
    sql1 += `,$9`;
    sql1 += `,$10`;
    (sql1 += `,'IN'`), (sql1 += `,$11`);
    sql1 += `,$12,$13`;
    sql1 += ',now(),now()';
    sql1 += `,$14`;
    sql1 += `,$15`;
    sql1 += `,$16`;
    sql1 += `,$17`;
    sql1 += `,$18,$19`;
    sql1 += `,$20`;
    sql1 += `,$21,$22`;
    sql1 += `,$23`;
    sql1 += ');';
    const query1 = {
      text: sql1,
      values: [
        visitor_slot_id,
        card_code,
        card_name,
        cartype_id,
        cartype_name_contraction,
        cartype_name_th,
        cartype_name_en,
        visitor_info,
        action_info,
        img_visitor_in,
        company_id,
        guardhouse_in_id,
        guardhouse_in_code,
        license_plate,
        visitor_slot_number,
        employee_in_id,
        employee_in_info,
        home_id,
        home_info,
        card_id,
        cartype_category_id,
        cartype_category_info,
        visitor_record_code,
      ],
    };
    let query2;
    if (visitor_slot_id) {
      let sql2 = `update m_visitor_slot set status_flag = 'Y'`;
      sql2 += ',update_by = $1,update_date = now()';
      // sql2 += ',visitor_record_id = (select max(visitor_record_id) from t_visitor_record)'
      sql2 += `,visitor_record_code = $2`;
      sql2 += ` where visitor_slot_id = $3`;
      query2 = {
        text: sql2,
        values: [employee_in_id, visitor_record_code, visitor_slot_id],
      };
    } else {
      let sql = `update m_card set status_flag = 'Y'`;
      sql += ',update_by = $1,update_date = now()';
      // sql += ',visitor_record_id = (select max(visitor_record_id) from t_visitor_record)'
      sql += `,visitor_record_code = $2`;
      sql += ' where card_id = $3';
      query2 = {
        text: sql,
        values: [employee_in_id, visitor_record_code, card_id],
      };
    }

    const querys = [query1, query2];
    const result = await this.dbconnecttion.savePgData(querys);
    if (result.error) {
      throw new StatusException(
        {
          error: result.error,
          result: null,
          message: this.errMessageUtilsTh.messageProcessFail,
          statusCode: 200,
        },
        200,
      );
    } else {
      throw new StatusException(
        {
          error: null,
          result: { visitor_record_code },
          message: this.errMessageUtilsTh.messageSuccess,
          statusCode: 200,
        },
        200,
      );
    }
  }

  async getUuidFormPg() {
    const sql = `select fun_generate_uuid('VS',8) as _uuid;`;
    const res = await this.dbconnecttion.getPgData(sql);
    if (res.error) return res.error;
    else if (res.result.length === 0) return null;
    else return res.result[0]._uuid;
  }

  async getVisitorSlotID(@Body() body) {
    const visitor_slot_number = body.visitor_slot_number;
    const company_id = body.company_id;
    const guardhouse_in_id = body.guardhouse_in_id;
    let sql = `select visitor_slot_id,visitor_slot_number `;
    sql += ',visitor_slot_code,visitor_slot_name';
    sql += ' from m_visitor_slot';
    sql += ` where visitor_slot_number = $1`;
    sql += ` and company_id = $2 `;
    // and guardhouse_id =$3;`;
    const quesy = {
      text: sql,
      values: [
        visitor_slot_number,
        company_id,
        // , guardhouse_in_id
      ],
    };
    const result = await this.dbconnecttion.getPgData(quesy);
    if (result.error) return result.error;
    else if (result.result.length === 0) return null;
    else return result.result;
  }

  async getCardID(@Body() body) {
    const company_id = body.company_id;
    const card_code = body.card_code;
    const card_name = body.card_name;
    let sql = `select card_id,card_code,card_name`;
    sql += ` from m_card`;
    sql += ` where delete_flag = 'N' and status_flag = 'N' and cardproblem_flag = 'N'`;
    sql += ` and company_id = $1`;
    sql += ` and (card_code = $2 or card_name = $3);`;
    const query = {
      text: sql,
      values: [company_id, card_code, card_name],
    };
    const res = await this.dbconnecttion.getPgData(query);
    if (res.error) return res.error;
    else if (res.result.length === 0) return null;
    else return res.result[0];
  }

  async SendLineNotificationActionIn(
    notiObj: any,
    lineNotificationMode: string,
  ): Promise<AxiosResponse> {
    const url_for_pay =
      configfile.HOST_LINE_NOTIFICATION +
      configfile.PATH_LINE_ACTION_IN_NOTIFICATION;
    const url_for_boardcast =
      configfile.HOST_LINE_NOTIFICATION_BOARDCAST +
      configfile.PATH_LINE_ACTION_IN_NOTIFICATION_BOARDCAST;
    const url =
      lineNotificationMode && lineNotificationMode.toLowerCase() === 'broadcast'
        ? url_for_boardcast
        : url_for_pay;
    console.log('url notify', url);
    return this.httpService
      .post(url, notiObj)
      .toPromise()
      .then((data) => {
        data;
      })
      .catch((err) => {
        console.log(`เชื่อมต่อ api ${url} ล้มเหลว Error : ${err}`);
        return null;
        // throw new StatusException({
        //     error: this.errMessageUtilsTh.errConnectServerLineNotificationError
        //     , result: null
        //     , message: this.errMessageUtilsTh.errConnectServerLineNotificationError
        //     , statusCode: 200
        // }, 200)
      });
  }
}
