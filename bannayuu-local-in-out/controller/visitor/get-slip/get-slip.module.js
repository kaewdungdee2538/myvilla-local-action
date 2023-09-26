"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetSlipModule = void 0;
const common_1 = require("@nestjs/common");
const default_middleware_1 = require("../../../middleware/default/default.middleware");
const vs_get_home_middleware_1 = require("../../../middleware/visitor/get-home/vs_get_home.middleware");
const vs_get_slip_in_middleware_1 = require("../../../middleware/visitor/get-slip/vs_get_slip_in.middleware");
const vs_get_slip_out_middleware_1 = require("../../../middleware/visitor/get-slip/vs_get_slip_out.middleware");
const pg_database_1 = require("../../../pg_database/pg.database");
const err_message_th_utils_1 = require("../../../utils/err_message_th.utils");
const format_data_utils_1 = require("../../../utils/format_data.utils");
const get_slip_controller_1 = require("./get-slip.controller");
const get_slip_service_1 = require("./get-slip.service");
let GetSlipModule = class GetSlipModule {
    configure(consumer) {
        consumer
            .apply(default_middleware_1.vsDefaultMiddleware, vs_get_home_middleware_1.vsGetHomeMiddleware)
            .forRoutes('bannayuu/api/visitor/get-slip/*');
        consumer
            .apply(default_middleware_1.vsDefaultMiddleware, vs_get_home_middleware_1.vsGetHomeMiddleware, vs_get_slip_in_middleware_1.vsGetSlipInMiddleware)
            .forRoutes('bannayuu/api/visitor/get-slip/slipin');
        consumer
            .apply(default_middleware_1.vsDefaultMiddleware, vs_get_home_middleware_1.vsGetHomeMiddleware, vs_get_slip_out_middleware_1.vsGetSlipOutMiddleware)
            .forRoutes('bannayuu/api/visitor/get-slip/slipout');
    }
};
GetSlipModule = __decorate([
    common_1.Module({
        controllers: [get_slip_controller_1.GetSlipController],
        providers: [get_slip_service_1.GetSlipService, pg_database_1.dbConnection, err_message_th_utils_1.ErrMessageUtilsTH, format_data_utils_1.FormatDataUtils],
    })
], GetSlipModule);
exports.GetSlipModule = GetSlipModule;
//# sourceMappingURL=get-slip.module.js.map