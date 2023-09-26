"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VsActionInCheckSlotMiddleWare = void 0;
const common_1 = require("@nestjs/common");
const err_message_th_utils_1 = require("../../../utils/err_message_th.utils");
const format_data_utils_1 = require("../../../utils/format_data.utils");
const pg_database_1 = require("../../../pg_database/pg.database");
let VsActionInCheckSlotMiddleWare = class VsActionInCheckSlotMiddleWare {
    constructor(dbconnecttion, formatUtils, errMessageUtilsTh) {
        this.dbconnecttion = dbconnecttion;
        this.formatUtils = formatUtils;
        this.errMessageUtilsTh = errMessageUtilsTh;
    }
    async CheckActionIN(body) {
        return await this.checkSlotNumberValue(body);
    }
    async checkSlotNumberValue(body) {
        const request = body;
        if (request.visitor_slot_number === "null")
            request.visitor_slot_number = null;
        if (request.card_code === "null")
            request.card_code = null;
        if (request.card_name === "null")
            request.card_name = null;
        if (request.visitor_slot_number && (request.card_code || request.card_name))
            return this.errMessageUtilsTh.errGetCardOrSlotNumberVisitor;
        else if (request.visitor_slot_number) {
            if (this.formatUtils.HaveSpecialFormat(request.visitor_slot_number))
                return this.errMessageUtilsTh.errGetSlotVisitorNumberSlotNumberProhibitSpecial;
            else if (!this.formatUtils.IsNumber(request.visitor_slot_number))
                return this.errMessageUtilsTh.errGetSlotVisitorNumberSlotNumberProhibitSpecial;
            else if (!request.company_id)
                return this.errMessageUtilsTh.errGetSlotVisitorNumberCompanyIDNotFound;
            else if (this.formatUtils.HaveSpecialFormat(request.company_id))
                return this.errMessageUtilsTh.errGetSlotVisitorNumberCompanyIDProhibitSpecial;
            else if (!this.formatUtils.IsNumber(request.company_id))
                return this.errMessageUtilsTh.errGetSlotVisitorNumberCompanyIDNotNumber;
            else {
                const haveslot = await this.checkHaveSlotNumber(body);
                if (haveslot)
                    return await this.checkSlotNumberDuplicate(body);
                return this.errMessageUtilsTh.errGetSlotVisitorNumberNotInDataBase;
            }
        }
        else if (request.card_code && request.card_name) {
            return this.errMessageUtilsTh.errGetHaveCardCodeAndCardName;
        }
        else if (request.card_code || request.card_name) {
            if (this.formatUtils.HaveSpecialFormat(request.card_code) || this.formatUtils.HaveSpecialFormat(request.card_name))
                return this.errMessageUtilsTh.errGetCardProhibitSpecial;
            else if (!request.company_id)
                return this.errMessageUtilsTh.errGetSlotVisitorNumberCompanyIDNotFound;
            else if (this.formatUtils.HaveSpecialFormat(request.company_id))
                return this.errMessageUtilsTh.errGetSlotVisitorNumberCompanyIDProhibitSpecial;
            else if (!this.formatUtils.IsNumber(request.company_id))
                return this.errMessageUtilsTh.errGetSlotVisitorNumberCompanyIDNotNumber;
            else {
                const havecard = await this.checkHaveCardInBase(body);
                if (havecard)
                    return await this.checkCardDuplicate(body);
                return this.errMessageUtilsTh.errGetCardNotInDatabase;
            }
        }
        else if (!request.visitor_slot_number && (!request.card_code || !request.card_name)) {
            return this.errMessageUtilsTh.errGetCardOrSlotNumberVisitor;
        }
    }
    async checkHaveSlotNumber(body) {
        const request = body;
        const company_id = parseInt(request.company_id);
        const slotnumber = parseInt(request.visitor_slot_number);
        const guardhouse_in_id = parseInt(request.guardhouse_in_id);
        let sql = `select * from m_visitor_slot where `;
        sql += ` company_id = $1  and visitor_slot_number = $2;`;
        const querys = {
            text: sql,
            values: [company_id, slotnumber]
        };
        const result = await this.dbconnecttion.getPgData(querys);
        if (await result.error)
            return result.error;
        else if (await result.result.length === 0)
            return null;
        else
            return true;
    }
    async checkSlotNumberDuplicate(body) {
        const request = body;
        const company_id = parseInt(request.company_id);
        const slotnumber = parseInt(request.visitor_slot_number);
        const guardhouse_in_id = parseInt(request.guardhouse_in_id);
        let sql = `select * from m_visitor_slot where status_flag ='Y'`;
        sql += ` and company_id = $1 and  visitor_slot_number = $2;`;
        const querys = {
            text: sql,
            values: [company_id, slotnumber]
        };
        const result = await this.dbconnecttion.getPgData(querys);
        if (await result.error)
            return result.error;
        else if (await result.result.length === 0)
            return null;
        return this.errMessageUtilsTh.errGetSlotVisitorNumberIsDuplicate;
    }
    async checkHaveCardInBase(body) {
        const company_id = parseInt(body.company_id);
        const card_code = body.card_code;
        const card_name = body.card_name;
        let sql = `select * from m_card where company_id = $1 and delete_flag = 'N'`;
        sql += ` and (card_code = $2 or card_name = $3);`;
        const query = {
            text: sql,
            values: [company_id, card_code, card_name]
        };
        const res = await this.dbconnecttion.getPgData(query);
        if (await res.error)
            return res.error;
        else if (await res.result.length === 0)
            return null;
        return true;
    }
    async checkCardDuplicate(body) {
        const company_id = parseInt(body.company_id);
        const card_code = parseInt(body.card_code);
        const card_name = parseInt(body.card_name);
        let sql = `select * from m_card where company_id = $1 and delete_flag = 'N' and status_flag = 'Y'`;
        sql += ` and (card_code = $2 or card_name = $3);`;
        const query = {
            text: sql,
            values: [company_id, card_code, card_name]
        };
        const res = await this.dbconnecttion.getPgData(query);
        if (await res.error)
            return res.error;
        else if (await res.result.length === 0)
            return null;
        return this.errMessageUtilsTh.errGetCardIsDuplicate;
    }
};
VsActionInCheckSlotMiddleWare = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [pg_database_1.dbConnection,
        format_data_utils_1.FormatDataUtils,
        err_message_th_utils_1.ErrMessageUtilsTH])
], VsActionInCheckSlotMiddleWare);
exports.VsActionInCheckSlotMiddleWare = VsActionInCheckSlotMiddleWare;
//# sourceMappingURL=vs_action_in_checkslot.middleware.js.map