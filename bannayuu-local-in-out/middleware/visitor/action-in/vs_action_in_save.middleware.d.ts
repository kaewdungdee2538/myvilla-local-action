import { FormatDataUtils } from 'src/utils/format_data.utils';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';
export declare class VsActionInSaveMiddleware {
    private readonly formatUtils;
    private readonly errMessageUtilsTh;
    constructor(formatUtils: FormatDataUtils, errMessageUtilsTh: ErrMessageUtilsTH);
    CheckSaveIn(body: any): string;
    checkValuesActionInSave(body: any): string;
}
