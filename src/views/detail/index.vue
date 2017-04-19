<template>
  <div class="container">
    <div class="detail-header">
      <li :class="{ active: show === 0 }" @click="changeTags(0)">被邀请人</li>
      <i></i>
      <li :class="{ active: show === 1 }" @click="changeTags(1)">提现</li>
    </div>
    <!-- 邀请明细 -->
    <div class="detail-main" v-if="show === 0">
      <div class="detail-title">当前奖励总额：<span>{{ totalcash }}元</span></div>
      <table>
        <thead>
          <tr>
            <th class="first">手机号</th>
            <th>时间</th>
            <th>参与结果</th>
            <th class="last">奖励</th>
          </tr>
        </thead>
        <tbody
            v-infinite-scroll="getInviteDetail"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="10">
          <tr v-if="inviteData.length === 0">
            <td colspan="4">暂无数据</td>
          </tr>
          <tr v-for="item in inviteData">
            <td class="first">{{ item['mobile'] }}</td>
            <td>{{ item['createTime'] | formatDate('yyyy/MM/dd')}}</td>
            <td>{{ item['awardType'] | formatAwardType }}</td>
            <td class="last">+{{ item['awardValue'] == '0'? 0: item['awardValue'] + '元' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 提现明细 -->
    <div class="detail-main" v-if="show === 1">
      <ul
        v-infinite-scroll="getCashDetail"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10">
          <li class="no-data" v-if="cashData.length === 0">暂无数据</li>
          <li v-for="item in cashData">
              <span>{{ item['createTime'] | formatDate('yyyy/MM/dd hh:mm:ss') }}</span>
              <i class="orange">-{{ item['amount'] }}</i>
          </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue';
  import { getInviteDetail, getCashDetail } from '@/api/detail';
  import { getTotalcash } from '@/api/cash';
  // InfiniteScroll 滚动加载插件
  import { Toast, InfiniteScroll } from 'mint-ui';
  import format from '@/libs/filters';
  import proxy from '@/libs/proxy';
  import conf from '@/config/conf';

  Vue.use(InfiniteScroll);

  const {
    formatDate,
    formatNumber
  } = format;

  let invitePage = 1;
  let inviteTotal = null;
  let cashPage = 1;
  let cashTotal = null;

  const PAGE_SIZE = 20;

  const AWARD_TYPE = {
    successRegister: '成功注册',
    successApply: '成功申请',
    successLoan: '成功放款'
  };

  export default {
    data() {
      return {
        show: 0,
        totalcash: 0,
        inviteData: [],
        cashData: []
      };
    },
    filters: {
      formatAwardType(value) {
        return AWARD_TYPE[value];
      },
      formatDate,
      formatNumber
    },
    methods: {
      // 获取提现总额
      _getTotalcash() {
        getTotalcash(r => {
          this.totalcash = r.data;
        }, error => {
          Toast(error.msg);
        })
      },
      // 切换标签
      changeTags(n) {
        this.show = n;
        if(n === 0){
          proxy.eeLogUBT(conf.__ee__.goin, 'DetRecPagUInv');
        }else{
          proxy.eeLogUBT(conf.__ee__.goin, 'DetWitPagUInv');
        }
      },
      // 获取邀请明细
      getInviteDetail() {
        // 加载完成
        if(inviteTotal !== null && invitePage > inviteTotal){
          return;
        }

        const data = {
          page:{
            page: invitePage,
            pageSize: PAGE_SIZE
          }
        };

        getInviteDetail(data, r => {
          invitePage++;
          inviteTotal = r.data.totalNum;
          this.inviteData = this.inviteData.concat(r.data.awardList);
        }, error => {
          Toast(error.msg);
        });
      },
      // 获取提现明细
      getCashDetail() {
        // 加载完成
        if(cashTotal !== null && cashPage > cashTotal){
          return;
        }

        const data = {
          page:{
            page: cashPage,
            pageSize: PAGE_SIZE
          }
        };

        getCashDetail(data, r => {
          cashPage++;
          cashTotal = r.data.totalNum;
          this.cashData = this.cashData.concat(r.data.cashList);
        }, error => {
          Toast(error.msg);
        });
      }
    },
    created() {
      this._getTotalcash();
      proxy.eeLogUBT(conf.__ee__.goin, 'DetRecPagUInv');
    }
  };
</script>

<style lang="scss" scoped>
  i{
    font-style: normal;
  }
  .no-data{
    text-align: center;
  }
  .detail-header{
    width: 100%;
    height: 80px;
    line-height: 80px;
    background-color: #fff;
    border-bottom: 1px solid #dedfe0;
  }
  .detail-header li{
    float: left;
    width: 50%;
    text-align: center;
    font-size: 26px;
  }
  .detail-header .active {
      color: #00d19e;
      border-bottom: 1px solid #00d19e;
    }
  .detail-header i{
    position: absolute;
    left: 50%;
    top: 16px;
    display: block;
    width: 1px;
    background-color: #dedfe0;
    height: 48px;
  }

  .detail-title{
    padding: 24px 0 34px 20px;
    font-size: 26px;
    line-height: 1;
    background-color: #f2f2f2;
  }
  .detail-title span{
    font-size: 32px;
    color: #f45a00;
  }

  .detail-main{
    width: 100%;
    border-top: 1px solid #dedfe0;
    border-bottom: 1px solid #dedfe0;
  }
  .detail-main table{
    width: 100%;
    background-color: #fff;
    border-top: 1px solid #dedfe0;
  }
  .detail-main table th{
    border-bottom:1px solid #dedfe0;
    padding: 20px 0;
    font-size: 24px;
    color: #88888f;
    font-weight: normal;
   }
  .detail-main table tr td{
    width: 25%;
    text-align: center;
    padding: 20px 0;
    font-size: 24px;
    color: #44444f;
  }
  .detail-main table tr{
    &:first-child{
      td{
        padding-top: 30px;
      }
    }
    &:last-child{
      td{
        padding-bottom: 30px;
      }
    }
  }
  .detail-main .first{
    text-align: left;
    padding-left: 20px;
  }
  .detail-main .last{
    text-align: right;
    color: #f45a00;
    padding-right: 20px;
  }

  .detail-main ul{
    margin-top: 30px;
    background-color: #fff;
  }
  .detail-main ul li{
    padding: 30px 0;
    border-top: 1px solid #dedfe0;
    margin-left: 32px;
    font-size: 24px;
    line-height: 1;
  }
  .detail-main ul li:first-child{
    border-top: 0px solid #dedfe0;
  }
  .detail-main ul li i{
    float: right;
    margin-right: 32px;
  }
</style>

