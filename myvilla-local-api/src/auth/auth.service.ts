import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { vsDefaultMiddleware } from 'src/middleware/default/default.middleware';
import { dbConnection } from 'src/pg_database/pg.database';
import { StatusException } from 'src/utils/callback.status';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';

@Injectable()
export class AuthService {
    constructor(
        private readonly errMessageUtilsTh: ErrMessageUtilsTH,
        private readonly jwtService: JwtService,
        private readonly dbconnecttion: dbConnection,
        private readonly defaultValueMiddleware: vsDefaultMiddleware) { }

    async validateUser(user: any): Promise<any> {
        console.log(user.username + user.password)
        let sql = `SELECT employee_id, employee_code,first_name_th,last_name_th,username,(passcode = crypt($2, passcode)) as password_status 
        ,me.company_id
        ,mc.company_start_date as start_date
        ,mc.company_expire_date as expire_date
		,setup_data AS config
        FROM m_employee me
        INNER JOIN m_employee_privilege mep on me.employee_privilege_id = mep.employee_privilege_id
        LEFT JOIN m_company mc
        ON me.company_id = mc.company_id
		LEFT JOIN m_setup ms ON me.company_id = ms.company_id
        WHERE me.username = $1 
         AND me.delete_flag = 'N' 
         AND mep.delete_flag ='N' 
         AND mep.login_general_status='Y' 
		 AND ref_setup_id = 8
         AND me.company_id = $3
		 ;`;
        const querys = {
            text: sql
            , values: [user.username, user.password, user.company_id]
        }
        const result = await this.dbconnecttion.getPgData(querys);
        return result;
    }
    async login(user: any) {
        const response = await this.validateUser(user);
        console.log(response);
        console.log(await response.result.length);
        if (await response.error) {
            throw new StatusException({
                error: this.errMessageUtilsTh.errLoginFail,
                result: null,
                message: this.errMessageUtilsTh.errLoginFail,
                statusCode: 200
            }, 200);
        } else if (await response.result.length === 0) {
            throw new StatusException({
                error: this.errMessageUtilsTh.errLoginUserOrPasswordNotValid,
                result: null,
                message: this.errMessageUtilsTh.errLoginUserOrPasswordNotValid,
                statusCode: 200
            }, 200);
        } else if (await response.result[0].password_status) {
            //Check Company
            const checkCompant = await this.defaultValueMiddleware.CheckCompanyInBase({ company_id: response.result[0].company_id })
            if (checkCompant) throw new StatusException({
                error: checkCompant,
                result: null,
                message: checkCompant,
                statusCode: 200
            }, 200);
            //-----if can use company and login set payload to jwt data token
            const payload = { employee: response.result[0] };
            console.log(payload);
            const access_token = this.jwtService.sign(
                payload, { expiresIn: '30 days' })
            console.log('login : ' + JSON.stringify(payload) + 'access_token : ' + access_token);
            throw new StatusException({
                error: null,
                result: {
                    access_token
                    , employee: {
                        employee_id:response.result[0]?.employee_id,
                        employee_code:response.result[0]?.employee_code,
                        first_name_th:response.result[0]?.first_name_th,
                        last_name_th:response.result[0]?.last_name_th,
                        username:response.result[0]?.username,
                        password_status:response.result[0]?.password_status,
                        company_id:response.result[0]?.company_id,
                        start_date:response.result[0]?.start_date,
                        expire_date:response.result[0]?.expire_date,
                    },config:{
                        ...response.result[0]?.config
                    }
                },
                message: this.errMessageUtilsTh.messageSuccess,
                statusCode: 200
            }, 200);
        } else {
            throw new StatusException({
                error: this.errMessageUtilsTh.errLoginUserOrPasswordNotValid,
                result: null,
                message: this.errMessageUtilsTh.errLoginUserOrPasswordNotValid,
                statusCode: 200
            }, 200);
        }
    }
}
