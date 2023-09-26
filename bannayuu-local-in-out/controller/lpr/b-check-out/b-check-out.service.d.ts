import { HttpService } from '@nestjs/common';
import { dbConnection } from 'src/pg_database/pg.database';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';
import { AxiosResponse } from "axios";
import { CalTimediffService } from 'src/controller/cal-timediff/cal-timediff.service';
import { LoadSettingLocalUtils } from 'src/utils/load_setting_local.utils';
export declare class LPRBCheckOutService {
    private readonly dbconnecttion;
    private readonly errMessageUtilsTh;
    private httpService;
    private readonly localSettingUtils;
    private readonly calTimediffService;
    constructor(dbconnecttion: dbConnection, errMessageUtilsTh: ErrMessageUtilsTH, httpService: HttpService, localSettingUtils: LoadSettingLocalUtils, calTimediffService: CalTimediffService);
    getBookingOutWithLPR(body: any, req: any): Promise<void>;
    getBookingInfoWithLPR(body: any, req: any): Promise<void>;
    getCalculate(valuesObj: any): Promise<AxiosResponse>;
}
