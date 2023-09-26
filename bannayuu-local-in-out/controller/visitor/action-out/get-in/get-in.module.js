"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetInModule = void 0;
const common_1 = require("@nestjs/common");
const constant_1 = require("../../../../auth/constant");
const jwt_strategy_1 = require("../../../../auth/jwt.strategy");
const cal_timediff_service_1 = require("../../../cal-timediff/cal-timediff.service");
const registry_image_module_1 = require("../../../image/registry-image/registry-image.module");
const registry_image_service_1 = require("../../../image/registry-image/registry-image.service");
const default_middleware_1 = require("../../../../middleware/default/default.middleware");
const vs_action_out_estamp_verify_middleware_1 = require("../../../../middleware/visitor/action-out/estamp-verify/vs_action_out_estamp_verify.middleware");
const vs_action_out_get_in_middleware_1 = require("../../../../middleware/visitor/action-out/get-in/vs_action_out_get_in.middleware");
const pg_database_1 = require("../../../../pg_database/pg.database");
const err_message_th_utils_1 = require("../../../../utils/err_message_th.utils");
const format_data_utils_1 = require("../../../../utils/format_data.utils");
const load_setting_local_utils_1 = require("../../../../utils/load_setting_local.utils");
const get_in_controller_1 = require("./get-in.controller");
const get_in_service_1 = require("./get-in.service");
let GetInModule = class GetInModule {
    configure(consumer) {
        consumer
            .apply(default_middleware_1.vsDefaultMiddleware, vs_action_out_get_in_middleware_1.vsActionOutGetInMiddleware, vs_action_out_estamp_verify_middleware_1.vsActionOutVerifyEstampMiddleware)
            .forRoutes('bannayuu/api/visitor/action/out/get-in/*');
    }
};
GetInModule = __decorate([
    common_1.Module({
        imports: [
            registry_image_module_1.RegistryImageModule,
            common_1.HttpModule
        ],
        controllers: [get_in_controller_1.GetInController],
        providers: [
            get_in_service_1.GetInService,
            pg_database_1.dbConnection,
            err_message_th_utils_1.ErrMessageUtilsTH,
            format_data_utils_1.FormatDataUtils,
            registry_image_service_1.RegistryImageService,
            load_setting_local_utils_1.LoadSettingLocalUtils,
            cal_timediff_service_1.CalTimediffService
        ],
    })
], GetInModule);
exports.GetInModule = GetInModule;
//# sourceMappingURL=get-in.module.js.map