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
        const company_id = body.company_id;
        let sql = `select setting_local_value from m_setting_local where delete_flag = 'N' and setting_local_param = 'price_of_cardloss' and company_id = $1;`
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
                    , statusCode: 400
                }
                , 400)
        throw new StatusException(
            {
                error: null
                , result: { price_of_cardloss: res.result[0].setting_local_value }
                , message: this.errMessageUtilsTh.messageSuccess
                , statusCode: 400
            }
            , 200)
    }
}
