import { NestMiddleware } from "@nestjs/common";
import { Request, Response } from 'express';
import { dbConnection } from "src/pg_database/pg.database";
import { ErrMessageUtilsTH } from "src/utils/err_message_th.utils";
import { FormatDataUtils } from "src/utils/format_data.utils";
export declare class LPRBookingCheckInMiddleware implements NestMiddleware {
    private readonly errMessageUtilsTh;
    private readonly formatUtils;
    private readonly dbconnection;
    constructor(errMessageUtilsTh: ErrMessageUtilsTH, formatUtils: FormatDataUtils, dbconnection: dbConnection);
    use(req: Request, res: Response, next: () => void): Promise<void>;
    CheckLPRBoolingCheckIn(body: any): Promise<string>;
    checkLPRBookingInBase(body: any): Promise<string>;
}
