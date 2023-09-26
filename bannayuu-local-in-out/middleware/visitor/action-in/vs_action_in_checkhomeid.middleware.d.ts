import { ErrMessageUtilsTH } from "src/utils/err_message_th.utils";
import { FormatDataUtils } from "src/utils/format_data.utils";
import { dbConnection } from "src/pg_database/pg.database";
export declare class VsActionInCheckHomeIDMiddleWare {
    private readonly dbconnecttion;
    private readonly formatUtils;
    private readonly errMessageUtilsTh;
    constructor(dbconnecttion: dbConnection, formatUtils: FormatDataUtils, errMessageUtilsTh: ErrMessageUtilsTH);
    CheckHomeID(body: any, getHomeIDFromTBV: any): Promise<any>;
    checkHaveHomeID(body: any, getHomeIDFromTBV: any): Promise<any>;
}
