<template>
  <div class="select-bankcard">
    <div class="bankcard-list">
      <div
        class="my-bankcard-haved option"
        :class="{optioned: index == seletIndex}"
        v-for="(item, index) in bankList"
        @click="selectBankCard(index)">
        <i class="bank-icon" :class="item['icon']"></i>
        <div>
          <p class="bank-name">{{ item['cardBankName'] }}</p>
          <p class="card-info">尾号 {{ item['cardNum'].substr(-4, 4) }} <span>储蓄卡</span></p>
        </div>
        <i class="arrow"></i>
      </div>
    </div>
    <a class="my-bankcard" @click="addBankcard">
      <i class="add"></i>
      <span>添加银行卡</span>
    </a>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
import getRedirectUrl from '@/libs/utils/redirect';
import { getBankcards } from '@/api/bankcard';
import { getBankcardIcon, getCurrentBankcard, storeCurrentBankcard } from '@/libs/utils/bankcard';

export default {
  name: 'selectBankCard',
  data() {
    return {
      seletIndex: 0,
      bankList: []
    };
  },
  methods: {
    addBankcard(){
      if(this.bankList.length >= 10){
        Toast({
          message: '您绑定的银行卡数量已达上限！',
          duration: 2000
        });
        return;
      }
      this.$router.push('/add-bankcard');
    },
    // 选择银行卡
    selectBankCard(n){
      this.seletIndex = n;
      let cardNum = this.bankList[n].cardNum;
      cardNum = storeCurrentBankcard(cardNum);
      const redirectUrl = getRedirectUrl(this.$route);
      if(redirectUrl){
        location.href = redirectUrl;
      }else{
        this.$router.push('get-cash');
      }
    },
    // 获取已绑定的银行卡
    _getBankCards(){
      getBankcards(r => {
        const list = r.data;
        list.forEach(obj => {
          obj.icon = 'bank-' + getBankcardIcon(obj.cardBankName);
        });
        this.bankList = list;
        this.seletIndex = getCurrentBankcard(localStorage.currentBankcard, list);
      }, error => {
        Toast({
          message: error.msg,
          duration: 2000
        });
      });
    }
  },
  created(){
    this._getBankCards();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.select-bankcard{
  padding-top: 10px;
  .option .arrow, .optioned .arrow{
    width: 36px;
    height: 36px;
    background-image: url(../../assets/img/option.png);
  }
  .optioned .arrow{
    background-image: url(../../assets/img/optioned.png);
  }
}
</style>
