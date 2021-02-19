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
        const visitor_record_code = await this.getVSRecordID(body);
        if (await visitor_record_code.error)
            throw new StatusException(
                {
                    error: visitor_record_code.error
                    , result: null
                    , message: this.errMessageUtilsTh.messageProcessFail
                    , statusCode: 400
                }
                , 400
            )
        else if (visitor_record_code.result[0].visitor_record_code) {
            const visitorInfo = {
                visitor_record_code: visitor_record_code.result[0].visitor_record_code
                , company_id: body.company_id
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
        const company_id = body.company_id;
        const card_code = body.card_code;
        const card_name = body.card_name;
        const visitor_slot_number = !body.visitor_slot_number ? 0 : body.visitor_slot_number;
        let sql = `select func_getvs_uuid_card_or_slot($1,$2,$3,$4) as visitor_record_code;`

        console.log(sql)
        const query = {
            text: sql
            , values: [
                company_id
                , card_code
                , card_name
                , visitor_slot_number
            ]
        }
        const res = await this.dbconnecttion.getPgData(query);
        return res;
    }
    async getDataInInfo(visitorInfo: any) {
        const company_id = visitorInfo.company_id;
        const visitor_record_code = visitorInfo.visitor_record_code;

        let sql = `select visitor_record_id,visitor_record_code,visitor_slot_id,card_code,card_name`
        sql += `,cartype_id,cartype_name_th,cartype_name_en,visitor_info,action_info`
        sql += `,home_id,home_info,license_plate`
        sql += `,img_visitor_in->'images' as image_path`
        sql += `,estamp_flag,estamp_id,estamp_info,estamp_datetime`
        sql += `,parking_in_datetime,datetime_action`
        sql += `,employee_in_id,employee_in_info`
        sql += ` from t_visitor_record`
        sql += ` where action_out_flag = 'N'`
        sql += ` and company_id = $1`
        sql += ` and visitor_record_code = $2;`

        console.log(sql);
        const query = {
            text: sql
            , values: [
                company_id
                , visitor_record_code
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
            // const files = res.result[0].image_token.images;
            // console.log(files.image_card);
            // console.log(files.image_vehicle);
            // let image_card_token,image_vehicle_token;
            //     try {
            //         // สร้าง JWT Token สำหรับรูปภาพ
            //         image_card_token = !files.image_card ? null : await this.registryImageService.validateImage({image_path:files.image_card});
            //         image_vehicle_token = !files.image_vehicle ? null : await this.registryImageService.validateImage({image_path:files.image_vehicle});
            //     } catch (error) {
            //         console.log(error);
            //     }
            // // เปลี่ยนค่าจาก path file เป็น JWT Token เพื่อ return ให้ response
            // res.result[0].image_token = {
            //     img_driver_token: !image_card_token ? null : image_card_token.access_token
            //     ,img_license_token: !image_vehicle_token ? null : image_vehicle_token.access_token};
            throw new StatusException({
                error: null
                , result: res.result[0]
                , message: this.errMessageUtilsTh.messageSuccess
                , statusCode: 200
            }, 200)
        }
    }

}
