import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { dbConnection } from 'src/pg_database/pg.database';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';
import { FormatDataUtils } from 'src/utils/format_data.utils';
import * as moment from 'moment';

@Injectable()
export class DateTimeGetMiddleware implements NestMiddleware {
    constructor(
        private readonly errMessageUrilTh: ErrMessageUtilsTH,
        private readonly formatDataUtils: FormatDataUtils,
        private readonly dbconnection: dbConnection,
    ) { }
    async use(req: Request, res: Response, next: () => void) {
        const messageCheckvalue = await this.CheckValues(req.body)
        if (messageCheckvalue) {
            console.log('Middleware check get time value  : ' + messageCheckvalue)
            res.send({
                response: {
                    error: messageCheckvalue
                    , result: null
                    , message: messageCheckvalue
                    , statusCode: 200
                }
            });
        } else
            next();
    }

    async CheckValues(body: any) {
        if (!body.datetime_start)
            return this.errMessageUrilTh.errDateTimeStartNotFound;
        else if (!this.formatDataUtils.IsDateTimeFormat(body.datetime_start))
            return this.errMessageUrilTh.errDateTimeStartFormatInvalid;
        else if (!body.datetime_end)
            return this.errMessageUrilTh.errDateTimeEndNotFound
        else if (!this.formatDataUtils.IsDateTimeFormat(body.datetime_end))
            return this.errMessageUrilTh.errDateTimeEndFormatInvalid;
        else if (moment(body.datetime_start) > moment(body.datetime_end))
            return this.errMessageUrilTh.errDateTimeStartOverTimeEnd;
        else if (moment(body.datetime_end).diff(moment(body.datetime_start), 'days') > 31)
            return this.errMessageUrilTh.errDateTimeSearchOver31Days;
        return null;
    }
};

