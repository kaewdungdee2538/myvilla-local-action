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
exports.VsActionOutForSaveMiddleWare = void 0;
const common_1 = require("@nestjs/common");
const err_message_th_utils_1 = require("../../../../utils/err_message_th.utils");
const format_data_utils_1 = require("../../../../utils/format_data.utils");
let VsActionOutForSaveMiddleWare = class VsActionOutForSaveMiddleWare {
    constructor(formatUtils, errMessageUtilsTh) {
        this.formatUtils = formatUtils;
        this.errMessageUtilsTh = errMessageUtilsTh;
    }
    CheckVisitorOut(body) {
        return this.checkVisitorValues(body);
    }
    checkVisitorValues(body) {
        if (!body.company_id)
            return this.errMessageUtilsTh.errCompanyIDNotFound;
        else if (this.formatUtils.HaveSpecialFormat(body.company_id))
            return this.errMessageUtilsTh.errCompanyIDProhibitSpecial;
        else if (!this.formatUtils.IsNumber(body.company_id))
            return this.errMessageUtilsTh.errCompanyIDNotNumber;
        else if (this.formatUtils.HaveSpecialFormat(body.company_code))
            return this.errMessageUtilsTh.errCompanyCodeProhibitSpecial;
        else if (!body.guardhouse_out_id)
            return this.errMessageUtilsTh.errGuardHouseIDNotFound;
        else if (this.formatUtils.HaveSpecialFormat(body.guardhouse_out_id))
            return this.errMessageUtilsTh.errGuardHouseIDProhibitSpecial;
        else if (!this.formatUtils.IsNumber(body.guardhouse_out_id))
            return this.errMessageUtilsTh.errGuardHouseIDNotNumber;
        else if (this.formatUtils.HaveSpecialFormat(body.guardhouse_out_code))
            return this.errMessageUtilsTh.errGuardHouseCodeProhibitSpecial;
        else if (!body.employee_out_id)
            return this.errMessageUtilsTh.errEmployeeIDNotFound;
        else if (this.formatUtils.HaveSpecialFormat(body.employee_out_id))
            return this.errMessageUtilsTh.errEmployeeIDProhibitSpecail;
        else if (!this.formatUtils.IsNumber(body.employee_out_id))
            return this.errMessageUtilsTh.errEmployeeIDNotNumber;
        else if (!body.pos_id)
            return this.errMessageUtilsTh.errPosIDNotFound;
        else if (this.formatUtils.HaveSpecialFormat(body.pos_id))
            return this.errMessageUtilsTh.errPosIDProhibitSpecial;
        return null;
    }
};
VsActionOutForSaveMiddleWare = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [format_data_utils_1.FormatDataUtils,
        err_message_th_utils_1.ErrMessageUtilsTH])
], VsActionOutForSaveMiddleWare);
exports.VsActionOutForSaveMiddleWare = VsActionOutForSaveMiddleWare;
//# sourceMappingURL=vs_action_out_forsave.middleware.js.map