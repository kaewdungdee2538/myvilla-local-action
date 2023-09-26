"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnection = void 0;
const config_setting_1 = require("../conf/config-setting");
const typeorm_1 = require("typeorm");
var connection;
class dbConnection {
    async createPgConnect() {
        try {
            connection = await typeorm_1.createConnection({
                type: 'postgres',
                host: config_setting_1.configfile.HOST,
                port: config_setting_1.configfile.DATABASE_PORT,
                username: 'postgres',
                password: 'P@ssw0rd',
                database: config_setting_1.configfile.DATABASE
            });
            console.log('Create PG Connection Success.');
            return true;
        }
        catch (err) {
            console.log('Create PG Connection Error : ' + err);
            return false;
        }
    }
    async getPgData(querys) {
        const queryRunner = connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        let result = null;
        let error = null;
        try {
            console.log('get' + { querys });
            const response = await queryRunner.query(querys);
            await queryRunner.commitTransaction();
            result = await response;
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            console.log('get err: ' + err);
            error = err.message;
        }
        finally {
            await queryRunner.release();
            return { result, error };
        }
    }
    async savePgData(querys) {
        console.log('save : ' + querys.length);
        const queryRunner = connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        let result = null;
        let error = null;
        try {
            for (let num = 0; num < querys.length; num++) {
                await queryRunner.query(querys[num]);
            }
            await queryRunner.commitTransaction();
            result = true;
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            console.log('save err: ' + err);
            error = err.message;
        }
        finally {
            await queryRunner.release();
            return { result, error };
        }
    }
}
exports.dbConnection = dbConnection;
//# sourceMappingURL=pg.database.js.map