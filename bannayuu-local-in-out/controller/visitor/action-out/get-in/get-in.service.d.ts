import { HttpService } from '@nestjs/common';
import { RegistryImageService } from 'src/controller/image/registry-image/registry-image.service';
import { dbConnection } from 'src/pg_database/pg.database';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';
import { LoadSettingLocalUtils } from 'src/utils/load_setting_local.utils';
import { AxiosResponse } from "axios";
import { CalTimediffService } from 'src/controller/cal-timediff/cal-timediff.service';
export declare class GetInService {
    private readonly dbconnecttion;
    private readonly errMessageUtilsTh;
    private readonly registryImageService;
    private readonly localSettingUtils;
    private httpService;
    private readonly calTimediffService;
    constructor(dbconnecttion: dbConnection, errMessageUtilsTh: ErrMessageUtilsTH, registryImageService: RegistryImageService, localSettingUtils: LoadSettingLocalUtils, httpService: HttpService, calTimediffService: CalTimediffService);
    getActionInInfo(body: any, req: any): Promise<void>;
    getVSRecordID(body: any): Promise<{
        result: any;
        error: any;
    }>;
    getDataInInfo(visitorInfo: any, req: any): Promise<void>;
    getCalculate(valuesObj: any): Promise<AxiosResponse>;
}
