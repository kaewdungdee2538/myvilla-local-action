import { Body, Injectable, NestMiddleware } from "@nestjs/common";
import { dbConnection } from "src/pg_database/pg.database";

@Injectable()
export class VsActionInCheckEmployeeMiddleWare {
    constructor(
        private readonly dbconnecttion: dbConnection,
    ) { }
    async CheckInEmployee(body: any) {
        return await this.checkHaveInEmployee(body);
    }

    async CheckOutEmployee(body: any) {
        return await this.checkHaveOutEmployee(body);
    }

    async CheckCartypeCategoryInfo(body:any){
        return await this.checkCartypeCategory(body);
    }
    async checkHaveInEmployee(body: any) {
        const employee_in_id = body.employee_in_id
        const company_id = body.company_id
        let sql = `select employee_id,employee_code,prefix_name_th,first_name_th,last_name_th from m_employee where employee_id = $1 and company_id = $2`
        const query = {
            text: sql
            , values: [employee_in_id,company_id]
        }

        const result = await this.dbconnecttion.getPgData(query);
        if (result.error || result.result.length === 0) return null;
        else return result.result[0];
    }

    async checkHaveOutEmployee(body: any) {
        const employee_out_id = body.employee_out_id
        const company_id = body.company_id
        let sql = `select employee_id,employee_code,prefix_name_th,first_name_th,last_name_th from m_employee where employee_id = $1 and company_id = $2`
        const query = {
            text: sql
            , values: [employee_out_id,company_id]
        }

        const result = await this.dbconnecttion.getPgData(query);
        if (result.error || result.result.length === 0) return null;
        else return result.result[0];
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