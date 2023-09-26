"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisitorGetPriceofcardlossModule = void 0;
const common_1 = require("@nestjs/common");
const default_middleware_1 = require("../../../../middleware/default/default.middleware");
const vs_get_home_middleware_1 = require("../../../../middleware/visitor/get-home/vs_get_home.middleware");
const pg_database_1 = require("../../../../pg_database/pg.database");
const err_message_th_utils_1 = require("../../../../utils/err_message_th.utils");
const format_data_utils_1 = require("../../../../utils/format_data.utils");
const visitor_get_priceofcardloss_controller_1 = require("./visitor-get-priceofcardloss.controller");
const visitor_get_priceofcardloss_service_1 = require("./visitor-get-priceofcardloss.service");
let VisitorGetPriceofcardlossModule = class VisitorGetPriceofcardlossModule {
    configure(consumer) {
        consumer
            .apply(default_middleware_1.vsDefaultMiddleware, vs_get_home_middleware_1.vsGetHomeMiddleware)
            .forRoutes('bannayuu/api/visitor/cardloss/get-priceofcardloss/*');
    }
};
VisitorGetPriceofcardlossModule = __decorate([
    common_1.Module({
        controllers: [visitor_get_priceofcardloss_controller_1.VisitorGetPriceofcardlossController],
        providers: [visitor_get_priceofcardloss_service_1.VisitorGetPriceofcardlossService, pg_database_1.dbConnection, format_data_utils_1.FormatDataUtils, err_message_th_utils_1.ErrMessageUtilsTH]
    })
], VisitorGetPriceofcardlossModule);
exports.VisitorGetPriceofcardlossModule = VisitorGetPriceofcardlossModule;
//# sourceMappingURL=visitor-get-priceofcardloss.module.js.map