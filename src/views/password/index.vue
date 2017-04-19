<template>
  <div class="container">
    <form class="user-form" @submit.prevent="resetPassword">
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
                :callback="checkIsShowCardId"
                :phone="form.phone"
                codeType="forgetPwdSms"
                textClass="text"
                :timerProblemCallback="logGetNoCode"
                @click.native="runTimer"
                ref="timerBtn">
              </TimerBtn>
            </div>
          </MInput>
        </div>
      </div>
      <div class="form-wrap new-form">
        <div class="form-input" v-if="isShowCardId">
          <MInput type="number" placeholder="身份证后四位" @input.native="doChangeInput" @change.native="logIdCardInput" v-model="form.card_id_tail"></MInput>
        </div>
        <div class="form-input">
          <MInput type="password" placeholder="新密码（6-10位数字&字母组合登录密码）" @input.native="doChangeInput" @change.native="logNewPasswordInput" v-model="form.password"></MInput>
        </div>
      </div>
      <div class="btn-area">
        <div class="form-btn">
          <button class="btn" :class="{'reset-btn': isCanResetPassword, 'reset-btn-forb': !isCanResetPassword}">提交</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  import MInput from '@/components/m-input';
  import TimerBtn from '@/components/timer-btn';
  import regexp from '@/libs/utils/regexp';
  import { Toast } from 'mint-ui';
  import { resetPassword } from '@/api/user';
  import getRedirectUrl from '@/libs/utils/redirect';
  import md5 from 'blueimp-md5';
  import proxy from '@/libs/proxy';
  import conf from '@/config/conf';

  const DURATION = 2000;

  export default {
    name: 'reset',
    data() {
      return {
        form: {
          phone: '',
          validCode: '',
          card_id_tail: '',
          password: ''
        },
        isShowCardId: false,
        isCanResetPassword: false,
      }
    },
    components: {
      MInput,
      TimerBtn
    },
    methods: {
      logMobileInput() {
        proxy.eeLogUBT(conf.__ee__.input, 'LogFogPhoNumInpUInV');
      },
      logCodeInput() {
        proxy.eeLogUBT(conf.__ee__.input, 'LogForCodInpUInV');
      },
      logIdCardInput() {
        proxy.eeLogUBT(conf.__ee__.input, 'LogFogIDCodUInV');
      },
      logGetNoCode() {
        proxy.eeLogUBT(conf.__ee__.click, 'LogFogNoVeriCodUInV');
      },
      logNewPasswordInput() {
        proxy.eeLogUBT(conf.__ee__.input, 'LogFogNewPasUInV');
      },
      _checkResetPassword() {
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

        if(this.form.validCode === ''){
          msg = '请输入验证码';
          Toast({
            message: msg,
            duration: DURATION
          });
          return false;
        }

        if(this.isShowCardId){
          if(this.form.card_id_tail === ''){
            msg = '请输入身份证后四位';
            Toast({
              message: msg,
              duration: DURATION
            });
            return false;
          }
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
        proxy.eeLogUBT(conf.__ee__.click, 'LogFogveriCodUInV');
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
      checkIsShowCardId(r){
        if(r.data == 'true'){
          this.isShowCardId = true;
        }
      },
      doChangeInput() {
        let check = false;

        if(this.form.password && this.form.phone && this.form.validCode){
          check = true;
          if(this.isShowCardId){
            check = this.form.card_id_tail? true: false;
          }
        }

        this.isCanResetPassword = check? true: false;
      },
      resetPassword() {
        proxy.eeLogUBT(conf.__ee__.click, 'LogFogBtnUInV');
        // if(!this.isCanResetPassword){
        //   return;
        // }

        if(!this._checkResetPassword()){
          return;
        }

        const {
          phone,
          validCode,
          card_id_tail,
          password
        } = this.form;

        const data = {
          phone,
          validCode,
          password: md5(password)
        };

        if(this.isShowCardId){
          data.card_id_tail = card_id_tail;
        }

        resetPassword(data, r => {
          const redirectUrl = getRedirectUrl(this.$route);

          if(r.status == '1'){
            Toast({
              message: '恭喜你，重置密码成功！',
              duration: DURATION
            });

            if(redirectUrl){
              setTimeout(() => location.href = redirectUrl, 2000);
            }else{
              this.$router.push('login');
            }
          }
        }, error => {
          Toast(error.msg);
        });
      },
      changePasswordType(){
        this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
      },
    },
    created() {
      proxy.eeLogUBT(conf.__ee__.goin, 'LogForPasPageUInV');
    }
  }
</script>

<style lang="scss" scoped>
  .user-form{
    width: 640px;
    margin: 0 auto;
    .form-wrap{
      border: none;
      background-color: #fff;
      border-bottom: 1px #dedfe0 solid;
      border-radius: 0;
    }
    .new-form{
      border-top: 1px #dedfe0 solid;
      margin-top: 30px;
    }
    .form-input{
      margin-right: 0;
      input{
        font-size: 26px;
      }
    }
    .send-verification{
      margin-right: 28px;
    }
  }
  .btn-area{
    margin-top: 80px;
  }
  .form-btn{
    margin-bottom: 24px;
    text-align: center;
  }

  .reset-btn{
    color: #fff;
    background-color: #817bf4;
  }

  .reset-btn-forb{
    color: #fff;
    background: #bbbbbe;
  }
</style>
