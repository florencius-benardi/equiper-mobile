import Instance from './axios-base';

export default class authAxios {
    authentification(email, password) {
        return Instance().post('/user/login', { email, password });
    }
}