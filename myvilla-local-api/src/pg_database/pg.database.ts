import { configfile } from '../conf/config-setting';
import { createConnection } from 'typeorm';
var connection;
export class dbConnection {
  async createPgConnect() {
    try {
      // production
      connection = await createConnection({
        type: 'postgres',
        host: configfile.HOST,
        port: configfile.DATABASE_PORT,
        username: 'cit',
        password: 'db13apr',
        database: configfile.DATABASE,
      });

      //demo
      // connection = await createConnection({
      //     type: 'postgres',
      //     host: configfile.HOST,
      //     port: configfile.DATABASE_PORT,
      //     username: 'postgres',
      //     password: 'P@ssw0rd',
      //     database: configfile.DATABASE
      // });
      console.log('Create PG Connection Success.');
      return true;
    } catch (err) {
      console.log('Create PG Connection Error : ' + err);
      return false;
    }
  }

  async getPgData(querys: any) {
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
    } catch (err) {
      await queryRunner.rollbackTransaction();
      console.log('get err: ' + err);
      error = err.message;
    } finally {
      await queryRunner.release();
      return { result, error };
    }
  }

  async savePgData(querys: any[]) {
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
    } catch (err) {
      await queryRunner.rollbackTransaction();
      console.log('save err: ' + err);
      error = err.message;
    } finally {
      await queryRunner.release();
      return { result, error };
    }
  }
}
