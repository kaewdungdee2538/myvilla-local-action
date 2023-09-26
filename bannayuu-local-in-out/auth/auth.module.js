"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const default_middleware_1 = require("../middleware/default/default.middleware");
const pg_database_1 = require("../pg_database/pg.database");
const err_message_th_utils_1 = require("../utils/err_message_th.utils");
const format_data_utils_1 = require("../utils/format_data.utils");
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./auth.service");
const constant_1 = require("./constant");
const jwt_strategy_1 = require("./jwt.strategy");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    common_1.Module({
        imports: [jwt_1.JwtModule.register({
                secret: constant_1.jwtConstants.secret,
            }), pg_database_1.dbConnection],
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService, jwt_strategy_1.JwtStrategy, pg_database_1.dbConnection, err_message_th_utils_1.ErrMessageUtilsTH, default_middleware_1.vsDefaultMiddleware, format_data_utils_1.FormatDataUtils],
        exports: [auth_service_1.AuthService, jwt_1.JwtModule]
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map