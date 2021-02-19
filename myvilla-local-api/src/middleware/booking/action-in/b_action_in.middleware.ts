import { Injectable } from "@nestjs/common";
import { dbConnection } from "src/pg_database/pg.database";
import { ErrMessageUtilsTH } from "src/utils/err_message_th.utils";
import { FormatDataUtils } from "src/utils/format_data.utils";

@Injectable()
export class BActionInMiddleware {
    constructor(
        private readonly formatUtils: FormatDataUtils,
        private readonly errMessageUtilsTh: ErrMessageUtilsTH,
        private readonly dbconnecttion: dbConnection
    ) { }

    async CheckSaveIn(body: any) {
        return await this.checkValuesActionIn(body)
    }

    async checkValuesActionIn(body:any){
        if(!body.tbv_code)
            return this.errMessageUtilsTh.errฺBookingTbvCodeNotFound
        else if(this.formatUtils.HaveSpecialFormat(body.tbv_code))
            return this.errMessageUtilsTh.errฺBookingTbvCodeProhibitSpecial
        return null;
    }

    async checkTbvCode(body:any){
        const company_id = body.company_id;
        const tbv_code = body.tbv_code;
        
        let sql = `select * 
        from 
        t_booking_visitor
        where 
        now()::timestamp between tbv_start_datetime and tbv_end_datetime
        and company_id = $1
        and tbv_code = $2
        and tbv_status = 'N'
        and delete_flag = 'N'
        limit 1
        ;`
        const query ={
            text:sql
            ,values:[company_id,tbv_code]
        }
        const res = await this.dbconnecttion.getPgData(query);
        if(res.error){
            console.log(res.error);
            return null;
        }else if(res.result.length === 0){
            console.log('Booking No data');
            return null;
        }
        return res.result[0];
            
    }
}