"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetVisitorOutHistoryModule = void 0;
const common_1 = require("@nestjs/common");
const get_visitor_out_history_controller_1 = require("./get-visitor-out-history.controller");
const get_visitor_out_history_service_1 = require("./get-visitor-out-history.service");
const pg_database_1 = require("../pg_database/pg.database");
const err_message_th_utils_1 = require("../utils/err_message_th.utils");
const format_data_utils_1 = require("../utils/format_data.utils");
const default_middleware_1 = require("../middleware/default/default.middleware");
const datetime_get_middleware_1 = require("../middleware/time/datetime-get.middleware");
let GetVisitorOutHistoryModule = class GetVisitorOutHistoryModule {
    configure(consumer) {
        consumer
            .apply(default_middleware_1.vsDefaultMiddleware, datetime_get_middleware_1.DateTimeGetMiddleware)
            .forRoutes('bannayuu/api/visitor/get-visitor-out/*');
    }
};
GetVisitorOutHistoryModule = __decorate([
    common_1.Module({
        controllers: [get_visitor_out_history_controller_1.GetVisitorOutHistoryController],
        providers: [get_visitor_out_history_service_1.GetVisitorOutHistoryService, pg_database_1.dbConnection, err_message_th_utils_1.ErrMessageUtilsTH, format_data_utils_1.FormatDataUtils]
    })
], GetVisitorOutHistoryModule);
exports.GetVisitorOutHistoryModule = GetVisitorOutHistoryModule;
//# sourceMappingURL=get-visitor-out-history.module.js.map