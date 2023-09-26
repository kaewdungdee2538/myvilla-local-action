export declare class dbConnection {
    createPgConnect(): Promise<boolean>;
    getPgData(querys: any): Promise<{
        result: any;
        error: any;
    }>;
    savePgData(querys: any[]): Promise<{
        result: any;
        error: any;
    }>;
}
