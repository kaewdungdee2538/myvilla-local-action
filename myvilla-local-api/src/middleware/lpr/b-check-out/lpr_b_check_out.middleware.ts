import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from 'express';
import { dbConnection } from "src/pg_database/pg.database";
import { ErrMessageUtilsTH } from "src/utils/err_message_th.utils";
import { FormatDataUtils } from "src/utils/format_data.utils";

@Injectable()
export class LPRBookingCheckOutMiddleware implements NestMiddleware {
    constructor(
        private readonly errMessageUtilsTh: ErrMessageUtilsTH,
        private readonly formatUtils: FormatDataUtils,
        private readonly dbconnection: dbConnection,
    ) { }
    async use(req: Request, res: Response, next: () => void) {
        console.log('middleware lpr booking out')
        const messageBookingInfo = await this.CheckLPRBookingCheckOut(req.body);
        if (messageBookingInfo) {
            console.log('Middleware lpr booking out : ' + JSON.stringify(messageBookingInfo))
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

     async CheckLPRBookingCheckOut(body: any) {
        if(!body.license_plate)
            return this.errMessageUtilsTh.errLicensePlateNotFound
        else if(this.formatUtils.HaveSpecialHomeFormat(body.license_plate))
            return this.errMessageUtilsTh.errLicensePlateProhibitSpecial
        else return await this.checkLPRBookingOutFromBase(body);
    }

    async checkLPRBookingOutFromBase(body:any) {
        
        const company_id = body.company_id;
        const license_plate = body.license_plate;
    
        let sql = ` 
            SELECT 
              visitor_record_id
              ,visitor_record_code
              ,license_plate
              ,parking_in_datetime
            FROM  t_visitor_record
            WHERE company_id = $1
            AND license_plate = $2
            AND action_out_flag = 'N'
            AND action_type = 'IN'
            ;`;
        const query = {
          text: sql,
          values: [company_id, license_plate],
        };
        const res = await this.dbconnection.getPgData(query);
        if (res.error) {
          console.log(res.error);
          return this.errMessageUtilsTh.errLicenseplateNotIn;
        } else if (res.result.length === 0) {
          console.log('Record in not found');
          return this.errMessageUtilsTh.errLicenseplateNotIn;
        }else if (res.result.length > 1){
          console.log('License plate more than 1 record');
          return this.errMessageUtilsTh.errLicenseplateInThanMoreOneRecord;
        }
        return null;
    }
}