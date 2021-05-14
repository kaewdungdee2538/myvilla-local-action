import { HttpException, HttpService, Injectable } from '@nestjs/common';
import { catchError, map } from 'rxjs/operators';
import { dbConnection } from 'src/pg_database/pg.database';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';

@Injectable()
export class HttpCalculateService {
 constructor(
    private readonly dbconnecttion: dbConnection
    , private readonly errMessageUtilsTh: ErrMessageUtilsTH
    , private httpService: HttpService
     ){}

    async getCalculate(valuesObj: any) {
        const company_id = valuesObj.company_id;
        const visitor_record_id = valuesObj.visitor_record_id;
        const employee_id = valuesObj.employee_id;
        const start_date = valuesObj.start_date;
        const end_date = valuesObj.end_date;
        const cartype_id = valuesObj.cartype_id;
        const promotion_code = valuesObj.promotion_code;
        const params = {
            company_id,
            visitor_record_id,
            employee_id,
            start_date,
            end_date,
            cartype_id,
            promotion_code
        }
        // return await this.httpService.get('http://localhost:4060',
        //     params,
        //     {
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //     }).pipe(map((res) => {
        //         return res.data;
        //     }));
        console.log('awdawdawd')
        const ggggg = await this.httpService.get('http://localhost:4060')
        .pipe(
            map(response=>response.data),
            catchError(
                error => { 
                    //throw new HttpException
                    throw new HttpException(error.response.data, error.response.status)
                }
            ))
        console.log(ggggg)
    }

    
}
