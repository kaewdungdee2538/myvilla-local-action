"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionOutSaveModule = void 0;
const common_1 = require("@nestjs/common");
const card_manage_service_1 = require("../../../../middleware/card-manage/card-manage.service");
const slot_manage_service_1 = require("../../../../middleware/slot-manage/slot-manage.service");
const vs_action_in_check_employee_middleware_1 = require("../../../../middleware/visitor/action-in/vs_action_in_check_employee.middleware");
const vs_action_out_estamp_verify_middleware_1 = require("../../../../middleware/visitor/action-out/estamp-verify/vs_action_out_estamp_verify.middleware");
const vs_action_out_forsave_middleware_1 = require("../../../../middleware/visitor/action-out/save/vs_action_out_forsave.middleware");
const vs_action_out_slotorcard_middleware_1 = require("../../../../middleware/visitor/action-out/save/vs_action_out_slotorcard.middleware");
const pg_database_1 = require("../../../../pg_database/pg.database");
const err_message_th_utils_1 = require("../../../../utils/err_message_th.utils");
const format_data_utils_1 = require("../../../../utils/format_data.utils");
const load_setting_local_utils_1 = require("../../../../utils/load_setting_local.utils");
const action_out_controller_1 = require("./action-out.controller");
const action_out_service_1 = require("./action-out.service");
let ActionOutSaveModule = class ActionOutSaveModule {
};
ActionOutSaveModule = __decorate([
    common_1.Module({
        imports: [],
        controllers: [action_out_controller_1.ActionOutSaveController],
        providers: [
            action_out_service_1.ActionOutSaveService,
            format_data_utils_1.FormatDataUtils,
            err_message_th_utils_1.ErrMessageUtilsTH,
            pg_database_1.dbConnection,
            vs_action_out_slotorcard_middleware_1.VsActionOutSlotOrCardMiddleWare,
            vs_action_out_forsave_middleware_1.VsActionOutForSaveMiddleWare,
            card_manage_service_1.CardManageService,
            slot_manage_service_1.SlotManageService,
            vs_action_in_check_employee_middleware_1.VsActionInCheckEmployeeMiddleWare,
            load_setting_local_utils_1.LoadSettingLocalUtils,
            vs_action_out_estamp_verify_middleware_1.vsActionOutVerifyEstampMiddleware
        ]
    })
], ActionOutSaveModule);
exports.ActionOutSaveModule = ActionOutSaveModule;
//# sourceMappingURL=action-out.module.js.map