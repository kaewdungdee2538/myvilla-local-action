"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetSlotModule = void 0;
const common_1 = require("@nestjs/common");
const default_middleware_1 = require("../../../middleware/default/default.middleware");
const vs_get_slot_middleware_1 = require("../../../middleware/visitor/get-slot/vs_get_slot.middleware");
const pg_database_1 = require("../../../pg_database/pg.database");
const err_message_th_utils_1 = require("../../../utils/err_message_th.utils");
const format_data_utils_1 = require("../../../utils/format_data.utils");
const get_slot_controller_1 = require("./get-slot.controller");
const get_slot_service_1 = require("./get-slot.service");
let GetSlotModule = class GetSlotModule {
    configure(consumer) {
        consumer
            .apply(default_middleware_1.vsDefaultMiddleware, vs_get_slot_middleware_1.VsGetSlotMiddleware)
            .forRoutes('bannayuu/api/visitor/get-slot/*');
        consumer
            .apply(vs_get_slot_middleware_1.VsGetSlotMiddleware, vs_get_slot_middleware_1.VsGetSlotBySlotNumberMiddleware)
            .forRoutes('bannayuu/api/visitor/get-slot/getbyslotnumber');
    }
};
GetSlotModule = __decorate([
    common_1.Module({
        imports: [pg_database_1.dbConnection],
        controllers: [get_slot_controller_1.GetSlotController],
        providers: [get_slot_service_1.GetSlotService, pg_database_1.dbConnection, format_data_utils_1.FormatDataUtils, err_message_th_utils_1.ErrMessageUtilsTH]
    })
], GetSlotModule);
exports.GetSlotModule = GetSlotModule;
//# sourceMappingURL=get-slot.module.js.map