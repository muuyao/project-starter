<template>
  <div class="container">
    <div class="header">
      <div class="header-img"></div>
      <div class="header-content">
        <p class="header-p">当前奖励总额</p>
        <p class="header-money">{{ totalcash }}<span>元</span></p>
        <router-link to="/detail" class="header-detail" @click.native="logClickDetail">明细&gt;</router-link>
      </div>
      <div class="mui-button-row">
        <button type="button" class="my-btn" @click="doSubmit">我要提现</button>
      </div>
      <div class="my-text">
        <span><i>*</i> 最少提现金额50元</span>
      </div>
    </div>
    <div class="my-text-left">
      <span>收款银行卡</span>
    </div>

    <!-- 获取到银行卡信息时再渲染，避免报错 -->
    <div v-if="bankcardInfo !== null">
      <router-link to="add-bankcard" class="my-bankcard" @click.native="logAddBank" v-if="isHavedBankcard === false">
        <i class="add"></i>
        <span>添加银行卡</span>
      </router-link>
      <router-link to="select-bankcard" class="my-bankcard-haved" @click.native="logSelectBank" v-if="isHavedBankcard === true">
        <i class="bank-icon" :class="bankcardInfo['icon']"></i>
        <div>
          <p class="bank-name">{{ bankcardInfo['cardBankName'] }}</p>
          <p class="card-info">
            尾号 {{ bankcardInfo['cardNum'].substr(-4, 4) }}
            <span>储蓄卡</span>
          </p>
        </div>
        <i class="arrow"></i>
      </router-link>
      <!-- 确认提现的confirm -->
      <ModalEle title="提现详情" :callback="doCash" ref="modalEle" v-if="isHavedBankcard === true">
        <div class="modal-box">
          <p>提现总额：<span>{{ totalcash }}元</span></p>
          <p>
            收款银行卡：{{ bankcardInfo['cardBankName'] }}
            （尾号{{ bankcardInfo['cardNum'].substr(-4, 4) }} 储蓄卡）
          </p>
        </div>
      </ModalEle>
    </div>
  </div>
</template>

<script>
import modal, { ModalEle } from '@/components/modal';
import { Toast } from 'mint-ui';
import { getBankcards } from '@/api/bankcard';
import { getTotalcash, getCash, getCashLimit } from '@/api/cash';
import { getBankcardIcon, getCurrentBankcard } from '@/libs/utils/bankcard';
import proxy from '@/libs/proxy';
import conf from '@/config/conf';

const DURATION = 2000;

let cashLimit = 10;

getCashLimit(r => {
  cashLimit = parseFloat(r.data.checkWithdrawLimit);
});

export default {
  data() {
    return {
      isHavedBankcard: false,
      bankcardInfo: null,
      totalcash: 0
    };
  },
  components:{
    ModalEle
  },
  methods: {
    logClickDetail() {
      proxy.eeLogUBT(conf.__ee__.click, 'RewDetBtnUInv');
    },
    logAddBank() {
      proxy.eeLogUBT(conf.__ee__.click, 'RewAddCardBtnUInv');
    },
    logSelectBank() {
      proxy.eeLogUBT(conf.__ee__.click, 'RewSwiCardBtnUInv');
    },
    // 点击提现按钮
    doSubmit(n){
      proxy.eeLogUBT(conf.__ee__.click, 'RewWitBtnUInv');
      // 没有绑定银行卡
      if(!this.isHavedBankcard){
        modal({
          message: '需要添加银行卡才能提现哦～！',
          confirmBtnText: '添加银行卡',
          callback: (action) => {
            if(action !== 'confirm'){
              return;
            }
            proxy.eeLogUBT(conf.__ee__.click, 'RewAddPopAddUInv');
            this.$router.push('add-bankcard');
          }
        });
        return;
      }

      // 提现小于cashLimit
      if(this.totalcash < cashLimit){
        modal({
          title: '提现失败',
          message: `您当前奖励总额不足${cashLimit}元，暂不能申请提现。快邀请更多好友来U族吧！`,
          icon: 'icon-fail',
          showCancelBtn: false,
          confirmBtnText: '知道了',
          callback(){
            proxy.eeLogUBT(conf.__ee__.click, 'WitFaiPopSurUInv');
          }
        });
        return;
      }

      this._showCashConfirm();
    },
    // 提现
    doCash(action){
      if(action !== 'confirm'){
        return;
      }
      proxy.eeLogUBT(conf.__ee__.click, 'RewWitPopSurUInv');
      const data = {
        detail: {
          amount: this.totalcash,
          bankNum: this.bankcardInfo.cardNum,
          bankName: this.bankcardInfo.cardBankName,
          mobile: this.bankcardInfo.cardMobile
        }
      };
      // 提现请求
      getCash(data, r => {
        if(r.status == '1'){
          modal({
            title: '提现成功',
            message: '你的现金将在一个工作日内到账',
            icon: 'icon-success',
            showCancelBtn: false,
            confirmBtnText: '知道了',
            callback(){
              proxy.eeLogUBT(conf.__ee__.click, 'WitSucPopSurUInv');
            }
          });
        }
      }, error => {
        modal({
          title: '提现失败',
          message: error.msg,
          icon: 'icon-fail',
          showCancelBtn: false,
          confirmBtnText: '知道了',
          callback(){
            proxy.eeLogUBT(conf.__ee__.click, 'WitFaiPopSurUInv');
          }
        });
      });
    },
    // 显示确认提现confirm
    _showCashConfirm(){
      this.$refs.modalEle.show();
    },
    // 获取提现总额
    _getTotalcash(){
      getTotalcash(r => {
        this.totalcash = parseInt(r.data);
      }, error => {
        Toast({
          message: error.msg,
          duration: DURATION
        });
      })
    },
    // 获取已绑定的银行卡
    _getBankcards(){
      // 获取已绑定的银行卡列表
      getBankcards(r => {
        const list = r.data;
        // 在数组中获取当前已选择的银行卡的下标
        const current = getCurrentBankcard(localStorage.currentBankcard, list);
        // 判断是否绑定银行卡
        if(list && list.length > 0){
          this.isHavedBankcard = true;
          this.bankcardInfo = list[current];
          this.bankcardInfo['icon'] = 'bank-' + getBankcardIcon(list[current]['cardBankName']);
        }else{
          this.bankcardInfo = [];
          this.isHavedBankcard = false;
        }
      }, error => {
        Toast({
          message: error.msg,
          duration: DURATION
        });
      });
    },
  },
  created(){
    this._getBankcards();
    this._getTotalcash();
    proxy.eeLogUBT(conf.__ee__.goin, 'InvPagUInV');
  }
};

</script>

<style lang="scss" scoped>
@import '../../assets/sass/common/_mixin';
  .container{
    margin-bottom: 180px;
  }
  .mars-modal-icon{
    margin-right: 0;
  }
  .modal-box{
    text-align: left;
    line-height: 48px;
    font-size: 26px;
    span{
      color: #00d19e;
      font-size: 36px;
    }
  }
  .header{
    padding: 66px 0 38px;
    background: #fff;
    border-bottom: 1px #dedfe0 solid;
  }
  .header-img{
    width: 190px;
    height: 205px;
    @include center-block;
    background: url(../../assets/img/middle2.png);
    background-size: cover;
  }
  .header-p{
    margin-top: 36px;
    text-align: center;
    font-size: 26px;
    color: #f26400;
  }
  .header-content{
    position: relative;
  }
  .header .header-content .header-money{
    margin-top: 24px;
    font-size: 72px;
    line-height: 1;
    text-align: center;
    color: #f26400;
    span{
      font-size: 30px;
    }
  }
  .header .header-content .header-detail{
    position:absolute;
    top: 0;
    left: 440px;
    color: #88888f;
    font-size: 26px;
  }
  .header .mui-button-row{
    margin-top: 58px;
    text-align: center;
    button{
      width: 540px;
      height: 76px;
      line-height: 76px;
      color: #fff;
      font-size: 30px;
      text-align: center;
      background-color: #817bf4;
      border-radius: 36px;
      outline: none;
      border: none;
    }
  }
  .my-text{
    margin-top: 24px;
    font-size: 24px;
    text-align: right;
    padding-right: 50px;
    color: #88888e;
    i{
      color: #f07e5d;
    }
  }
  .my-text-left{
    margin-top: 32px;
    margin-left: 20px;
    color: #44444f;
    font-size: 28px;
  }

</style>
