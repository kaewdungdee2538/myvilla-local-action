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
exports.vsActionOutVerifyEstampMiddleware = void 0;
const common_1 = require("@nestjs/common");
const pg_database_1 = require("../../../../pg_database/pg.database");
const err_message_th_utils_1 = require("../../../../utils/err_message_th.utils");
const format_data_utils_1 = require("../../../../utils/format_data.utils");
const load_setting_local_utils_1 = require("../../../../utils/load_setting_local.utils");
let vsActionOutVerifyEstampMiddleware = class vsActionOutVerifyEstampMiddleware {
    constructor(errMessageUrilTh, formatDataUtils, localSettingLocalUtils, dbconnecttion) {
        this.errMessageUrilTh = errMessageUrilTh;
        this.formatDataUtils = formatDataUtils;
        this.localSettingLocalUtils = localSettingLocalUtils;
        this.dbconnecttion = dbconnecttion;
    }
    async use(req, res, next) {
        console.log('estamp verify middleware');
        const messageCheckCartypeInfo = await this.checkValues(req.body);
        if (messageCheckCartypeInfo) {
            console.log('Middleware estamp verify : ' + messageCheckCartypeInfo);
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
    async checkValues(body) {
        return this.checkEstampVisitorOut(body);
    }
    async checkEstampVisitorOut(body) {
        const visitor_slot_number = body.visitor_slot_number;
        const card_code = body.card_code;
        const card_name = body.card_name;
        const company_id = body.company_id;
        if (await this.localSettingLocalUtils.getVisitorOutEstampMode(company_id)) {
            let sql = `select estamp_flag from t_visitor_record
            where action_out_flag = 'N' and company_id = $1 
            and visitor_record_code = func_getvs_uuid_card_or_slot($1,$2,$3,$4);`;
            const query = {
                text: sql,
                values: [company_id, card_code, card_name, visitor_slot_number]
            };
            console.log(JSON.stringify(query));
            const result = await this.dbconnecttion.getPgData(query);
            if (result.error || result.result.length === 0)
                return this.errMessageUrilTh.errVisitorNotIn;
            else if (result.result[0].estamp_flag === 'N')
                return this.errMessageUrilTh.errVisitorNotVerifyEstamp;
            else
                return null;
        }
        return null;
    }
};
vsActionOutVerifyEstampMiddleware = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [err_message_th_utils_1.ErrMessageUtilsTH,
        format_data_utils_1.FormatDataUtils,
        load_setting_local_utils_1.LoadSettingLocalUtils,
        pg_database_1.dbConnection])
], vsActionOutVerifyEstampMiddleware);
exports.vsActionOutVerifyEstampMiddleware = vsActionOutVerifyEstampMiddleware;
//# sourceMappingURL=vs_action_out_estamp_verify.middleware.js.map