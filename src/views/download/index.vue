<template>
  <div>
    <Banner></Banner>
    <form class="form-wrapper" @submit="submitForm">
      <div class="form-inputs">
        <MInput type="text" placeholder="手机号" @change.native="logMobileInput" v-model="form.phone">
          <div class="icon icon-phone" slot="icon"></div>
        </MInput>
        <MInput type="number" placeholder="验证码" @change.native="logCodeInput" v-model="form.verificationCode">
          <div class="icon icon-verification" slot="icon"></div>
          <div class="send-verification" slot="addon">
            <TimerBtn :graphic="graphic" :phone="form.phone" :second="60" @click.native="runTimer" ref="timerBtn" :timerProblemCallback="logGetNoCode">
            </TimerBtn>
          </div>
        </MInput>
        <MInput type="text" placeholder="图形验证码" v-show="graphicImg" @change.native="logImageCode" v-model="form.graphicCode">
          <div class="icon icon-graphic" slot="icon">
            <img :src="graphicImg">
          </div>
        </MInput>
        <MInput :type="passwordType" placeholder="6-10位数字&字母组合登录密码" @change.native="logPasswordInput" v-model="form.password">
          <div class="icon icon-password" slot="icon"></div>
          <div class="icon" :class="passwordAddonIcon" slot="addon" @click="changePasswordType"></div>
        </MInput>
      </div>
      <div class="form-action">
        <button class="btn" type="submit">极速下载</button>
        <p class="invite-code" v-if="inviteCode">邀请码 ({{inviteCode}}) </p>
      </div>
    </form>
  </div>
</template>
<script>
import {
  Toast
} from 'mint-ui';
import md5 from 'blueimp-md5';
import urlUtils from '@/libs/utils/url';
import regexp from '@/libs/utils/regexp';
import Banner from '@/components/banner';
import MInput from '@/components/m-input';
import TimerBtn from '@/components/timer-btn';
import appConf from '@/config/app';
import session from '@/libs/session';
import modal from '@/components/modal';
import {
  doRegister,
  generateVerifyCodeImage,
  doLogin,
  validateCodeImage
} from '@/api/user';
import proxy from '@/libs/proxy';
import conf from '@/config/conf';

export default {
  name: 'download',
  data() {
    return {
      form: {
        phone: '',
        verificationCode: '',
        graphicCode: '',
        password: ''
      },
      graphicImg: '',
      isExistsGraphicCode: false,
      inviteCode: urlUtils.getParams('inviteCode') || this.$route.query.inviteCode || '',
      passwordType: 'password'
    };
  },
  computed: {
    graphic() {
      return {
        isShow: !!this.graphicImg,
        code: this.form.graphicCode
      };
    },
    passwordAddonIcon() {
      return this.passwordType === 'password' ? 'icon-eye' : 'icon-eye-hidden';
    }
  },
  created() {
    proxy.eeLogUBT(conf.__ee__.goin, 'InvRegPagUInv');
  },
  methods: {
    logMobileInput() {
      proxy.eeLogUBT(conf.__ee__.input, 'InvRegPhoInpUInv');
    },
    logPasswordInput() {
      proxy.eeLogUBT(conf.__ee__.input, 'InvRegPasNumInpUInv');
    },
    logCodeInput() {
      proxy.eeLogUBT(conf.__ee__.input, 'InvRegCodInpUInv');
    },
    logGetNoCode() {
      proxy.eeLogUBT(conf.__ee__.click, 'InvRegObtCodFaiUInv');
    },
    logImageCode() {
      proxy.eeLogUBT(conf.__ee__.input, 'InvRegImaCodUInv');
    },
    runTimer() {
      proxy.eeLogUBT(conf.__ee__.input, 'InvRegObtCodUInv');
      if (!this.validateField('phone')) {
        return;
      }

      if (this.isExistsGraphicCode) {
        if (!this.validateField('graphicCode')) {
          return;
        }

        validateCodeImage({
          imageValidCode: this.form.graphicCode
        }, () => {
          this.$refs.timerBtn.run();

          this.isExistsGraphicCode = false;
        }, (error) => {
          Toast({
            message: error.msg || '请输入正确的图形验证码',
            duration: 2000
          });
        });
      } else {
        this.getCodeImage(() => {
          if (this.isExistsGraphicCode) {
            Toast({
              message: '请输入图形验证码',
              duration: 2000
            });
          } else {
            this.$refs.timerBtn.run();
          }
        });
      }
    },

    changePasswordType() {
      this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
    },

    getCodeImage(callback) {
      generateVerifyCodeImage({}, (data) => {
        data = data.data;
        if (data) {
          this.isExistsGraphicCode = true;
          this.graphicImg = data;
        }

        callback();
      });
    },

    validCodeImage() {

    },

    validateField(name) {
      let msg;
      const {
        phone,
        verificationCode,
        graphicCode,
        password
      } = this.form;

      if (name === 'phone') {
        if (!phone) {
          msg = '请输入手机号';
        } else if (!regexp.phone.test(phone)) {
          msg = '请输入有效的手机号';
        }
      }

      if (name === 'verificationCode') {
        if (!verificationCode) {
          msg = '请输入短信验证码';
        }
      }

      if (name === 'graphicCode') {
        if (!graphicCode) {
          msg = '请输入图形验证码';
        }
      }

      if (name === 'password') {
        if (!password) {
          msg = '请输入密码';
        } else if (!regexp.password.test(password)) {
          msg = '请输入6-10位英文数字字母组合密码';
        }
      }

      if (msg) {
        Toast({
          message: msg,
          duration: 2000
        });

        return false;
      }

      return true;
    },

    validateForm() {
      const keys = Object.keys(this.form);
      const index = keys.indexOf('graphicCode');

      if (index > -1) {
        keys.splice(index, 1);
      }

      return keys.every(value => this.validateField(value));
    },

    submitForm(e) {
      proxy.eeLogUBT(conf.__ee__.click, 'InvRegSurBtnUInv');
      e.preventDefault();
      if (!this.validateForm()) {
        return false;
      }

      const {
        phone,
        verificationCode,
        password
      } = this.form;

      const data = {
        data: {
          phone,
          validCode: verificationCode,
          password: md5(password),
          marketChannel: urlUtils.getParams('channel') | 'web',
          version: appConf.version,
          productNo: appConf.productNo,
          channelNo: appConf.channelNo,
          deviceId: session.getSessionData('__uuid__'),
          inviteCode: this.inviteCode
        }
      };

      doRegister(data, r => {
        if (r.status === '1') {
          doLogin({
            phone,
            password: md5(password)
          }, r => {
            if (r.status === '1') {
              session.setSessionData(r.data);
              modal({
                title: '注册成功',
                icon: 'icon-success',
                message: '您离5000元现金只有一步之遥，点击立即申请！',
                showCancelBtn: false,
                confirmBtnText: '马上拿钱',
                callback(action) {
                  proxy.eeLogUBT(conf.__ee__.click, 'InvRegSucPopSurUInv');
                  location.href = `http://m.u-zu.com?channel=${appConf.channel}`;
                }
              });
            }
          });
        }
      }, (error) => {
        if (error.error === '42000778') {
          modal({
            icon: 'icon-registered',
            message: '该手机号已经注册了U族，可直接登录',
            cancelBtnText: '换个手机号注册',
            confirmBtnText: '直接登录',
            callback(action) {
              if (action === 'confirm') {
                proxy.eeLogUBT(conf.__ee__.click, 'InvLogPopSurUInv');
                location.href = `http://m.u-zu.com?channel=${appConf.channel}#login`;
              } else {
                proxy.eeLogUBT(conf.__ee__.click, 'InvLogPopSwiUInv');
              }
            }
          });
        } else {
          Toast(error.msg);
        }
      });

      return true;
    }
  },
  components: {
    Banner,
    MInput,
    TimerBtn
  }
};

</script>
<style lang="scss" scoped>
.form-wrapper {
  padding: 30px 16px;
}

.form-inputs {
  background-color: #fff;
  border-radius: 8px;
  padding: 0 34px;
}

.form-action {
  margin-top: 70px;
  padding: 0 50px;
}

.btn {
  width: 100%;
  border-radius: 32px;
  height: 76px;
  background-color: #8477fc;
  color: #fff;
  font-size: 30px;
}

.invite-code {
  text-align: right;
  margin-top: 15px;
}

</style>

