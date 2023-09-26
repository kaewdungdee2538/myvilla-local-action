import { dbConnection } from "src/pg_database/pg.database";
import { ErrMessageUtilsTH } from "src/utils/err_message_th.utils";
import { FormatDataUtils } from "src/utils/format_data.utils";
export declare class BActionInMiddleware {
    private readonly formatUtils;
    private readonly errMessageUtilsTh;
    private readonly dbconnecttion;
    constructor(formatUtils: FormatDataUtils, errMessageUtilsTh: ErrMessageUtilsTH, dbconnecttion: dbConnection);
    CheckSaveIn(body: any): Promise<string>;
    checkValuesActionIn(body: any): Promise<string>;
    checkTbvCode(body: any): Promise<any>;
    getHomeIDFromTbvCode(body: any): Promise<any>;
    checkCartypeCategory(body: any): Promise<any>;
}
