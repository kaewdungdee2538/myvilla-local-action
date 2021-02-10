import { Body, Injectable } from '@nestjs/common';
import { RegistryImageService } from 'src/controller/image/registry-image/registry-image.service';
import { dbConnection } from 'src/pg_database/pg.database';
import { StatusException } from 'src/utils/callback.status';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';

@Injectable()
export class GetInService {
    constructor(
        private readonly dbconnecttion: dbConnection
        , private readonly errMessageUtilsTh: ErrMessageUtilsTH
        , private readonly registryImageService: RegistryImageService
    ) { }
    async getActionInInfo(@Body() body) {
        const visitor_record_id = await this.getVSRecordID(body);
        console.log(visitor_record_id);
        if (await visitor_record_id.error)
            throw new StatusException(
                {
                    error: visitor_record_id.error
                    , result: null
                    , message: this.errMessageUtilsTh.messageProcessFail
                    , statusCode: 400
                }
                , 400
            )
        else if (visitor_record_id.result[0].visitor_record_id) {
            const visitorInfo = {
                visitor_record_id: visitor_record_id.result[0].visitor_record_id
                , site_id: body.site_id
            }
            return await this.getDataInInfo(visitorInfo);
        }
        else
            throw new StatusException(
                {
                    error: this.errMessageUtilsTh.errGetDataActionInInfoNotFound
                    , result: null
                    , message: this.errMessageUtilsTh.errGetDataActionInInfoNotFound
                    , statusCode: 400
                }
                , 400
            )
    }
    async getVSRecordID(@Body() body) {
        const site_id = body.site_id;
        const card_code = body.card_code;
        const card_name = body.card_name;
        const visitor_slot_number = !body.visitor_slot_number ? 0 : body.visitor_slot_number;
        let sql = 'select '
        sql += `coalesce((select visitor_record_id from m_card`
        sql += ` where delete_flag = 'N'`
        sql += `  and status_flag = 'Y'`
        sql += ` and site_id = $1 `
        sql += ` and (card_code = $2 or card_name = $3))`
        sql += `,(select visitor_record_id from m_visitor_slot`
        sql += ` where status_flag = 'Y'`
        sql += ` and site_id = $1 `
        sql += `  and visitor_slot_number = $4)) as visitor_record_id;`

        const query = {
            text: sql
            , values: [
                site_id
                , card_code
                , card_name
                , visitor_slot_number
            ]
        }
        const res = await this.dbconnecttion.getPgData(query);
        return res;
    }
    async getDataInInfo(visitorInfo: any) {
        const site_id = visitorInfo.site_id;
        const visitor_record_id = visitorInfo.visitor_record_id;

        let sql = `select visitor_record_id,visitor_slot_id,card_code,card_name`
        sql += `,cartype_id,cartype_name_th,cartype_name_en,visitor_info,action_info`
        sql += `,home_id,home_info,license_plate`
        sql += `,img_visitor_in as image_token`
        sql += `,estamp_flag,estamp_id,estamp_info,estamp_datetime`
        sql += `,datetime_action`
        sql += ` from t_visitor_record`
        sql += ` where action_out_flag = 'N' and action_type = 'IN'`
        sql += ` and site_id = $1`
        sql += ` and visitor_record_id = $2;`

        const query = {
            text: sql
            , values: [
                site_id
                , visitor_record_id
            ]
        }
        const res = await this.dbconnecttion.getPgData(query);
        console.log(res);
        if (res.error)
            throw new StatusException({
                error: res.error
                , result: null
                , message: this.errMessageUtilsTh.messageProcessFail
                , statusCode: 400
            }, 400)
        else if (res.result.length === 0)
            throw new StatusException({
                error: this.errMessageUtilsTh.errGetDataActionInInfoNotFound
                , result: null
                , message: this.errMessageUtilsTh.errGetDataActionInInfoNotFound
                , statusCode: 400
            }, 400)
        else {
            const files = res.result[0].image_token.images;
            let result = [];
            for (let num = 0; num < files.length; num++) {
                const image_path = { image_path: files[num] }
                try {
                    const access_token = await this.registryImageService.validateImage(image_path)
                    result = [...result,access_token.access_token];
                } catch (error) {
                    result = [...result];
                }
            }
            res.result[0].image_token = result;
            throw new StatusException({
                error: null
                , result: res.result[0]
                , message: this.errMessageUtilsTh.messageSuccess
                , statusCode: 200
            }, 200)
        }
    }

}
