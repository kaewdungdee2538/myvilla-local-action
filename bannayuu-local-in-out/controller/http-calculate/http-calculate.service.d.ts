import { HttpService } from '@nestjs/common';
import { dbConnection } from 'src/pg_database/pg.database';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';
export declare class HttpCalculateService {
    private readonly dbconnecttion;
    private readonly errMessageUtilsTh;
    private httpService;
    constructor(dbconnecttion: dbConnection, errMessageUtilsTh: ErrMessageUtilsTH, httpService: HttpService);
    getCalculate(valuesObj: any): Promise<void>;
}
