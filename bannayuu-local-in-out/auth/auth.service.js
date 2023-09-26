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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const default_middleware_1 = require("../middleware/default/default.middleware");
const pg_database_1 = require("../pg_database/pg.database");
const callback_status_1 = require("../utils/callback.status");
const err_message_th_utils_1 = require("../utils/err_message_th.utils");
let AuthService = class AuthService {
    constructor(errMessageUtilsTh, jwtService, dbconnecttion, defaultValueMiddleware) {
        this.errMessageUtilsTh = errMessageUtilsTh;
        this.jwtService = jwtService;
        this.dbconnecttion = dbconnecttion;
        this.defaultValueMiddleware = defaultValueMiddleware;
    }
    async validateUser(user) {
        console.log(user.username + user.password);
        let sql = `select employee_id, employee_code,first_name_th,last_name_th,username,(passcode = crypt($2, passcode)) as password_status 
        ,me.company_id
        ,mc.company_start_date as start_date
        ,mc.company_expire_date as expire_date
        FROM m_employee me
        inner join m_employee_privilege mep on me.employee_privilege_id = mep.employee_privilege_id
        left join m_company mc
        on me.company_id = mc.company_id
        WHERE me.username = $1 
         and me.delete_flag = 'N' 
         and mep.delete_flag ='N' 
         and mep.login_general_status='Y' 
         and me.company_id = $3;`;
        const querys = {
            text: sql,
            values: [user.username, user.password, user.company_id]
        };
        const result = await this.dbconnecttion.getPgData(querys);
        return result;
    }
    async login(user) {
        const response = await this.validateUser(user);
        console.log(response);
        console.log(await response.result.length);
        if (await response.error) {
            throw new callback_status_1.StatusException({
                error: this.errMessageUtilsTh.errLoginFail,
                result: null,
                message: this.errMessageUtilsTh.errLoginFail,
                statusCode: 200
            }, 200);
        }
        else if (await response.result.length === 0) {
            throw new callback_status_1.StatusException({
                error: this.errMessageUtilsTh.errLoginUserOrPasswordNotValid,
                result: null,
                message: this.errMessageUtilsTh.errLoginUserOrPasswordNotValid,
                statusCode: 200
            }, 200);
        }
        else if (await response.result[0].password_status) {
            const checkCompant = await this.defaultValueMiddleware.CheckCompanyInBase({ company_id: response.result[0].company_id });
            if (checkCompant)
                throw new callback_status_1.StatusException({
                    error: checkCompant,
                    result: null,
                    message: checkCompant,
                    statusCode: 200
                }, 200);
            const payload = { employee: response.result[0] };
            console.log(payload);
            const access_token = this.jwtService.sign(payload, { expiresIn: '30 days' });
            console.log('login : ' + JSON.stringify(payload) + 'access_token : ' + access_token);
            throw new callback_status_1.StatusException({
                error: null,
                result: {
                    access_token,
                    employee: response.result[0]
                },
                message: this.errMessageUtilsTh.messageSuccess,
                statusCode: 200
            }, 200);
        }
        else {
            throw new callback_status_1.StatusException({
                error: this.errMessageUtilsTh.errLoginUserOrPasswordNotValid,
                result: null,
                message: this.errMessageUtilsTh.errLoginUserOrPasswordNotValid,
                statusCode: 200
            }, 200);
        }
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [err_message_th_utils_1.ErrMessageUtilsTH,
        jwt_1.JwtService,
        pg_database_1.dbConnection,
        default_middleware_1.vsDefaultMiddleware])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map