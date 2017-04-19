<template>
  <div id="app" v-show="isShow">
    <NavBar v-show="isShowNav && isShow"></NavBar>
    <div :class="pageViewClass">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import NavBar from '@/components/nav-bar';
import proxy from '@/libs/proxy';
import api from '@/api/app';
import session from '@/libs/session';
import urlUtils from '@/libs/utils/url';
import wx from 'weixin-js-sdk';
import detect from '@/libs/utils/detect';
import {
  mapState
} from 'vuex';

export default {
  name: 'app',
  data() {
    return {
      isShow: false,
      showAppBar: 'show'
    };
  },
  computed: {
    ...mapState({
      os: state => state.app.os
    }),

    isShowNav() {
      if (this.os === 'WEB') {
        return true;
      } else if (this.$route.name !== 'home') {
        return true;
      }

      return false;
    },

    pageViewClass() {
      const {
        os,
        isShowNav
      } = this;

      if (!isShowNav) {
        return '';
      }

      if (os === 'IOS') {
        return 'page-view-ios';
      }
      if (os === 'ANDROID') {
        return 'page-view-android';
      }

      return 'page-view';
    }
  },

  watch: {
    $route(route) {
      const {
        os,
        showAppBar
      } = this;
      let type = 'hide';

      if (os !== 'WEB') {
        if (route.name === 'home') {
          type = 'show';
        }
        try {
          if (type !== showAppBar) {
            proxy.setNavigationBar('pageidentifier_invitation_index', type, {});
          }
          this.showAppBar = type;
        } catch (e) {
          console.log('router', e);
        }
      }
    }
  },

  methods: {
    wxConfig() {
      if (!detect.browser.weixin) {
        return;
      }

      const params = {
        url: location.href
      };
      api.getWXConfig(params, (data) => {
        const {
          appId,
          timestamp,
          nonceStr,
          signature
        } = data.data;

        wx.config({
          debug: true, // 开启调试模式
          appId, // 必填，公众号的唯一标识
          timestamp, // 必填，生成签名的时间戳
          nonceStr, // 必填，生成签名的随机串
          signature, // 必填，签名，见附录1
          jsApiList: [
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'onMenuShareQZone'
          ]
        });
      });
    },
    activate() {
      api.activate({}, (data) => {
        if (data.data) {
          session.setSessionData({
            __uuid__: data.data
          });

          api.updateDevice({}, (data)=>{
            console.log('updateDevice', data);
          });
        }

        this.isShow = true;
      });
    },
    setAppCode() {
      const code = urlUtils.getParams('code');
      if (code) {
        session.setSessionData({
          code
        });
      }
    }
  },

  created() {
    // set app code
    this.setAppCode();
    // 获取活动持续天数
    this.$store.dispatch('getLastDays');

    this.activate();

    this.wxConfig();
  },

  components: {
    NavBar
  }
};

</script>
<style lang="scss">
@import './assets/sass/app.scss';
#app {
  font-size: 24px;
}

.page-view,
.page-view-android {
  padding-top: 100px;
}

.page-view-ios {
  padding-top: 64PX;
}

</style>

