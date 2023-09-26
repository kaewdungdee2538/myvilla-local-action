"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetBookingOutInfoModule = void 0;
const common_1 = require("@nestjs/common");
const cal_timediff_service_1 = require("../../cal-timediff/cal-timediff.service");
const b_get_booking_info_middleware_1 = require("../../../middleware/booking/get-booking-info/b_get_booking_info.middleware");
const b_get_booking_out_info_middleware_1 = require("../../../middleware/booking/get-booking-out-info/b_get_booking_out_info.middleware");
const default_middleware_1 = require("../../../middleware/default/default.middleware");
const vs_get_home_middleware_1 = require("../../../middleware/visitor/get-home/vs_get_home.middleware");
const pg_database_1 = require("../../../pg_database/pg.database");
const err_message_th_utils_1 = require("../../../utils/err_message_th.utils");
const format_data_utils_1 = require("../../../utils/format_data.utils");
const load_setting_local_utils_1 = require("../../../utils/load_setting_local.utils");
const get_booking_out_info_controller_1 = require("./get-booking-out-info.controller");
const get_booking_out_info_service_1 = require("./get-booking-out-info.service");
let GetBookingOutInfoModule = class GetBookingOutInfoModule {
    configure(consumer) {
        consumer
            .apply(default_middleware_1.vsDefaultMiddleware, vs_get_home_middleware_1.vsGetHomeMiddleware, b_get_booking_info_middleware_1.bGetBookingInfoMiddleware, b_get_booking_out_info_middleware_1.bGetBookingOutInfoMiddleware)
            .forRoutes('bannayuu/api/booking/get-booking-out-info/*');
    }
};
GetBookingOutInfoModule = __decorate([
    common_1.Module({
        imports: [
            common_1.HttpModule
        ],
        controllers: [get_booking_out_info_controller_1.GetBookingOutInfoController],
        providers: [
            get_booking_out_info_service_1.GetBookingOutInfoService,
            pg_database_1.dbConnection,
            format_data_utils_1.FormatDataUtils,
            err_message_th_utils_1.ErrMessageUtilsTH,
            pg_database_1.dbConnection,
            load_setting_local_utils_1.LoadSettingLocalUtils,
            cal_timediff_service_1.CalTimediffService
        ]
    })
], GetBookingOutInfoModule);
exports.GetBookingOutInfoModule = GetBookingOutInfoModule;
//# sourceMappingURL=get-booking-out-info.module.js.map