import { Injectable } from '@nestjs/common';
import { dbConnection } from 'src/pg_database/pg.database';

@Injectable()
export class CardManageService {
    constructor(private dbconnecttion: dbConnection) { }

    async getCardInDataBase(inputObj: any) {
        const site_id = inputObj.site_id;
        const card_code = inputObj.card_code;
        const card_name = inputObj.card_name;
        let sql = `select * from m_card where delete_flag ='N' and site_id = $1 and (card_code = $2 or card_name = $3);`
        const query = {
            text: sql
            , values: [site_id, card_code,card_name]
        }
        const res = await this.dbconnecttion.getPgData(query);
        if(res.error){
            console.log(res.error);
            return false;
        }else if(res.result.length === 0)
            return false;
        return true;
    }

    async getCardCheckIn(inputObj: any){
        const site_id = inputObj.site_id;
        const card_code = inputObj.card_code;
        const card_name = inputObj.card_name;
        let sql = `select * from m_card where status_flag = 'Y' and delete_flag ='N' and site_id = $1 and (card_code = $2 or card_name = $3);`
        const query = {
            text: sql
            , values: [site_id, card_code,card_name]
        }
        const res = await this.dbconnecttion.getPgData(query);
        if(res.error){
            console.log(res.error);
            return false;
        }else if(res.result.length === 0)
            return false;
        return true;
    }
}
