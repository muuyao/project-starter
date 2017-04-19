import api from '@/api/qrcode';
import * as types from '../mutation-types';


// initial state
const state = {
  url: ''
};

const mutations = {
  [types.GET_QRCODE_URL](state, {
    url
  }) {
    state.url = url;
  }
};

const actions = {
  getQRCodeUrl({
    commit,
    state
  }, {
    url
  }) {
    api.getQRCodeUrl({
      url
    }, (data) => {
      const url = `data:image/png;base64,${data.data}`;
      commit(types.GET_QRCODE_URL, {
        url
      });
    });
  }
};

export default {
  state,
  mutations,
  actions
};
