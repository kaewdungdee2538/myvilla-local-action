import { Body, Injectable } from '@nestjs/common';
import { dbConnection } from 'src/pg_database/pg.database';

@Injectable()
export class ActionInService {
    constructor(private readonly dbconnecttion: dbConnection){}

    async ActionSaveIn(@Body() body){
        // let sql = `select employee_id, employee_code,first_name_th,last_name_th,username,(passcode = crypt($2, passcode)) as password_status FROM m_employee me `;
        // sql += ` inner join m_employee_privilege mep on me.employee_privilege_id = mep.employee_privilege_id`;
        // sql += ` WHERE me.username = $1 and me.delete_flag = 'N' and mep.delete_flag ='N' and mep.login_general_status='Y';`;
        // const querys = {
        //     text: sql
        //     , values: [username, password]
        // }
        // const result = await this.dbconnecttion.savePgData(querys);
        // return result;
        return 'eiei';
    }
}
