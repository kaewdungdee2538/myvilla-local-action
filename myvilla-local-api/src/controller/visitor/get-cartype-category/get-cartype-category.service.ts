import { Body, Injectable } from '@nestjs/common';
import { dbConnection } from 'src/pg_database/pg.database';
import { StatusException } from 'src/utils/callback.status';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';

@Injectable()
export class GetCartypeCategoryService {
    constructor(
        private readonly dbconnecttion: dbConnection
        , private readonly errMessageUtilsTh: ErrMessageUtilsTH
    ) { }
    async getCartypeCategory(@Body() body){
        return this.getCartypeCategoryInfo(body);
    }

    async getCartypeCategoryInfo(@Body() body){
        const site_id = body.site_id;
        const cartype_id = body.cartype_id;
        let sql = `select cartype_category_id,cartype_category_code`
        sql += `,cartype_category_name_contraction`
        sql += `,cartype_category_name_th,cartype_category_name_en`
        sql += `,cartype_category_info,cartype_id`
        sql += ` from m_cartype_category`;
        sql += ` where delete_flag ='N'`
        sql += ` and site_id = $1 and cartype_id = $2`
        sql += ` order by 1;`
        const query = {
            text: sql
            , values: [site_id,cartype_id]
        }
        const res = await this.dbconnecttion.getPgData(query);
        if (res.error)
            throw new StatusException(
                {
                    error: res.error
                    , result: null
                    , message: this.errMessageUtilsTh.errGetCartypeCategoryFail
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
