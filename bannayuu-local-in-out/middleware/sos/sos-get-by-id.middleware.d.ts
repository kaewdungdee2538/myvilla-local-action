import { NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { dbConnection } from 'src/pg_database/pg.database';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';
import { FormatDataUtils } from 'src/utils/format_data.utils';
export declare class SosGetInfoById implements NestMiddleware {
    private readonly errMessageUrilTh;
    private readonly formatDataUtils;
    private readonly dbconnection;
    constructor(errMessageUrilTh: ErrMessageUtilsTH, formatDataUtils: FormatDataUtils, dbconnection: dbConnection);
    use(req: Request, res: Response, next: () => void): Promise<void>;
    CheckValues(body: any): Promise<any>;
    checkSosInBase(body: any): Promise<any>;
}
