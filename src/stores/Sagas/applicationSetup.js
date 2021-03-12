import { delay } from "redux-saga";
import { put, call, all } from "redux-saga/effects";
import * as actions from "@actions/index";
import * as constants from "@hoc/Shared/constants";
import applicationSetupAxios from "@hoc/Routes/Axios/applicationSetup";

export function* checkAuthTimeoutSaga(action) {
    yield delay(actions.expirationTime);
    yield put(actions.logout());
}

export function* readApplicationSetupSaga(action) {
    yield put(actions.readApplicationSetup)
    try {
        const response = yield applicationSetupAxios.viewGlobalSetting(action.key);
        yield put(actions.addDataSetup(response.data.key, response.data.value));
    } catch (error) {
        yield put(actions.readDataSetupFailure(error.response.data.error));
    }
}


export function* authCheckStateSaga(action) {
    const token = yield localStorage.getItem(constants.STORAGE_TOKEN_NAME);
    if (!token) {
        put(actions.logout());
    } else {
        const expirationDate = yield new Date(localStorage.getItem(constants.STORAGE_EXPIRATION_AUTH_NAME));
        if (expirationDate <= new Date()) {
            put(actions.logout());
        } else {
            const userId = localStorage.getItem('userId');
            put(actions.authSuccess(token, userId));
            put(actions.checkAuthTimeout(
                (expirationDate.getTime() - new Date().getTime()) / 1000)
            );
        }
    }
}
