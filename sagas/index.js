import { all } from 'redux-saga/effects';
import appCommon from './appCommon';
import account from './account';
import user from './user';
import groupPermission from './groupPermission';

const sagas = [
    ...appCommon,
    ...account,
    ...user,
    ...groupPermission
];

function* rootSaga() {
    yield all(sagas);
}

export default rootSaga;
