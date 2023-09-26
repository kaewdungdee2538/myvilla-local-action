"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VsActionInCheckHomeIDMiddleWare = void 0;
const common_1 = require("@nestjs/common");
const err_message_th_utils_1 = require("../../../utils/err_message_th.utils");
const format_data_utils_1 = require("../../../utils/format_data.utils");
const pg_database_1 = require("../../../pg_database/pg.database");
let VsActionInCheckHomeIDMiddleWare = class VsActionInCheckHomeIDMiddleWare {
    constructor(dbconnecttion, formatUtils, errMessageUtilsTh) {
        this.dbconnecttion = dbconnecttion;
        this.formatUtils = formatUtils;
        this.errMessageUtilsTh = errMessageUtilsTh;
    }
    async CheckHomeID(body, getHomeIDFromTBV) {
        return await this.checkHaveHomeID(body, getHomeIDFromTBV);
    }
    async checkHaveHomeID(body, getHomeIDFromTBV) {
        const home_id = getHomeIDFromTBV;
        const company_id = body.company_id;
        console.log(company_id);
        let sql = `select * from m_home where home_id = $1 and company_id =$2;`;
        const query = {
            text: sql,
            values: [home_id, company_id]
        };
        const result = await this.dbconnecttion.getPgData(query);
        if (result.error || result.result.length === 0)
            return null;
        else
            return result.result[0];
    }
};
VsActionInCheckHomeIDMiddleWare = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [pg_database_1.dbConnection,
        format_data_utils_1.FormatDataUtils,
        err_message_th_utils_1.ErrMessageUtilsTH])
], VsActionInCheckHomeIDMiddleWare);
exports.VsActionInCheckHomeIDMiddleWare = VsActionInCheckHomeIDMiddleWare;
//# sourceMappingURL=vs_action_in_checkhomeid.middleware.js.map