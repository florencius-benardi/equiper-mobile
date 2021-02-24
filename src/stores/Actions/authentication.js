// import axios from 'axios';
import instance from '../../hoc/Routes/Axios/axios-base'
import * as actionTypes from "./actionTypes";
import sha256 from 'crypto-js/sha256';

// export const accessRoleModule = (data) => {
//     return {
//         type: actionTypes.SET_AUTH_ACCESS_MODULE,
//         modules: data,
//     }
// }

export const authProcess = () => {
    return {
        type: actionTypes.AUTHENTICATION_PROCESS
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTHENTICATION_SUCCESS,
        apiToken: token,
        userId: userId
    };
};

export const authFailure = (error) => {
    return {
        type: actionTypes.AUTHENTICATION_FAILURE,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTHENTICATION_LOGOUT
    };
};

export const authTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const auth = (userName, password, isSignUp) => {
    return dispatch => {
        dispatch(authProcess());
        const authData = {
            username: userName,
            password: password,
            returnSecureToken: true,
        };

        instance.post('login', authData).then(response => {
            const expirationDate = new Date(new Date().getTime() + 1000 * 1000);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('userId', response.data.localId);
            dispatch(authSuccess(response.data.token, response.data.id));
            dispatch(authTimeout(1000000));
        }).catch(err => {
            dispatch(authFailure(err.response.data.error));
        });
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTHENTICATE_REDIRECT_PATH,
        path: path
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(authTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    };
};