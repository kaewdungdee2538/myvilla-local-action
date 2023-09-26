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
exports.SlotManageService = void 0;
const common_1 = require("@nestjs/common");
const pg_database_1 = require("../../pg_database/pg.database");
let SlotManageService = class SlotManageService {
    constructor(dbconnecttion) {
        this.dbconnecttion = dbconnecttion;
    }
    async getSlotNumberInDataBase(inputObj) {
        const company_id = inputObj.company_id;
        const visitor_slot_number = inputObj.visitor_slot_number;
        let sql = 'select * from m_visitor_slot where company_id = $1 and visitor_slot_number = $2;';
        const query = {
            text: sql,
            values: [company_id, visitor_slot_number]
        };
        const res = await this.dbconnecttion.getPgData(query);
        if (res.error) {
            console.log(res.error);
            return false;
        }
        else if (res.result.length === 0)
            return false;
        return true;
    }
    async getSlotNumberCheckIn(inputObj) {
        const company_id = inputObj.company_id;
        const visitor_slot_number = inputObj.visitor_slot_number;
        let sql = `select * from m_visitor_slot where status_flag = 'Y' and company_id = $1 and visitor_slot_number = $2;`;
        const query = {
            text: sql,
            values: [company_id, visitor_slot_number]
        };
        const res = await this.dbconnecttion.getPgData(query);
        if (res.error) {
            console.log(res.error);
            return false;
        }
        else if (res.result.length === 0)
            return false;
        return true;
    }
};
SlotManageService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [pg_database_1.dbConnection])
], SlotManageService);
exports.SlotManageService = SlotManageService;
//# sourceMappingURL=slot-manage.service.js.map