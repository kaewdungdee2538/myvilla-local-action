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
exports.LptBSaveOutService = void 0;
const common_1 = require("@nestjs/common");
const pg_database_1 = require("../../../pg_database/pg.database");
const callback_status_1 = require("../../../utils/callback.status");
const err_message_th_utils_1 = require("../../../utils/err_message_th.utils");
let LptBSaveOutService = class LptBSaveOutService {
    constructor(dbconnecttion, errMessageUtilsTh) {
        this.dbconnecttion = dbconnecttion;
        this.errMessageUtilsTh = errMessageUtilsTh;
    }
    async saveBActionOut(body, files, employeeObj) {
        return this.saveOut(body, files, employeeObj);
    }
    async saveOut(body, files, employeeObj) {
        const images = files;
        const img_visitor_out = { images };
        const guardhouse_out_id = body.guardhouse_out_id;
        const guardhouse_out_code = body.guardhouse_out_code;
        const pos_id = body.pos_id ? body.pos_id.toString() : '';
        const company_id = body.company_id;
        const tbv_code = body.tbv_code;
        const employee_out_id = body.employee_out_id;
        const employee_out_info = JSON.stringify(employeeObj);
        const tcpl_id = body.tcpl_id ? body.tcpl_id : null;
        const parking_payment = body.sum_parking_total_after_discount ? parseInt(body.sum_parking_total_after_discount) : 0;
        const overnight_fines = body.sum_overnight_fine_amount ? parseInt(body.sum_overnight_fine_amount) : 0;
        const total_price = parking_payment + overnight_fines;
        const customer_payment = body.customer_payment ? parseInt(body.customer_payment) : 0;
        const payment_type_id = body.payment_type_id ? body.payment_type_id : 0;
        const payment_flag = total_price > 0 ? 'Y' : 'N';
        const discount_info = body.promotion_object && body.promotion_object != 'null' ? body.promotion_object : null;
        const payment_info = body.payment_info && body.payment_info != 'null' ? body.payment_info : null;
        let sql1 = `update t_visitor_record set 
        img_visitor_out = $1
        ,action_out_flag = 'Y'
        ,action_type = 'OUT'
        ,guardhouse_out_id = $2
        ,guardhouse_out_code = $3
        ,parking_out_datetime = now()
        ,datetime_action = now()
        ,pos_id = $4::varchar
        ,employee_out_id = $5,employee_out_info = $6
        ,tcpl_id = $7
        ,payment_status_flag = $8
        ,parking_payment_datetime = 
        (select case when $12 > 0 then current_timestamp else null end)
        ,payment_type_id = $9
        ,parking_payment = $10
        ,overnight_fines = $11
        ,total_price = $12
        ,discount_info = $13
        ,receipt_running = (select case when $10 > 0 then 
            (select coalesce(max(receipt_running)+1,1) from t_visitor_record
            where company_id = $15
            and pos_id = $4::varchar)
            else 0 end
            from t_visitor_record
            limit 1 )
        ,payment_info = $14
        ,customer_payment = $15
        where company_id = $16 and tbv_code = $17 ;`;
        const query1 = {
            text: sql1,
            values: [
                img_visitor_out, guardhouse_out_id, guardhouse_out_code,
                pos_id, employee_out_id, employee_out_info,
                tcpl_id, payment_flag, payment_type_id,
                parking_payment, overnight_fines, total_price,
                discount_info,
                payment_info,
                customer_payment,
                company_id, tbv_code
            ]
        };
        const querys = [query1];
        const res = await this.dbconnecttion.savePgData(querys);
        console.log(querys);
        if (res.error)
            throw new callback_status_1.StatusException({
                error: res.error,
                result: null,
                message: this.errMessageUtilsTh.messageProcessFail,
                statusCode: 200
            }, 200);
        else
            throw new callback_status_1.StatusException({
                error: null,
                result: this.errMessageUtilsTh.messageSuccess,
                message: this.errMessageUtilsTh.messageSuccess,
                statusCode: 200
            }, 200);
    }
};
__decorate([
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], LptBSaveOutService.prototype, "saveBActionOut", null);
__decorate([
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], LptBSaveOutService.prototype, "saveOut", null);
LptBSaveOutService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [pg_database_1.dbConnection,
        err_message_th_utils_1.ErrMessageUtilsTH])
], LptBSaveOutService);
exports.LptBSaveOutService = LptBSaveOutService;
//# sourceMappingURL=lpt-b-save-out.service.js.map