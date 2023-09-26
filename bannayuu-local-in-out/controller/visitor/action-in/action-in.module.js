"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionInModule = void 0;
const common_1 = require("@nestjs/common");
const vs_action_in_save_middleware_1 = require("../../../middleware/visitor/action-in/vs_action_in_save.middleware");
const vs_action_in_info_middleware_1 = require("../../../middleware/visitor/action-in/vs_action_in_info.middleware");
const pg_database_1 = require("../../../pg_database/pg.database");
const action_in_controller_1 = require("./action-in.controller");
const action_in_service_1 = require("./action-in.service");
const format_data_utils_1 = require("../../../utils/format_data.utils");
const err_message_th_utils_1 = require("../../../utils/err_message_th.utils");
const vs_action_in_checkslot_middleware_1 = require("../../../middleware/visitor/action-in/vs_action_in_checkslot.middleware");
const vs_action_in_checkhomeid_middleware_1 = require("../../../middleware/visitor/action-in/vs_action_in_checkhomeid.middleware");
const vs_action_in_check_employee_middleware_1 = require("../../../middleware/visitor/action-in/vs_action_in_check_employee.middleware");
const load_setting_local_utils_1 = require("../../../utils/load_setting_local.utils");
let ActionInModule = class ActionInModule {
};
ActionInModule = __decorate([
    common_1.Module({
        imports: [pg_database_1.dbConnection, common_1.HttpModule],
        controllers: [action_in_controller_1.ActionInController],
        providers: [
            action_in_service_1.ActionInService,
            pg_database_1.dbConnection,
            format_data_utils_1.FormatDataUtils,
            err_message_th_utils_1.ErrMessageUtilsTH,
            vs_action_in_checkslot_middleware_1.VsActionInCheckSlotMiddleWare,
            vs_action_in_info_middleware_1.VsActionInInfoMiddleWare,
            vs_action_in_save_middleware_1.VsActionInSaveMiddleware,
            vs_action_in_checkhomeid_middleware_1.VsActionInCheckHomeIDMiddleWare,
            vs_action_in_check_employee_middleware_1.VsActionInCheckEmployeeMiddleWare,
            load_setting_local_utils_1.LoadSettingLocalUtils,
        ],
    })
], ActionInModule);
exports.ActionInModule = ActionInModule;
//# sourceMappingURL=action-in.module.js.map