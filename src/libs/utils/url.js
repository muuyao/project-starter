/**
 * 获取query参数
 * @param  {string} name 需要获取的参数key值
 * @return {[type]}      [description]
 */
var getParams = function (name, search) {
  search = (search || window.location.search).match(/\?.*(?=\b|#)/);

  search && (search = search[0].replace(/^\?/, ''));
  if (!search) return name ? '' : {};
  var queries = {},
    params = search.split('&');

  for (var i in params) {
    var param = params[i].split('=');
    queries[param[0]] = param[1] ? decodeURIComponent(param[1]) : '';
  }

  return name ? queries[name] : queries;
};

/**
 * 获取hash query参数
 * @param  {string} name 需要获取的参数key值
 * @return {[type]}      [description]
 */
var getHashParams = function (name, hash) {
  hash = (hash || window.location.hash).split('#');

  hash && hash[1] && (hash = hash[1].replace(/^.*\?/, ''));

  if (!hash || !hash[1]) return name ? '' : {};
  var queries = {},
    params = hash.split('&');

  for (var i in params) {
    var param = params[i].split('=');
    queries[param[0]] = param[1] ? decodeURIComponent(param[1]) : '';
  }

  return name ? queries[name] : queries;
};

/**
 * 给url注入参数，注入的参数会覆盖旧参数
 * @Author   fisher<wangjiang.fly.1989@163.com>
 * @DateTime 2016-06-25T09:37:04+0800
 * @param    {Object}                           params  要注入的参数
 * @param    {String}                           url     要注入参数的url, 为空时取当前页面url
 * @param    {Array}                           withouts url中需要排除的参数key数组
 * 例：
 * fillParams({a: 1, b: 2, c: 3}, 'http://a.b.c.d?aa=1&bb=2&cc=3&b=4#a=0&b=6', ['aa', 'a', 'b', 'c', 'bb', 'cc'])
 *   =》"http://a.b.c.d#a=0&b=6"
 *
 * fillParams({a: 1, b: 2, c: 3}, 'http://a.b.c.d?aa=1&bb=2&cc=3&b=4#a=0&b=6', ['aa', 'a', 'b', 'c', 'bb'])
 *   =》"http://a.b.c.d?cc=3#a=0&b=6"
 *
 *  fillParams({a: 1, b: 2, c: 3}, 'http://a.b.c.d?aa=1&bb=2&cc=3&b=4#a=0&b=6', ['aa'])
 *   =》"http://a.b.c.d?bb=2&cc=3&a=1&b=2&c=3#a=0&b=6"
 *
 *  fillParams({a: 1, b: 2, c: 3}, 'http://a.b.c.d?aa=1&bb=2&cc=3&b=4#a=0&b=6')
 *   =》"http://a.b.c.d?aa=1&bb=2&cc=3&a=1&b=2&c=3#a=0&b=6"
 *
 *  fillParams({a: 1, b: 2, c: 3}, 'http://a.b.c.d')
 *   =》"http://a.b.c.d?a=1&b=2&c=3"
 *
 * @return   {String}                          注入参数后的url
 */
var fillParams = function (params, url, withouts) {
  url = url || window.location.href;

  var urlPairs = url.split('#'),
    fullUrl = urlPairs[0],

    hashUrl = urlPairs.length > 1 && ('#' + urlPairs[1]) || '',
    baseUrl = fullUrl.split('?')[0],
    originParams = getParams(null, fullUrl),

    paramsList = [],
    re = '';

  for (var key in originParams) {
    if (undefined === params[key] && indexOfArray(withouts, key) === -1) {
      paramsList.push(key + '=' + originParams[key]);
    }
  }

  for (var key1 in params) {
    if (indexOfArray(withouts, key1) === -1) {
      if (params[key1] !== undefined) {
        paramsList.push(key1 + '=' + params[key1]);
      }
    }
  }

  re += baseUrl;
  re += paramsList.length && ('?' + paramsList.join('&')) || '';
  re += hashUrl;

  return re;
};


/**
 * 判断key是否在数组中
 * @Author   fisher<wangjiang.fly.1989@163.com>
 * @DateTime 2016-06-25T09:26:51+0800
 * @param    {[type]}                           arr [description]
 * @param    {[type]}                           key [description]
 * @return   {[type]}                               [description]
 */
var indexOfArray = function (arr, key) {
  arr = arr || [];
  for (var i = 0, len = arr.length; i < len; i++) {
    if (arr[i] === key) {
      return i;
    }
  }

  return -1;
};

var fillProtocol = function (url, protocol) {
  if (url.indexOf('//') === 0) {
    url = protocol.indexOf(':') === -1 ? protocol + ':' + url : protocol + url;
  }

  return url;
};

/**
 * 替换占位符 支持:id 和 {id} 两种形式
 * @param    {[type]}                url    [description]
 * @param    {[type]}                params [description]
 * @return   {[type]}                [description]
 * @datetime 2017-01-05T11:31:40+080
 * @author wangxiao<i@muyao.me>
 */
const replacePlaceholder = function (url, params) {
  url = url.replace(/:([^\/]+)/gi, function (match, key) {
    return params[key];
  });

  url = url.replace(/{([^}]+)}/gi, function (match, key) {
    return params[key];
  });

  return url;
};

export default {
  getParams,
  getHashParams,
  fillParams,
  fillProtocol,
  replacePlaceholder
};
