import { HttpService } from '@nestjs/common';
import { dbConnection } from 'src/pg_database/pg.database';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';
import { AxiosResponse } from 'axios';
export declare class ActionInService {
    private readonly dbconnecttion;
    private readonly errMessageUtilsTh;
    private httpService;
    constructor(dbconnecttion: dbConnection, errMessageUtilsTh: ErrMessageUtilsTH, httpService: HttpService);
    ActionSaveIn(files: any, body: any, visitor_slot_id: string, cardObj: any, getHomeID: any, getEmployeeID: any, getCartype: any): Promise<void>;
    getUuidFormPg(): Promise<any>;
    getVisitorSlotID(body: any): Promise<any>;
    getCardID(body: any): Promise<any>;
    SendLineNotificationActionIn(notiObj: any, lineNotificationMode: string): Promise<AxiosResponse>;
}
