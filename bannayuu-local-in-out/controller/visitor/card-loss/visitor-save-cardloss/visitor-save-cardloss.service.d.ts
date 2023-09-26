import { dbConnection } from 'src/pg_database/pg.database';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';
export declare class VisitorSaveCardlossService {
    private readonly dbconnecttion;
    private readonly errMessageUtilsTh;
    constructor(dbconnecttion: dbConnection, errMessageUtilsTh: ErrMessageUtilsTH);
    saveCardloss(body: any, files: any, employeeObj: any): Promise<void>;
    saveCardlossNotOut(body: any, files: any, employeeObj: any): Promise<void>;
    saveSlotAndOut(body: any, files: any, slotObj: any, employeeObj: any): Promise<void>;
    saveCardAndOut(body: any, files: any, cardObj: any, employeeObj: any): Promise<void>;
    checkSlotOrCardIsLoss(body: any): Promise<any>;
    checkRecordInBase(body: any): Promise<any>;
    saveCardNotOut(body: any, files: any, cardObj: any, employeeObj: any): Promise<void>;
    getUuidFormPg(): Promise<any>;
}
