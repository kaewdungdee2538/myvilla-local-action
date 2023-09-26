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
exports.BActionInMiddleware = void 0;
const common_1 = require("@nestjs/common");
const pg_database_1 = require("../../../pg_database/pg.database");
const err_message_th_utils_1 = require("../../../utils/err_message_th.utils");
const format_data_utils_1 = require("../../../utils/format_data.utils");
let BActionInMiddleware = class BActionInMiddleware {
    constructor(formatUtils, errMessageUtilsTh, dbconnecttion) {
        this.formatUtils = formatUtils;
        this.errMessageUtilsTh = errMessageUtilsTh;
        this.dbconnecttion = dbconnecttion;
    }
    async CheckSaveIn(body) {
        return await this.checkValuesActionIn(body);
    }
    async checkValuesActionIn(body) {
        if (!body.tbv_code)
            return this.errMessageUtilsTh.errฺBookingTbvCodeNotFound;
        else if (this.formatUtils.HaveSpecialFormat(body.tbv_code))
            return this.errMessageUtilsTh.errฺBookingTbvCodeProhibitSpecial;
        return null;
    }
    async checkTbvCode(body) {
        const company_id = body.company_id;
        const tbv_code = body.tbv_code;
        let sql = `select * 
        from 
        t_booking_visitor
        where 
        current_timestamp <= tbv_end_datetime
        and company_id = $1
        and tbv_code = $2
        and tbv_status = 'N'
        and delete_flag = 'N'
        limit 1
        ;`;
        const query = {
            text: sql,
            values: [company_id, tbv_code]
        };
        const res = await this.dbconnecttion.getPgData(query);
        if (res.error) {
            console.log(res.error);
            return null;
        }
        else if (res.result.length === 0) {
            console.log('Booking No data');
            return null;
        }
        return res.result[0];
    }
    async getHomeIDFromTbvCode(body) {
        const company_id = body.company_id;
        const tbv_code = body.tbv_code;
        let sql = `select home_id 
        from 
        t_booking_visitor tbv
		left join
		m_home_line mh on tbv.home_line_id = mh.home_line_id
        where current_timestamp <= tbv_end_datetime
        and tbv.company_id = $1
        and tbv_code = $2
        and tbv_status = 'N'
        and tbv.delete_flag = 'N'
        limit 1
        ;`;
        const query = {
            text: sql,
            values: [company_id, tbv_code]
        };
        const res = await this.dbconnecttion.getPgData(query);
        console.log(res);
        if (res.error) {
            console.log(res.error);
            return null;
        }
        else if (res.result.length === 0) {
            console.log('m_home_line Not home id');
            return null;
        }
        return res.result[0].home_id;
    }
    async checkCartypeCategory(body) {
        const company_id = body.company_id;
        const cartype_category_id = body.cartype_category_id;
        let sql = `select `;
        sql += `mcc.cartype_id,cartype_name_contraction,cartype_name_th,cartype_name_en`;
        sql += `,cartype_category_id,cartype_category_code`;
        sql += `,cartype_category_name_contraction`;
        sql += `,cartype_category_name_th,cartype_category_name_en`;
        sql += `,cartype_category_info`;
        sql += ` from m_cartype_category mcc inner join m_cartype mc on mcc.cartype_id = mc.cartype_id`;
        sql += ` where mcc.delete_flag ='N'`;
        sql += ` and mcc.company_id = $1`;
        sql += ` and mcc.cartype_category_id = $2`;
        sql += ` order by mcc.cartype_category_name_th;`;
        const query = {
            text: sql,
            values: [company_id, cartype_category_id]
        };
        console.log(JSON.stringify(query));
        const result = await this.dbconnecttion.getPgData(query);
        if (result.error || result.result.length === 0)
            return null;
        else
            return result.result[0];
    }
};
BActionInMiddleware = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [format_data_utils_1.FormatDataUtils,
        err_message_th_utils_1.ErrMessageUtilsTH,
        pg_database_1.dbConnection])
], BActionInMiddleware);
exports.BActionInMiddleware = BActionInMiddleware;
//# sourceMappingURL=b_action_in.middleware.js.map