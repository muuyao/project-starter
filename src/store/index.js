import Vue from 'vue';
import Vuex from 'vuex';
import app from './modules/app';
import qrcode from './modules/qrcode';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    app,
    qrcode
  }
});
