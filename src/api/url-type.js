/**
 * API列表，建议最多两层嵌套
 *
 * url值的格式为'[{method}|]{url}'
 * method: get/post/put/delete, 为URL的请求方法，不写默认为post
 */
export default {
  user: {
    getProfile: 'post|/user/getProfile',
    getDetail: '/user/getDetail',
  }
};
