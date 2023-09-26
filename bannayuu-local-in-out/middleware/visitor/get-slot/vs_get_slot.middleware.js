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
exports.VsGetSlotBySlotNumberMiddleware = exports.VsGetSlotMiddleware = void 0;
const common_1 = require("@nestjs/common");
const err_message_th_utils_1 = require("../../../utils/err_message_th.utils");
const format_data_utils_1 = require("../../../utils/format_data.utils");
let VsGetSlotMiddleware = class VsGetSlotMiddleware {
    constructor(formatUtils, errMessageUtilsTh) {
        this.formatUtils = formatUtils;
        this.errMessageUtilsTh = errMessageUtilsTh;
    }
    use(req, res, next) {
        const messageCheckVisitor = this.checkCompanyID(req);
        if (messageCheckVisitor) {
            console.log('Middleware action in : ' + messageCheckVisitor);
            res.send({
                response: {
                    error: messageCheckVisitor,
                    result: null,
                    message: messageCheckVisitor,
                    statusCode: 200
                }
            });
        }
        else
            next();
    }
    checkCompanyID(req) {
        const body = req.body;
        if (!body.company_id) {
            return this.errMessageUtilsTh.errGetSlotVisitorNumberCompanyIDNotFound;
        }
        else {
            if (this.formatUtils.HaveSpecialFormat(body.company_id))
                return this.errMessageUtilsTh.errGetSlotVisitorNumberCompanyIDProhibitSpecial;
            else if (!this.formatUtils.IsNumber(body.company_id))
                return this.errMessageUtilsTh.errGetSlotVisitorNumberCompanyIDNotNumber;
            return null;
        }
    }
};
VsGetSlotMiddleware = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [format_data_utils_1.FormatDataUtils,
        err_message_th_utils_1.ErrMessageUtilsTH])
], VsGetSlotMiddleware);
exports.VsGetSlotMiddleware = VsGetSlotMiddleware;
let VsGetSlotBySlotNumberMiddleware = class VsGetSlotBySlotNumberMiddleware {
    constructor(formatUtils, errMessageUtilsTh) {
        this.formatUtils = formatUtils;
        this.errMessageUtilsTh = errMessageUtilsTh;
    }
    use(req, res, next) {
        const messageCheckVisitor = this.checkSlotNumber(req);
        if (messageCheckVisitor) {
            console.log('Middleware action in : ' + messageCheckVisitor);
            res.send({
                response: {
                    error: messageCheckVisitor,
                    result: null,
                    message: messageCheckVisitor,
                    statusCode: 200
                }
            });
        }
        else
            next();
    }
    checkSlotNumber(req) {
        const body = req.body;
        if (!body.visitor_slot_number) {
            return this.errMessageUtilsTh.errGetSlotVisitorNumberSlotNumberNotFound;
        }
        else {
            if (this.formatUtils.HaveSpecialFormat(body.visitor_slot_number))
                return this.errMessageUtilsTh.errGetSlotVisitorNumberSlotNumberProhibitSpecial;
            else if (!this.formatUtils.IsNumber(body.visitor_slot_number))
                return this.errMessageUtilsTh.errGetSlotVisitorNumberSlotNumberNotNumber;
            return null;
        }
    }
};
VsGetSlotBySlotNumberMiddleware = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [format_data_utils_1.FormatDataUtils,
        err_message_th_utils_1.ErrMessageUtilsTH])
], VsGetSlotBySlotNumberMiddleware);
exports.VsGetSlotBySlotNumberMiddleware = VsGetSlotBySlotNumberMiddleware;
//# sourceMappingURL=vs_get_slot.middleware.js.map