import { VisitorSaveCardlossService } from './visitor-save-cardloss.service';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';
import { vsCardLossSaveMiddleware } from 'src/middleware/visitor/card-loss/save/vs_card_loss_save.middleware';
import { VsActionInCheckEmployeeMiddleWare } from 'src/middleware/visitor/action-in/vs_action_in_check_employee.middleware';
export declare class VisitorSaveCardlossController {
    private readonly visitorCardlossService;
    private readonly errMessageUtilsTh;
    private readonly VsCardLossSaveMiddleware;
    private readonly vsActionInCheckEmployeeMiddleware;
    constructor(visitorCardlossService: VisitorSaveCardlossService, errMessageUtilsTh: ErrMessageUtilsTH, VsCardLossSaveMiddleware: vsCardLossSaveMiddleware, vsActionInCheckEmployeeMiddleware: VsActionInCheckEmployeeMiddleWare);
    saveCardLoss(files: any, body: any): Promise<void>;
    saveCardLossNotOut(files: any, body: any): Promise<void>;
}
