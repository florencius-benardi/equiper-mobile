import { delay } from "redux-saga";
import { put, call, all } from "redux-saga/effects";
import * as actions from "@actions/index";
import * as constants from "@hoc/Shared/constants";

export function* logoutSaga(action) {
    yield all([
        call([localStorage, "removeItem"], constants.STORAGE_TOKEN_NAME),
        call([localStorage, "removeItem"], constants.STORAGE_USER_NAME),
        call([localStorage, "removeItem"], constants.STORAGE_EXPIRATION_AUTH_NAME),
        put(actions.logoutSucceed())
    ]);
}