<template>
  <div class="mars-modal-wrapper" v-show="visible">
    <div class="mars-modal">
      <div class="mars-modal-hd">
        <i class="mars-modal-icon" :class="icon" v-if="icon"></i>
        <div class="mars-modal-title" v-if="title">
          {{title}}
        </div>
      </div>
      <div class="mars-modal-bd">
        <p class="mars-modal-msg" v-if="message">{{message}}</p>
        <slot></slot>
      </div>
      <div class="mars-modal-fd">
        <button class="mars-modal-btn mars-modal-cancel" :class="cancelBtnClass" type="button" v-if="showCancelBtn" @click="handleAction('cancel')">{{cancelBtnText}}</button>
        <button class="mars-modal-btn mars-modal-confirm" :class="confirmBtnClass" type="button" v-if="showConfirmBtn" @click="handleAction('confirm')">{{confirmBtnText}}</button>
      </div>
      <div class="mars-modal-dimiss" @click="close" v-if="showDismiss">
        <span></span>
      </div>
    </div>
  </div>
</template>
<script>
export default {

  name: 'modal',

  props: {
    type: {
      type: String,
      default: 'modal' // modal/alert/confirm
    },
    title: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    message: {
      type: String,
      default: ''
    },
    showConfirmBtn: {
      type: Boolean,
      default: true
    },
    confirmBtnText: {
      type: String,
      default: '确认'
    },
    confirmBtnClass: {
      type: String,
      default: ''
    },
    showCancelBtn: {
      type: Boolean,
      default: true
    },
    cancelBtnText: {
      type: String,
      default: '取消'
    },
    cancelBtnClass: {
      type: String,
      default: ''
    },
    callback: {
      type: Function,
      default () {}
    },
    showDismiss: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      visible: false
    };
  },

  methods: {
    show() {
      this.visible = true;
    },
    close() {
      this.visible = false;
    },
    handleAction(action) {
      const callback = this.callback;

      this.close();

      if (callback) {
        callback(action);
      }
    }
  }
};

</script>
<style lang="scss">
.mars-modal-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99999;
}

.mars-modal {
  width: 540px;
  background-color: #fff;
  border-radius: 10px;
  text-align: center;
  color: #44444e;
  font-size: 26px;
  position: relative;
}

.mars-modal-hd {
  font-size: 30px;
  font-weight: 700;
  padding: 30px 30px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.mars-modal-icon {
  margin-right: 10px;
}

.mars-modal-title {
  padding: 5px 0;
}

.mars-modal-bd {
  padding: 0 30px 30px;
  font-size: 26px;
  color: #66666e;
  // max-height: 600px;
  // overflow: auto;
}

.mars-modal-fd {
  display: flex;
}

.mars-modal-dimiss {
  position: absolute;
  top: 30px;
  right: 30px;
  padding: 20px;
  margin: -20px;
  span {
    display: block;
    width: 24px;
    height: 24px;
    background: url('./img/dismiss.png') no-repeat center center;
    background-size: contain;
  }
}

.mars-modal-btn {
  text-align: center;
  height: 90px;
  flex: 1;
  outline: 0;
  border: 0;
  background-color: #fff;
  border-top: 1px solid #e0e0e5;
  border-right: 1px solid #e0e0e5;
  font-size: 26px;
  &:last-child {
    border-right: 0;
    border-bottom-right-radius: 10px;
  }
  &:first-child {
    border-bottom-left-radius: 10px;
  }
  &:active {
    opacity: 0.8;
  }
}

.mars-modal-confirm {
  color: #00c696;
}

.mars-modal-cancel {
  color: #bbbbbe;
}

</style>

