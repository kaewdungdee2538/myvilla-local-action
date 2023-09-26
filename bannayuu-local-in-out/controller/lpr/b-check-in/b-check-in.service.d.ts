import { dbConnection } from 'src/pg_database/pg.database';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';
export declare class LPRBCheckInService {
    private readonly dbconnecttion;
    private readonly errMessageUtilsTh;
    constructor(dbconnecttion: dbConnection, errMessageUtilsTh: ErrMessageUtilsTH);
    getBookingWithLPR(body: any): Promise<void>;
    getBookingInfoWithLPR(body: any): Promise<void>;
}
