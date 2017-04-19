import apis from '@/config/api';
import http from '@/libs/http';
import appConf from '@/config/app';
import session from '@/libs/session';

const {
  getLastDays,
  getInviteCode,
  getWXConfig,
  activate,
  addShareRecord,
  updateDevice
} = apis.app;

export default {
  getLastDays(success) {
    http.doPost(getLastDays, {}, success);
  },
  getInviteCode(success) {
    http.doPost(getInviteCode, {
      data: {
        productChannel: appConf.channel,
        productType: appConf.productNo,
        code: session.getSessionData('code')
      }
    }, success);
  },
  /**
   * 获取微信配置
   * @return {[type]} [description]
   */
  getWXConfig(params, success) {
    http.doPost(getWXConfig, params, success);
  },
  addShareRecord(params, success) {
    http.doPost(addShareRecord, params, success);
  },
  activate(params, success) {
    http.doPost(activate, params, success);
  },
  updateDevice(params, success){
    http.doPost(updateDevice, params, success);
  }
};
