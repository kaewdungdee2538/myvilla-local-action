import { VsActionInCheckEmployeeMiddleWare } from 'src/middleware/visitor/action-in/vs_action_in_check_employee.middleware';
import { dbConnection } from 'src/pg_database/pg.database';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';
export declare class ActionOutSaveService {
    private readonly dbconnecttion;
    private readonly errMessageUtilsTh;
    private readonly vsActionInCheckEmployeeMiddleware;
    constructor(dbconnecttion: dbConnection, errMessageUtilsTh: ErrMessageUtilsTH, vsActionInCheckEmployeeMiddleware: VsActionInCheckEmployeeMiddleWare);
    saveActionOut(files: any, body: any): Promise<any>;
    saveOut(files: any, body: any): Promise<any>;
    getVisitorRecordId(body: any): Promise<any>;
    getVisitorRecordIn(recordin_uuid: any): Promise<any>;
    Save(body: any, files: any, recordInObj: any, employeeObj: any): Promise<void>;
}
