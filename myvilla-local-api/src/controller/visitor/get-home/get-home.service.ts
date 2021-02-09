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
        const site_id = body.site_id;
        let sql = `select home_id,home_number,home_info from m_home where delete_flag ='N'`
        sql += ` and site_id = $1 order by home_number;`
        const query = {
            text: sql
            , values: [site_id]
        }
        const res = await this.dbconnecttion.getPgData(query);
        if (res.error)
            throw new StatusException(
                {
                    error: res.error
                    , result: null
                    , message: this.errMessageUtilsTh.errHomeGetFail
                    , statusCode: 400
                }
                , 400
            )
        throw new StatusException(
            {
                error: null
                , result: res.result
                , message: this.errMessageUtilsTh.messageSuccess
                , statusCode: 400
            }
            , 200
        )
    }
}
