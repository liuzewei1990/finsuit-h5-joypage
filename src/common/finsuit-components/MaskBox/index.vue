<template>
  <div class="box-example" :class="{'box-example-bg':!isTransparent}" v-show="visible" @click.self="close">
    <div class="box-content">
      <span v-if="showLoading" class="loading loading-bj-icon"></span>
      <slot v-else></slot>
      <div v-show="defaultcloseBtnVisible" class="boxClose icon-close-2" v-if="!isTransparent" @click="visible = false"></div>
    </div>
    <slot name="footer">
    </slot>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    hideOnBlur: {
      type: Boolean,
      default: true
    },
    isTransparent: {
      type: Boolean,
      default: false
    },
    defaultcloseBtnVisible: {
      type: Boolean,
      default: true
    },
    showLoading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      visible: false,
      key: true,
    };
  },
  watch: {
    value (val) {
      this.visible = val;
      if (this.visible) this.$emit("on-show");
      else this.$emit("on-hide");
    },
    visible (val) {
      this.$emit("input", val);
      if (val && this.key) {
        this.key = false;
        this.$emit("once-visible", val);
      }
    }
  },
  created () {
    this.visible = this.value;
  },
  methods: {
    close () {
      if (this.hideOnBlur) this.visible = false;
    }
  }
};
</script>

<style lang="less" scoped>
@keyframes fideIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.box-example {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 1001;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  flex-direction: column;
  animation: fideIn 0.2s linear;
}
.box-example-bg {
  background: rgba(0, 0, 0, 0.6);
}
.box-content {
  margin: auto;
}
.boxClose {
  margin: 79px auto 0;
  color: #eee;
  font-size: 60px;
  text-align: center;
}
.loading {
  width: 60px;
  height: 60px;
  display: block;
  margin: 0 auto;
}
</style>
