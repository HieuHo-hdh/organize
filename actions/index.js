import { actions as appCommonActions, actionTypes as appCommonTypes } from './appCommon';
import { actions as accountActions, actionTypes as accountTypes } from './account';
import { actions as userActions, actionTypes as userTypes } from './user';
import { actions as groupPermissionActions, actionTypes as groupPermissionTypes } from './groupPermission';
import { actions as organizeActions, actionTypes as organizeActionsTypes} from "./organize";
export const actions = {
    ...appCommonActions,
    ...accountActions,
    ...userActions,
    ...groupPermissionActions,
    ...organizeActions,
}

export const types = {
    ...appCommonTypes,
    ...accountTypes,
    ...userTypes,
    ...groupPermissionTypes,
    ...organizeActionsTypes,
}