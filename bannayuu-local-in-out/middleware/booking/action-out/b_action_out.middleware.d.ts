import { dbConnection } from "src/pg_database/pg.database";
import { ErrMessageUtilsTH } from "src/utils/err_message_th.utils";
import { FormatDataUtils } from "src/utils/format_data.utils";
export declare class BActionOutMiddleware {
    private readonly formatUtils;
    private readonly errMessageUtilsTh;
    private readonly dbconnecttion;
    constructor(formatUtils: FormatDataUtils, errMessageUtilsTh: ErrMessageUtilsTH, dbconnecttion: dbConnection);
    CheckSaveIn(body: any): Promise<string>;
    checkValues(body: any): string;
    checkValuesTBVCode(body: any): Promise<string>;
    checkTbvCodeInbase(body: any): Promise<any>;
}
