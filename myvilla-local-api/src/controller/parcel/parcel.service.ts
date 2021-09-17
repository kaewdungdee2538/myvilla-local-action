import { Injectable } from '@nestjs/common';
import { dbConnection } from 'src/pg_database/pg.database';
import { StatusException } from 'src/utils/callback.status';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';

@Injectable()
export class ParcelService {
    constructor(
        private readonly errMessageUtilsTh: ErrMessageUtilsTH,
        private readonly dbconnecttion: dbConnection,
    ) { }
    async addParcelReceive(body: any, req: any, pathCustomer: any) {
        const employeeObj = req.user.employee;
        const image_parcel_receive = pathCustomer[0];
        const company_id = body.company_id;
        const tpi_title = body.tpi_title;
        const tpi_detail = body.tpi_detail;
        const receive_parcel_detail = body.receive_parcel_detail;
        const home_address = body.home_address;
        const employee_id = employeeObj.employee_id;
        const receive_parcel_data = {
            image_parcel_receive
        }

        let sql = `insert into t_parcel_info (
            tpi_code,tpi_datetime
            ,tpi_title,tpi_detail
            ,receive_parcel_datetime,receive_parcel_by
            ,receive_parcel_detail,receive_parcel_data
            ,home_id
            ,company_id
            ,tpi_status   
            ,create_by,create_date     
        ) values(
            fun_generate_uuid('TPI'||trim(to_char(${company_id},'000')),5),current_timestamp
            ,$1,$2
            ,current_timestamp,$3
            ,$4,$5
            ,(select home_id from m_home where home_address = $6 and company_id = $7 and delete_flag = 'N')
            ,$7
            ,'receive_parcel'
            ,$8,current_timestamp
        );`

        const query = {
            text: sql
            , values: [
                tpi_title, tpi_detail
                , employee_id
                , receive_parcel_detail, receive_parcel_data
                , home_address
                , company_id
                , employee_id
            ]
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
