import { Body, Injectable } from '@nestjs/common';
import { dbConnection } from 'src/pg_database/pg.database';
import { StatusException } from 'src/utils/callback.status';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';

@Injectable()
export class GetHomeService {
    constructor(
        private readonly dbconnecttion: dbConnection
        , private readonly errMessageUtilsTh: ErrMessageUtilsTH
    ) { }

    async getHomeInfo(@Body() body) {
        return await this.getHomeInfoFomrBase(body);
    }

    async getHomeInfoFomrBase(@Body() body) {
        const company_id = body.company_id;
        let sql = `select home_id,home_code,home_name
        ,home_address
        ,home_type,home_data,home_remark
        ,home_privilege_line_amount
        ,home_privilege_card_amount
        from m_home where delete_flag ='N'
        and company_id = $1 order by home_address;`
        const query = {
            text: sql
            , values: [company_id]
        }
        const res = await this.dbconnecttion.getPgData(query);
        if (res.error)
            throw new StatusException(
                {
                    error: res.error
                    , result: null
                    , message: this.errMessageUtilsTh.errHomeGetFail
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
}
