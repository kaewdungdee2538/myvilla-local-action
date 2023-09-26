"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParcelModule = void 0;
const common_1 = require("@nestjs/common");
const pg_database_1 = require("../../pg_database/pg.database");
const err_message_th_utils_1 = require("../../utils/err_message_th.utils");
const format_data_utils_1 = require("../../utils/format_data.utils");
const parcel_controller_1 = require("./parcel.controller");
const parcel_service_1 = require("./parcel.service");
let ParcelModule = class ParcelModule {
};
ParcelModule = __decorate([
    common_1.Module({
        controllers: [parcel_controller_1.ParcelController],
        providers: [parcel_service_1.ParcelService, pg_database_1.dbConnection, format_data_utils_1.FormatDataUtils, err_message_th_utils_1.ErrMessageUtilsTH]
    })
], ParcelModule);
exports.ParcelModule = ParcelModule;
//# sourceMappingURL=parcel.module.js.map