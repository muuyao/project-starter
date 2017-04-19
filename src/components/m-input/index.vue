<template>
  <div class="input">
    <div class="input-icon" v-if="$slots.icon">
      <slot name="icon"></slot>
    </div>
    <div class="input-body">
      <input :type="type" class="input-self" autocomplete="off" :maxlength="maxlength" :placeholder="placeholder" :value="currentVal" @input="handleInput">
    </div>
    <div class="input-add">
      <slot name="addon"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'm-input',
  props: {
    type: {
      type: String,
      default: 'text'
    },

    value: {
      required: true
    },

    placeholder: {
      type: String,
      default: ''
    },

    maxlength: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      currentVal: this.value
    };
  },

  watch: {
    value(val) {
      this.currentVal = val;
    },
    currentVal(val) {
      this.$emit('input', val);
    }
  },

  methods: {
    handleInput(e){
      this.currentVal = e.target.value;
    }
  }
};

</script>
<style lang="scss" scoped>
.input {
  display: flex;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid #dedfe0;

  &:last-child{
    border-bottom: 0;
  }

  font-size: 12px;
}

.input-self {
  width: 100%;

  border:0;
  padding: 10px 0;
}

.input-icon,
.input-add {
  flex-shrink: 0;
}

.input-icon{
  width: 68px;
}

.input-body {
  flex: 1;
  height: 90px;
  display: flex;
  align-items: center;
}

</style>

