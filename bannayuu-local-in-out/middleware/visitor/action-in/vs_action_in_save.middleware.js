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
exports.VsActionInSaveMiddleware = void 0;
const common_1 = require("@nestjs/common");
const format_data_utils_1 = require("../../../utils/format_data.utils");
const callback_status_1 = require("../../../utils/callback.status");
const err_message_th_utils_1 = require("../../../utils/err_message_th.utils");
let VsActionInSaveMiddleware = class VsActionInSaveMiddleware {
    constructor(formatUtils, errMessageUtilsTh) {
        this.formatUtils = formatUtils;
        this.errMessageUtilsTh = errMessageUtilsTh;
    }
    CheckSaveIn(body) {
        return this.checkValuesActionInSave(body);
    }
    checkValuesActionInSave(body) {
        if (!body.cartype_category_id)
            return this.errMessageUtilsTh.errVisitorCartypeIDNotfound;
        else if (this.formatUtils.HaveSpecialFormat(body.cartype_category_id))
            return this.errMessageUtilsTh.errVisitorCartypeIDProhibitSpecail;
        else if (!this.formatUtils.IsNumber(body.cartype_category_id))
            return this.errMessageUtilsTh.errVisitorCartypeIDNotNumber;
        else if (!body.company_id)
            return this.errMessageUtilsTh.errCompanyIDNotFound;
        else if (!this.formatUtils.IsNumber(body.company_id))
            return this.errMessageUtilsTh.errCompanyIDNotNumber;
        else if (this.formatUtils.HaveSpecialFormat(body.company_id))
            return this.errMessageUtilsTh.errCompanyIDProhibitSpecial;
        else if (this.formatUtils.HaveSpecialFormat(body.company_code))
            return this.errMessageUtilsTh.errCompanyCodeProhibitSpecial;
        else if (!body.guardhouse_in_id)
            return this.errMessageUtilsTh.errGuardHouseIDNotFound;
        else if (!this.formatUtils.IsNumber(body.guardhouse_in_id))
            return this.errMessageUtilsTh.errGuardHouseIDNotNumber;
        else if (this.formatUtils.HaveSpecialFormat(body.guardhouse_in_id))
            return this.errMessageUtilsTh.errGuardHouseIDProhibitSpecial;
        else if (this.formatUtils.HaveSpecialFormat(body.guardhouse_in_code))
            return this.errMessageUtilsTh.errGuardHouseCodeProhibitSpecial;
        else if (!body.employee_in_id)
            return this.errMessageUtilsTh.errEmployeeIDNotFound;
        else if (this.formatUtils.HaveSpecialFormat(body.employee_in_id))
            return this.errMessageUtilsTh.errEmployeeIDProhibitSpecail;
        else if (!this.formatUtils.IsNumber(body.employee_in_id))
            return this.errMessageUtilsTh.errEmployeeIDNotNumber;
        return null;
    }
};
VsActionInSaveMiddleware = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [format_data_utils_1.FormatDataUtils,
        err_message_th_utils_1.ErrMessageUtilsTH])
], VsActionInSaveMiddleware);
exports.VsActionInSaveMiddleware = VsActionInSaveMiddleware;
;
//# sourceMappingURL=vs_action_in_save.middleware.js.map