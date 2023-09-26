"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlotManageModule = void 0;
const common_1 = require("@nestjs/common");
const pg_database_1 = require("../../pg_database/pg.database");
const slot_manage_controller_1 = require("./slot-manage.controller");
const slot_manage_service_1 = require("./slot-manage.service");
let SlotManageModule = class SlotManageModule {
};
SlotManageModule = __decorate([
    common_1.Module({
        controllers: [slot_manage_controller_1.SlotManageController],
        providers: [
            slot_manage_service_1.SlotManageService,
            pg_database_1.dbConnection
        ]
    })
], SlotManageModule);
exports.SlotManageModule = SlotManageModule;
//# sourceMappingURL=slot-manage.module.js.map