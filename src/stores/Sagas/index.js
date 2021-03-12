import { all, takeEvery } from "redux-saga/effects";
import { logoutSaga, checkAuthTimeoutSaga, loginSaga, authCheckStateSaga } from "@sagas/authentication";
import * as actionTypes from "@actions/actionTypes";

export function* watchAuth() {
    yield all([
        takeEvery(actionTypes.AUTH_LOGOUT_PROCESS, logoutSaga),
        takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
        takeEvery(actionTypes.AUTH_LOGIN_PROCESS, loginSaga),
        takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga),
    ]);
}