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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetImageService = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const callback_status_1 = require("../../../utils/callback.status");
const err_message_th_utils_1 = require("../../../utils/err_message_th.utils");
const config_setting_1 = require("../../../conf/config-setting");
let GetImageService = class GetImageService {
    constructor(errMessage) {
        this.errMessage = errMessage;
    }
    async getImageWithPathFile(req, res) {
        const image_path = req.body.image_path;
        const file = config_setting_1.configfile.PATHSAVEIMAGE + image_path;
        console.log(file);
        try {
            const data = fs.readFileSync(file);
            res.setHeader('Content-Type', 'image/png');
            return res.send(data);
        }
        catch (error) {
            throw new callback_status_1.StatusException({
                error: JSON.stringify(error),
                result: null,
                message: this.errMessage.errImageGetFail,
                statusCode: 200
            }, 200);
        }
    }
};
__decorate([
    __param(0, common_1.Request()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], GetImageService.prototype, "getImageWithPathFile", null);
GetImageService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [err_message_th_utils_1.ErrMessageUtilsTH])
], GetImageService);
exports.GetImageService = GetImageService;
//# sourceMappingURL=get-image.service.js.map