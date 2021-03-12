import Instance from './axios-base';

export default class applicationSetupAxios {
    viewGlobalSetting(key) {
        return Instance.get(`/master/setting/${key}`);
    }
}