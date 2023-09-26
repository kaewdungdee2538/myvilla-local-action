"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalTimediffService = void 0;
const common_1 = require("@nestjs/common");
const moment = require("moment");
let CalTimediffService = class CalTimediffService {
    async calTimeDiffFormDateStartToDateEnd(dateStart, dateEnd) {
        const start = moment(dateStart);
        const end = moment(dateEnd);
        const diffTime = moment.duration(end.diff(start));
        console.log(`sumInterval : ${Math.ceil(diffTime.asMinutes())}, dateStart : ${dateStart}, dateEnd : ${dateEnd}`);
        return Math.ceil(diffTime.asMinutes());
    }
    convertTimeDiffToText(intervalInput) {
        let newInterval = intervalInput ? intervalInput : 0;
        const days = Math.floor(intervalInput / 1440);
        newInterval = Math.floor(intervalInput % 1440);
        const hours = Math.floor(newInterval / 60);
        const minutes = intervalInput % 60;
        const daysText = days > 0 ? `${days} วัน ` : "";
        const hoursText = hours > 0 ? `${hours} ชั่วโมง ` : "";
        const minutesText = `${minutes} นาที`;
        console.log(`days : ${days}, hours : ${hours}, minutes : ${minutes}`);
        return `${daysText}${hoursText}${minutesText}`;
    }
};
CalTimediffService = __decorate([
    common_1.Injectable()
], CalTimediffService);
exports.CalTimediffService = CalTimediffService;
//# sourceMappingURL=cal-timediff.service.js.map