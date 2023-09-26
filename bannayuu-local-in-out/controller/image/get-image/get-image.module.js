"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetImageModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_strategy_1 = require("../../../auth/jwt.strategy");
const get_image_manual_middleware_1 = require("../../../middleware/image_manual/get-image-manual/get-image-manual.middleware");
const pg_database_1 = require("../../../pg_database/pg.database");
const err_message_th_utils_1 = require("../../../utils/err_message_th.utils");
const format_data_utils_1 = require("../../../utils/format_data.utils");
const get_image_controller_1 = require("./get-image.controller");
const get_image_service_1 = require("./get-image.service");
let GetImageModule = class GetImageModule {
    configure(consumer) {
        consumer
            .apply(get_image_manual_middleware_1.getImageManualMiddleware)
            .forRoutes('bannayuu/api/manual/get-image/*');
    }
};
GetImageModule = __decorate([
    common_1.Module({
        controllers: [get_image_controller_1.GetImageController],
        providers: [
            get_image_service_1.GetImageService,
            pg_database_1.dbConnection,
            err_message_th_utils_1.ErrMessageUtilsTH,
            format_data_utils_1.FormatDataUtils,
            jwt_strategy_1.JwtStrategy
        ]
    })
], GetImageModule);
exports.GetImageModule = GetImageModule;
//# sourceMappingURL=get-image.module.js.map