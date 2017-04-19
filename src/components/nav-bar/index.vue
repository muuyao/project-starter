<template>
  <div class="nav-bar-wrapper" :class="appNavClass">
    <div class="nav-bar-ios" v-if="os === 'IOS'"></div>
    <div class="nav-bar">
      <div class="nav-back" @click="goBack" v-if="isShowBack"><span class="nav-arrow"></span></div>
      <div class="nav-title">{{$route.meta.title || '好友邀请'}}</div>
    </div>
  </div>
</template>
<script>
import {
  mapState
} from 'vuex';

export default {

  name: 'nav-bar',

  data() {
    return {};
  },

  computed: {
    ...mapState({
      os: state => state.app.os
    }),
    appNavClass() {
      const {
        os
      } = this;
      const arr = [];
      if (os !== 'WEB') {
        arr.push('nav-bar-app');
      }

      if (os === 'IOS') {
        arr.push('nav-bar-app-ios');
      }

      if (os === 'ANDROID') {
        arr.push('nav-bar-app-android');
      }

      return arr;
    },
    isShowBack() {
      const {
        name
      } = this.$route;
      return (name !== 'home') && (name !== 'download');
    }
  },

  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
};

</script>
<style lang="scss" scoped>
.nav-bar-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #00de9e;
  color: #fff;
  font-size: 36px;
  z-index: 9999;
  overflow: hidden;
}

.nav-bar-wrapper.nav-bar-app {
  color: #66666e;
  background-color: #fff;
}

.nav-bar-app.nav-bar-app-ios .nav-bar {
  height: 44PX;
}


.nav-bar {
  height: 100px;
  padding: 0 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.nav-back {
  flex-shrink: 0;
  padding: 10px;
  margin: -10px;
}

.nav-title {
  flex: 1;
  text-align: center;
}

.nav-bar-app .nav-arrow:before,
.nav-bar-app .nav-arrow:after {
  border-color: #40cbff;
}

.nav-bar-ios {
  background-color: #fff;
  height: 20PX;
}


/*左箭头*/

.nav-arrow {
  display: block;
  height: 38px;
  width: 24px;
  font-size: 0;
  line-height: 0;
  position: relative;
  overflow: hidden;
  vertical-align: middle;
}

.nav-arrow:before,
.nav-arrow:after {
  content: " ";
  display: block;
  border-top: 1px solid #fff;
  position: absolute;
  width: 100px;
  left: 0;
  top: 50%;
}

.nav-arrow:before {
  transform: translate(-50%, -80%) rotate(42deg);
}

.nav-arrow:after {
  transform: translate(-50%, -50%) rotate(-42deg);
}

</style>

