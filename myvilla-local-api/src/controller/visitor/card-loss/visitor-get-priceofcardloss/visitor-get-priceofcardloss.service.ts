import { Body, Injectable } from '@nestjs/common';
import { dbConnection } from 'src/pg_database/pg.database';
import { StatusException } from 'src/utils/callback.status';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';

@Injectable()
export class VisitorGetPriceofcardlossService {
    constructor(
        private readonly dbconnecttion: dbConnection
        , private readonly errMessageUtilsTh: ErrMessageUtilsTH
    ) { }

    async getPriceOfCardLoss(@Body() body) {
        return this.getPriceCardloss(body);
    }

    async getPriceCardloss(@Body() body) {
        const site_id = body.site_id;
        let sql = `select setting_value from m_setting where delete_flag = 'N' and site_id = $1;`
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
                , 400)
        throw new StatusException(
            {
                error: null
                , result: { price_of_cardloss: res.result[0].setting_value }
                , message: this.errMessageUtilsTh.messageSuccess
                , statusCode: 400
            }
            , 200)
    }
}
