import { dbConnection } from 'src/pg_database/pg.database';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';
export declare class VisitorGetPriceofcardlossService {
    private readonly dbconnecttion;
    private readonly errMessageUtilsTh;
    constructor(dbconnecttion: dbConnection, errMessageUtilsTh: ErrMessageUtilsTH);
    getPriceOfCardLoss(body: any): Promise<void>;
    getPriceCardloss(body: any): Promise<void>;
}
