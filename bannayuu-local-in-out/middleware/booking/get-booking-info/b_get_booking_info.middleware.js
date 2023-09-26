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
exports.bGetBookingInfoMiddleware = void 0;
const common_1 = require("@nestjs/common");
const err_message_th_utils_1 = require("../../../utils/err_message_th.utils");
const format_data_utils_1 = require("../../../utils/format_data.utils");
let bGetBookingInfoMiddleware = class bGetBookingInfoMiddleware {
    constructor(errMessageUrilTh, formatDataUtils) {
        this.errMessageUrilTh = errMessageUrilTh;
        this.formatDataUtils = formatDataUtils;
    }
    use(req, res, next) {
        const messageBookingInfo = this.checkBookingValues(req);
        if (messageBookingInfo) {
            console.log('Middleware booking in : ' + JSON.stringify(messageBookingInfo));
            res.send({
                response: {
                    error: messageBookingInfo,
                    result: null,
                    message: messageBookingInfo,
                    statusCode: 200
                }
            });
        }
        else
            next();
    }
    checkBookingValues(req) {
        const body = req.body;
        if (!body.tbv_code)
            return this.errMessageUrilTh.errฺBookingTbvCodeNotFound;
        else if (this.formatDataUtils.HaveSpecialFormat(body.tbv_code))
            return this.errMessageUrilTh.errฺBookingTbvCodeProhibitSpecial;
        return null;
    }
};
bGetBookingInfoMiddleware = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [err_message_th_utils_1.ErrMessageUtilsTH,
        format_data_utils_1.FormatDataUtils])
], bGetBookingInfoMiddleware);
exports.bGetBookingInfoMiddleware = bGetBookingInfoMiddleware;
//# sourceMappingURL=b_get_booking_info.middleware.js.map