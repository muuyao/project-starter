const APIPREFIX = 'http://192.168.25.103:8080';
/**
 * API 列表，最多允许两层嵌套
 * @type {Object}
 */
const apis =  {
  /*网页链接列表*/
  get_we_keyList: '/common/webKeyList',

  setLogInfo: '/ubtEventInfo/addUbtEventInfo',

  app: {
    getLastDays: '/shareAndInvite/checkActiveDate',
    getQRCodeUrl: '/shareAndInvite/getQRCode',
    getInviteCode: '/shareAndInvite/getInviteCode',
    addShareRecord: '/activityInfo/addShareRecord',
    getWXConfig: '/shareAndInvite/getSiginature',
    activate: '/userAuth/activate',
    updateDevice: '/userAuth/updateDevice'
  },

  bankcard: {
    getBankCards: '/cashRecord/getBankCardList',
    addBankCard: '/cashRecord/addBankCard',
    getBankList: '/userAuth/getBankList',
  },

  cash: {
    getCash: '/cashRecord/getCashWithdrawed',
    getCashLimit: '/activityInfo/getActivityInfo',
    getTotalcash: '/inviteAwardRecord/getCashStatusByUserId',
  },

  detail: {
    getInviteDetail: '/inviteAwardRecord/getWithdrawAwardDetail',
    getCashDetail: '/inviteAwardRecord/getUserCashRecord',
  },

  user: {
    login: '/userAuth/userLogin',
    register: '/userAuth/userRegister',
    getValidCode: '/userAuth/sendSmsCaptcha',
    resetPassword: '/userAuth/userResetPassword',
    generateVerifyCodeImage: '/userAuth/generateVerifyCodeImage',
    validateCodeImage: '/userAuth/checkImageVerifyCode'
  },
};


/**
 * 填充 API 前缀
 * @param  {[type]} api [description]
 * @return {[type]}     [description]
 */
const fillPrefix = function (api) {
  if (typeof api === 'string') {
    api = APIPREFIX + api;
  } else {
    const keys = Object.keys(api);
    keys.forEach((key) => {
      const value = api[key];
      api[key] = fillPrefix(value);
    });
  }

  return api;
};

export default fillPrefix(apis);
