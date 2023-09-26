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
exports.CardManageService = void 0;
const common_1 = require("@nestjs/common");
const pg_database_1 = require("../../pg_database/pg.database");
let CardManageService = class CardManageService {
    constructor(dbconnecttion) {
        this.dbconnecttion = dbconnecttion;
    }
    async getCardInDataBase(inputObj) {
        const company_id = inputObj.company_id;
        const card_code = inputObj.card_code;
        const card_name = inputObj.card_name;
        let sql = `select * from m_card where delete_flag ='N' and company_id = $1 and (card_code = $2 or card_name = $3);`;
        const query = {
            text: sql,
            values: [company_id, card_code, card_name]
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
    async getCardCheckIn(inputObj) {
        const company_id = inputObj.company_id;
        const card_code = inputObj.card_code;
        const card_name = inputObj.card_name;
        let sql = `select * from m_card where status_flag = 'Y' and delete_flag ='N' and company_id = $1 and (card_code = $2 or card_name = $3);`;
        const query = {
            text: sql,
            values: [company_id, card_code, card_name]
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
CardManageService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [pg_database_1.dbConnection])
], CardManageService);
exports.CardManageService = CardManageService;
//# sourceMappingURL=card-manage.service.js.map