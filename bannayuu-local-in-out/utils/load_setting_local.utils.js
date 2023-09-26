"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadSettingLocalUtils = void 0;
const config_setting_1 = require("../conf/config-setting");
const common_1 = require("@nestjs/common");
const pg_database_1 = require("../pg_database/pg.database");
let LoadSettingLocalUtils = class LoadSettingLocalUtils {
    constructor(dbconnecttion) {
        this.dbconnecttion = dbconnecttion;
        this.mycompany_id = config_setting_1.configfile.MYCOMPANY_ID;
    }
    async loadAllSetting() {
    }
    async getBookingInMode(company_id) {
        const sql = `select setup_data->'booking_verify' as booking_verify,setup_data->>'line_notification_mode' as line_notification_mode
        from m_setup 
        where company_id = $1
        and ref_setup_id = 1;`;
        const query = {
            text: sql,
            values: [company_id]
        };
        const res = await this.dbconnecttion.getPgData(query);
        if (res.error) {
            console.log(res.error);
            return null;
        }
        else if (res.result.length === 0) {
            console.log('Load Setting booking_in_mode not found');
            return null;
        }
        else
            return res.result[0];
    }
    async getVisitorInMode(company_id) {
        console.log('getVisitorInMode');
        const sql = `select setup_data->>'visitor_verify' as visitor_verify,setup_data->>'line_notification_mode' as line_notification_mode
        from m_setup 
        where company_id = $1
        and ref_setup_id = 1;`;
        const query = {
            text: sql,
            values: [company_id]
        };
        const res = await this.dbconnecttion.getPgData(query);
        if (res.error) {
            console.log(res.error);
            return null;
        }
        else if (res.result.length === 0) {
            console.log('Load Setting visitor_verify not found');
            return null;
        }
        else
            return res.result[0];
    }
    async getBookingOutEstampMode(company_id) {
        const sql = `select setup_data->'booking_estamp_verify' as booking_estamp_verify
        from m_setup 
        where company_id = $1
        and ref_setup_id = 3;`;
        const query = {
            text: sql,
            values: [company_id]
        };
        const res = await this.dbconnecttion.getPgData(query);
        if (res.error) {
            console.log(res.error);
            return null;
        }
        else if (res.result.length === 0) {
            console.log('Load Setting booking_estamp_verify not found');
            return null;
        }
        else
            return res.result[0].booking_estamp_verify;
    }
    async getVisitorOutEstampMode(company_id) {
        const sql = `select setup_data->'visitor_estamp_verify' as visitor_estamp_verify
        from m_setup 
        where company_id = $1
        and ref_setup_id = 3;`;
        const query = {
            text: sql,
            values: [company_id]
        };
        const res = await this.dbconnecttion.getPgData(query);
        if (res.error) {
            console.log(res.error);
            return null;
        }
        else if (res.result.length === 0) {
            console.log('Load Setting visitor_estamp_verify not found');
            return null;
        }
        else
            return res.result[0].visitor_estamp_verify;
    }
    async getVisitorCalculateMode(company_id) {
        const sql = `select setup_data->'calculate_enable' as calculate_enable
        from m_setup 
        where company_id = $1
        and ref_setup_id = 8;`;
        const query = {
            text: sql,
            values: [company_id]
        };
        const res = await this.dbconnecttion.getPgData(query);
        if (res.error) {
            console.log(res.error);
            return null;
        }
        else if (res.result.length === 0) {
            console.log('Load Setting calculate_enable not found');
            return null;
        }
        else
            return res.result[0].calculate_enable;
    }
};
LoadSettingLocalUtils = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [pg_database_1.dbConnection])
], LoadSettingLocalUtils);
exports.LoadSettingLocalUtils = LoadSettingLocalUtils;
//# sourceMappingURL=load_setting_local.utils.js.map