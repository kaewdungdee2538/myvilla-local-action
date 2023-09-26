"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VsEstampModule = void 0;
const common_1 = require("@nestjs/common");
const default_middleware_1 = require("../../../middleware/default/default.middleware");
const EstampGetVisitorInfo_middleware_1 = require("../../../middleware/estamp/EstampGetVisitorInfo.middleware");
const pg_database_1 = require("../../../pg_database/pg.database");
const err_message_th_utils_1 = require("../../../utils/err_message_th.utils");
const format_data_utils_1 = require("../../../utils/format_data.utils");
const vs_estamp_controller_1 = require("./vs-estamp.controller");
const vs_estamp_service_1 = require("./vs-estamp.service");
let VsEstampModule = class VsEstampModule {
    configure(consumer) {
        consumer
            .apply(default_middleware_1.vsDefaultMiddleware, EstampGetVisitorInfo_middleware_1.EstampGetVisitorInfoMiddleware)
            .forRoutes('bannayuu/api/visitor/estamp/get-visitorinfo');
    }
};
VsEstampModule = __decorate([
    common_1.Module({
        controllers: [vs_estamp_controller_1.VsEstampController],
        providers: [
            vs_estamp_service_1.VsEstampService,
            pg_database_1.dbConnection,
            err_message_th_utils_1.ErrMessageUtilsTH,
            format_data_utils_1.FormatDataUtils
        ]
    })
], VsEstampModule);
exports.VsEstampModule = VsEstampModule;
//# sourceMappingURL=vs-estamp.module.js.map