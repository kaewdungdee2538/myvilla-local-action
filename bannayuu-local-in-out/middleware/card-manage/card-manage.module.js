"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardManageModule = void 0;
const common_1 = require("@nestjs/common");
const pg_database_1 = require("../../pg_database/pg.database");
const card_manage_controller_1 = require("./card-manage.controller");
const card_manage_service_1 = require("./card-manage.service");
let CardManageModule = class CardManageModule {
};
CardManageModule = __decorate([
    common_1.Module({
        controllers: [card_manage_controller_1.CardManageController],
        providers: [
            card_manage_service_1.CardManageService,
            pg_database_1.dbConnection
        ]
    })
], CardManageModule);
exports.CardManageModule = CardManageModule;
//# sourceMappingURL=card-manage.module.js.map