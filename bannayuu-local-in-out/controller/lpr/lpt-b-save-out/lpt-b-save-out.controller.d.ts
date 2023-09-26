import { BActionOutMiddleware } from 'src/middleware/booking/action-out/b_action_out.middleware';
import { bGetBookingOutInfoMiddleware } from 'src/middleware/booking/get-booking-out-info/b_get_booking_out_info.middleware';
import { VsActionInCheckEmployeeMiddleWare } from 'src/middleware/visitor/action-in/vs_action_in_check_employee.middleware';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';
import { LptBSaveOutService } from './lpt-b-save-out.service';
export declare class LptBSaveOutController {
    private readonly bActionOUTService;
    private readonly errMessageUtilsTh;
    private readonly bgetBookingOutInfoMiddleware;
    private readonly bActionOutMiddleware;
    private readonly vsActionInCheckEmployeeMiddleware;
    constructor(bActionOUTService: LptBSaveOutService, errMessageUtilsTh: ErrMessageUtilsTH, bgetBookingOutInfoMiddleware: bGetBookingOutInfoMiddleware, bActionOutMiddleware: BActionOutMiddleware, vsActionInCheckEmployeeMiddleware: VsActionInCheckEmployeeMiddleWare);
    saveBookingSaveOut(files: any, body: any): Promise<void>;
}
