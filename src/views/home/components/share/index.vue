<template>
  <div class="share-wrapper" v-show="visible">
    <div class="share">
      <div class="share-icons">
        <span class="share-icon-wrapper" @click="share('weixin')"><div class="share-icon share-iconwx"></div>微信好友</span>
        <span class="share-icon-wrapper" @click="share('weixin')"><div class="share-icon share-iconwxf"></div>微信朋友圈</span>
        <span class="share-icon-wrapper" @click="share('qq')"><div class="share-icon share-iconqq"></div>QQ好友</span>
        <span class="share-icon-wrapper" @click="share('qzone')"><div class="share-icon share-iconqqkj"></div>QQ空间</span>
        <span class="share-icon-wrapper" @click="share('weibo')"><div class="share-icon share-iconweibo"></div>新浪微博</span>
      </div>
      <div class="share-action">
        <div class="share-dismiss" @click="close">取消</div>
      </div>
    </div>
  </div>
</template>
<script>
import shareConf from '@/config/share';
const mobShare = window.mobShare;

export default {
  name: 'share',
  data() {
    return {
      visible: false
    };
  },

  methods: {
    mobConfig() {
      try {
        mobShare.config({
          debug: false,
          appkey: '1ccbc2f61e2d4', // appkey
          params: {
            url: shareConf.getUrl(), // 分享链接
            title: shareConf.title, // 分享标题
            description: shareConf.description, // 分享内容
            pic: '', // 分享图片，使用逗号,隔开
          },
          callback(plat, params) {

          }
        });
      } catch (e) {
        console.log(e, window.mobShare);
      }
    },
    show() {
      this.mobConfig();
      this.visible = true;
    },
    close() {
      this.visible = false;
    },
    share(platform) {
      const instance = mobShare(platform);
      instance.send();
    }
  }
};

</script>
<style lang="scss" scoped>
.share-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 99999;
}

.share {
  background-color: #fff;
}

.share-dismiss {
  text-align: center;
  padding: 15px 0;
  background-color: #efefef;
}

.share-icons {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px;
}

.share-icon-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.share-icon {
  width: 90px;
  height: 90px;
  margin-bottom: 5px;
}

.share-iconwx {
  background: url(./img/weixin.png) center center no-repeat;
  background-size: contain;
}

.share-iconwxf {
  background: url(./img/weixinfriend.png) center center no-repeat;
  background-size: contain;
}

.share-iconqq {
  background: url(./img/qq.png) center center no-repeat;
  background-size: contain;
}

.share-iconqqkj {
  background: url(./img/qqkongjian.png) center center no-repeat;
  background-size: contain;
}

.share-iconweibo {
  background: url(./img/weibo.png) center center no-repeat;
  background-size: contain;
}

</style>

