<template>
  <div>
    <Banner></Banner>
    <div class="qrcode">
      <div class="qrcode-line">
        <div class="qrcode-line-inner"></div>
      </div>
      <div class="qrcode-bg">
        <div class="qrcode-img">
          <img :src="qrcodeUrl">
        </div>
        <div class="qrcode-save" @click="saveToPhoto" v-if="os !== 'WEB'">
          <span>保存到相册</span>
          <span class="qrcode-save-icon"></span>
        </div>
      </div>
      <div class="qrcode-tip">
        当面扫一扫或者截屏分享到微信朋友圈、QQ空间、微博、轻松赚邀请奖金
      </div>
    </div>
  </div>
</template>
<script>
import Banner from '@/components/banner';
import shareConf from '@/config/share';
import proxy from '@/libs/proxy';
import conf from '@/config/conf';
import {
  mapState
} from 'vuex';

export default {
  name: 'qrcode',
  data() {
    return {
      title: '邀请二维码'
    };
  },
  computed: {
    ...mapState({
      qrcodeUrl: state => state.qrcode.url,
      os: state => state.app.os
    })
  },
  methods: {
    saveToPhoto() {
      proxy.eeLogUBT(conf.__ee__.goin, 'InvQRCodSavUInv');
      proxy.openAlbum('', '保存二维码', {
        imgUrl: this.qrcodeUrl
      });
    }
  },
  created() {
    this.$store.dispatch('getQRCodeUrl', {
      url: shareConf.getUrl()
    });
    proxy.eeLogUBT(conf.__ee__.goin, 'InvQRCodPagUInv');
  },
  components: {
    Banner
  }
};

</script>
<style lang="scss" scoped>
.qrcode {
  padding: 70px 45px 90px;
  position: relative;
}

.qrcode-line {
  margin: 0 auto;
  height: 16px;
  width: 482px;
  background-color: #cfcfcf;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.qrcode-line-inner {
  width: 464px;
  height: 6px;
  border-radius: 4px;
  background-color: #9f9f9f;
}

.qrcode-bg:before {
  z-index: 1;
  display: block;
  content: "";
  width: 443px;
  height: 8px;
  top: -7px;
  position: absolute;
  left: 0;
  background-color: #fff;
}

.qrcode-bg::after {
  display: block;
  content: "";
  width: 443px;
  height: 10px;
  position: absolute;
  left: 0;
  bottom: -10px;
  background: url('./img/bg.png') no-repeat center center;
  background-size: contain;
}

.qrcode-bg {
  position: relative;
  margin: 0 auto;
  width: 443px;
  padding: 45px 65px 20px;
  background-color: #fff;
  z-index: 1;
}

.qrcode-img {
  font-size: 0;
  img {
    width: 305px;
    height: 305px;
    border: 0;
  }
}

.qrcode-save {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  color: #e36509;
  margin-top: 25px;
}

.qrcode-save-icon {
  background: url('./img/save.png') no-repeat center center;
  width: 23px;
  height: 28px;
  background-size: contain;
  margin-left: 10px;
}

.qrcode-tip {
  margin-top: 45px;
  font-size: 24px;
  color: #66666e;
}

</style>

