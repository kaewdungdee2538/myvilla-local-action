import { Injectable } from '@nestjs/common';
import { dbConnection } from 'src/pg_database/pg.database';
import { StatusException } from 'src/utils/callback.status';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';

@Injectable()
export class SosService {
    constructor(
        private readonly dbconnecttion: dbConnection
        , private readonly errMessageUtilsTh: ErrMessageUtilsTH
    ) { }
    async getSosAllByCompany(body:any){
        const company_id = body.company_id;

        let sql = `select sos_id,sos_code
        ,to_char(sos_datetime,'DD/MM/YYYY HH24:MI:SS') as sos_datetime
        ,ref_sos_id,hsi.home_id,mh.home_address,home_line_uuid
        ,sos_header_text,sos_detail_text
        ,sos_data,sos_picture_data
        ,sos_remark
        ,sos_status
        from h_sos_info hsi
        left join m_home mh on hsi.home_id = mh.home_id
        where hsi.delete_flag = 'N'
        and sos_status in ('N')
        and hsi.company_id = $1
        order by sos_datetime desc
        ;`
        const query = {
            text: sql
            , values: [company_id]
        }
        const res = await this.dbconnecttion.getPgData(query);
        if (await res.error)
            throw new StatusException(
                {
                    error: res.error
                    , result: null
                    , message: this.errMessageUtilsTh.messageProcessFail
                    , statusCode: 200
                }
                , 200
            )
        throw new StatusException(
            {
                error: null
                , result: res.result
                , message: this.errMessageUtilsTh.messageSuccess
                , statusCode: 200
            }
            , 200
        )
    }


    async getSosHistoryByCompany(body:any){
        const datetime_start = body.datetime_start;
        const datetime_end = body.datetime_end;
        const company_id = body.company_id;

        let sql = `select sos_id,sos_code
        ,to_char(sos_datetime,'DD/MM/YYYY HH24:MI:SS') as sos_datetime
        ,ref_sos_id,hsi.home_id,mh.home_address,home_line_uuid
        ,sos_header_text,sos_detail_text
        ,sos_data,sos_picture_data
        ,sos_remark
        ,sos_status
        from h_sos_info hsi
        left join m_home mh on hsi.home_id = mh.home_id
        where hsi.delete_flag = 'N'
        and sos_datetime between $1 and $2
        and hsi.company_id = $3
        ;`
        const query = {
            text: sql
            , values: [datetime_start,datetime_end,company_id]
        }
        const res = await this.dbconnecttion.getPgData(query);
        if (await res.error)
            throw new StatusException(
                {
                    error: res.error
                    , result: null
                    , message: this.errMessageUtilsTh.messageProcessFail
                    , statusCode: 200
                }
                , 200
            )
        throw new StatusException(
            {
                error: null
                , result: res.result
                , message: this.errMessageUtilsTh.messageSuccess
                , statusCode: 200
            }
            , 200
        )
    }

    async getSosInfoById(body: any) {
        const company_id = body.company_id;
        const sos_id = body.sos_id;
        let sql = `select sos_id,sos_code
        ,to_char(sos_datetime,'DD/MM/YYYY HH24:MI:SS') as sos_datetime
        ,ref_sos_id,hsi.home_id,mh.home_address,home_line_uuid
        ,sos_header_text,sos_detail_text
        ,sos_data,sos_picture_data
        ,sos_remark
        ,sos_status
        ,company_name
        from h_sos_info hsi
        left join m_home mh on hsi.home_id = mh.home_id
        left join m_company mc on hsi.company_id = mc.company_id
        where hsi.delete_flag = 'N'

        and hsi.company_id = $1
        and hsi.sos_id = $2
        order by mh.home_address,sos_datetime;`

        const query = {
            text: sql
            , values: [
                company_id
                , sos_id
            ]
        }
        const res = await this.dbconnecttion.getPgData(query);
        if (res.error) {
            console.log(res.error)
            throw new StatusException({
                error: res.error,
                result: null,
                message: this.errMessageUtilsTh.messageProcessFail,
                statusCode: 200
            }, 200);
        } else throw new StatusException({
            error: null,
            result: res.result[0],
            message: this.errMessageUtilsTh.messageSuccess,
            statusCode: 200
        }, 200);
    }

    async saveCorporateReceive(body:any){
        const employee_id = body.employee_id;
        const company_id = body.company_id;
        const sos_remark = body.sos_remark;
        const sos_id = body.sos_id;

        let sql = `update h_sos_info set
        sos_status = 'Y'
        ,sos_remark = $1
        ,update_by = $2,update_date = current_timestamp
        where company_id = $3 and sos_id = $4;`

        const query = {
            text:sql
            ,values:[sos_remark,employee_id,company_id,sos_id]
        }
        const res = await this.dbconnecttion.savePgData([query]);
        if (res.error) {
            console.log(res.error)
            throw new StatusException({
                error: res.error,
                result: null,
                message: this.errMessageUtilsTh.messageProcessFail,
                statusCode: 200
            }, 200);
        } else throw new StatusException({
            error: null,
            result: this.errMessageUtilsTh.messageSuccessEn,
            message: this.errMessageUtilsTh.messageSuccess,
            statusCode: 200
        }, 200);
    }
}
