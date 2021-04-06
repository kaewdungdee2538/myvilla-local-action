import { Body, Injectable } from '@nestjs/common';
import { dbConnection } from 'src/pg_database/pg.database';
import { StatusException } from 'src/utils/callback.status';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';

@Injectable()
export class GetCartypeCategoryAllService {
    constructor(
        private readonly dbconnecttion: dbConnection
        , private readonly errMessageUtilsTh: ErrMessageUtilsTH
    ) { }

    async getCartypeCategoryAll(@Body() body){
        return this.getCartypeCategoryInfoAll(body);
    }

    async getCartypeCategoryInfoAll(@Body() body){
        const company_id = body.company_id;
        let sql = `select `
        sql += `mcc.cartype_id,cartype_name_contraction,cartype_name_th,cartype_name_en`
        sql += `,cartype_category_id,cartype_category_code`
        sql += `,cartype_category_name_contraction`
        sql += `,cartype_category_name_th,cartype_category_name_en`
        sql += `,cartype_category_info`
        sql += ` from m_cartype_category mcc inner join m_cartype mc on mcc.cartype_id = mc.cartype_id`;
        sql += ` where mcc.delete_flag ='N'`
        sql += ` and mcc.company_id = $1`
        sql += ` order by mcc.cartype_category_name_th;`
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
                    , message: this.errMessageUtilsTh.errGetCartypeCategoryFail
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
