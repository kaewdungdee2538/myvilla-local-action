"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BActionInModule = void 0;
const common_1 = require("@nestjs/common");
const b_action_in_interceptor_1 = require("../../../interceptor/booking/action-in/b-action-in.interceptor");
const b_action_in_middleware_1 = require("../../../middleware/booking/action-in/b_action_in.middleware");
const vs_action_in_checkhomeid_middleware_1 = require("../../../middleware/visitor/action-in/vs_action_in_checkhomeid.middleware");
const vs_action_in_check_employee_middleware_1 = require("../../../middleware/visitor/action-in/vs_action_in_check_employee.middleware");
const vs_action_in_info_middleware_1 = require("../../../middleware/visitor/action-in/vs_action_in_info.middleware");
const vs_action_in_save_middleware_1 = require("../../../middleware/visitor/action-in/vs_action_in_save.middleware");
const pg_database_1 = require("../../../pg_database/pg.database");
const err_message_th_utils_1 = require("../../../utils/err_message_th.utils");
const format_data_utils_1 = require("../../../utils/format_data.utils");
const load_setting_local_utils_1 = require("../../../utils/load_setting_local.utils");
const b_action_in_controller_1 = require("./b-action-in.controller");
const b_action_in_service_1 = require("./b-action-in.service");
let BActionInModule = class BActionInModule {
};
BActionInModule = __decorate([
    common_1.Module({
        imports: [common_1.HttpModule],
        controllers: [b_action_in_controller_1.BActionInController],
        providers: [
            b_action_in_service_1.BActionInService,
            pg_database_1.dbConnection,
            format_data_utils_1.FormatDataUtils,
            err_message_th_utils_1.ErrMessageUtilsTH,
            b_action_in_interceptor_1.BActionInInterceptor,
            b_action_in_middleware_1.BActionInMiddleware,
            vs_action_in_info_middleware_1.VsActionInInfoMiddleWare,
            vs_action_in_save_middleware_1.VsActionInSaveMiddleware,
            vs_action_in_checkhomeid_middleware_1.VsActionInCheckHomeIDMiddleWare,
            vs_action_in_check_employee_middleware_1.VsActionInCheckEmployeeMiddleWare,
            load_setting_local_utils_1.LoadSettingLocalUtils,
        ],
    })
], BActionInModule);
exports.BActionInModule = BActionInModule;
//# sourceMappingURL=b-action-in.module.js.map