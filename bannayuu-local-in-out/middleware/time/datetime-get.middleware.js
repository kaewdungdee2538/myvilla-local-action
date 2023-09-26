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
exports.DateTimeGetMiddleware = void 0;
const common_1 = require("@nestjs/common");
const pg_database_1 = require("../../pg_database/pg.database");
const err_message_th_utils_1 = require("../../utils/err_message_th.utils");
const format_data_utils_1 = require("../../utils/format_data.utils");
const moment = require("moment");
let DateTimeGetMiddleware = class DateTimeGetMiddleware {
    constructor(errMessageUrilTh, formatDataUtils, dbconnection) {
        this.errMessageUrilTh = errMessageUrilTh;
        this.formatDataUtils = formatDataUtils;
        this.dbconnection = dbconnection;
    }
    async use(req, res, next) {
        const messageCheckvalue = await this.CheckValues(req.body);
        if (messageCheckvalue) {
            console.log('Middleware check get time value  : ' + messageCheckvalue);
            res.send({
                response: {
                    error: messageCheckvalue,
                    result: null,
                    message: messageCheckvalue,
                    statusCode: 200
                }
            });
        }
        else
            next();
    }
    async CheckValues(body) {
        if (!body.datetime_start)
            return this.errMessageUrilTh.errDateTimeStartNotFound;
        else if (!this.formatDataUtils.IsDateTimeFormat(body.datetime_start))
            return this.errMessageUrilTh.errDateTimeStartFormatInvalid;
        else if (!body.datetime_end)
            return this.errMessageUrilTh.errDateTimeEndNotFound;
        else if (!this.formatDataUtils.IsDateTimeFormat(body.datetime_end))
            return this.errMessageUrilTh.errDateTimeEndFormatInvalid;
        else if (moment(body.datetime_start) > moment(body.datetime_end))
            return this.errMessageUrilTh.errDateTimeStartOverTimeEnd;
        else if (moment(body.datetime_end).diff(moment(body.datetime_start), 'days') > 31)
            return this.errMessageUrilTh.errDateTimeSearchOver31Days;
        return null;
    }
};
DateTimeGetMiddleware = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [err_message_th_utils_1.ErrMessageUtilsTH,
        format_data_utils_1.FormatDataUtils,
        pg_database_1.dbConnection])
], DateTimeGetMiddleware);
exports.DateTimeGetMiddleware = DateTimeGetMiddleware;
;
//# sourceMappingURL=datetime-get.middleware.js.map