<template>
  <div class="container">
    <form @submit.prevent="doSubmit">
      <!-- 卡号 -->
      <div class="mui-input-group bankcard-input-group">
        <div class="mui-input-row">
          <label>卡号</label>
          <input
            type="number"
            class="mui-input-clear"
            maxlength="25"
            placeholder="常用银行卡号"
            @input.native="formatCardNum"
            @change="logCardNumInput"
            v-model="bankForm.cardNum"
          >
        </div>
        <!-- 发卡行 -->
        <div class="mui-input-row">
          <label>发卡行</label>
          <div class="bankname-box">
            <span>{{ bankName }}</span>
            <select v-model="bankForm.cardBankName" @change="changeBankName">
              <option v-for="item in bankList">{{ item }}</option>
            </select>
          </div>
          <i class="arrow"></i>
        </div>
        <!-- 姓名（已经绑定过银行卡不显示） -->
        <div class="mui-input-row" v-if="!isBindBankcard">
          <label>本人姓名</label>
          <input
            type="text"
            class="mui-input-clear"
            placeholder="持卡人姓名"
            @change="logRealNameInput"
            v-model="idCardForm.realName"
          >
        </div>
        <!-- 身份证（已经绑定过银行卡不显示） -->
        <div class="mui-input-row" v-if="!isBindBankcard">
          <label>身份证</label>
          <input
            type="number"
            class="mui-input-clear"
            maxlength="18"
            placeholder="本人身份证"
            @change="logIdCardInput"
            v-model="idCardForm.cardId"
          >
        </div>
        <!-- 手机号 -->
        <div class="mui-input-row">
          <label>手机号</label>
          <input
            type="number"
            class="mui-input-clear"
            maxlength="11"
            placeholder="银行预留手机号"
            @change="logMobileInput"
            v-model="bankForm.cardMobile"
          >
        </div>
      </div>
      <div class="mui-button-row">
        <button type="submit" class="add">添加</button>
      </div>
      <div class="mui-button-row">
        <button type="button" class="back" @click="goBack()">返回</button>
      </div>
    </form>
    </mt-picker>
  </div>
</template>

<script>
  import Vue from 'vue';
  import regexp from '@/libs/utils/regexp';
  import modal from '@/components/modal';
  import { Toast } from 'mint-ui';
  // 将已选择的银行卡存储到localStorage
  import { storeCurrentBankcard } from '@/libs/utils/bankcard';
  import getRedirectUrl from '@/libs/utils/redirect';
  import { getBankcardList, getBankcards, addBankcard } from '@/api/bankcard';
  import proxy from '@/libs/proxy';
  import conf from '@/config/conf';

  const SELECT_DEFAULT = '请选择';
  const DURATION = 2000;

  export default {
    data() {
      return {
        // 是否绑定过银行卡
        isBindBankcard: true,
        // 卡号，开户行，手机号
        bankForm: {
          cardNum: '',
          cardBankName: '',
          cardMobile: ''
        },
        // 身份证，姓名
        idCardForm: {
          realName: '',
          cardId: ''
        },
        // 开户行
        bankName: SELECT_DEFAULT,
        // 开户行列表
        bankList: [SELECT_DEFAULT]
      };
    },
    methods: {
      logCardNumInput() {
        proxy.eeLogUBT(conf.__ee__.input, 'AddCardIDInpUInv');
      },
      logRealNameInput(){
        proxy.eeLogUBT(conf.__ee__.input, 'AddNamInpUInv');
      },
      logIdCardInput(){
        proxy.eeLogUBT(conf.__ee__.input, 'AddIDNumInpUInv');
      },
      logMobileInput(){
        proxy.eeLogUBT(conf.__ee__.input, 'AddPhoInpUInv');
      },
      // 返回
      goBack(){
        history.back();
      },
      formatCardNum(){
        const cardNum = this.bankForm.cardNum;
        this.bankForm.cardNum = cardNum.replace(/\s/g,'').replace(/(\d{4})(?=\d)/g,"$1 ");
      },
      // select的值change
      changeBankName(){
        proxy.eeLogUBT(conf.__ee__.click, 'AddBanChoUInv');
        this.bankName = this.bankForm.cardBankName;
      },
      // 提交数据
      doSubmit(){
        proxy.eeLogUBT(conf.__ee__.click, 'AddBtnUInv');
        let data = null;
        // 数据校验
        if(!this._checkBankcardInfo()){
          return false;
        }

        if(!this.isBindBankcard){
          data = Object.assign(this.bankForm, this.idCardForm);
        }else{
          // 绑定过银行卡，提交3项数据
          data = this.bankForm;
        }

        this._submitBankcard(data);
      },
      // 检测是否绑定过银行卡
      _checkIsBindBankcard(){
        getBankcards(r => {
          const list = r.data;

          if(list && list.length > 0){
            this.isBindBankcard = true;
          }else{
            this.isBindBankcard = false;
          }
        }, error => {
          Toast({
            message: error.msg,
            duration: DURATION
          });
        });
      },
      // 提交银行卡信息（卡号，开户行，手机号）
      _submitBankcard(data){
        addBankcard(data, r => {
          if(r.status == '1'){
            let cardNum = this.bankForm.cardNum;
            // 卡号存储，并加"*"
            cardNum = storeCurrentBankcard(cardNum);
            modal({
              title: '添加成功~',
              icon: 'icon-success',
              showCancelBtn: false,
              confirmBtnText: '知道了',
              callback: () => {
                proxy.eeLogUBT(conf.__ee__.click, 'AddSucPopSurUInv');
                const redirectUrl = getRedirectUrl(this.$route);
                if(redirectUrl){
                  location.href = redirectUrl;
                }else{
                  if(this.isBindBankcard){
                    // 已绑定过银行卡跳到选择银行卡页面
                    this.$router.push(select-bankcard);
                  }else{
                    // 未绑定过银行卡跳到体现页面
                    this.$router.push(get-cash);
                  }
                }
              }
            });
          }
        }, error => {
          Toast({
            message: error.msg,
            duration: DURATION
          });
        });
      },
      // 创建银行卡列表
      _createBanklist(){
        getBankcardList(r => {
          const list = r.data;

          list.forEach(obj => {
            this.bankList.push(obj.bankName);
          })
        }, error => {
          Toast({
            message: error.msg,
            duration: DURATION
          });
        });
      },
      // 信息校验
      _checkBankcardInfo(){
        let msg = '';

        if(this.bankForm.cardNum === ''){
          msg = '请输入银行卡号';
          Toast({
            message: msg,
            duration: DURATION
          });
          return false;
        }

        if(this.bankForm.cardBankName === ''){
          msg = '请选择开户行';
          Toast({
            message: msg,
            duration: DURATION
          });
          return false;
        }

        // 如果没有绑定过银行卡
        if(!this.isBindBankcard){
          if(this.idCardForm.realName === ''){
            msg = '请输入姓名';
            Toast({
              message: msg,
              duration: DURATION
            });
            return false;
          }

          if(!regexp.name.test(this.idCardForm.realName)){
            msg = '姓名中只能含有汉字';
            Toast({
              message: msg,
              duration: DURATION
            });
            return false;
          }

          if(this.idCardForm.cardId === ''){
            msg = '请输入身份证号';
            Toast({
              message: msg,
              duration: DURATION
            });
            return false;
          }
        }

        if(this.bankForm.cardMobile === ''){
          msg = '请输入手机号';
          Toast({
            message: msg,
            duration: DURATION
          });
          return false;
        }

        if(!regexp.phone.test(this.bankForm.cardMobile)){
          msg = '请输入有效的手机号';
          Toast({
            message: msg,
            duration: DURATION
          });
          return false;
        }

        return true;
      }
    },
    created(){
      this._createBanklist();
      this._checkIsBindBankcard();
      proxy.eeLogUBT(conf.__ee__.goin, 'AddPagUInv');
    }
  };
</script>

<style lang="scss" scoped>
  @import '../../assets/sass/common/_mixin';
  .picker{
    position: fixed;
    width: 100%;
    bottom: 0;
  }
  .bankcard-input-group{
    background-color: #fff;
  }
  .mui-input-row{
    position: relative;
    padding: 28px 0;
    margin-left: 28px;
    border-bottom: 1px #dedfe0 solid;
    font-size: 26px;
    @include clearfix;
    label{
      display: block;
      float: left;
      color: #44444e;
    }
    input, span{
      width: 480px;
      float: right;
      text-align: right;
      padding-right: 30px;
      font-size: 26px;
      color: #88888e;
      border: none;
      outline: none;
    }
    .bankname-box{
      position: relative;
      width: 480px;
      height: 36px;
      line-height: 36px;;
      overflow: hidden;
      float: right;
      select{
        width: 100%;
        -webkit-appearance:none
      }
      span{
        display: block;
        position: absolute;
        pointer-events: none;
        padding-right: 60px;
        background: #fff;
      }
    }
    .arrow{
      display: block;
      position: absolute;
      width: 18px;
      height: 30px;
      right: 30px;
      top: 30px;
      background: url(../../assets/img/arrow.png) no-repeat;
      background-size: cover;
    }
  }

  .mui-button-row{
    text-align: center;
    button{
      width: 540px;
      padding: 20px 0;
      text-align: center;
      font-size: 30px;
      line-height: 1;
      outline: none;
      border: none;
      border-radius: 36px;
    }
    .add{
      margin-top: 80px;
      color: #fff;
      background-color: #817bf4;
    }
    .back{
      margin-top: 36px;
      color: #88888e;
      background-color: #fff;
    }
  }
</style>
