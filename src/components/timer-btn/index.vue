<template>
  <div>
    <div v-show="time">
      <span class="timer-text">{{text}}</span>
      <span
        class="timer-problem"
        :class="{ disabled: isDisabled}"
        @click="timerProblem">
        收不到验证码
      </span>
    </div>
    <button :class="textClass" v-show="!time" type="button">{{text}}</button>
  </div>
</template>
<script>
import { getValidCode } from '@/api/user';
import { Toast } from 'mint-ui';
import modal from '@/components/modal';

export default {

  name: 'timer-btn',

  props: {
    second: {
      type: Number,
      default: 60
    },
    phone: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    codeType: {
      type: String,
      default: 'sms'
    },
    textClass: {
      type: String,
      default: 'btn'
    },
    callback: {
      type: Function,
      default: function(){}
    },
    timerProblemCallback: {
      type: Function,
      default: function(){}
    },
    graphicCode: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      time: 0,
      isDisabled: false
    };
  },
  methods: {
    run() {
      this.time = this.second;
      this.timer();
      this._getMessageCode();
    },
    timer() {
      if (this.time > 0) {
        this.time--;
        setTimeout(this.timer, 1000);
      }
    },
    // 获取短信验证码
    _getMessageCode() {
      this._getValidCode(this.codeType, r => {
        this.isDisabled = false;
        Toast('验证码已发送');
        this.callback(r);
      });
    },
    // 获取语音验证码
    _getVoiceCode() {
      if(this.isDisabled){
        return;
      }

      this._getValidCode('voice', r => {
        this.isDisabled = true;
        modal({
          title: '获取语音验证码',
          message: '验证码将以电话形式通知到你，请注意接听呦~',
          icon: 'icon-voice',
          showCancelBtn: false,
          confirmBtnText: '知道了'
        });
      });
    },
    // 获取验证码
    // @param {string} type 类型('sms'|'volice')
    // @param {Function} cb 回调
    _getValidCode(type, cb) {
      const data = {
        phone: this.phone,
        type: type
      };

      getValidCode(data, r => {
        if(r.status == '1'){
          cb && cb(r);
        }
      }, error => {
        Toast(error.msg);
      })
    },
    timerProblem(e){
      console.log('timer')
      e.stopPropagation();
      this.timerProblemCallback();
      this._getVoiceCode();
    }
  },
  computed: {
    text() {
      let text = this.textClass === 'btn'? '获取': '发送验证码';
      return this.time > 0 ? `${this.time}s` : text;
    }
  }
};

</script>
<style lang="scss" scoped>
.btn{
  border: 1px solid #00d69a;
  border-radius: 18px;
  width: 84px;
  height: 46px;
  line-height: 46px;
  color: #00d69a;
  text-align: center;
  background-color: #fff;
}

.text{
  border: none;
  border-radius: 0;
  color: #00c696;
  font-size: 24px;
  background: none;
}

.timer-text{
  font-size: 12px;
  color: #c6c6c7;

  border-right: 1px solid #04d29f;
  padding-right: 10px;
}

.timer-problem{
  padding-left: 10px;
  color: #04d29f;
}

.disabled{
  color: #ddd;
}
</style>

