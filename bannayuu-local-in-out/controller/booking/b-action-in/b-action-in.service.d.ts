import { HttpService } from '@nestjs/common';
import { dbConnection } from 'src/pg_database/pg.database';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';
import { AxiosResponse } from 'axios';
export declare class BActionInService {
    private readonly dbconnecttion;
    private readonly errMessageUtilsTh;
    private httpService;
    constructor(dbconnecttion: dbConnection, errMessageUtilsTh: ErrMessageUtilsTH, httpService: HttpService);
    saveBookingIn(body: any, files: any, homeObj: any, checkTBVCodeObj: any, getEmployeeID: any, getCartype: any): Promise<void>;
    getUuidFormPg(): Promise<any>;
    SendLineNotificationActionIn(notiObj: any, lineNotificationMode: string): Promise<AxiosResponse>;
}
