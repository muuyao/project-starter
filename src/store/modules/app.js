import api from '@/api/app';
import urlUtils from '@/libs/utils/url';
import proxy from '@/libs/proxy';
import session from '@/libs/session';
import * as types from '../mutation-types';


// initial state
const state = {
  code: urlUtils.getParams('code') || urlUtils.getHashParams('code') || session.getSessionData('code') || '',
  is3DaysLast: false,
  os: proxy.os,
  inviteCode: urlUtils.getParams('inviteCode') || urlUtils.getHashParams('inviteCode') || ''
};

const mutations = {
  [types.SET_CODE](state, {
    code
  }) {
    state.code = code;
  },

  [types.GET_LAST_DAYS](state, {
    is3DaysLast
  }) {
    state.is3DaysLast = is3DaysLast;
  },

  [types.GET_INVITE_CODE](state, {
    inviteCode
  }) {
    state.inviteCode = inviteCode;
  }
};

const actions = {
  setCode({
    commit,
    state
  }, code) {
    commit(types.SET_CODE, {
      code
    });
  },
  getLastDays({
    commit,
    state
  }) {
    api.getLastDays((data) => {
      const is3DaysLast = data.data && data.data > 3;
      commit(types.GET_LAST_DAYS, {
        is3DaysLast
      });
    });
  },

  getInviteCode({
    commit,
    state
  }) {
    api.getInviteCode((data) => {
      const inviteCode = data && data.data;
      commit(types.GET_INVITE_CODE, {
        inviteCode
      });
    });
  }
};

export default {
  state,
  mutations,
  actions
};

