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
exports.VsActionInCheckEmployeeMiddleWare = void 0;
const common_1 = require("@nestjs/common");
const pg_database_1 = require("../../../pg_database/pg.database");
let VsActionInCheckEmployeeMiddleWare = class VsActionInCheckEmployeeMiddleWare {
    constructor(dbconnecttion) {
        this.dbconnecttion = dbconnecttion;
    }
    async CheckInEmployee(body) {
        return await this.checkHaveInEmployee(body);
    }
    async CheckOutEmployee(body) {
        return await this.checkHaveOutEmployee(body);
    }
    async CheckCartypeCategoryInfo(body) {
        return await this.checkCartypeCategory(body);
    }
    async checkHaveInEmployee(body) {
        const employee_in_id = body.employee_in_id;
        const company_id = body.company_id;
        let sql = `select employee_id,employee_code,prefix_name_th,first_name_th,last_name_th from m_employee where employee_id = $1 and company_id = $2`;
        const query = {
            text: sql,
            values: [employee_in_id, company_id]
        };
        const result = await this.dbconnecttion.getPgData(query);
        if (result.error || result.result.length === 0)
            return null;
        else
            return result.result[0];
    }
    async checkHaveOutEmployee(body) {
        const employee_out_id = body.employee_out_id;
        const company_id = body.company_id;
        let sql = `select employee_id,employee_code,prefix_name_th,first_name_th,last_name_th from m_employee where employee_id = $1 and company_id = $2`;
        const query = {
            text: sql,
            values: [employee_out_id, company_id]
        };
        const result = await this.dbconnecttion.getPgData(query);
        if (result.error || result.result.length === 0)
            return null;
        else
            return result.result[0];
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
VsActionInCheckEmployeeMiddleWare = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [pg_database_1.dbConnection])
], VsActionInCheckEmployeeMiddleWare);
exports.VsActionInCheckEmployeeMiddleWare = VsActionInCheckEmployeeMiddleWare;
//# sourceMappingURL=vs_action_in_check_employee.middleware.js.map