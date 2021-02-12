import 'dotenv/config';
import { Body, Request, Injectable, Res } from '@nestjs/common';
import * as fs from 'fs';
import { StatusException } from 'src/utils/callback.status';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';
@Injectable()
export class GetImageService {
    constructor(private readonly  errMessage: ErrMessageUtilsTH){}
    async getImageWithPathFile(@Request() req,@Res() res) {
        const image_path = req.body.image_path;
        const file = process.env.PATHSAVEIMAGE + image_path;
        console.log(file);
        try{
            const data = fs.readFileSync(file);
            res.setHeader('Content-Type','image/png');
            return res.send(data)
        }catch(error){
            throw new StatusException({
                error: error,
                result: null,
                message: this.errMessage.errImageGetFail,
                statusCode: 500
            },500);
        }
      
    }
}
