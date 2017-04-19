<template>
  <div class="banner" :class="{'banner-large': source === 'home'}">
    <Swipe :auto="4000">
      <SwipeItem>
        <div v-if="source === 'home'">
          <img v-if="is3DaysLast" src="./img/banner-30-large.png" class="banner-img" alt="">
          <img v-else src="./img/banner-40-large.png" class="banner-img" alt="">
        </div>

        <div v-else>
          <img v-if="is3DaysLast" src="./img/banner-30.png" class="banner-img" alt="">
          <img v-else src="./img/banner-40.png" class="banner-img" alt="">
        </div>

      </SwipeItem>
    </Swipe>
  </div>
</template>
<script>
import {
  mapState
} from 'vuex';
import {
  Swipe,
  SwipeItem
} from 'mint-ui';

export default {

  name: 'banner',

  props: {
    source: ''
  },

  data() {
    return {

    };
  },

  computed: {
    ...mapState({
      is3DaysLast: state => state.app.is3DaysLast
    })
  },

  components: {
    Swipe,
    SwipeItem
  }
};

</script>
<style lang="css" scoped>
.banner {
  width: 100%;
  height: 320px;
}

.banner-large{
  height: 400px;
}

.banner-img {
  width: 100%;
}
</style>

