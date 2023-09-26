import { ActionOutSaveService } from './action-out.service';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';
import { VsActionOutSlotOrCardMiddleWare } from 'src/middleware/visitor/action-out/save/vs_action_out_slotorcard.middleware';
import { VsActionOutForSaveMiddleWare } from 'src/middleware/visitor/action-out/save/vs_action_out_forsave.middleware';
import { vsActionOutVerifyEstampMiddleware } from 'src/middleware/visitor/action-out/estamp-verify/vs_action_out_estamp_verify.middleware';
export declare class ActionOutSaveController {
    private readonly saveOutService;
    private readonly errMessageUtilsTh;
    private readonly vsactionOutSlotOrCardMid;
    private readonly vsactionOutForSaveMid;
    private readonly vsactionOutVerifyEstamMiddleware;
    constructor(saveOutService: ActionOutSaveService, errMessageUtilsTh: ErrMessageUtilsTH, vsactionOutSlotOrCardMid: VsActionOutSlotOrCardMiddleWare, vsactionOutForSaveMid: VsActionOutForSaveMiddleWare, vsactionOutVerifyEstamMiddleware: vsActionOutVerifyEstampMiddleware);
    ActionSaveOut(files: any, body: any): Promise<any>;
}
