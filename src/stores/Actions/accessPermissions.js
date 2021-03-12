import * as actionTypes from "./actionTypes";

export const readAccess = () => {
    return {
        type: actionTypes.READ_ACCESS
    };
};

export const grantedAccess = () => {
    return {
        type: actionTypes.GRANTED_ACCESS
    };
};

export const deniedAccess = () => {
    return {
        type: actionTypes.DENIED_ACCESS
    };
};