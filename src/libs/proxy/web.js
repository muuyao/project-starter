import {
  proxy,
  _proxy
} from './prototype';
import apis from '@/config/api';
import axios from '@/libs/axios';
import securityConf from '@/config/security';
import appConf from '@/config/app';
import securityUtils from '@/libs/utils/security';
import session from '@/libs/session';
import deviceInfo from '@/libs/utils/device-info';
import urlUtils from '@/libs/utils/url';

var driver = function() {
  this.name = "web";
};

// var baseurl = "/api";
// var baseurl = "http://192.168.1.89:40699";
// var baseurl = "http://192.168.25.103:8080";
// var baseurl="http://192.168.1.46:8080";
//  var baseurl="http://192.168.0.57:8080";
//  var baseurl="http://192.168.3.170:8080";
//  var baseurl="http://192.168.0.172:8080";
// var baseurl="http://192.168.0.146:8080";



proxy.install(new driver());
driver.prototype.doPost = function(api, param, cb) {
  var name = proxy.registCB(cb);
  const config = {};

  if(typeof param.loading !== 'undefined'){
    config.loading = param.loading;
    delete param.loading;
  }

  var localJson = api.indexOf('.json') > -1;

  // if (api.indexOf("http://") < 0 && api.indexOf("https://") < 0) {
  //   api = baseurl + api;
  // }

  // 加密判断
  if (param.security !== false && securityConf.supportSecurity) {
    param = securityUtils.wrapWithRSA(param);
  }

  axios({
      method: localJson ? 'get' : 'post',
      url: api,
      data: param,
      ...config
    })
    .then(response => {
      let data = response.data;
      if (param.security !== false && securityConf.supportSecurity && data.data) {
        data = securityUtils.unWrapWithRSA(data.data);
        data = data ? JSON.parse(data) : null;
      }

      _proxy.callback(name, data);
    })
    .catch(error => {
      let message = error && error.message || '';
      if (param.security !== false && securityConf.supportSecurity) {
        message = securityUtils.unWrapWithRSA(message);
      }

      _proxy.callback(name, message);
      // _proxy.log("error", message);
    });

};

driver.prototype.log = function(type, message) {
  var logger = {
    info: "console.info",
    error: "console.error",
    warn: "console.warn",
    debug: "console.debug"
  };
  var logger = eval(logger[type]);

  console.log(message);
};

driver.prototype.dialog = function(title, desc, type, cb) {
  var name = proxy.registCB(cb);
  if (type == 'OK') {
    alert(desc);
    _proxy.callback(name, {
      "status": "1",
      "error": "",
      "message": "",
      "data": {
        "result": 1
      }
    });
  } else if (type == 'OKCANCEL') {
    if (confirm(desc)) {
      _proxy.callback(name, {
        "status": "1",
        "error": "",
        "message": "",
        "data": {
          "result": 1
        }
      });
    } else {
      _proxy.callback(name, {
        "status": "1",
        "error": "",
        "message": "",
        "data": {
          "result": 0
        }
      });
    }
  }
};

driver.prototype.navigate = function(pageId, title, param, cb) {
  /*获取外部url*/
  if (typeof param == 'string' && param.indexOf('http:') >= 0) {
    window.location.href = param;
    return;
  }
  var href = "";
  if (param.url.indexOf("http://") == 0 || param.url.indexOf("https://") == 0) {
    href = param.url;
  } else {
    href = location.origin + param.url;
  }

  if (typeof(param.param) != "undefined") {
    href += "?" + param.param;
  }
  window.location.href = href;
  // window.location.href = "&pageId="+pageId+"&title="+title+"&param="+param;
};

driver.prototype.popup = function(pageId, title, param) {
  alert(param);
};

driver.prototype.personIdValid = function(cb) {
  var name = proxy.registCB(cb);
  _proxy.callback(name, {
    "status": "1",
    "data": {
      "people": "汉",
      "croppedImage": null,
      "idNumber": "150125197507092141",
      "msg": null,
      "sex": "男",
      "transerialsId": null,
      "error": null,
      "type": "第二代身份证",
      "address": "陕西省洛南县保安镇乱石坪村八组",
      "birthday": "1975年07月09日",
      "issueAuthority": null,
      "validity": null,
      "name": "李龙",
      "status": null
    },
    "code": null,
    "msg": null,
    "error": "00000000",
    "pageCount": null
  });
};

driver.prototype.chooseContact = function(cb) {
  var name = proxy.registCB(cb);
  _proxy.callback(name, {
    "status": "1",
    "error": "",
    "message": "",
    "data": {
      "result": 1,
      "name": "杨少龙",
      "tel": "15874787878"
    }
  });
};

driver.prototype.addCard = function(param, title, cb) {
  var name = proxy.registCB(cb);
  _proxy.callback(name, {
    "status": "1",
    "error": "",
    "message": "",
    "data": {
      "result": 1,
      "cardNum": "6228480402564890018",
      "bankName": "中国民生银行"
    }
  });
};

driver.prototype.chooseCard = function(param, title, cb) {
  var name = proxy.registCB(cb);
  _proxy.callback(name, {
    "status": "1",
    "error": "",
    "message": "",
    "data": {
      "result": 1,
      "cardNum": "6228480402564890018",
      "bankName": "中国民生银行"
    }
  });
};
driver.prototype.chooseSchool = function(param, title, cb) {
  var name = proxy.registCB(cb);
  _proxy.callback(name, {
    "status": "1",
    "error": "",
    "message": "",
    "data": {
      "result": 1,
      "schoolId": "1",
      "schoolName": "清华大学"
    }
  });
};



driver.prototype.endPage = function(param, pageIdentifier) {

};

driver.prototype.eeLogBiz = function(type, event, identity, properties) {
  _proxy.log("debug", JSON.stringify({
    method: "eeLogBiz",
    "type": type,
    "event": event,
    "identity": identity,
    "properties": properties
  }));
};

driver.prototype.eeLogError = function(message) {
  _proxy.log("debug", JSON.stringify({
    method: "eeLogError",
    "message": message
  }));
};

driver.prototype.eeLogUBT = function(action, event, properties) {
   const _properties={
      "$manufacturer":deviceInfo.manufacturer,
      "$model": deviceInfo.model,
      "$os":deviceInfo.os,
      "$os_version":deviceInfo.os_version,
      "$app_version": appConf.version,
      "$screen_width":window.screen.availWidth,
      "$screen_height":window.screen.availHeight,
      "$longitude":0,
      "$latitude":0,
      "$province":"",
      "$city":"",
      "$district":"",
      "$ip":"0.0.0.0",
      "$market": urlUtils.getParams('channel') || 'web'
  };

  const data = {
    "domain": "mobanker-uzone-flash",
    "distinctId": "",
    "timestamp": Date.now(),
    "action": action,
    "event": event,
    "properties": _properties,
    "loading": false
  };

  this.doPost(apis.setLogInfo, data, function(){
    console.log('埋点成功', event);
  });

  // _proxy.log("debug", JSON.stringify({
  //   method: "eeLogUBT",
  //   "action": action,
  //   "event": event,
  //   "properties": _properties
  // }));
};

driver.prototype.setBackBehavior = function(target) {};

driver.prototype.getUrl = function(pageId, func) {
  _proxy.doPost(apis.get_we_keyList, {
    "webKey": pageId
  }, {
    success: function(data) {
      func({
        status: 1,
        data: {
          url: data.data[pageId]
        }
      });
    }
  });
};

driver.prototype.copyPaste = function(text) {};

driver.prototype.grantAuth = function(text, func) {};

driver.prototype.share = function(title, linkurl, content) {};
