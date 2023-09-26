import { dbConnection } from 'src/pg_database/pg.database';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';
export declare class VisitorPendantService {
    private readonly dbconnecttion;
    private readonly errMessageUtilsTh;
    constructor(dbconnecttion: dbConnection, errMessageUtilsTh: ErrMessageUtilsTH);
    getVisitorPendantAll(body: any): Promise<void>;
    getVisitorPendantAllFromDatabase(body: any): Promise<void>;
}
