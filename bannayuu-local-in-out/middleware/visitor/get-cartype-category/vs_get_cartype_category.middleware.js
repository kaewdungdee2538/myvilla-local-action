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
exports.vsGetCartypeCategoryMiddleware = void 0;
const common_1 = require("@nestjs/common");
const err_message_th_utils_1 = require("../../../utils/err_message_th.utils");
const format_data_utils_1 = require("../../../utils/format_data.utils");
let vsGetCartypeCategoryMiddleware = class vsGetCartypeCategoryMiddleware {
    constructor(errMessageUrilTh, formatDataUtils) {
        this.errMessageUrilTh = errMessageUrilTh;
        this.formatDataUtils = formatDataUtils;
    }
    use(req, res, next) {
        const messageCheckCartypeInfo = this.checkCartypeInputValues(req);
        if (messageCheckCartypeInfo) {
            console.log('Middleware action in : ' + messageCheckCartypeInfo);
            res.send({
                response: {
                    error: messageCheckCartypeInfo,
                    result: null,
                    message: messageCheckCartypeInfo,
                    statusCode: 200
                }
            });
        }
        else
            next();
    }
    checkCartypeInputValues(req) {
        const body = req.body;
        if (!body.cartype_id)
            return this.errMessageUrilTh.errGetCarTypeNotFound;
        else if (this.formatDataUtils.HaveSpecialFormat(body.cartype_id))
            return this.errMessageUrilTh.errGetCarTypeProhibitSpecial;
        else if (!this.formatDataUtils.IsNumber(body.cartype_id))
            return this.errMessageUrilTh.errGetCarTypeNotNumber;
        return null;
    }
};
vsGetCartypeCategoryMiddleware = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [err_message_th_utils_1.ErrMessageUtilsTH,
        format_data_utils_1.FormatDataUtils])
], vsGetCartypeCategoryMiddleware);
exports.vsGetCartypeCategoryMiddleware = vsGetCartypeCategoryMiddleware;
//# sourceMappingURL=vs_get_cartype_category.middleware.js.map