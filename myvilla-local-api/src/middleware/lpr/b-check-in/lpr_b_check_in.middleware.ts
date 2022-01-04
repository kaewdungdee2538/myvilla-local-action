import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from 'express';
import { dbConnection } from "src/pg_database/pg.database";
import { ErrMessageUtilsTH } from "src/utils/err_message_th.utils";
import { FormatDataUtils } from "src/utils/format_data.utils";

@Injectable()
export class LPRBookingCheckInMiddleware implements NestMiddleware {
    constructor(
        private readonly errMessageUtilsTh: ErrMessageUtilsTH,
        private readonly formatUtils: FormatDataUtils,
        private readonly dbconnection: dbConnection,
    ) { }
    async use(req: Request, res: Response, next: () => void) {
        console.log('middleware lpr booking in')
        const messageBookingInfo = await this.CheckLPRBoolingCheckIn(req.body);
        if (messageBookingInfo) {
            console.log('Middleware lpr booking in : ' + JSON.stringify(messageBookingInfo))
            res.send({
                response: {
                    error: messageBookingInfo
                    , result: null
                    , message: messageBookingInfo
                    , statusCode: 200
                }
            });
        } else
            next();
    }

     async CheckLPRBoolingCheckIn(body: any) {
        if(!body.license_plate)
            return this.errMessageUtilsTh.errLicensePlateNotFound
        else if(this.formatUtils.HaveSpecialHomeFormat(body.license_plate))
            return this.errMessageUtilsTh.errLicensePlateProhibitSpecial
        else return await this.checkLPRBookingInBase(body);
    }

    async checkLPRBookingInBase(body:any) {
        
        const company_id = body.company_id;
        const license_plate = body.license_plate;
        let sql = `select 
        tbv.tbv_id,tbv.tbv_code
        from t_booking_visitor tbv
        where tbv.delete_flag = 'N'
        and current_timestamp < tbv_end_datetime
        and tbv.company_id = $1
        and tbv_license_plate = $2
        ;`
        const query = {
            text: sql
            , values: [company_id, license_plate]
        }
        const res = await this.dbconnection.getPgData(query);
        if (await res.error)  return this.errMessageUtilsTh.messageProcessFail
        else if (await res.result.length === 0) return this.errMessageUtilsTh.errBookingNotFound
        else if (await res.result.length > 1) return this.errMessageUtilsTh.errBookingLicenseIsDuplicate
        else return null;
    }
}