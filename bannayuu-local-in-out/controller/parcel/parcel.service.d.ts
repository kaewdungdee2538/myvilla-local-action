import { dbConnection } from 'src/pg_database/pg.database';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';
export declare class ParcelService {
    private readonly errMessageUtilsTh;
    private readonly dbconnecttion;
    constructor(errMessageUtilsTh: ErrMessageUtilsTH, dbconnecttion: dbConnection);
    addParcelReceive(body: any, req: any, pathCustomer: any): Promise<void>;
}
