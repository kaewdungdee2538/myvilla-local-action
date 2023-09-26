import { CardManageService } from "src/middleware/card-manage/card-manage.service";
import { ErrMessageUtilsTH } from "src/utils/err_message_th.utils";
import { FormatDataUtils } from "src/utils/format_data.utils";
export declare class vsCardLossSaveMiddleware {
    private readonly errMessageUrilTh;
    private readonly formatDataUtils;
    private readonly cardManageService;
    constructor(errMessageUrilTh: ErrMessageUtilsTH, formatDataUtils: FormatDataUtils, cardManageService: CardManageService);
    checkValues(body: any): string;
    checkCardBefore(body: any): Promise<string>;
}
