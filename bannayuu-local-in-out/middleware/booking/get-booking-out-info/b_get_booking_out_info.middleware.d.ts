import { NestMiddleware } from "@nestjs/common";
import { Request, Response } from 'express';
import { dbConnection } from "src/pg_database/pg.database";
import { ErrMessageUtilsTH } from "src/utils/err_message_th.utils";
import { LoadSettingLocalUtils } from "src/utils/load_setting_local.utils";
export declare class bGetBookingOutInfoMiddleware implements NestMiddleware {
    private readonly errMessageUrilTh;
    private readonly loadSettingLocalUtils;
    private readonly dbconnecttion;
    constructor(errMessageUrilTh: ErrMessageUtilsTH, loadSettingLocalUtils: LoadSettingLocalUtils, dbconnecttion: dbConnection);
    use(req: Request, res: Response, next: () => void): Promise<void>;
    checkBookingOutEstamp(body: any): Promise<string>;
}
