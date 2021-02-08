import { Body, Injectable, NestMiddleware } from "@nestjs/common";
import { dbConnection } from "src/pg_database/pg.database";

@Injectable()
export class VsActionInCheckEmployeeMiddleWare {
    constructor(
        private readonly dbconnecttion: dbConnection,
    ) { }
    async CheckEmployee(body: any) {
        return await this.checkHaveEmployee(body);
    }

    async checkHaveEmployee(body: any) {
        const employee_in_id = body.employee_in_id
        let sql = `select * from m_employee where employee_id = $1`
        const query = {
            text: sql
            , values: [employee_in_id]
        }

        const result = await this.dbconnecttion.getPgData(query);
        if (result.error || result.result.length === 0) return null;
        else return true;
    }

}