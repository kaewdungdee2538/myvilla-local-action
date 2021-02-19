import { Body, Injectable } from '@nestjs/common';
import { dbConnection } from 'src/pg_database/pg.database';
import { StatusException } from 'src/utils/callback.status';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';

@Injectable()
export class BActionOutService {
    constructor(
        private readonly dbconnecttion: dbConnection
        , private readonly errMessageUtilsTh: ErrMessageUtilsTH
    ) { }

    async saveBActionOut(@Body() body, files: any, employeeObj: any) {
        return this.saveOut(body, files,employeeObj);
    }

    async saveOut(@Body() body, files: any,employeeObj: any) {
        const images = files;
        const img_visitor_out = { images }
        const guardhouse_out_id = body.guardhouse_out_id
        const guardhouse_out_code = body.guardhouse_out_code
        const pos_id = body.pos_id
        const company_id = body.company_id
        const tbv_code = body.tbv_code
        const employee_out_id = body.employee_out_id
        const employee_out_info = employeeObj
        // const visitor_record_id = body.visitor_record_id

        let sql1 = `update t_visitor_record set 
        img_visitor_out = $1
        ,action_out_flag = 'Y'
        ,action_type = 'OUT'
        ,guardhouse_out_id = $2
        ,guardhouse_out_code = $3
        ,parking_out_datetime = now()
        ,datetime_action = now()
        ,pos_id = $4
        ,employee_out_id = $5,employee_out_info = $6
         where company_id = $7 and tbv_code = $8 ;`

        const query1 = {
            text: sql1
            , values: [img_visitor_out, guardhouse_out_id, guardhouse_out_code, pos_id,employee_out_id,employee_out_info, company_id, tbv_code]
        }
        const querys = [query1]
        const res = await this.dbconnecttion.savePgData(querys)
        console.log(querys);
        if (res.error) throw new StatusException(
            {
                error: res.error
                , result: null
                , message: this.errMessageUtilsTh.messageProcessFail
                , statusCode: 400
            }, 400)
        else throw new StatusException(
            {
                error: null
                , result: this.errMessageUtilsTh.messageSuccess
                , message: this.errMessageUtilsTh.messageSuccess
                , statusCode: 200
            }, 200)

    }
}
