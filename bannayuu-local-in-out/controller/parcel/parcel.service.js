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
exports.ParcelService = void 0;
const common_1 = require("@nestjs/common");
const pg_database_1 = require("../../pg_database/pg.database");
const callback_status_1 = require("../../utils/callback.status");
const err_message_th_utils_1 = require("../../utils/err_message_th.utils");
let ParcelService = class ParcelService {
    constructor(errMessageUtilsTh, dbconnecttion) {
        this.errMessageUtilsTh = errMessageUtilsTh;
        this.dbconnecttion = dbconnecttion;
    }
    async addParcelReceive(body, req, pathCustomer) {
        const employeeObj = req.user.employee;
        const image_parcel_receive = pathCustomer[0];
        const company_id = body.company_id;
        const tpi_title = body.tpi_title;
        const tpi_detail = body.tpi_detail;
        const receive_parcel_detail = body.receive_parcel_detail;
        const home_address = body.home_address;
        const employee_id = employeeObj.employee_id;
        const receive_parcel_data = {
            image_parcel_receive
        };
        let sql = `insert into t_parcel_info (
            tpi_code,tpi_datetime
            ,tpi_title,tpi_detail
            ,receive_parcel_datetime,receive_parcel_by
            ,receive_parcel_detail,receive_parcel_data
            ,home_id
            ,company_id
            ,tpi_status   
            ,create_by,create_date     
        ) values(
            fun_generate_uuid('TPI'||trim(to_char(${company_id},'000')),5),current_timestamp
            ,$1,$2
            ,current_timestamp,$3
            ,$4,$5
            ,(select home_id from m_home where home_address = $6 and company_id = $7 and delete_flag = 'N')
            ,$7
            ,'receive_parcel'
            ,$8,current_timestamp
        );`;
        const query = {
            text: sql,
            values: [
                tpi_title, tpi_detail,
                employee_id,
                receive_parcel_detail, receive_parcel_data,
                home_address,
                company_id,
                employee_id
            ]
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
ParcelService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [err_message_th_utils_1.ErrMessageUtilsTH,
        pg_database_1.dbConnection])
], ParcelService);
exports.ParcelService = ParcelService;
//# sourceMappingURL=parcel.service.js.map