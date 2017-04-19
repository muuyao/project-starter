import Vue from 'vue';
import FastClick from 'fastclick'; // fix 点击延迟
import App from './app';
import router from './router';
import store from './store';

FastClick.attach(document.body);

// promise polyfill
require('es6-promise').polyfill();

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});
