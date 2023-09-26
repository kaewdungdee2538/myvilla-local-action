import { dbConnection } from "src/pg_database/pg.database";
export declare class VsActionInCheckEmployeeMiddleWare {
    private readonly dbconnecttion;
    constructor(dbconnecttion: dbConnection);
    CheckInEmployee(body: any): Promise<any>;
    CheckOutEmployee(body: any): Promise<any>;
    CheckCartypeCategoryInfo(body: any): Promise<any>;
    checkHaveInEmployee(body: any): Promise<any>;
    checkHaveOutEmployee(body: any): Promise<any>;
    checkCartypeCategory(body: any): Promise<any>;
}
