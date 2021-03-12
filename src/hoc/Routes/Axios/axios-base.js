import axios from 'axios';
import constants from "@hoc/Shared/constants";

const bearerToken = localStorage.getItem(constants.STORAGE_TOKEN_NAME);

const instance = axios.create({
    baseURL: process.env.REACT_APPS_BACKEND,
    timeout: 310000,
    header: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${bearerToken}`
    }
})

export default instance;