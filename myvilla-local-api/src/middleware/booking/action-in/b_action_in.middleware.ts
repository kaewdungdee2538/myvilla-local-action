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
        current_timestamp <= tbv_end_datetime
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

    async getHomeIDFromTbvCode(body:any){
        const company_id = body.company_id;
        const tbv_code = body.tbv_code;
        
        let sql = `select home_id 
        from 
        t_booking_visitor tbv
		left join
		m_home_line mh on tbv.home_line_id = mh.home_line_id
        where current_timestamp <= tbv_end_datetime
        and tbv.company_id = $1
        and tbv_code = $2
        and tbv_status = 'N'
        and tbv.delete_flag = 'N'
        limit 1
        ;`
        const query ={
            text:sql
            ,values:[company_id,tbv_code]
        }
        const res = await this.dbconnecttion.getPgData(query);
        console.log(res);
        if(res.error){
            console.log(res.error);
            return null;
        }else if(res.result.length === 0){
            console.log('m_home_line Not home id');
            return null;
        }
        return res.result[0].home_id;  
    }

    async checkCartypeCategory(body:any){
        const company_id = body.company_id;
        const cartype_category_id = body.cartype_category_id;
        let sql = `select `
        sql += `mcc.cartype_id,cartype_name_contraction,cartype_name_th,cartype_name_en`
        sql += `,cartype_category_id,cartype_category_code`
        sql += `,cartype_category_name_contraction`
        sql += `,cartype_category_name_th,cartype_category_name_en`
        sql += `,cartype_category_info`
        sql += ` from m_cartype_category mcc inner join m_cartype mc on mcc.cartype_id = mc.cartype_id`;
        sql += ` where mcc.delete_flag ='N'`
        sql += ` and mcc.company_id = $1`
        sql += ` and mcc.cartype_category_id = $2`
        sql += ` order by mcc.cartype_category_name_th;`
        const query = {
            text: sql
            , values: [company_id,cartype_category_id]
        }
        console.log(JSON.stringify(query))
        const result = await this.dbconnecttion.getPgData(query);
        if (result.error || result.result.length === 0) return null;
        else return result.result[0];
    }
}