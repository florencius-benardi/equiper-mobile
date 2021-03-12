import { delay } from "redux-saga";
import { put, call, all } from "redux-saga/effects";
import * as actions from "@actions/index";
import * as constants from "@hoc/Shared/constants";
import authAxios from "@hoc/Routes/Axios/authentification";

export function* logoutSaga(action) {
    yield all([
        call([localStorage, "removeItem"], constants.STORAGE_TOKEN_NAME),
        call([localStorage, "removeItem"], constants.STORAGE_USER_NAME),
        call([localStorage, "removeItem"], constants.STORAGE_EXPIRATION_AUTH_NAME),
        put(actions.logoutSucceed())
    ]);
}

export function* checkAuthTimeoutSaga(action) {
    yield delay(actions.expirationTime);
    yield put(actions.logout());
}

export function* loginSaga(action) {
    yield put(actions.authProcess())
    const authData = {
        username: action.userName,
        password: action.password,
        returnSecureToken: true,
    };

    try {
        const response = yield authAxios.authentification;
        const expirationDate = yield new Date(new Date().getTime() + 1000 * 1000);
        yield all([
            call([localStorage, "setItem"], constants.STORAGE_TOKEN_NAME),
            call([localStorage, "setItem"], constants.STORAGE_USER_NAME),
            call([localStorage, "setItem"], constants.STORAGE_EXPIRATION_AUTH_NAME),
            put(actions.logoutSucceed())
        ]);
        yield localStorage.setItem(constants.STORAGE_TOKEN_NAME, response.data.token);
        yield localStorage.setItem(constants.STORAGE_EXPIRATION_AUTH_NAME, expirationDate);
        yield localStorage.setItem(constants.STORAGE_USER_NAME, response.data.localId);
        yield put(actions.authSuccess(response.data.token, response.data.id));
        yield put(actions.checkAuthTimeout(response.data.expiresIn));
    } catch (error) {
        yield put(actions.authFailure(error.response.data.error));
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
