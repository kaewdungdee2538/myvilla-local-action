import { dbConnection } from 'src/pg_database/pg.database';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';
export declare class GetVisitorOutHistoryService {
    private readonly dbconnecttion;
    private readonly errMessageUtilsTh;
    constructor(dbconnecttion: dbConnection, errMessageUtilsTh: ErrMessageUtilsTH);
    getVisitorOutHistory(body: any): Promise<void>;
    getVisitorOutHistoryFormBase(body: any): Promise<void>;
}
