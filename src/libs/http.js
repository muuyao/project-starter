import proxy from '@/libs/proxy';
import session from '@/libs/session';
import router from '@/router';
import appConf from '@/config/app';
import urlUtils from '@/libs/utils/url';
import deviceInfo from '@/libs/utils/device-info';
import {
  Toast
} from 'mint-ui';

export default {
  doPost(api, params, fn) {
    const os = proxy.os;
    let hasErrorFn = false;
    let callback;

    params.version = appConf.version;
    params.productNo = appConf.productNo;
    params.channelNo = appConf.channel;
    params.channel = appConf.channel;
    params.code = session.getSessionData('code');
    params.deviceId = session.getSessionData('__uuid__') || deviceInfo.model;
    params.marketChannel = params.marketChannel || urlUtils.getParams('channel') || 'web';

    if (typeof fn === 'function') {
      callback = {
        success: data => fn(data),
        error: (data) => {}
      };
    } else if (typeof fn === 'object') {
      callback = fn;
      if (fn.error) {
        hasErrorFn = true;
      }
    }
    console.log('send', api, params);
    proxy.doPost(api, params, {
      success(data) {
        console.log('success', api, data);
        callback.success && callback.success(data);
      },
      error(data) {
        console.log('error', api, data);
        if (data.error === '42000711') {
          // 登录超时、验证码过期
          if (os === 'ANDROID') {
            // 如果是安卓，跳转到登录页面
            //proxy.navigate('Page_Login', '好友邀请', {}, (e) => {});
            return;
          } else if (os === 'WEB') {
            // 清除缓存
            session.removeSessionData('code');
            // 如果是在浏览器中，跳转到登录页面
            router.push(`login?redirectUrl=${encodeURIComponent(location.href)}`);
            return;
          }
        } else if (data.error === '42000002' && os === 'WEB') {
          // 清除缓存
          session.removeSessionData('code');
          // 如果是在浏览器中，跳转到登录页面
          router.push(`login?redirectUrl=${encodeURIComponent(location.href)}`);
          return;
        } else {
          if (!hasErrorFn) {
            Toast({
              message: (data && data.msg) || '请求出错，请稍后重试',
              duration: 2000
            });

            return;
          }

          callback.error && callback.error(data);
        }
      }
    });
  }
}

