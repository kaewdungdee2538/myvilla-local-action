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
exports.HttpCalculateService = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
const pg_database_1 = require("../../pg_database/pg.database");
const err_message_th_utils_1 = require("../../utils/err_message_th.utils");
let HttpCalculateService = class HttpCalculateService {
    constructor(dbconnecttion, errMessageUtilsTh, httpService) {
        this.dbconnecttion = dbconnecttion;
        this.errMessageUtilsTh = errMessageUtilsTh;
        this.httpService = httpService;
    }
    async getCalculate(valuesObj) {
        const company_id = valuesObj.company_id;
        const visitor_record_id = valuesObj.visitor_record_id;
        const employee_id = valuesObj.employee_id;
        const start_date = valuesObj.start_date;
        const end_date = valuesObj.end_date;
        const cartype_id = valuesObj.cartype_id;
        const promotion_code = valuesObj.promotion_code;
        const params = {
            company_id,
            visitor_record_id,
            employee_id,
            start_date,
            end_date,
            cartype_id,
            promotion_code
        };
        console.log('awdawdawd');
        const ggggg = await this.httpService.get('http://localhost:4060')
            .pipe(operators_1.map(response => response.data), operators_1.catchError(error => {
            throw new common_1.HttpException(error.response.data, error.response.status);
        }));
        console.log(ggggg);
    }
};
HttpCalculateService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [pg_database_1.dbConnection,
        err_message_th_utils_1.ErrMessageUtilsTH,
        common_1.HttpService])
], HttpCalculateService);
exports.HttpCalculateService = HttpCalculateService;
//# sourceMappingURL=http-calculate.service.js.map