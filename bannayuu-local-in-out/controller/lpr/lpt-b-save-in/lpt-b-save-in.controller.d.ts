import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';
import { VsActionInInfoMiddleWare } from 'src/middleware/visitor/action-in/vs_action_in_info.middleware';
import { VsActionInSaveMiddleware } from 'src/middleware/visitor/action-in/vs_action_in_save.middleware';
import { BActionInMiddleware } from 'src/middleware/booking/action-in/b_action_in.middleware';
import { VsActionInCheckHomeIDMiddleWare } from 'src/middleware/visitor/action-in/vs_action_in_checkhomeid.middleware';
import { VsActionInCheckEmployeeMiddleWare } from 'src/middleware/visitor/action-in/vs_action_in_check_employee.middleware';
import { LoadSettingLocalUtils } from 'src/utils/load_setting_local.utils';
import { LptBSaveInService } from './lpt-b-save-in.service';
export declare class LptBSaveInController {
    private readonly bActionINService;
    private readonly errMessageUtilsTh;
    private readonly vsActionInforMiddleware;
    private readonly vsActionSaveIn;
    private readonly bActionInMiddleware;
    private readonly vsActionCheckHomeID;
    private readonly vsActionCheckEmployee;
    private readonly loadSettingLocalUtils;
    constructor(bActionINService: LptBSaveInService, errMessageUtilsTh: ErrMessageUtilsTH, vsActionInforMiddleware: VsActionInInfoMiddleWare, vsActionSaveIn: VsActionInSaveMiddleware, bActionInMiddleware: BActionInMiddleware, vsActionCheckHomeID: VsActionInCheckHomeIDMiddleWare, vsActionCheckEmployee: VsActionInCheckEmployeeMiddleWare, loadSettingLocalUtils: LoadSettingLocalUtils);
    saveLPRBookingIn(files: any, body: any): Promise<void>;
}
