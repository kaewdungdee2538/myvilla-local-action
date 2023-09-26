import { dbConnection } from 'src/pg_database/pg.database';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';
export declare class VsEstampService {
    private readonly dbconnecttion;
    private readonly errMessageUtilsTh;
    constructor(dbconnecttion: dbConnection, errMessageUtilsTh: ErrMessageUtilsTH);
    getVisitorInfo(body: any): Promise<void>;
    saveEstampVisitor(body: any, pathCustomer: any, estampInfo: any): Promise<void>;
    getEstampInfo(body: any): Promise<any>;
}
