import { HttpService } from '@nestjs/common';
import { dbConnection } from 'src/pg_database/pg.database';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';
import { LoadSettingLocalUtils } from 'src/utils/load_setting_local.utils';
import { AxiosResponse } from "axios";
import { CalTimediffService } from 'src/controller/cal-timediff/cal-timediff.service';
export declare class GetBookingOutInfoService {
    private readonly dbconnecttion;
    private readonly errMessageUtilsTh;
    private readonly localSettingUtils;
    private httpService;
    private readonly calTimediffService;
    constructor(dbconnecttion: dbConnection, errMessageUtilsTh: ErrMessageUtilsTH, localSettingUtils: LoadSettingLocalUtils, httpService: HttpService, calTimediffService: CalTimediffService);
    getBookingOutInfo(body: any, req: any): Promise<void>;
    getBookingInInfo(body: any, req: any): Promise<void>;
    getCalculate(valuesObj: any): Promise<AxiosResponse>;
}
