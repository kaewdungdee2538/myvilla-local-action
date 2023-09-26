"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCartypeCategoryModule = void 0;
const common_1 = require("@nestjs/common");
const default_middleware_1 = require("../../../middleware/default/default.middleware");
const vs_get_cartype_category_middleware_1 = require("../../../middleware/visitor/get-cartype-category/vs_get_cartype_category.middleware");
const vs_get_home_middleware_1 = require("../../../middleware/visitor/get-home/vs_get_home.middleware");
const pg_database_1 = require("../../../pg_database/pg.database");
const err_message_th_utils_1 = require("../../../utils/err_message_th.utils");
const format_data_utils_1 = require("../../../utils/format_data.utils");
const get_cartype_category_controller_1 = require("./get-cartype-category.controller");
const get_cartype_category_service_1 = require("./get-cartype-category.service");
let GetCartypeCategoryModule = class GetCartypeCategoryModule {
    configure(consumer) {
        consumer
            .apply(default_middleware_1.vsDefaultMiddleware, vs_get_home_middleware_1.vsGetHomeMiddleware, vs_get_cartype_category_middleware_1.vsGetCartypeCategoryMiddleware)
            .forRoutes('bannayuu/api/visitor/get-cartype-category/*');
    }
};
GetCartypeCategoryModule = __decorate([
    common_1.Module({
        controllers: [get_cartype_category_controller_1.GetCartypeCategoryController],
        providers: [
            get_cartype_category_service_1.GetCartypeCategoryService,
            pg_database_1.dbConnection,
            err_message_th_utils_1.ErrMessageUtilsTH,
            format_data_utils_1.FormatDataUtils
        ]
    })
], GetCartypeCategoryModule);
exports.GetCartypeCategoryModule = GetCartypeCategoryModule;
//# sourceMappingURL=get-cartype-category.module.js.map