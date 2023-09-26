import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';
export declare class GetImageService {
    private readonly errMessage;
    constructor(errMessage: ErrMessageUtilsTH);
    getImageWithPathFile(req: any, res: any): Promise<any>;
}
