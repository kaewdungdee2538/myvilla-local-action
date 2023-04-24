import { Body, Injectable,HttpService } from '@nestjs/common';
import { dbConnection } from 'src/pg_database/pg.database';
import { StatusException } from 'src/utils/callback.status';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';
import { AxiosResponse } from "axios";
import {configfile} from 'src/conf/config-setting'

@Injectable()
export class BActionInService {
    constructor(
        private readonly dbconnecttion: dbConnection
        , private readonly errMessageUtilsTh: ErrMessageUtilsTH
        , private httpService: HttpService
    ) { }

    async saveBookingIn(@Body() body, files: any, homeObj: any, checkTBVCodeObj: any,getEmployeeID:any,getCartype:any) {
        const visitor_record_code = await this.getUuidFormPg();
        const tbv_code = checkTBVCodeObj.tbv_code;
        const cartype_id = getCartype.cartype_id;
        const cartype_name_contraction = getCartype.cartype_name_contraction;
        const cartype_name_th = getCartype.cartype_name_th;
        const cartype_name_en = getCartype.cartype_name_en;
        const visitor_info = body.visitor_info;
        const action_info = body.action_info;
        const images = files;
        const img_visitor_in = {
            images
        }
        const company_id = body.company_id;
        const guardhouse_in_id = body.guardhouse_in_id;
        const guardhouse_in_code = body.guardhouse_in_code;
        const license_plate = body.license_plate;
        const employee_in_id = body.employee_in_id;
        const employee_in_info = getEmployeeID;
        const home_id = homeObj.home_id;
        const home_info = {
            home_id: homeObj.home_id
            , home_code: homeObj.home_code
            , home_name: homeObj.home_name
            , home_address: homeObj.home_address
            , home_type: homeObj.home_type
            , home_data: homeObj.home_data
            , home_remark: homeObj.home_remark
            , home_privilege_line_amount: homeObj.home_privilege_line_amount
            , home_privilege_card_amount: homeObj.home_privilege_card_amount
        };
        const cartype_category_id = body.cartype_category_id;
        const cartype_category_info = body.cartype_category_info;

        let sql1 = `
        insert into t_visitor_record
        (
            visitor_record_code,tbv_code
            ,cartype_id,cartype_name_contraction,cartype_name_th,cartype_name_en
            ,cartype_category_id,cartype_category_info
            ,visitor_info,action_info
            ,home_id,home_info
            ,guardhouse_in_id,guardhouse_in_code
            ,parking_in_datetime
            ,license_plate
            ,img_visitor_in
            ,employee_in_id,employee_in_info
            ,company_id
            ,datetime_action,action_type
        ) values(
            $1,$2
            ,$3,$4,$5,$6
            ,$7,$8
            ,$9,$10
            ,$11,$12
            ,$13,$14
            ,now()
            ,$15
            ,$16
            ,$17,$18
            ,$19
            ,now(),'IN'
        );`
        const query1 = {
            text: sql1
            , values: [
                visitor_record_code, tbv_code
                , cartype_id, cartype_name_contraction, cartype_name_th, cartype_name_en
                , cartype_category_id, cartype_category_info
                , visitor_info, action_info
                , home_id, home_info
                , guardhouse_in_id, guardhouse_in_code
                , license_plate
                , img_visitor_in
                , employee_in_id, employee_in_info
                , company_id
            ]
        }

        let sql2 = `update t_booking_visitor set tbv_status ='Y' 
        ,update_by = $1 ,update_date = current_timestamp
        where company_id = $2 and tbv_code = $3;`
        const query2 = {
            text:sql2
            ,values:[employee_in_id,company_id,tbv_code]
        }

        const querys = [query1,query2];
        const res = await this.dbconnecttion.savePgData(querys);
        if (res.error) throw new StatusException(
            {
                error: res.error
                , result: null
                , message: this.errMessageUtilsTh.messageProcessFail
                , statusCode: 200
            }, 200)
        throw new StatusException(
            {
                error: null
                , result: this.errMessageUtilsTh.messageSuccess
                , message: this.errMessageUtilsTh.messageSuccess
                , statusCode: 200
            }, 200)
    }

    async getUuidFormPg() {
        const sql = `select fun_generate_uuid('VS',8) as _uuid;`
        const res = await this.dbconnecttion.getPgData(sql);
        if (res.error)
            return res.error;
        else if (res.result.length === 0)
            return null;
        else
            return res.result[0]._uuid;
    }

    async SendLineNotificationActionIn(notiObj: any): Promise<AxiosResponse> {
        const url = configfile.HOST_LINE_NOTIFICATION + configfile.PATH_LINE_ACTION_IN_NOTIFICATION
        return this.httpService.post(
            url
            , notiObj
        ).toPromise()
            .catch(err => {
                console.log(`เชื่อมต่อ api ${url} ล้มเหลว`);
                throw new StatusException({
                    error: this.errMessageUtilsTh.errConnectServerLineNotificationError
                    , result: null
                    , message: this.errMessageUtilsTh.errConnectServerLineNotificationError
                    , statusCode: 200
                }, 200)
            });
    }
}
