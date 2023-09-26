import { NestMiddleware } from "@nestjs/common";
import { ErrMessageUtilsTH } from "src/utils/err_message_th.utils";
import { FormatDataUtils } from "src/utils/format_data.utils";
import { Request, Response } from 'express';
export declare class VsGetSlotMiddleware implements NestMiddleware {
    private readonly formatUtils;
    private readonly errMessageUtilsTh;
    constructor(formatUtils: FormatDataUtils, errMessageUtilsTh: ErrMessageUtilsTH);
    use(req: Request, res: Response, next: () => void): void;
    checkCompanyID(req: Request): string;
}
export declare class VsGetSlotBySlotNumberMiddleware implements NestMiddleware {
    private readonly formatUtils;
    private readonly errMessageUtilsTh;
    constructor(formatUtils: FormatDataUtils, errMessageUtilsTh: ErrMessageUtilsTH);
    use(req: Request, res: Response, next: () => void): void;
    checkSlotNumber(req: Request): string;
}
