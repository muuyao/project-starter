import cookie from 'js-cookie';

cookie.defaults = {
  path: '/',
};

if(!location.hostname.match(/(localhost|192\.168)/)){
  cookie.defaults.domain = getDomain();
}

/**
 * 获取一级域名
 * @return {[type]} [description]
 */
function getDomain() {
  const domain = location.hostname.split('.');
  const len = domain.length;

  return `.${domain[len - 2]}.${domain[len - 1]}`; // 设置同一域名下缓存共享
}

export default {
  sessionData: {},

  /**
   * 设置key值
   * @param {[type]} obj [description]
   */
  setSessionData(obj) {
    const keys = Object.keys(obj);

    keys.forEach((key) => {
      const value = obj[key];
      key = key.toLowerCase();
      this.sessionData[key] = value;

      cookie.set(`session-${key}`, value);
    });
  },

  /**
   * 获取某个key值，当key为空时，获取全部
   * @param  {[type]} key [description]
   * @return {[type]}     [description]
   */
  getSessionData(key) {
    if (!key) {
      return cookie.get();
    }

    key = key.toLowerCase();
    let value = this.sessionData[key];

    if (!value) {
      value = cookie.get(`session-${key}`);
    }

    return value;
  },

  /**
   * 删除某个key，必须指定，不能全部清除
   * @param  {[type]} key [description]
   * @return {[type]}     [description]
   */
  removeSessionData(key) {
    if (!key) {
      return;
    }

    key = key.toLowerCase();
    delete this.sessionData[key];

    cookie.remove(key, { path: '/' });
  }
};

