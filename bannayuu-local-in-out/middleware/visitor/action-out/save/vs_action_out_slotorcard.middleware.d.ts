import { ErrMessageUtilsTH } from "src/utils/err_message_th.utils";
import { FormatDataUtils } from "src/utils/format_data.utils";
import { CardManageService } from "src/middleware/card-manage/card-manage.service";
import { SlotManageService } from "src/middleware/slot-manage/slot-manage.service";
export declare class VsActionOutSlotOrCardMiddleWare {
    private readonly formatUtils;
    private readonly errMessageUtilsTh;
    private readonly slotManageService;
    private readonly cardManageService;
    constructor(formatUtils: FormatDataUtils, errMessageUtilsTh: ErrMessageUtilsTH, slotManageService: SlotManageService, cardManageService: CardManageService);
    CheckVisitorOut(body: any): Promise<string>;
    checkSlotOrCard(body: any): Promise<string>;
}
