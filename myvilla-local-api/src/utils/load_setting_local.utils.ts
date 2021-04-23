import {configfile} from '../conf/config-setting'
import { Injectable } from "@nestjs/common";
import { dbConnection } from "src/pg_database/pg.database";

@Injectable()
export class LoadSettingLocalUtils {
    constructor(
        private readonly dbconnecttion: dbConnection
    ) { }
    mycompany_id = configfile.MYCOMPANY_ID
    async loadAllSetting(){

    }
    async getBookingInMode(company_id:string){
        const sql =`select setup_data->'booking_verify' as booking_verify
        from m_setup 
        where company_id = $1
        and ref_setup_id = 1;`
        const query = {
            text:sql
            ,values:[company_id]
        }
        const res = await this.dbconnecttion.getPgData(query);
        if(res.error){
            console.log(res.error)
            return null
        }else if(res.result.length===0){
            console.log('Load Setting booking_in_mode not found')
            return null;
        }else return res.result[0].booking_verify
    }

    async getVisitorInMode(company_id:string){
        console.log('getVisitorInMode')
        const sql =`select setup_data->'visitor_verify' as visitor_verify
        from m_setup 
        where company_id = $1
        and ref_setup_id = 1;`
        const query = {
            text:sql
            ,values:[company_id]
        }
        const res = await this.dbconnecttion.getPgData(query);
        if(res.error){
            console.log(res.error)
            return null
        }else if(res.result.length===0){
            console.log('Load Setting visitor_verify not found')
            return null;
        }else return res.result[0].visitor_verify
    }

    async getBookingOutEstampMode(company_id:string){
        const sql =`select setup_data->'booking_estamp_verify' as booking_estamp_verify
        from m_setup 
        where company_id = $1
        and ref_setup_id = 3;`
        const query = {
            text:sql
            ,values:[this.mycompany_id]
        }
        const res = await this.dbconnecttion.getPgData(query);
        if(res.error){
            console.log(res.error)
            return null
        }else if(res.result.length===0){
            console.log('Load Setting booking_estamp_verify not found')
            return null;
        }else return res.result[0].booking_estamp_verify
    }

    async getVisitorOutEstampMode(company_id:string){
        const sql =`select setup_data->'visitor_estamp_verify' as visitor_estamp_verify
        from m_setup 
        where company_id = $1
        and ref_setup_id = 3;`
        const query = {
            text:sql
            ,values:[this.mycompany_id]
        }
        const res = await this.dbconnecttion.getPgData(query);
        if(res.error){
            console.log(res.error)
            return null
        }else if(res.result.length===0){
            console.log('Load Setting visitor_estamp_verify not found')
            return null;
        }else return res.result[0].visitor_estamp_verify
    }
}