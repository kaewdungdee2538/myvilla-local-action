import { dbConnection } from 'src/pg_database/pg.database';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';
export declare class BActionOutService {
    private readonly dbconnecttion;
    private readonly errMessageUtilsTh;
    constructor(dbconnecttion: dbConnection, errMessageUtilsTh: ErrMessageUtilsTH);
    saveBActionOut(body: any, files: any, employeeObj: any): Promise<void>;
    saveOut(body: any, files: any, employeeObj: any): Promise<void>;
}
