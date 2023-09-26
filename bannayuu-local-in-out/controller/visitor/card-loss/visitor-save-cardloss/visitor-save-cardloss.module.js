"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisitorSaveCardlossModule = void 0;
const common_1 = require("@nestjs/common");
const card_manage_service_1 = require("../../../../middleware/card-manage/card-manage.service");
const vs_action_in_check_employee_middleware_1 = require("../../../../middleware/visitor/action-in/vs_action_in_check_employee.middleware");
const vs_card_loss_save_middleware_1 = require("../../../../middleware/visitor/card-loss/save/vs_card_loss_save.middleware");
const vs_get_home_middleware_1 = require("../../../../middleware/visitor/get-home/vs_get_home.middleware");
const pg_database_1 = require("../../../../pg_database/pg.database");
const err_message_th_utils_1 = require("../../../../utils/err_message_th.utils");
const format_data_utils_1 = require("../../../../utils/format_data.utils");
const visitor_save_cardloss_controller_1 = require("./visitor-save-cardloss.controller");
const visitor_save_cardloss_service_1 = require("./visitor-save-cardloss.service");
let VisitorSaveCardlossModule = class VisitorSaveCardlossModule {
};
VisitorSaveCardlossModule = __decorate([
    common_1.Module({
        controllers: [visitor_save_cardloss_controller_1.VisitorSaveCardlossController],
        providers: [
            visitor_save_cardloss_service_1.VisitorSaveCardlossService,
            pg_database_1.dbConnection,
            format_data_utils_1.FormatDataUtils,
            err_message_th_utils_1.ErrMessageUtilsTH,
            vs_card_loss_save_middleware_1.vsCardLossSaveMiddleware,
            card_manage_service_1.CardManageService,
            vs_action_in_check_employee_middleware_1.VsActionInCheckEmployeeMiddleWare
        ]
    })
], VisitorSaveCardlossModule);
exports.VisitorSaveCardlossModule = VisitorSaveCardlossModule;
//# sourceMappingURL=visitor-save-cardloss.module.js.map