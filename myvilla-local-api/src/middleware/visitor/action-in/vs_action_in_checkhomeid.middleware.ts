import { Body, Injectable, NestMiddleware } from "@nestjs/common";
import { ErrMessageUtilsTH } from "src/utils/err_message_th.utils";
import { FormatDataUtils } from "src/utils/format_data.utils";
import { Request, Response, NextFunction } from 'express';
import { dbConnection } from "src/pg_database/pg.database";

@Injectable()
export class VsActionInCheckHomeIDMiddleWare {
    constructor(
        private readonly dbconnecttion: dbConnection,
        private readonly formatUtils: FormatDataUtils,
        private readonly errMessageUtilsTh: ErrMessageUtilsTH
    ) { }
    async CheckHomeID(body: any) {
        return await this.checkHaveHomeID(body);
    }

    async checkHaveHomeID(body: any) {
        const home_id = body.home_id
        let sql = `select * from m_home where home_id = $1;`
        const query = {
            text: sql
            , values: [home_id]
        }
        const result = await this.dbconnecttion.getPgData(query);
        if (result.error || result.result.length === 0) return null;
        else return result.result[0];
    }

}