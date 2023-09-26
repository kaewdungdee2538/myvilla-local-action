import { dbConnection } from 'src/pg_database/pg.database';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';
export declare class GetDepartmentTypeService {
    private readonly dbconnecttion;
    private readonly errMessageUtilsTh;
    constructor(dbconnecttion: dbConnection, errMessageUtilsTh: ErrMessageUtilsTH);
    getDepartmentType(body: any): Promise<void>;
    getDepartment(body: any): Promise<void>;
}
