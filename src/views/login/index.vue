<template>
  <div class="container">
    <div class="uzone-icon"></div>
    <form class="user-form" @submit.prevent="doLogin">
      <div class="form-wrap">
        <div class="form-input">
          <MInput type="tel" placeholder="手机号" @input.native="doChangeInput" @change.native="logMobileInput" v-model="form.phone">
            <div class="icon icon-phone" slot="icon"></div>
          </MInput>
        </div>
        <div class="form-input">
          <MInput
            :type="passwordType"
            maxlength="10"
            placeholder="6-10位数字&字母组合登录密码"
            v-model="form.password"
            @input.native="doChangeInput"
            @change.native="logPasswordInput">
            <div class="icon icon-password" slot="icon"></div>
            <div
              class="icon"
              :class="passwordAddonIcon"
              slot="addon"
              @click="changePasswordType"></div>
          </MInput>
        </div>
      </div>
      <p class="forget-password">
        <router-link to="/password" @click.native="logPassword">忘记密码</router-link>
      </p>
      <div class="btn-area">
        <div class="form-btn">
          <button class="btn" :class="{'login-btn': isCanLogin, 'login-btn-forb': !isCanLogin}">立即登录</button>
        </div>
        <div class="form-btn">
          <router-link to="/register" class="btn register-btn" @click.native="logRegister">我要注册</router-link>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  import MInput from '@/components/m-input';
  import regexp from '@/libs/utils/regexp';
  import { Toast } from 'mint-ui';
  import { doLogin } from '@/api/user';
  import getRedirectUrl from '@/libs/utils/redirect';
  import session from '@/libs/session';
  import md5 from 'blueimp-md5';
  import proxy from '@/libs/proxy';
  import conf from '@/config/conf';
  import urlUtils from '@/libs/utils/url';

  const DURATION = 2000;

  export default {
    name: 'login',
    data() {
      return {
        form: {
          phone: '',
          password: ''
        },
        isCanLogin: false,
        passwordType: 'password',
      }
    },
    components: {
      MInput,
    },
    computed:{
      passwordAddonIcon(){
        return this.passwordType === 'password' ? 'icon-eye' : 'icon-eye-hidden';
      }
    },
    methods: {
      _checkLogin() {
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
      doChangeInput() {
        let check = false;

        if(this.form.password && this.form.phone){
          check = true;
        }

        this.isCanLogin = check? true: false;
      },
      logMobileInput() {
        proxy.eeLogUBT(conf.__ee__.input, 'LogPhoNumInpUInV');
      },
      logPasswordInput() {
        proxy.eeLogUBT(conf.__ee__.input, 'LogPasNumInpUInV');
      },
      logRegister() {
        proxy.eeLogUBT(conf.__ee__.click, 'LogRegBtnUInV');
      },
      logPassword() {
        proxy.eeLogUBT(conf.__ee__.click, 'LogForPasBtnUInV');
      },
      doLogin() {
        proxy.eeLogUBT(conf.__ee__.click, 'LogLoginBtnUInV');
        // if(!this.isCanLogin){
        //   return;
        // }

        if(!this._checkLogin()){
          return;
        }

        const {
          phone,
          password
        } = this.form;

        const data = {
          phone,
          password: md5(password)
        };

        doLogin(data, r => {
          const redirectUrl = getRedirectUrl(this.$route);

          if(r.status == '1'){
            Toast({
              message: '登录成功',
              duration: DURATION
            });

            session.setSessionData(r.data);
            this.$store.dispatch('setCode', r.data.code); // set store

            if(redirectUrl){
              setTimeout(() => location.replace(redirectUrl), 2000);
            }else{
              this.$router.push('/');
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
      proxy.eeLogUBT(conf.__ee__.goin, 'LogPageUInV');
    }
  }
</script>

<style lang="scss" scoped>
  .container{
    padding-top: 84px;
  }
  .btn-area{
    margin-top: 46px;
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

  .login-btn{
    color: #fff;
    background-color: #817bf4;
  }

  .login-btn-forb{
    color: #fff;
    background: #bbbbbe;
  }

  .register-btn{
    color: #817bf4;
    border: 1px #817bf4 solid;
    background-color: #fff;
  }
</style>
