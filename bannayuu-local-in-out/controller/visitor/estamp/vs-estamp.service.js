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
exports.VsEstampService = void 0;
const common_1 = require("@nestjs/common");
const pg_database_1 = require("../../../pg_database/pg.database");
const callback_status_1 = require("../../../utils/callback.status");
const err_message_th_utils_1 = require("../../../utils/err_message_th.utils");
let VsEstampService = class VsEstampService {
    constructor(dbconnecttion, errMessageUtilsTh) {
        this.dbconnecttion = dbconnecttion;
        this.errMessageUtilsTh = errMessageUtilsTh;
    }
    async getVisitorInfo(body) {
        const company_id = body.company_id;
        const card_code = !body.card_code ? '' : body.card_code;
        const card_name = !body.card_name ? '' : body.card_name;
        const visitor_slot_number = !body.visitor_slot_number ? null : body.visitor_slot_number;
        const tbv_code = !body.tbv_code ? '' : body.tbv_code;
        let sql = `select 
        visitor_record_id
        ,visitor_record_code,tbv_code
        ,visitor_slot_number,card_name
        ,cartype_name_th,cartype_name_en
        ,cartype_category_info->'cartype_category_name_th' as cartype_category_name_th
        ,visitor_info->'first_name_th' as first_name_th
		,visitor_info->'last_name_th' as last_name_th
		,action_info->'idividule_type' as idividule_type
		,action_info->'person_contract' as person_contract
		,action_info->'tel_number' as tel_number
		,home_id
		,home_info->'home_address' as home_address
		,license_plate
		,to_char(parking_in_datetime,'DD/MM/YYYY HH24:MI:SS') as parking_in_datetime
		,estamp_id
        ,to_char(estamp_datetime,'DD/MM/YYYY HH24:MI:SS') as estamp_datetime
        ,estamp_home_line_id
		,case when estamp_flag = 'Y' then true else false end as estamp_flag
        ,case when tbv_code = null then 'booking' else 'walk in' end as record_from
		,company_name
        ,(select home_address from m_home mh left join m_home_line mhl on mh.home_id = mhl.home_id where home_line_id = tvr.home_id) as estamp_form
        ,img_visitor_in->'images'->'image_card' as image_card_path
        ,img_visitor_in->'images'->'image_vehicle' as image_vehicle_path
        from t_visitor_record tvr left join m_company mc
        on tvr.company_id = mc.company_id
        where action_out_flag = 'N' and tvr.company_id = $1
        and visitor_record_code = 
		coalesce((select visitor_record_code from m_visitor_slot where visitor_slot_number = $2 and company_id = $1)
		,(select visitor_record_code from m_card where (card_code = $3 or card_name= $4) and company_id = $1)
		,(select visitor_record_code from t_visitor_record where tbv_code = $5 and company_id = $1))
        limit 1 ;`;
        const query = {
            text: sql,
            values: [company_id, visitor_slot_number, card_code, card_name, tbv_code]
        };
        const res = await this.dbconnecttion.getPgData(query);
        if (res.error)
            throw new callback_status_1.StatusException({
                error: res.error,
                result: null,
                message: this.errMessageUtilsTh.messageProcessFail,
                statusCode: 200
            }, 200);
        else if (res.result.length === 0)
            throw new callback_status_1.StatusException({
                error: this.errMessageUtilsTh.errVisitorNotIn,
                result: null,
                message: this.errMessageUtilsTh.errVisitorNotIn,
                statusCode: 200
            }, 200);
        throw new callback_status_1.StatusException({
            error: null,
            result: res.result[0],
            message: this.errMessageUtilsTh.messageSuccess,
            statusCode: 200
        }, 200);
    }
    async saveEstampVisitor(body, pathCustomer, estampInfo) {
        const company_id = body.company_id;
        const guardhouse_id = body.guardhouse_id;
        const visitor_record_id = body.visitor_record_id;
        const employee_id = body.employee_id;
        const estamp_info = Object.assign(Object.assign({}, estampInfo), { guardhouse_id });
        const estamp_id = body.estamp_id;
        const images = { image_customer: pathCustomer };
        let sql = `update t_visitor_record set
        estamp_id = $1,estamp_info = $2,estamp_datetime = current_timestamp
        ,estamp_image=$3,estamp_emp_id=$4,estamp_flag = 'Y'
        where visitor_record_id = $5
        and company_id = $6 and action_out_flag = 'N'
        ;`;
        const query = {
            text: sql,
            values: [
                estamp_id, estamp_info,
                images, employee_id,
                visitor_record_id,
                company_id
            ]
        };
        const result = await this.dbconnecttion.savePgData([query]);
        if (result.error) {
            throw new callback_status_1.StatusException({
                error: result.error,
                result: null,
                message: this.errMessageUtilsTh.messageProcessFail,
                statusCode: 200
            }, 200);
        }
        else {
            throw new callback_status_1.StatusException({
                error: null,
                result: this.errMessageUtilsTh.messageSuccessEn,
                message: this.errMessageUtilsTh.messageSuccess,
                statusCode: 200
            }, 200);
        }
    }
    async getEstampInfo(body) {
        const company_id = body.company_id;
        const estamp_id = body.estamp_id;
        let sql = `select estamp_id,estamp_code,estamp_name_th,estamp_name_en,estamp_remark
        from m_estamp
        where delete_flag = 'N'
        and company_id = $1
        and estamp_id = $2
        ; `;
        const query = {
            text: sql,
            values: [company_id, estamp_id]
        };
        const res = await this.dbconnecttion.getPgData(query);
        if (res.error)
            throw new callback_status_1.StatusException({
                error: res.error,
                result: null,
                message: this.errMessageUtilsTh.errEstampNotInBase,
                statusCode: 200
            }, 200);
        else if (res.result.length === 0)
            throw new callback_status_1.StatusException({
                error: this.errMessageUtilsTh.errEstampNotInBase,
                result: null,
                message: this.errMessageUtilsTh.errEstampNotInBase,
                statusCode: 200
            }, 200);
        else
            return res.result[0];
    }
};
VsEstampService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [pg_database_1.dbConnection,
        err_message_th_utils_1.ErrMessageUtilsTH])
], VsEstampService);
exports.VsEstampService = VsEstampService;
//# sourceMappingURL=vs-estamp.service.js.map