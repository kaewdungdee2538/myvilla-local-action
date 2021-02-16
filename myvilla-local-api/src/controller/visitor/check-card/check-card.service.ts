import { Body, Injectable } from '@nestjs/common';
import { dbConnection } from 'src/pg_database/pg.database';
import { StatusException } from 'src/utils/callback.status';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';

@Injectable()
export class CheckCardService {
    constructor(
        private readonly dbconnecttion: dbConnection
        , private readonly errMessageUtilsTh: ErrMessageUtilsTH
    ) { }

    async checkCardVisitor(@Body() body) {
        return this.getCardVisitor(body);
    }

    async getCardVisitor(@Body() body) {
        const site_id = body.site_id;
        const card_id = !body.card_id ? '' : body.card_id;
        const card_name = !body.card_name ? '' : body.card_name;
        let sql = `select card_id,card_code,card_name,visitor_record_uuid`
        sql += ` from m_card`
        sql += ` where site_id = $1`
        sql += ` and (card_code = $2 or card_name = $3) limit 1;`
        const query = {
            text: sql
            , values: [site_id, card_id, card_name]
        }
        const res = await this.dbconnecttion.getPgData(query);
        if (res.error) throw new StatusException(
            {
                error: res.error
                , result: null
                , message: this.errMessageUtilsTh.messageProcessFail
                , statusCode: 400
            }, 400)
        else if (res.result.length === 0) throw new StatusException(
            {
                error: this.errMessageUtilsTh.errGetCardNotInDatabase
                , result: null
                , message: this.errMessageUtilsTh.errGetCardNotInDatabase
                , statusCode: 400
            }, 400)
        throw new StatusException(
            {
                error: null
                , result: res.result[0]
                , message: this.errMessageUtilsTh.messageSuccess
                , statusCode: 200
            }, 200)
    }
}
