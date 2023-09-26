import { dbConnection } from 'src/pg_database/pg.database';
export declare class SlotManageService {
    private readonly dbconnecttion;
    constructor(dbconnecttion: dbConnection);
    getSlotNumberInDataBase(inputObj: any): Promise<boolean>;
    getSlotNumberCheckIn(inputObj: any): Promise<boolean>;
}
