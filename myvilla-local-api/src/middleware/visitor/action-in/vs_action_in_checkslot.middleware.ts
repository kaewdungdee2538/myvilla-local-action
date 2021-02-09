import { Body, Injectable, NestMiddleware } from "@nestjs/common";
import { ErrMessageUtilsTH } from "src/utils/err_message_th.utils";
import { FormatDataUtils } from "src/utils/format_data.utils";
import { Request, Response, NextFunction } from 'express';
import { dbConnection } from "src/pg_database/pg.database";

@Injectable()
export class VsActionInCheckSlotMiddleWare {
    constructor(
        private readonly dbconnecttion: dbConnection,
        private readonly formatUtils: FormatDataUtils,
        private readonly errMessageUtilsTh: ErrMessageUtilsTH
    ) { }
    async CheckActionIN(body: any) {
        return await this.checkSlotNumberValue(body);
    }

    async checkSlotNumberValue(body: any) {
        const request = body;
        if (request.visitor_slot_number && (request.card_code || request.card_name))
            return this.errMessageUtilsTh.errGetCardOrSlotNumberVisitor;
        else if (request.visitor_slot_number) {
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
                if (haveslot)
                    return await this.checkSlotNumberDuplicate(body);
                return this.errMessageUtilsTh.errGetSlotVisitorNumberNotInDataBase
            }
        } else if (request.card_code && request.card_name) {
            return this.errMessageUtilsTh.errGetHaveCardCodeAndCardName;
        } else if (request.card_code || request.card_name) {
            if (this.formatUtils.HaveSpecialFormat(request.card_code) || this.formatUtils.HaveSpecialFormat(request.card_name))
                return this.errMessageUtilsTh.errGetCardProhibitSpecial;
            // else if (!this.formatUtils.IsNumber(request.card_code) || !this.formatUtils.IsNumber(request.card_name))
            //     return this.errMessageUtilsTh.errGetCardNotNumber;
            else if (!request.site_id)
                return this.errMessageUtilsTh.errGetSlotVisitorNumberSiteIDNotFound;
            else if (this.formatUtils.HaveSpecialFormat(request.site_id))
                return this.errMessageUtilsTh.errGetSlotVisitorNumberSiteIDProhibitSpecial;
            else if (!this.formatUtils.IsNumber(request.site_id))
                return this.errMessageUtilsTh.errGetSlotVisitorNumberSiteIDNotNumber;
            else {
                const havecard = await this.checkHaveCardInBase(body);
                if (havecard)
                    return await this.checkCardDuplicate(body);
                return this.errMessageUtilsTh.errGetCardNotInDatabase;
            }
        } else if (!request.visitor_slot_number && (!request.card_code || !request.card_name)) {
            return this.errMessageUtilsTh.errGetCardOrSlotNumberVisitor;
        }

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
            values: [site_id, guardhouse_in_id, slotnumber]
        }
        const result = await this.dbconnecttion.getPgData(querys);
        if (await result.error)
            return result.error;
        else if (await result.result.length === 0)
            return null;
        else
            return true;
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
        if (await result.error)
            return result.error;
        else if (await result.result.length === 0)
            return null;
        return this.errMessageUtilsTh.errGetSlotVisitorNumberIsDuplicate;
    }

    async checkHaveCardInBase(body: any) {
        const site_id = parseInt(body.site_id);
        const card_code = body.card_code;
        const card_name = body.card_name;

        let sql = `select * from m_card where site_id = $1 and delete_flag = 'N'`
        sql += ` and (card_code = $2 or card_name = $3);`
        const query = {
            text: sql
            , values: [site_id, card_code, card_name]
        }
        const res = await this.dbconnecttion.getPgData(query);
        if (await res.error)
            return res.error;
        else if (await res.result.length === 0)
            return null;
        return true;
    }

    async checkCardDuplicate(body: any) {
        const site_id = parseInt(body.site_id);
        const card_code = parseInt(body.card_code);
        const card_name = parseInt(body.card_name);
        let sql = `select * from m_card where site_id = $1 and delete_flag = 'N' and status_flag = 'Y'`
        sql += ` and (card_code = $2 or card_name = $3);`
        const query = {
            text: sql
            , values: [site_id, card_code, card_name]
        }
        const res = await this.dbconnecttion.getPgData(query);
        if (await res.error)
            return res.error;
        else if (await res.result.length === 0)
            return null;
        return this.errMessageUtilsTh.errGetCardIsDuplicate;

    }

}