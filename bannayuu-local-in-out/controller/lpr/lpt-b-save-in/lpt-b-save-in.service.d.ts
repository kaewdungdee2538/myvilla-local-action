import { dbConnection } from 'src/pg_database/pg.database';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';
export declare class LptBSaveInService {
    private readonly dbconnecttion;
    private readonly errMessageUtilsTh;
    constructor(dbconnecttion: dbConnection, errMessageUtilsTh: ErrMessageUtilsTH);
    saveBookingIn(body: any, files: any, homeObj: any, checkTBVCodeObj: any, getEmployeeID: any, getCartype: any): Promise<void>;
    getUuidFormPg(): Promise<any>;
}
