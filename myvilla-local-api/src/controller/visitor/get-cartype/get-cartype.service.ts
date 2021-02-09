import { Body, Injectable } from '@nestjs/common';
import { dbConnection } from 'src/pg_database/pg.database';
import { StatusException } from 'src/utils/callback.status';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';

@Injectable()
export class GetCartypeService {
    constructor(
        private readonly dbconnecttion: dbConnection
        , private readonly errMessageUtilsTh: ErrMessageUtilsTH
    ) { }
    async getCartype(@Body() body) {
        return await this.getCartypeInfo(body);
    }

    async getCartypeInfo(@Body() body) {
        const site_id = body.site_id;
        let sql = `select cartype_id,cartype_code,cartype_name_contraction`
        sql += `,cartype_name_th,cartype_name_en,cartype_info `
        sql += ` from m_cartype where delete_flag = 'N'`
        sql += ` and site_id = $1 order by 1;`

        const query = {
            text: sql
            , values: [site_id]
        }
        const res = await this.dbconnecttion.getPgData(query);
        if (await res.error)
            throw new StatusException(
                {
                    error: res.error
                    , result: null
                    , message: this.errMessageUtilsTh.errGetCarTypeFail
                    , statusCode: 400
                }
                , 400
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
