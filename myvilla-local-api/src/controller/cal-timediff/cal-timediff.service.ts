import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
@Injectable()
export class CalTimediffService {
    async calTimeDiffFormDateStartToDateEnd(dateStart: string, dateEnd: string) {
        const start = moment(dateStart);
        const end = moment(dateEnd);
        const diffTime = moment.duration(end.diff(start));
        console.log(`sumInterval : ${Math.ceil(diffTime.asMinutes())}, dateStart : ${dateStart}, dateEnd : ${dateEnd}`);
        return Math.ceil(diffTime.asMinutes());
    }

    convertTimeDiffToText(intervalInput:number){
        const days = Math.floor(intervalInput/1440);
        const hours = Math.floor(intervalInput/60)
        const minutes = intervalInput%60
        const daysText = days > 0 ? `${days} วัน ` : "";
        const hoursText = hours > 0 ? `${hours} ชั่วโมง ` : "";
        const minutesText = `${minutes} นาที`;
        console.log(`days : ${days}, hours : ${hours}, minutes : ${minutes}`)
        return `${daysText}${hoursText}${minutesText}`
    }
}
