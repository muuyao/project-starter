<template>
  <div>
    <Share ref="webShare" v-if="os === 'WEB'"></Share>
    <WXShare ref="wxShare" v-if="isWX"></WXShare>
    <div class="hd">
      <Banner source="home"></Banner>
      <div class="hd-award" @click="gotoGetCash">
        <span>我的<br>奖励</span>
      </div>
      <div class="hd-rule-wrapper">
        <div class="hd-rule" @click="showRule">
          <span>活动规则</span>
          <span class="hd-rule-icon"></span>
        </div>
      </div>
    </div>
    <div class="bd">
      <div class="bd-share-hd">
        <span class="bd-line bd-line-left"></span>
        <p class="bd-share-title">分享</p>
        <span class="bd-line bd-line-right"></span>
      </div>
      <div class="bd-share-bd">
        <div class="bd-share-btn" @click="share">分享给好友</div>
      </div>
      <div class="bd-code-hd">
        <span class="bd-code-label">我的邀请码</span>
        <span v-if="code" class="bd-code-value">{{inviteCode}}</span>
        <span class="bd-code-login" v-else @click="login">登录</span>
      </div>
      <div class="bd-code-bd">
        <div class="bd-code-btn" @click="gotoQRCode">邀请二维码</div>
      </div>
    </div>
    <ModalEle title="活动规则" ref="rule" :showCancelBtn="false" :callback="logClickSure" confirmBtnText="确定">
      <div class="rule-content" v-if="is3DaysLast">
        <p>1、活动时间：<em>本活动于2017年4月1日推出;</em></p>
        <p>2、活动方式：U族已注册用户可生成邀请码，并邀请好友成功注册U族;</p>
        <p>3、被邀请人借款到账，该邀请人即可获得对应的25元现金奖励（仅限被邀请人首笔借款）;</p>
        <p>4、用户通过欺骗、造假等不正当手段参与活动的，一经查实，U族将取消奖励或不予奖励;</p>
        <p>5、本次活动带有广告推介性质且在法律允许范围内的最终解释权归U族运营方所有。</p>
      </div>
      <div class="rule-content" v-else>
        <p>1、活动时间：<em>本活动于2017年4月1日推出;</em></p>
        <p>2、活动方式：U族已注册用户可生成邀请码，并邀请好友成功注册U族;</p>
        <p>3、被邀请人借款到账，该邀请人即可获得对应的40元现金奖励（仅限被邀请人首笔借款）;</p>
        <p>4、用户通过欺骗、造假等不正当手段参与活动的，一经查实，U族将取消奖励或不予奖励;</p>
        <p>5、本次活动带有广告推介性质且在法律允许范围内的最终解释权归U族运营方所有。</p>
      </div>
    </ModalEle>
  </div>
</template>
<script>
import detect from '@/libs/utils/detect';
import Banner from '@/components/banner';
import api from '@/api/app';
import {
  ModalEle
} from '@/components/modal';
import {
  mapState
} from 'vuex';
import shareConf from '@/config/share';
import Share from './components/share';
import proxy from '@/libs/proxy';
import conf from '@/config/conf';
import WXShare from './components/wx-share';

export default {
  name: 'home',
  data() {
    return {
      isWX: detect.browser.weixin
    };
  },

  computed: {
    ...mapState({
      is3DaysLast: state => state.app.is3DaysLast,
      inviteCode: state => state.app.inviteCode,
      code: state => state.app.code,
      os: state => state.app.os
    })
  },

  methods: {
    logClickSure() {
      proxy.eeLogUBT(conf.__ee__.click, 'InvRulSurBtnUInv');
    },
    gotoGetCash() {
      proxy.eeLogUBT(conf.__ee__.click, 'InvRewBtnUInV');
      if (!this.checkLogin()) {
        return;
      }

      this.$router.push('get-cash');
    },

    gotoQRCode() {
      proxy.eeLogUBT(conf.__ee__.click, 'InvQRCodBtnUInV');
      if (!this.checkLogin()) {
        return;
      }

      this.$router.push('qrcode');
    },
    login() {
      const os = this.os;

      proxy.eeLogUBT(conf.__ee__.click, 'InvLogBtnUInv');
      if (os === 'WEB') {
        this.$router.push('login');
      } else if(os === 'ANDROID'){
        proxy.navigate('Page_Login', '好友邀请', {}, (e) => {});
      } else {
        this.$store.dispatch('getInviteCode');
      }
    },
    showRule() {
      proxy.eeLogUBT(conf.__ee__.click, 'InvRulBtnUInv');
      proxy.eeLogUBT(conf.__ee__.goin, 'InvRulPagUInv');
      this.$refs.rule.show();
    },
    share() {
      proxy.eeLogUBT(conf.__ee__.click, 'InvShaBtnUInv');

      // share record
      api.addShareRecord({
        shareChannel: this.os,
        shareStatus: "2",
        loading: false
      }, () => {});

      const browser = detect.browser;

      if (this.os === 'WEB') {
        if (browser.weixin) {
          this.$refs.wxShare.show();
        } else {
          this.$refs.webShare.show();
        }
      } else {
        proxy.share(shareConf.title, shareConf.getUrl(), shareConf.description);
      }
    },

    checkLogin() {
      if (!this.code) {
        this.login();
        return false;
      }

      return true;
    }

  },

  created() {
    if (this.code) {
      this.$store.dispatch('getInviteCode');
    }

    proxy.eeLogUBT(conf.__ee__.goin, 'InvPagUInV');
  },

  components: {
    Banner,
    ModalEle,
    Share,
    WXShare
  }
};

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.hd {
  position: relative;
}

.hd-rule-wrapper {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hd-rule {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #fff;
}

.hd-rule-icon {
  background: url('./img/rule.png') no-repeat center center;
  height: 19px;
  width: 19px;
  background-size: contain;
  margin-left: 8px;
}

.hd-award {
  position: absolute;
  width: 80px;
  height: 80px;
  text-align: center;
  border: 5px solid #00c9ef;
  border-radius: 50%;
  background-color: #fff;
  top: 15px;
  right: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #00d993;
  font-size: 20px;
}

.bd {
  background-color: #fff;
  border-radius: 10px;
  margin: 30px 16px 56px;
  padding: 0 0 64px;
}

.bd-share-hd {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 50px 0 45px;
}

.bd-line {
  height: 1px;
  background-color: #44444e;
  width: 80px;
}

.bd-share-title {
  padding: 0 60px;
  font-size: 26px;
}

.bd-share-bd {
  padding-bottom: 80px;
  display: flex;
  justify-content: center;
}

.bd-share-btn {
  background: transparent url('./img/button.png') no-repeat center center;
  width: 400px;
  height: 78px;
  line-height: 78px;
  text-align: center;
  background-size: contain;
  font-size: 30px;
  font-weight: 700;
  color: #fefefe;
  &:active {
    opacity: 0.8
  }
}

.bd-code-hd {
  margin: 0 34px;
  height: 80px;
  background-color: #f2f2f2;
  font-size: 26px;
  color: #66666e;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 700;
}

.bd-code-label {
  padding-left: 29px;
}

.bd-code-value {
  padding-right: 29px;
}

.bd-code-login {
  background-color: #ede9f8;
  color: #7353eb;
  width: 200px;
  text-align: center;
  height: 80px;
  line-height: 80px;
}

.bd-code-bd {
  display: flex;
  justify-content: center;
}

.bd-code-btn {
  height: 76px;
  width: 400px;
  line-height: 76px;
  border-radius: 30px;
  background-color: #2ecca1;
  color: #fefefe;
  font-size: 30px;
  text-align: center;
  margin-top: 50px;
  &:active {
    opacity: 0.8
  }
}


/*活动规则*/

.rule-content {
  font-size: 24px;
  text-align: left;
  p {
    line-height: 1.5;
    margin-bottom: 10px;
    text-indent: -1.5em;
    padding-left: 1.5em;
  }
  em {
    color: #00c696;
  }
}

</style>

