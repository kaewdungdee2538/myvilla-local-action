import { dbConnection } from 'src/pg_database/pg.database';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';
export declare class SosService {
    private readonly dbconnecttion;
    private readonly errMessageUtilsTh;
    constructor(dbconnecttion: dbConnection, errMessageUtilsTh: ErrMessageUtilsTH);
    getSosAllByCompany(body: any): Promise<void>;
    getSosHistoryByCompany(body: any): Promise<void>;
    getSosInfoById(body: any): Promise<void>;
    saveCorporateReceive(body: any): Promise<void>;
}
