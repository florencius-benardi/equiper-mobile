import * as actionTypes from "./actionTypes";

// export const accessRoleModule = (data) => {
//     return {
//         type: actionTypes.SET_AUTH_ACCESS_MODULE,
//         modules: data,
//     }
// }

export const authProcess = () => {
    return {
        type: actionTypes.AUTH_LOGOUT_PROCESS
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        apiToken: token,
        userId: userId
    };
};

export const authFailure = (error) => {
    return {
        type: actionTypes.AUTH_FAILURE,
        error: error
    };
};

export const logout = () => {
    // localStorage.removeItem('token');
    // localStorage.removeItem('expirationDate');
    // localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_INITIATE_LOGOUT
    };
};

export const logoutSucceed = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    };
}

export const checkAuthTimeout = (expirationTime) => {
    return {
        type: actionTypes.AUTH_CHECK_TIMEOUT,
        expirationTime: expirationTime
    };
};

export const auth = (userName, password) => {
    return {
        type: actionTypes.AUTH_LOGIN_PROCESS,
        userName: userName,
        password: password,
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTHENTICATE_REDIRECT_PATH,
        path: path
    };
};

export const authCheckState = () => {
    return {
        type: actionTypes.AUTH_CHECK_STATE,
    };
};