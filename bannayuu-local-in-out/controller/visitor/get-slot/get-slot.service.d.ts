import { dbConnection } from 'src/pg_database/pg.database';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';
export declare class GetSlotService {
    private readonly dbconnecttion;
    private readonly errMessageUtilsTh;
    constructor(dbconnecttion: dbConnection, errMessageUtilsTh: ErrMessageUtilsTH);
    getSlotNotUse(body: any): Promise<void>;
    getSlotNotUseAll(body: any): Promise<void>;
    getSlotNotUseById(body: any): Promise<void>;
    returnService(result: any): Promise<void>;
}
