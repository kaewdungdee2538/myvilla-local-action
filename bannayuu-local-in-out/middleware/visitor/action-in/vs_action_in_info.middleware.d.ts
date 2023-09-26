import { ErrMessageUtilsTH } from "src/utils/err_message_th.utils";
import { FormatDataUtils } from "src/utils/format_data.utils";
export declare class VsActionInInfoMiddleWare {
    private readonly formatUtils;
    private readonly errMessageUtilsTh;
    constructor(formatUtils: FormatDataUtils, errMessageUtilsTh: ErrMessageUtilsTH);
    CheclVisitorinfo(body: any): string;
    checkVisitorValues(body: any): string;
}
