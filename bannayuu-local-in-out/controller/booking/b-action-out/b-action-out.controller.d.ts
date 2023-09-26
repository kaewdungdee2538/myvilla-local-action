import { BActionOutService } from './b-action-out.service';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';
import { bGetBookingOutInfoMiddleware } from 'src/middleware/booking/get-booking-out-info/b_get_booking_out_info.middleware';
import { BActionOutMiddleware } from 'src/middleware/booking/action-out/b_action_out.middleware';
import { VsActionInCheckEmployeeMiddleWare } from 'src/middleware/visitor/action-in/vs_action_in_check_employee.middleware';
export declare class BActionOutController {
    private readonly bActionOUTService;
    private readonly errMessageUtilsTh;
    private readonly bgetBookingOutInfoMiddleware;
    private readonly bActionOutMiddleware;
    private readonly vsActionInCheckEmployeeMiddleware;
    constructor(bActionOUTService: BActionOutService, errMessageUtilsTh: ErrMessageUtilsTH, bgetBookingOutInfoMiddleware: bGetBookingOutInfoMiddleware, bActionOutMiddleware: BActionOutMiddleware, vsActionInCheckEmployeeMiddleware: VsActionInCheckEmployeeMiddleWare);
    saveBookingSaveOut(files: any, body: any): Promise<void>;
}
