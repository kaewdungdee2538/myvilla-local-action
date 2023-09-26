import { NestMiddleware } from "@nestjs/common";
import { Request, Response } from 'express';
import { dbConnection } from "src/pg_database/pg.database";
import { ErrMessageUtilsTH } from "src/utils/err_message_th.utils";
import { FormatDataUtils } from "src/utils/format_data.utils";
import { LoadSettingLocalUtils } from "src/utils/load_setting_local.utils";
export declare class vsActionOutGetInMiddleware implements NestMiddleware {
    private readonly errMessageUrilTh;
    private readonly formatDataUtils;
    private readonly localSettingLocalUtils;
    private readonly dbconnecttion;
    constructor(errMessageUrilTh: ErrMessageUtilsTH, formatDataUtils: FormatDataUtils, localSettingLocalUtils: LoadSettingLocalUtils, dbconnecttion: dbConnection);
    use(req: Request, res: Response, next: () => void): Promise<void>;
    checkValues(req: Request): Promise<string>;
    checkSlotOrCard(req: Request): Promise<string>;
}
