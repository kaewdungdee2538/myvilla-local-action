import { ErrMessageUtilsTH } from "src/utils/err_message_th.utils";
import { FormatDataUtils } from "src/utils/format_data.utils";
import { dbConnection } from "src/pg_database/pg.database";
export declare class VsActionInCheckSlotMiddleWare {
    private readonly dbconnecttion;
    private readonly formatUtils;
    private readonly errMessageUtilsTh;
    constructor(dbconnecttion: dbConnection, formatUtils: FormatDataUtils, errMessageUtilsTh: ErrMessageUtilsTH);
    CheckActionIN(body: any): Promise<any>;
    checkSlotNumberValue(body: any): Promise<any>;
    checkHaveSlotNumber(body: any): Promise<any>;
    checkSlotNumberDuplicate(body: any): Promise<any>;
    checkHaveCardInBase(body: any): Promise<any>;
    checkCardDuplicate(body: any): Promise<any>;
}
