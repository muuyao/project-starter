<template>
  <div id="app">
    <NavBar></NavBar>
    <div class="app-page">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import NavBar from '@/components/nav-bar';

export default {
  name: 'app',
  data() {
    return {

    };
  },

  components: {
    NavBar
  }
};

</script>
<style lang="scss">
@import './assets/scss/partials/reset';
#app {
  font-size: 24px;
}

.app-page{
  padding-top: 100px;
}

</style>
