import conf from '@/config/conf';
import {
  Base64
} from 'js-base64';

var __driver_interface__ = function() {
  this.name = "";
  this.doPost = function(api, param, func) {};
  this.callback = function(cb, data) {};
  this.log = function(type, msg) {};
  this.dialog = function(title, desc, type, cb) {};
  this.navigate = function(pageId, title, param, cb) {};
  this.popup = function(pageId, title, param) {};
  this.personIdValid = function(cb) {};
  this.chooseContact = function(cb) {};
  this.addCard = function(param, title, cb) {};
  this.chooseCard = function(param, title, cb) {};
  this.endPage = function(param, pageIdentifier) {};
  this.eeLogBiz = function(type, event, identity, properties) {
    /**
     * 鹰眼记录业务事件
     * 项目名(APP提供)
     * private String domain;
     * 事件发生的实际时间戳，精确到毫秒；(APP提供)
     * private long timestamp;
     * 业务类型；如：闪电贷三小时速审(FastAudit_3H)
     * private String type;
     * 需要监控目标的事件名称，需根据不同的业务需求定义；如：进单（OrderIn）
     * private String event;
     * 业务的唯一标识；如：借款单号
     * private String identity;
     * 事件的具体属性，以dict的形式存在。，它的类型和中文名已经预先定义好了，自定义属性请不要以$开头；
     * 同时，同一个名称的property，在同一业务类型中的不同event中，必须保持一致的定义和类型。
     * private Map<String, String> properties;
     * */
  };

  this.eeLogError = function(message) {
    /*
     * 鹰眼记录错误消息
     * message
     * */
  };
  this.eeLogUBT = function(action, event, properties) {
    /*
     * 鹰眼记录UBT消息
     * 项目名(APP提供)
     * private String domain;
     * 对用户的标识，对未登录用户，可以填充设备标识、cookieID等，对于登录用户，则应该填充注册账号；(APP提供)
     * private String distinctId;
     * 用户注册成功后，存放注册前的distinctId，而distinctId则填充注册账号。(APP提供)
     * private String originalId;
     * 事件发生的实际时间戳，精确到毫秒；(APP提供)
     * private long timestamp;
     * 用户跟目标交互的行为，如"点击"、"输入"、"跳转"、"进入"、"滑动"等等。该项必选。
     * private String action;
     * 要监控的目标的事件名称，通常是同一组目标的名字，比如"产品浏览"、"贷贷看借款"、"借款银行卡"等等。该项必选。
     * private String event;
     * 事件的具体属性，以dict的形式存在。其中以$开头的表明是系统的保留字段，它的类型和中文名已经预先定义好了，自定义属性请不要以$开头；
     * 同时，同一个名称的property，在不同event中，必须保持一致的定义和类型。
     * private Map<String, String> properties;
     * */
  };
  this.chooseSchool = function(param, title, cb) {};
  this.setBackBehavior = function(target) {};
  this.getUrl = function(key, cb) {};
  this.copyPaste = function(text) {};
  this.grantAuth = function(type, cb) {};
  this.openApp = function(appId) {};
  this.share = function(title, linkurl, content) {};
  this.showBarButton = function(pageId, title, position, func, url, cb, param) {};
  this.hideBarButton = function(pageId, param) {};
  this.setNavigationBar = function(pageId, display, param) {};
  this.openAlbum = function(pageId, title, params) {};
};

var _Proxy = function() {
  this.DRIIVERS = {
    ios: new __driver_interface__(),
    android: new __driver_interface__()
  };
  this.__current__ = null;
  this.__id__ = 1;
  this.cbFunc = {};
};

var proxy = new _Proxy();

var _proxy = {};

/**
 * 请求封装
 * @param  {[type]}   api   [description]
 * @param  {[type]}   param [description]
 * @param  {Function} cb    [description]
 * @return {[type]}         [description]
 */
_proxy.doPost = function(api, param, cb) {
  proxy.doPost(api, param, cb);
};

var __callback_content__ = {};

window.setCallBackContent = function(func, index, partten) {
  _proxy.log("debug", "setCallBackContent(" + func + "," + index + ",content(" + partten.length + "))");
  if (!__callback_content__.hasOwnProperty(func)) {
    __callback_content__[func] = {
      count: 0,
      data: {}
    };
  }
  __callback_content__[func].count++;
  __callback_content__[func].data["" + index] = partten;

  _proxy.log("debug", "push-content-into-func:" + func);
}

window.callback = _proxy.callback = function(func, data, codec) {
  function decode(text) {
    text = Base64.decode(text);
    _proxy.log("debug", "base64 data=====================>" + text);
    text = decodeURIComponent(text);

    return text.replace(/\[:space\]/g, " ");
  }

  if (data == null && __callback_content__.hasOwnProperty(func)) {
    /*通过分片调用*/

    var arr = [];
    for (var i = 0; i < __callback_content__[func].count; i++) {
      arr.push(__callback_content__[func].data["" + i]);
    }
    data = arr.join("");
  }

  //_proxy.log("debug", "length of data:" + data.length);

  if (codec != "base64") {
    proxy.callback(func, data);
    return;
  }

  /**
   * Encoder/decoder flag bit to indicate using the "URL and
   * filename safe" variant of Base64 (see RFC 3548 section 4) where
   * {@code -} and {@code _} are used in place of {@code +} and
   * {@code /}.
   */
  let text = data.replace(/-/g, "+").replace(/_/g, "/").replace(/\$/g, "=");
  try {
    proxy.callback(func, decode(text));
  } catch (e) {
    _proxy.log("debug", "callback-error::" + e.message);
    proxy.callback(func, {
      status: "0",
      error: "-1",
      message: e.message,
      data: {}
    });
  }
};
_proxy.log = function(type, msg) {
  proxy.log(type, msg);
};
_proxy.dialog = function(title, desc, type, cb) {
  proxy.dialog(title, desc, type, cb);
};
_proxy.navigate = function(pageId, title, param, cb) {
  proxy.navigate(pageId, title, param, cb);
};
_proxy.popup = function(pageId, title, param) {
  proxy.popup(pageId, title, param);
};
_proxy.personIdValid = function(cb) {
  proxy.personIdValid(cb);
};
_proxy.chooseContact = function(cb) {
  proxy.chooseContact(cb);
};
_proxy.addCard = function(param, title, cb) {
  proxy.addCard(param, title, cb);
};
_proxy.chooseCard = function(param, title, cb) {
  proxy.chooseCard(param, title, cb);
};
_proxy.endPage = function(param, pageIdentifier) {
  proxy.endPage(param, pageIdentifier);
};

_proxy.eeLogBiz = function(type, event, identity, properties) {
  proxy.eeLogBiz(type, event, identity, properties);
};

_proxy.eeLogError = function(message) {
  proxy.eeLogError(message);
};

_proxy.eeLogUBT = function(action, event, properties) {
  proxy.eeLogUBT(action, event, properties);
};
_proxy.chooseSchool = function(param, title, cb) {
  proxy.chooseSchool(param, title, cb);
};
_proxy.setBackBehavior = function(target) {
  proxy.setBackBehavior(target);
};

_proxy.getUrl = function(pageId, func) {
  proxy.getUrl(pageId, function(data) {
    _proxy.log("debug", "getUrl++" + data.data.url);
    func(data.data.url);
  });
};

_proxy.copyPaste = function(text) {
  proxy.copyPaste(text);
};

_proxy.grantAuth = function(type, cb) {
  proxy.grantAuth(type, cb);
};

_proxy.openApp = function(appId) {
  proxy.openApp(appId);
};

_proxy.share = function(title, linkurl, content) {
  proxy.share(title, linkurl, content);
};

_proxy.showBarButton = function(pageId, title, position, func, url, cb, param) {
  proxy.showBarButton(pageId, title, position, func, url, cb, param);
};
_proxy.hideBarButton = function(pageId, param) {
  proxy.hideBarButton(pageId, param);
};
_proxy.setNavigationBar = function(pageId, display, param) {
  proxy.setNavigationBar(pageId, display, param);
};

_proxy.openAlbum = function(pageId, title, param) {
  proxy.openAlbum(pageId, title, param);
};

_Proxy.prototype.getUrlParam = function(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
  var r = window.location.search.substr(1).match(reg); //匹配目标参数
  if (r != null) return unescape(r[2]);
  return null; //返回参数值
}


_Proxy.prototype.install = function(driver) {
  proxy.DRIIVERS[driver.name.toUpperCase()] = driver;
}
_Proxy.prototype.registCB = function(obj) {
  var st = Math.random().toString();
  st = st.substr(2, st.length);
  var name = "cbFunc" + st;
  // var name="cbFunc"+(++this.__id__);
  // debugger
  if (typeof obj == "function") {
    this.cbFunc[name] = {
      success: obj
    };
  } else {
    this.cbFunc[name] = obj;
  }
  if (this.cbFunc[name] && this.cbFunc[name].hasOwnProperty) {
    if (!this.cbFunc[name].hasOwnProperty("error")) {
      this.cbFunc[name].error = function() {};
    }
  }
  return name;
}
_Proxy.prototype.doPost = function(api, param, cb) {
  this.__current__.doPost(api, param, cb);
};
_Proxy.prototype.callback = function(func, data) {
  //_proxy.log("debug", "callback::" + func + "(" + JSON.stringify(data) + ")");
  if (typeof data !== "object" && data) {
    try {
      data = JSON.parse(data);
    } catch (e) {
      _proxy.log("error", e.stack);
    }
  }

  try {
    if (!this.cbFunc[func]) {
      _proxy.log("error", "Not found callback function " + func);
    } else if (data.status == "1") {
      this.cbFunc[func].success(data);
    } else {
      this.cbFunc[func].error(data);
    }
  } catch (e) {
    _proxy.log("error", e.stack);
  }
};
_Proxy.prototype.log = function(type, msg) {
  if (typeof msg == "object") {
    try {
      msg = msg.message;
    } catch (e) {

    }
  }
  this.__current__.log(type, msg);
};
_Proxy.prototype.dialog = function(title, desc, type, cb) {
  this.__current__.dialog(title, desc, type, cb);
};
_Proxy.prototype.navigate = function(pageId, title, param, cb) {
  this.__current__.navigate(pageId, title, param, cb);
};
_Proxy.prototype.popup = function(pageId, title, param) {
  this.__current__.popup(pageId, title, param);
};
_Proxy.prototype.personIdValid = function(cb) {
  this.__current__.personIdValid(cb);
};
_Proxy.prototype.chooseContact = function(cb) {
  this.__current__.chooseContact(cb);
};
_Proxy.prototype.addCard = function(param, title, cb) {
  this.__current__.addCard(param, title, cb);
};
_Proxy.prototype.chooseCard = function(param, title, cb) {
  this.__current__.chooseCard(param, title, cb);
};
_Proxy.prototype.endPage = function(param, pageIdentifier) {
  this.__current__.endPage(param, pageIdentifier);
};
_Proxy.prototype.chooseSchool = function(param, title, cb) {
  _proxy.log("debug", typeof(this.__current__));
  this.__current__.chooseSchool(param, title, cb);
};

_Proxy.prototype.eeLogBiz = function(type, event, identity, properties) {
  this.__current__.eeLogBiz(type, event, identity, properties);
};

_Proxy.prototype.eeLogError = function(message) {
  this.__current__.eeLogError(message);
};

_Proxy.prototype.eeLogUBT = function(action, event, properties) {
  this.__current__.eeLogUBT(action, event, properties);
};

_Proxy.prototype.setBackBehavior = function(target) {
  this.__current__.setBackBehavior(target);
};

_Proxy.prototype.getUrl = function(key, cb) {
  this.__current__.getUrl(conf.__pages__[key], cb);
};

_Proxy.prototype.copyPaste = function(text) {
  this.__current__.copyPaste(text);
};

_Proxy.prototype.grantAuth = function(type, cb) {
  this.__current__.grantAuth(type, cb);
};

_Proxy.prototype.openApp = function(appId) {
  this.__current__.openApp(appId);
};

_Proxy.prototype.share = function(title, linkurl, content) {
  this.__current__.share(title, linkurl, content);
};
_Proxy.prototype.showBarButton = function(pageId, title, position, func, url, cb, param) {
  this.__current__.showBarButton(pageId, title, position, func, url, cb, param);
};
_Proxy.prototype.hideBarButton = function(pageId, param) {
  this.__current__.hideBarButton(pageId, param);
};
_Proxy.prototype.setNavigationBar = function(pageId, display, param) {
  this.__current__.setNavigationBar(pageId, display, param);
};
_Proxy.prototype.openAlbum = function(pageId, title, param) {
  this.__current__.openAlbum(pageId, title, param);
};

export {
  proxy,
  _proxy
}
