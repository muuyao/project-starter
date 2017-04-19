<template>
  <div class="container">
    <div class="uzone-icon"></div>
    <form class="user-form" @submit.prevent="doRegister">
      <div class="form-wrap">
        <div class="form-input">
          <MInput type="tel" placeholder="手机号" @input.native="doChangeInput" @change.native="logMobileInput" v-model="form.phone">
            <div class="icon icon-phone" slot="icon"></div>
          </MInput>
        </div>
        <div class="form-input">
          <MInput type="number" placeholder="验证码" @input.native="doChangeInput" @change.native="logCodeInput" v-model="form.validCode">
            <div class="icon icon-verification" slot="icon"></div>
            <div class="send-verification" slot="addon">
              <TimerBtn
                :second="60"
                :phone="form.phone"
                :timerProblemCallback="logGetNoCode"
                @click.native="runTimer"
                ref="timerBtn">
              </TimerBtn>
            </div>
          </MInput>
        </div>
        <div class="form-input">
          <MInput
            :type="passwordType"
            maxlength="10"
            placeholder="6-10位数字&字母组合登录密码"
            v-model="form.password"
            @change.native="logPasswordInput"
            @input.native="doChangeInput">
            <div class="icon icon-password" slot="icon"></div>
            <div
              class="icon"
              :class="passwordAddonIcon"
              slot="addon"
              @click="changePasswordType"></div>
          </MInput>
        </div>
      </div>
      <div class="btn-area">
        <div class="form-btn">
          <button class="btn" :class="{'register-btn': isCanRegister, 'register-btn-forb': !isCanRegister}">立即注册</button>
        </div>
        <div class="form-btn">
          <router-link to="/login" class="btn login-btn" @click.native="logLogin">我要登录</router-link>
        </div>
      </div>
      <p class="protocol">
        点击注册表示同意<router-link to="/protocol-register">《注册服务协议》</router-link>和<router-link to="/protocol-secret">《隐私政策》</router-link>
      </p>
    </form>
  </div>
</template>

<script>
  import MInput from '@/components/m-input';
  import TimerBtn from '@/components/timer-btn';
  import regexp from '@/libs/utils/regexp';
  import { Toast } from 'mint-ui';
  import { doRegister } from '@/api/user';
  import md5 from 'blueimp-md5';
  import getRedirectUrl from '@/libs/utils/redirect';
  import appConf from '@/config/app';
  import session from '@/libs/session';
  import urlUtils from '@/libs/utils/url';
  import proxy from '@/libs/proxy';
  import conf from '@/config/conf';

  const DURATION = 2000;

  export default {
    name: 'register',
    data() {
      return {
        form: {
          phone: '',
          validCode: '',
          password: ''
        },
        isCanRegister: false,
        passwordType: 'password',
      }
    },
    components: {
      MInput,
      TimerBtn
    },
    computed:{
      passwordAddonIcon(){
        return this.passwordType === 'password' ? 'icon-eye' : 'icon-eye-hidden';
      }
    },
    methods: {
      logMobileInput(){
        proxy.eeLogUBT(conf.__ee__.input, 'LogRegPhoNumInpUInV');
      },
      logPasswordInput(){
        proxy.eeLogUBT(conf.__ee__.input, 'LogRegPasInpUInV');
      },
      logCodeInput() {
        proxy.eeLogUBT(conf.__ee__.input, 'LogForCodInpUInV');
      },
      logGetNoCode() {
        proxy.eeLogUBT(conf.__ee__.click, 'LogRegNoVeriCodUInV');
      },
      logLogin() {
        proxy.eeLogUBT(conf.__ee__.click, 'LogRegLogBtnUInV');
      },
      _checkRegister() {
        let msg = '';

        if(this.form.phone === ''){
          msg = '请输入11位有效手机号';
          Toast({
            message: msg,
            duration: DURATION
          });
          return false;
        }

        if(!regexp.phone.test(this.form.phone)){
          msg = '手机号码格式有误';
          Toast({
            message: msg,
            duration: DURATION
          });
          return false;
        }

        if(!this.form.validCode){
          msg = '请输入验证码';
          Toast({
            message: msg,
            duration: DURATION
          });
          return false;
        }

        if(this.form.password === ''){
          msg = '请输入密码';
          Toast({
            message: msg,
            duration: DURATION
          });
          return false;
        }

        if(!regexp.password.test(this.form.password)){
          msg = '密码格式错误';
          Toast({
            message: msg,
            duration: DURATION
          });
          return false;
        }

        return true;
      },
      runTimer() {
        proxy.eeLogUBT(conf.__ee__.click, 'LogRegVeriCodUInV');
        if (this.form.phone === ''){
          Toast({
            message: '请输入11位有效手机号',
            duration: DURATION
          });
          return;
        }

        if(!regexp.phone.test(this.form.phone)){
          Toast({
            message: '手机号码格式有误',
            duration: DURATION
          });
          return;
        }

        this.$refs.timerBtn.run();
      },
      doChangeInput() {
        let check = false;

        if(this.form.password && this.form.phone && this.form.validCode){
          check = true;
        }

        this.isCanRegister = check? true: false;
      },
      doRegister() {
        proxy.eeLogUBT(conf.__ee__.click, 'LogRegRegBtnUInV');
        // if(!this.isCanRegister){
        //   return;
        // }

        if(!this._checkRegister()){
          return;
        }

        const {
          phone,
          validCode,
          password
        } = this.form;

        const data = {
          data:{
            phone,
            validCode,
            password: md5(password),
            marketChannel: urlUtils.getParams('channel') | 'web',
            version: appConf.version,
            productNo: appConf.productNo,
            channelNo: appConf.channelNo,
            deviceId: session.getSessionData('__uuid__')
          }
        }

        doRegister(data, r => {
          const redirectUrl = getRedirectUrl(this.$route);

          if(r.status == '1'){
            Toast({
              message: '注册成功',
              duration: DURATION
            });

            if(redirectUrl){
              setTimeout(() => location.href = redirectUrl, 2000);
            }else{
              this.$router.push('login');
            }
          }
        }, error => {
          Toast({
            message: error.msg,
            duration: DURATION
          });
        });
      },
      changePasswordType(){
        this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
      },
    },
    created() {
      proxy.eeLogUBT(conf.__ee__.goin, 'RegPageUInV');
    }
  }
</script>

<style lang="scss" scoped>
  .container{
    padding: 84px 0;
  }
  .btn-area{
    margin-top: 80px;
  }
  .forget-password{
    margin-top: 24px;
    text-align: right;
    a{
      color: #00d19e;
      font-size: 26px;
    }
  }

  .form-btn{
    margin-bottom: 24px;
    text-align: center;
  }

  .register-btn{
    color: #fff;
    background-color: #817bf4;
  }

  .register-btn-forb{
    color: #fff;
    background: #bbbbbe;
  }

  .login-btn{
    color: #817bf4;
    border: 1px #817bf4 solid;
    background-color: #fff;
  }

  .protocol{
    text-align: center;
    color: #88888e;
    font-size: 24px;
    a{
      color: #2fcca1;
    }
  }
</style>
