"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LPRBCheckInModule = void 0;
const common_1 = require("@nestjs/common");
const default_middleware_1 = require("../../../middleware/default/default.middleware");
const lpr_b_check_in_middleware_1 = require("../../../middleware/lpr/b-check-in/lpr_b_check_in.middleware");
const pg_database_1 = require("../../../pg_database/pg.database");
const err_message_th_utils_1 = require("../../../utils/err_message_th.utils");
const format_data_utils_1 = require("../../../utils/format_data.utils");
const b_check_in_controller_1 = require("./b-check-in.controller");
const b_check_in_service_1 = require("./b-check-in.service");
let LPRBCheckInModule = class LPRBCheckInModule {
    configure(consumer) {
        consumer
            .apply(default_middleware_1.vsDefaultMiddleware, lpr_b_check_in_middleware_1.LPRBookingCheckInMiddleware)
            .forRoutes('bannayuu/api/lpr/booking/check-in/get');
    }
};
LPRBCheckInModule = __decorate([
    common_1.Module({
        controllers: [b_check_in_controller_1.LPRBCheckInController],
        providers: [
            b_check_in_service_1.LPRBCheckInService,
            pg_database_1.dbConnection,
            format_data_utils_1.FormatDataUtils,
            err_message_th_utils_1.ErrMessageUtilsTH
        ]
    })
], LPRBCheckInModule);
exports.LPRBCheckInModule = LPRBCheckInModule;
//# sourceMappingURL=b-check-in.module.js.map