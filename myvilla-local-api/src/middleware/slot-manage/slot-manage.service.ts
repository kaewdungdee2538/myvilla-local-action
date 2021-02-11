import { Injectable } from '@nestjs/common';
import { dbConnection } from 'src/pg_database/pg.database';

@Injectable()
export class SlotManageService {
    constructor(private readonly dbconnecttion: dbConnection) { }

    async getSlotNumberInDataBase(inputObj: any) {
        const site_id = inputObj.site_id;
        const visitor_slot_number = inputObj.visitor_slot_number;
        let sql = 'select * from m_visitor_slot where site_id = $1 and visitor_slot_number = $2;'
        const query = {
            text: sql
            , values: [site_id, visitor_slot_number]
        }
        const res = await this.dbconnecttion.getPgData(query);
        if(res.error){
            console.log(res.error);
            return false;
        }else if(res.result.length === 0)
            return false;
        return true;
    }

    async getSlotNumberCheckIn(inputObj: any){
        const site_id = inputObj.site_id;
        const visitor_slot_number = inputObj.visitor_slot_number;
        let sql = `select * from m_visitor_slot where status_flag = 'Y' and site_id = $1 and visitor_slot_number = $2;`
        const query = {
            text: sql
            , values: [site_id, visitor_slot_number]
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
