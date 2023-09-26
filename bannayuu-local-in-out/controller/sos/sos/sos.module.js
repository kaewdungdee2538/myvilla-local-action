"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SosModule = void 0;
const common_1 = require("@nestjs/common");
const default_middleware_1 = require("../../../middleware/default/default.middleware");
const sos_get_by_id_middleware_1 = require("../../../middleware/sos/sos-get-by-id.middleware");
const sos_save_receive_middleware_1 = require("../../../middleware/sos/sos-save-receive.middleware");
const datetime_get_middleware_1 = require("../../../middleware/time/datetime-get.middleware");
const user_get_middleware_1 = require("../../../middleware/user/user-get.middleware");
const pg_database_1 = require("../../../pg_database/pg.database");
const err_message_th_utils_1 = require("../../../utils/err_message_th.utils");
const format_data_utils_1 = require("../../../utils/format_data.utils");
const sos_controller_1 = require("./sos.controller");
const sos_service_1 = require("./sos.service");
let SosModule = class SosModule {
    configure(consumer) {
        consumer
            .apply(default_middleware_1.vsDefaultMiddleware)
            .forRoutes('bannayuu/api/sos/*');
        consumer
            .apply(datetime_get_middleware_1.DateTimeGetMiddleware)
            .forRoutes('bannayuu/api/sos/get-history');
        consumer
            .apply(sos_get_by_id_middleware_1.SosGetInfoById)
            .forRoutes('bannayuu/api/sos/get-by-id');
        consumer
            .apply(sos_save_receive_middleware_1.SosSaveGetInfoById, user_get_middleware_1.UserGetMiddleware)
            .forRoutes('bannayuu/api/sos/corporate-receive');
    }
};
SosModule = __decorate([
    common_1.Module({
        controllers: [sos_controller_1.SosController],
        providers: [
            sos_service_1.SosService,
            pg_database_1.dbConnection,
            err_message_th_utils_1.ErrMessageUtilsTH,
            format_data_utils_1.FormatDataUtils
        ]
    })
], SosModule);
exports.SosModule = SosModule;
//# sourceMappingURL=sos.module.js.map