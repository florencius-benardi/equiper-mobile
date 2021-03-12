import * as actionTypes from "./actionTypes";

export const readApplicationSetup = (key) => {
    return {
        type: actionTypes.READ_APPLICATION_SETUP,
        key
    };
};

export const addDataSetup = (key, value) => {
    return {
        type: actionTypes.ADD_APPLICATION_SETUP,
        key,
        value,
    };
};

export const readDataSetupFailure = (error) => {
    return {
        type: actionTypes.READ_APPLICATION_SETUP_FAILURE,
        error,
    };
};


