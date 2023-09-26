import { dbConnection } from 'src/pg_database/pg.database';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';
export declare class GetSlipService {
    private readonly dbconnecttion;
    private readonly errMessageUtilsTh;
    constructor(dbconnecttion: dbConnection, errMessageUtilsTh: ErrMessageUtilsTH);
    getSlipInInfo(body: any): Promise<void>;
    getSlipInInfoFormBase(body: any): Promise<void>;
    getSlipOutInfo(body: any): Promise<void>;
    getSlipOutInfoFormBase(body: any): Promise<void>;
}
