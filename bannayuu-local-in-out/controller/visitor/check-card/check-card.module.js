"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckCardModule = void 0;
const common_1 = require("@nestjs/common");
const card_manage_service_1 = require("../../../middleware/card-manage/card-manage.service");
const default_middleware_1 = require("../../../middleware/default/default.middleware");
const vs_check_card_middleware_1 = require("../../../middleware/visitor/check-card/vs_check_card.middleware");
const pg_database_1 = require("../../../pg_database/pg.database");
const err_message_th_utils_1 = require("../../../utils/err_message_th.utils");
const format_data_utils_1 = require("../../../utils/format_data.utils");
const check_card_controller_1 = require("./check-card.controller");
const check_card_service_1 = require("./check-card.service");
let CheckCardModule = class CheckCardModule {
    configure(consumer) {
        consumer
            .apply(default_middleware_1.vsDefaultMiddleware, vs_check_card_middleware_1.vsCheckCardMiddleware)
            .forRoutes('bannayuu/api/visitor/check-card/*');
    }
};
CheckCardModule = __decorate([
    common_1.Module({
        controllers: [check_card_controller_1.CheckCardController],
        providers: [
            check_card_service_1.CheckCardService,
            pg_database_1.dbConnection,
            err_message_th_utils_1.ErrMessageUtilsTH,
            format_data_utils_1.FormatDataUtils,
            card_manage_service_1.CardManageService
        ]
    })
], CheckCardModule);
exports.CheckCardModule = CheckCardModule;
//# sourceMappingURL=check-card.module.js.map