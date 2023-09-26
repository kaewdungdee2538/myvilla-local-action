import { ActionInService } from './action-in.service';
import { VsActionInSaveMiddleware } from 'src/middleware/visitor/action-in/vs_action_in_save.middleware';
import { VsActionInInfoMiddleWare } from 'src/middleware/visitor/action-in/vs_action_in_info.middleware';
import { VsActionInCheckSlotMiddleWare } from 'src/middleware/visitor/action-in/vs_action_in_checkslot.middleware';
import { ErrMessageUtilsTH } from 'src/utils/err_message_th.utils';
import { VsActionInCheckHomeIDMiddleWare } from 'src/middleware/visitor/action-in/vs_action_in_checkhomeid.middleware';
import { VsActionInCheckEmployeeMiddleWare } from 'src/middleware/visitor/action-in/vs_action_in_check_employee.middleware';
import { LoadSettingLocalUtils } from 'src/utils/load_setting_local.utils';
export declare class ActionInController {
    private readonly actionINService;
    private readonly errMessageUtilsTh;
    private readonly vsActionCheckMiddleware;
    private readonly vsActionInforMiddleware;
    private readonly vsActionSaveIn;
    private readonly vsActionCheckHomeID;
    private readonly vsActionCheckEmployee;
    private readonly loadSettingLocalUtils;
    constructor(actionINService: ActionInService, errMessageUtilsTh: ErrMessageUtilsTH, vsActionCheckMiddleware: VsActionInCheckSlotMiddleWare, vsActionInforMiddleware: VsActionInInfoMiddleWare, vsActionSaveIn: VsActionInSaveMiddleware, vsActionCheckHomeID: VsActionInCheckHomeIDMiddleWare, vsActionCheckEmployee: VsActionInCheckEmployeeMiddleWare, loadSettingLocalUtils: LoadSettingLocalUtils);
    ActionSaveIn(files: any, body: any): Promise<void>;
    getSlotOrGetCard(files: any, body: any, getHomeID: any, getEmployeeID: any, getCartype: any, lineNotificationMode: string): Promise<void>;
}
