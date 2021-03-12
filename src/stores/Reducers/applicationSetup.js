
import * as actionTypes from '@actions/actionTypes';
import { updateObject } from '@hoc/shared/utility';

let initialState = {
    THEME: '',
    COMPANY_LOGO: '',
    loading: false,
    error: null,
}

const readApplicationSetup = (state, action) => {
    return updateObject(state, {
        loading: true,
        error: null,
    });
};

const addApplicationSetup = (state, action) => {
    const updatedState = {
        [action.key]: [action.value],
        loading: false,
        error: action.error,
    }
    return updateObject(state, updatedState);
};

const readApplicationSetupFailure = (state, action) => {
    const updatedState = {
        loading: false,
        error: action.error,
    }
    return updateObject(state, updatedState);
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_APPLICATION_SETUP: return addApplicationSetup(state, action);
        case actionTypes.READ_APPLICATION_SETUP: return readApplicationSetup(state, action);
        case actionTypes.READ_APPLICATION_SETUP_FAILURE: return readApplicationSetupFailure(state, action);
        default: return state;
    }
};

export default reducer;
