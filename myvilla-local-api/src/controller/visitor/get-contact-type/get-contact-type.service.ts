import { Body, Injectable } from '@nestjs/common';
import { dbConnection } from 'src/pg_database/pg.database';
import { StatusException } from 'src/utils/callback.status';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';

@Injectable()
export class GetContactTypeService {
    constructor(
        private readonly dbconnecttion: dbConnection
        , private readonly errMessageUtilsTh: ErrMessageUtilsTH
    ) { }

    async getContactType(@Body() body){
        return await this.getContact(body);
    }
    async getContact(@Body() body){
        const site_id = body.site_id;
        let sql = `select contact_id,contact_code,contact_name_th,contact_name_en,contact_info from m_type_contact where site_id = $1;`
        const query = {
            text:sql
            ,values:[site_id]
        }
        const res = await this.dbconnecttion.getPgData(query);
        console.log(res);
        if(res.error)
        throw new StatusException(
            {
                error: res.error
                , result: null
                , message: this.errMessageUtilsTh.messageProcessFail
                , statusCode: 400
            }
            , 400)
    throw new StatusException(
        {
            error: null
            , result: res.result
            , message: this.errMessageUtilsTh.messageSuccess
            , statusCode: 200
        }
        , 200)
    }
}
