import { NestMiddleware } from "@nestjs/common";
import { Request, Response } from 'express';
import { CardManageService } from "src/middleware/card-manage/card-manage.service";
import { ErrMessageUtilsTH } from "src/utils/err_message_th.utils";
import { FormatDataUtils } from "src/utils/format_data.utils";
export declare class vsCheckCardMiddleware implements NestMiddleware {
    private readonly errMessageUrilTh;
    private readonly formatDataUtils;
    private readonly cardManageService;
    constructor(errMessageUrilTh: ErrMessageUtilsTH, formatDataUtils: FormatDataUtils, cardManageService: CardManageService);
    use(req: Request, res: Response, next: () => void): Promise<void>;
    checkCardInputValues(req: Request): Promise<string>;
}
