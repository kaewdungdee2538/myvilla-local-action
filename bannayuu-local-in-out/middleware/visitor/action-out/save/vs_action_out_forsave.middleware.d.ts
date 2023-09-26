import { ErrMessageUtilsTH } from "src/utils/err_message_th.utils";
import { FormatDataUtils } from "src/utils/format_data.utils";
export declare class VsActionOutForSaveMiddleWare {
    private readonly formatUtils;
    private readonly errMessageUtilsTh;
    constructor(formatUtils: FormatDataUtils, errMessageUtilsTh: ErrMessageUtilsTH);
    CheckVisitorOut(body: any): string;
    checkVisitorValues(body: any): string;
}
