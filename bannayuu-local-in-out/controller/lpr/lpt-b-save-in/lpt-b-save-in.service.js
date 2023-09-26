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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LptBSaveInService = void 0;
const common_1 = require("@nestjs/common");
const pg_database_1 = require("../../../pg_database/pg.database");
const callback_status_1 = require("../../../utils/callback.status");
const err_message_th_utils_1 = require("../../../utils/err_message_th.utils");
let LptBSaveInService = class LptBSaveInService {
    constructor(dbconnecttion, errMessageUtilsTh) {
        this.dbconnecttion = dbconnecttion;
        this.errMessageUtilsTh = errMessageUtilsTh;
    }
    async saveBookingIn(body, files, homeObj, checkTBVCodeObj, getEmployeeID, getCartype) {
        const visitor_record_code = await this.getUuidFormPg();
        const tbv_code = checkTBVCodeObj.tbv_code;
        const cartype_id = getCartype.cartype_id;
        const cartype_name_contraction = getCartype.cartype_name_contraction;
        const cartype_name_th = getCartype.cartype_name_th;
        const cartype_name_en = getCartype.cartype_name_en;
        const visitor_info = body.visitor_info;
        const action_info = body.action_info;
        const images = files;
        const img_visitor_in = {
            images
        };
        const company_id = body.company_id;
        const guardhouse_in_id = body.guardhouse_in_id;
        const guardhouse_in_code = body.guardhouse_in_code;
        const license_plate = body.license_plate;
        const employee_in_id = body.employee_in_id;
        const employee_in_info = getEmployeeID;
        const home_id = homeObj.home_id;
        const home_info = {
            home_id: homeObj.home_id,
            home_code: homeObj.home_code,
            home_name: homeObj.home_name,
            home_address: homeObj.home_address,
            home_type: homeObj.home_type,
            home_data: homeObj.home_data,
            home_remark: homeObj.home_remark,
            home_privilege_line_amount: homeObj.home_privilege_line_amount,
            home_privilege_card_amount: homeObj.home_privilege_card_amount
        };
        const cartype_category_id = body.cartype_category_id;
        const cartype_category_info = body.cartype_category_info;
        let sql1 = `
        insert into t_visitor_record
        (
            visitor_record_code,tbv_code
            ,cartype_id,cartype_name_contraction,cartype_name_th,cartype_name_en
            ,cartype_category_id,cartype_category_info
            ,visitor_info,action_info
            ,home_id,home_info
            ,guardhouse_in_id,guardhouse_in_code
            ,parking_in_datetime
            ,license_plate
            ,img_visitor_in
            ,employee_in_id,employee_in_info
            ,company_id
            ,datetime_action,action_type
        ) values(
            $1,$2
            ,$3,$4,$5,$6
            ,$7,$8
            ,$9,$10
            ,$11,$12
            ,$13,$14
            ,now()
            ,$15
            ,$16
            ,$17,$18
            ,$19
            ,now(),'IN'
        );`;
        const query1 = {
            text: sql1,
            values: [
                visitor_record_code, tbv_code,
                cartype_id, cartype_name_contraction, cartype_name_th, cartype_name_en,
                cartype_category_id, cartype_category_info,
                visitor_info, action_info,
                home_id, home_info,
                guardhouse_in_id, guardhouse_in_code,
                license_plate,
                img_visitor_in,
                employee_in_id, employee_in_info,
                company_id
            ]
        };
        let sql2 = `update t_booking_visitor set tbv_status ='Y' 
        ,update_by = $1 ,update_date = current_timestamp
        where company_id = $2 and tbv_code = $3;`;
        const query2 = {
            text: sql2,
            values: [employee_in_id, company_id, tbv_code]
        };
        const querys = [query1, query2];
        const res = await this.dbconnecttion.savePgData(querys);
        if (res.error)
            throw new callback_status_1.StatusException({
                error: res.error,
                result: null,
                message: this.errMessageUtilsTh.messageProcessFail,
                statusCode: 200
            }, 200);
        throw new callback_status_1.StatusException({
            error: null,
            result: this.errMessageUtilsTh.messageSuccess,
            message: this.errMessageUtilsTh.messageSuccess,
            statusCode: 200
        }, 200);
    }
    async getUuidFormPg() {
        const sql = `select fun_generate_uuid('VS',8) as _uuid;`;
        const res = await this.dbconnecttion.getPgData(sql);
        if (res.error)
            return res.error;
        else if (res.result.length === 0)
            return null;
        else
            return res.result[0]._uuid;
    }
};
__decorate([
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], LptBSaveInService.prototype, "saveBookingIn", null);
LptBSaveInService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [pg_database_1.dbConnection,
        err_message_th_utils_1.ErrMessageUtilsTH])
], LptBSaveInService);
exports.LptBSaveInService = LptBSaveInService;
//# sourceMappingURL=lpt-b-save-in.service.js.map