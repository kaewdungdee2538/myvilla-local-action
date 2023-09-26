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
exports.SosService = void 0;
const common_1 = require("@nestjs/common");
const pg_database_1 = require("../../../pg_database/pg.database");
const callback_status_1 = require("../../../utils/callback.status");
const err_message_th_utils_1 = require("../../../utils/err_message_th.utils");
let SosService = class SosService {
    constructor(dbconnecttion, errMessageUtilsTh) {
        this.dbconnecttion = dbconnecttion;
        this.errMessageUtilsTh = errMessageUtilsTh;
    }
    async getSosAllByCompany(body) {
        const company_id = body.company_id;
        let sql = `select sos_id,sos_code
        ,to_char(sos_datetime,'YYYY-MM-DD HH24:MI:SS') as sos_datetime
        ,ref_sos_id,hsi.home_id,mh.home_address,home_line_uuid
        ,sos_header_text,sos_detail_text
        ,sos_data,sos_picture_data
        ,sos_remark
        ,sos_status
        from h_sos_info hsi
        left join m_home mh on hsi.home_id = mh.home_id
        where hsi.delete_flag = 'N'
        and sos_status in ('N')
        and hsi.company_id = $1
        order by sos_datetime desc
        ;`;
        const query = {
            text: sql,
            values: [company_id]
        };
        const res = await this.dbconnecttion.getPgData(query);
        if (await res.error)
            throw new callback_status_1.StatusException({
                error: res.error,
                result: null,
                message: this.errMessageUtilsTh.messageProcessFail,
                statusCode: 200
            }, 200);
        throw new callback_status_1.StatusException({
            error: null,
            result: res.result,
            message: this.errMessageUtilsTh.messageSuccess,
            statusCode: 200
        }, 200);
    }
    async getSosHistoryByCompany(body) {
        const datetime_start = body.datetime_start;
        const datetime_end = body.datetime_end;
        const company_id = body.company_id;
        let sql = `select sos_id,sos_code
        ,to_char(sos_datetime,'YYYY-MM-DD HH24:MI:SS') as sos_datetime
        ,ref_sos_id,hsi.home_id,mh.home_address,home_line_uuid
        ,sos_header_text,sos_detail_text
        ,sos_data,sos_picture_data
        ,sos_remark
        ,sos_status
        from h_sos_info hsi
        left join m_home mh on hsi.home_id = mh.home_id
        where hsi.delete_flag = 'N'
        and sos_datetime between $1 and $2
        and hsi.company_id = $3
        ;`;
        const query = {
            text: sql,
            values: [datetime_start, datetime_end, company_id]
        };
        const res = await this.dbconnecttion.getPgData(query);
        if (await res.error)
            throw new callback_status_1.StatusException({
                error: res.error,
                result: null,
                message: this.errMessageUtilsTh.messageProcessFail,
                statusCode: 200
            }, 200);
        throw new callback_status_1.StatusException({
            error: null,
            result: res.result,
            message: this.errMessageUtilsTh.messageSuccess,
            statusCode: 200
        }, 200);
    }
    async getSosInfoById(body) {
        const company_id = body.company_id;
        const sos_id = body.sos_id;
        let sql = `select sos_id,sos_code
        ,to_char(sos_datetime,'YYYY-MM-DD HH24:MI:SS') as sos_datetime
        ,ref_sos_id,hsi.home_id,mh.home_address,home_line_uuid
        ,sos_header_text,sos_detail_text
        ,sos_data,sos_picture_data
        ,sos_remark
        ,sos_status
        ,company_name
        from h_sos_info hsi
        left join m_home mh on hsi.home_id = mh.home_id
        left join m_company mc on hsi.company_id = mc.company_id
        where hsi.delete_flag = 'N'

        and hsi.company_id = $1
        and hsi.sos_id = $2
        order by mh.home_address,sos_datetime;`;
        const query = {
            text: sql,
            values: [
                company_id,
                sos_id
            ]
        };
        const res = await this.dbconnecttion.getPgData(query);
        if (res.error) {
            console.log(res.error);
            throw new callback_status_1.StatusException({
                error: res.error,
                result: null,
                message: this.errMessageUtilsTh.messageProcessFail,
                statusCode: 200
            }, 200);
        }
        else
            throw new callback_status_1.StatusException({
                error: null,
                result: res.result[0],
                message: this.errMessageUtilsTh.messageSuccess,
                statusCode: 200
            }, 200);
    }
    async saveCorporateReceive(body) {
        const employee_id = body.employee_id;
        const company_id = body.company_id;
        const sos_remark = body.sos_remark;
        const sos_id = body.sos_id;
        let sql = `update h_sos_info set
        sos_status = 'Y'
        ,sos_remark = $1
        ,update_by = $2,update_date = current_timestamp
        where company_id = $3 and sos_id = $4;`;
        const query = {
            text: sql,
            values: [sos_remark, employee_id, company_id, sos_id]
        };
        const res = await this.dbconnecttion.savePgData([query]);
        if (res.error) {
            console.log(res.error);
            throw new callback_status_1.StatusException({
                error: res.error,
                result: null,
                message: this.errMessageUtilsTh.messageProcessFail,
                statusCode: 200
            }, 200);
        }
        else
            throw new callback_status_1.StatusException({
                error: null,
                result: this.errMessageUtilsTh.messageSuccessEn,
                message: this.errMessageUtilsTh.messageSuccess,
                statusCode: 200
            }, 200);
    }
};
SosService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [pg_database_1.dbConnection,
        err_message_th_utils_1.ErrMessageUtilsTH])
], SosService);
exports.SosService = SosService;
//# sourceMappingURL=sos.service.js.map