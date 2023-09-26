import { dbConnection } from 'src/pg_database/pg.database';
export declare class CardManageService {
    private dbconnecttion;
    constructor(dbconnecttion: dbConnection);
    getCardInDataBase(inputObj: any): Promise<boolean>;
    getCardCheckIn(inputObj: any): Promise<boolean>;
}
