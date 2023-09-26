import { dbConnection } from "src/pg_database/pg.database";
export declare class LoadSettingLocalUtils {
    private readonly dbconnecttion;
    constructor(dbconnecttion: dbConnection);
    mycompany_id: string;
    loadAllSetting(): Promise<void>;
    getBookingInMode(company_id: string): Promise<any>;
    getVisitorInMode(company_id: string): Promise<any>;
    getBookingOutEstampMode(company_id: string): Promise<any>;
    getVisitorOutEstampMode(company_id: string): Promise<any>;
    getVisitorCalculateMode(company_id: string): Promise<any>;
}
