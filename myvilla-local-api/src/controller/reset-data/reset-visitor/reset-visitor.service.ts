import { Injectable } from '@nestjs/common';
import { dbConnection } from 'src/pg_database/pg.database';
import { StatusException } from 'src/utils/callback.status';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';

@Injectable()
export class ResetVisitorService {
    constructor(
        private readonly dbconnecttion: dbConnection
        , private readonly errMessageUtilsTh: ErrMessageUtilsTH
    ) { }
    async resetVisitorData() {
        let sql = `delete from t_visitor_record;`
        sql += `alter sequence seq_t_visitor_record restart with 1;`
        sql += `update m_visitor_slot set visitor_record_id = null,visitor_record_code = null,status_flag = 'N';`
        sql += `update m_card set visitor_record_id = null,visitor_record_code = null,status_flag = 'N',delete_flag = 'N',cardproblem_flag = 'N';`

        const res = await this.dbconnecttion.savePgData([sql]);
        if (res.error)
            throw new StatusException(
                {
                    error: res.error
                    , result: null
                    , message: this.errMessageUtilsTh.messageProcessFail
                    , statusCode: 400
                }, 400)
        throw new StatusException(
            {
                error: null
                , result: this.errMessageUtilsTh.messageSuccess
                , message: this.errMessageUtilsTh.messageSuccess
                , statusCode: 400
            }, 400)
    }
}
