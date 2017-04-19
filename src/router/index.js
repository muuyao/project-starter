import Vue from 'vue';
import Router from 'vue-router';
import changeTitle from '@/libs/utils/change-title';
import proxy from '@/libs/proxy';
import homeRouter from './home';
import qrcodeRouter from './qrcode';
import detailRouter from './detail';
import getCashRouter from './get-cash';
import downloadRouter from './download';
import selectBankcardRouter from './select-bankcard';
import addBankcardRouter from './add-bankcard';
import loginRouter from './login';
import registerRouter from './register';
import passwordRouter from './password';
import protocolSecret from './protocol-secret';
import protocolRegister from './protocol-register';

Vue.use(Router);

const router = new Router({
  mode: 'hash',
  // base: '',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }

    return {
      x: 0,
      y: 0
    };
  },
  routes: [
    ...homeRouter,
    ...qrcodeRouter,
    ...detailRouter,
    ...getCashRouter,
    ...downloadRouter,
    ...selectBankcardRouter,
    ...addBankcardRouter,
    ...loginRouter,
    ...registerRouter,
    ...passwordRouter,
    ...protocolSecret,
    ...protocolRegister
  ]
});

// 改变 title
router.afterEach((route) => {
  const {
    title,
    className
  } = route.meta;

  changeTitle(title);

  if (className) {
    document.body.classList.add(className);
  } else {
    document.body.className = '';
  }
});

export default router;
