"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LptBSaveOutModule = void 0;
const common_1 = require("@nestjs/common");
const b_action_out_middleware_1 = require("../../../middleware/booking/action-out/b_action_out.middleware");
const b_get_booking_out_info_middleware_1 = require("../../../middleware/booking/get-booking-out-info/b_get_booking_out_info.middleware");
const vs_action_in_check_employee_middleware_1 = require("../../../middleware/visitor/action-in/vs_action_in_check_employee.middleware");
const pg_database_1 = require("../../../pg_database/pg.database");
const err_message_th_utils_1 = require("../../../utils/err_message_th.utils");
const format_data_utils_1 = require("../../../utils/format_data.utils");
const load_setting_local_utils_1 = require("../../../utils/load_setting_local.utils");
const lpt_b_save_out_controller_1 = require("./lpt-b-save-out.controller");
const lpt_b_save_out_service_1 = require("./lpt-b-save-out.service");
let LptBSaveOutModule = class LptBSaveOutModule {
};
LptBSaveOutModule = __decorate([
    common_1.Module({
        controllers: [lpt_b_save_out_controller_1.LptBSaveOutController],
        providers: [
            lpt_b_save_out_service_1.LptBSaveOutService,
            pg_database_1.dbConnection,
            format_data_utils_1.FormatDataUtils,
            err_message_th_utils_1.ErrMessageUtilsTH,
            b_action_out_middleware_1.BActionOutMiddleware,
            b_get_booking_out_info_middleware_1.bGetBookingOutInfoMiddleware,
            load_setting_local_utils_1.LoadSettingLocalUtils,
            vs_action_in_check_employee_middleware_1.VsActionInCheckEmployeeMiddleWare
        ]
    })
], LptBSaveOutModule);
exports.LptBSaveOutModule = LptBSaveOutModule;
//# sourceMappingURL=lpt-b-save-out.module.js.map