import { Body, Injectable, NestMiddleware } from "@nestjs/common";
import { ErrMessageUtilsTH } from "src/utils/err_message_th.utils";
import { FormatDataUtils } from "src/utils/format_data.utils";
import { Request, Response, NextFunction } from 'express';
import { dbConnection } from "src/pg_database/pg.database";

@Injectable()
export class VsActionInCheckSlotMiddleWare  {
    constructor(
        private readonly dbconnecttion: dbConnection,
        private readonly formatUtils: FormatDataUtils,
        private readonly errMessageUtilsTh: ErrMessageUtilsTH
    ) { }
    async CheckActionIN(body:any){
        return await this.checkSlotNumberValue(body);
    }

    async checkSlotNumberValue(body: any) {
        const request = body;
        if (request.visitor_slot_number) {
            if (this.formatUtils.HaveSpecialFormat(request.visitor_slot_number))
                return this.errMessageUtilsTh.errGetSlotVisitorNumberSlotNumberProhibitSpecial
            else if (!this.formatUtils.IsNumber(request.visitor_slot_number))
                return this.errMessageUtilsTh.errGetSlotVisitorNumberSlotNumberProhibitSpecial;
            else if (!request.site_id)
                return this.errMessageUtilsTh.errGetSlotVisitorNumberSiteIDNotFound;
            else if (this.formatUtils.HaveSpecialFormat(request.site_id))
                return this.errMessageUtilsTh.errGetSlotVisitorNumberSiteIDProhibitSpecial;
            else if (!this.formatUtils.IsNumber(request.site_id))
                return this.errMessageUtilsTh.errGetSlotVisitorNumberSiteIDNotNumber;
            else {
                const haveslot = await this.checkHaveSlotNumber(body);
                console.log(haveslot);
                if (haveslot)
                    return await this.checkSlotNumberDuplicate(body);
                return this.errMessageUtilsTh.errGetSlotVisitorNumberNotInDataBase
            }
        }
        return null;
    }

    async checkHaveSlotNumber(body: any) {
        const request = body;
        const site_id = parseInt(request.site_id);
        const slotnumber = parseInt(request.visitor_slot_number);
        const guardhouse_in_id = parseInt(request.guardhouse_in_id);
        let sql = `select * from m_visitor_slot where `
        sql += ` site_id = $1 and guardhouse_id = $2 and visitor_slot_number = $3;`
        const querys = {
            text: sql,
            values: [site_id,guardhouse_in_id, slotnumber]
        }
        const result = await this.dbconnecttion.getPgData(querys);
        console.log(result);
        if (await result.result.length > 0)
            return true;
        else
            return null;
    }
    async checkSlotNumberDuplicate(body: any) {
        const request = body;
        const site_id = parseInt(request.site_id);
        const slotnumber = parseInt(request.visitor_slot_number);
        const guardhouse_in_id = parseInt(request.guardhouse_in_id);
        let sql = `select * from m_visitor_slot where status_flag ='Y'`;
        sql += ` and site_id = $1 and guardhouse_id = $2 and visitor_slot_number = $3;`;

        const querys = {
            text: sql
            , values: [site_id, guardhouse_in_id, slotnumber]
        }
        const result = await this.dbconnecttion.getPgData(querys);
        if (result.result.length > 0)
            return this.errMessageUtilsTh.errGetSlotVisitorNumberIsDuplicate;
        return null;
    }
}