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
exports.vsActionOutGetInMiddleware = void 0;
const common_1 = require("@nestjs/common");
const pg_database_1 = require("../../../../pg_database/pg.database");
const err_message_th_utils_1 = require("../../../../utils/err_message_th.utils");
const format_data_utils_1 = require("../../../../utils/format_data.utils");
const load_setting_local_utils_1 = require("../../../../utils/load_setting_local.utils");
let vsActionOutGetInMiddleware = class vsActionOutGetInMiddleware {
    constructor(errMessageUrilTh, formatDataUtils, localSettingLocalUtils, dbconnecttion) {
        this.errMessageUrilTh = errMessageUrilTh;
        this.formatDataUtils = formatDataUtils;
        this.localSettingLocalUtils = localSettingLocalUtils;
        this.dbconnecttion = dbconnecttion;
    }
    async use(req, res, next) {
        console.log('getin middleware');
        const messageCheckCartypeInfo = await this.checkValues(req);
        if (messageCheckCartypeInfo) {
            console.log('Middleware get in : ' + messageCheckCartypeInfo);
            res.send({
                response: {
                    error: messageCheckCartypeInfo,
                    result: null,
                    message: messageCheckCartypeInfo,
                    statusCode: 200
                }
            });
        }
        else
            next();
    }
    async checkValues(req) {
        const body = req.body;
        if (!body.company_id)
            return this.errMessageUrilTh.errGetCompanyIDNotFound;
        else if (this.formatDataUtils.HaveSpecialFormat(body.company_id))
            return this.errMessageUrilTh.errGetCompanyIDProhibitSpecial;
        else if (!this.formatDataUtils.IsNumber(body.company_id))
            return this.errMessageUrilTh.errGetCompanyIDNotNumber;
        return this.checkSlotOrCard(req);
    }
    async checkSlotOrCard(req) {
        const body = req.body;
        if (body.visitor_slot_number && (body.card_code || body.card_name))
            return this.errMessageUrilTh.errGetCardOrSlotNumberVisitor;
        else if (!body.visitor_slot_number && (!body.card_code && !body.card_name))
            return this.errMessageUrilTh.errGetCardOrSlotNumberVisitor;
        else if (body.visitor_slot_number) {
            if (this.formatDataUtils.HaveSpecialFormat(body.visitor_slot_number))
                return this.errMessageUrilTh.errGetSlotVisitorNumberSlotNumberProhibitSpecial;
            else if (!this.formatDataUtils.IsNumber(body.visitor_slot_number))
                return this.errMessageUrilTh.errGetSlotVisitorNumberSlotNumberNotNumber;
        }
        else if (body.card_code && body.card_name)
            return this.errMessageUrilTh.errGetHaveCardCodeAndCardName;
        else if (body.card_code || body.card_name) {
            if (body.card_code) {
                if (this.formatDataUtils.HaveSpecialFormat(body.card_code))
                    return this.errMessageUrilTh.errGetCardProhibitSpecial;
                else if (!this.formatDataUtils.IsNumber(body.card_code))
                    return this.errMessageUrilTh.errGetCardNotNumber;
            }
            else {
                if (this.formatDataUtils.HaveSpecialFormat(body.card_name))
                    return this.errMessageUrilTh.errGetCardProhibitSpecial;
                else if (!this.formatDataUtils.IsNumber(body.card_name))
                    return this.errMessageUrilTh.errGetCardNotNumber;
            }
        }
        return null;
    }
};
vsActionOutGetInMiddleware = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [err_message_th_utils_1.ErrMessageUtilsTH,
        format_data_utils_1.FormatDataUtils,
        load_setting_local_utils_1.LoadSettingLocalUtils,
        pg_database_1.dbConnection])
], vsActionOutGetInMiddleware);
exports.vsActionOutGetInMiddleware = vsActionOutGetInMiddleware;
//# sourceMappingURL=vs_action_out_get_in.middleware.js.map