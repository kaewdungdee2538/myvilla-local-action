"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpCalculateModule = void 0;
const http_calculate_controller_1 = require("./http-calculate.controller");
const http_calculate_service_1 = require("./http-calculate.service");
const common_1 = require("@nestjs/common");
const pg_database_1 = require("../../pg_database/pg.database");
const err_message_th_utils_1 = require("../../utils/err_message_th.utils");
let HttpCalculateModule = class HttpCalculateModule {
};
HttpCalculateModule = __decorate([
    common_1.Module({
        imports: [
            common_1.HttpModule
        ],
        controllers: [http_calculate_controller_1.HttpCalculateController],
        providers: [http_calculate_service_1.HttpCalculateService,
            pg_database_1.dbConnection,
            err_message_th_utils_1.ErrMessageUtilsTH,
            common_1.HttpService,
            common_1.HttpModule
        ],
        exports: [
            common_1.HttpModule, common_1.HttpService
        ]
    })
], HttpCalculateModule);
exports.HttpCalculateModule = HttpCalculateModule;
//# sourceMappingURL=http-calculate.module.js.map