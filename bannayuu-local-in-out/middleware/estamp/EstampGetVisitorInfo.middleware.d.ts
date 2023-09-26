import { NestMiddleware } from "@nestjs/common";
import { Request, Response } from 'express';
import { ErrMessageUtilsTH } from "src/utils/err_message_th.utils";
import { FormatDataUtils } from "src/utils/format_data.utils";
export declare class EstampGetVisitorInfoMiddleware implements NestMiddleware {
    private readonly errMessageUrilTh;
    private readonly formatDataUtils;
    constructor(errMessageUrilTh: ErrMessageUtilsTH, formatDataUtils: FormatDataUtils);
    use(req: Request, res: Response, next: () => void): Promise<void>;
    checkInputValues(req: Request): Promise<string>;
}
