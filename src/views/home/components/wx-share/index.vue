<template>
  <div class="wx-share" v-show="visible">
    <div class="wx-share-arrow"></div>
    <ModalEle class="wx-share-modal" ref="modal" title="请点击右上角进行分享~" :showCancelBtn="false" :showDismiss="false" confirmBtnText="知道了" :callback="close"></ModalEle>
  </div>
</template>
<script>
import wx from 'weixin-js-sdk';
import api from '@/api/app';
import {
  ModalEle
} from '@/components/modal';
import shareConf from '@/config/share';

export default {

  name: 'wx-share',

  data() {
    return {
      visible: false
    };
  },
  methods: {
    show() {
      this.visible = true;
      this.$refs.modal.show();
    },

    close() {
      this.visible = false;
    },

    wxShare() {
      const {
        title,
        url,
        description,
        imgUrl
      } = shareConf;
      const shareContent = {
        title,
        link: url,
        imgUrl,
        desc: description,
        success() {
          this.addShareRecord({
            shareChannel: 'weixin',
            shareStatus: 1
          });
        }
      };

      // 分享到朋友圈
      wx.onMenuShareTimeline(shareContent);
      // 分享给朋友
      wx.onMenuShareAppMessage(shareContent);
      // 分享到QQ
      wx.onMenuShareQQ(shareContent);
      // 分享到微博
      wx.onMenuShareQZone(shareContent);
    },

    addShareRecord(params) {
      const {
        shareChannel,
        shareStatus
      } = params;

      api.addShareRecord({
        shareChannel,
        shareStatus
      }, () => {});
    }
  },

  created() {

  },

  components: {
    ModalEle
  }
};

</script>
<style lang="scss">
.wx-share-modal {
  .mars-modal {
    position: absolute;
    top: 274px;
    left: 50%;
    transform: translate(-50%, 0);
  }
}

</style>
<style lang="scss" scoped>
.wx-share {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: transparent;
  z-index: 9999;
}

.wx-share-arrow {
  position: fixed;
  top: 0px;
  right: 60px;
  background: url('./img/arrow.png') no-repeat center center;
  width: 202px;
  height: 274px;
  background-size: contain;
  z-index: 999999;
}

</style>

