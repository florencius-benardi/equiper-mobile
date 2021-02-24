import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APPS_BACKEND,
    timeout: 1000,
    // headers: {
    //     'Accept': 'application/json'
    //     // 'Authorization': `Bearer ${token}`
    // }
})

export default instance;