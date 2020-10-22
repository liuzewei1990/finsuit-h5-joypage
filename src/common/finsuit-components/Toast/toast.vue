<template>
  <div class="toast-mask-box" :class="{'toast-events-none':pointerEventsNone}">
    <transition :name="trsiClass" @after-leave="afterLeave">
      <div class="bc-toast" v-show="visible" :class="customClass" :style="{ 'padding': iconClass === '' ? '10px' : '20px' }">
        <i class="bc-toast-icon" :class="iconClass" v-if="iconClass !== ''"></i>
        <span class="bc-toast-text" :style="{ 'padding-top': iconClass === '' ? '0' : '10px' }">{{ message }}</span>
      </div>
    </transition>
  </div>
</template>

<script type="text/babel">
export default {
  props: {
    message: String,
    className: {
      type: String,
      default: ''
    },
    position: {
      type: String,
      default: 'middle'
    },
    iconClass: {
      type: String,
      default: ''
    },
    trsiClass: {
      type: String,
      default: ''
    },
    pointerEventsNone: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      visible: false
    };
  },
  computed: {
    customClass () {
      var classes = [];
      switch (this.position) {
        case 'top':
          classes.push('is-placetop');
          break;
        case 'bottom':
          classes.push('is-placebottom');
          break;
        default:
          classes.push('is-placemiddle');
      }
      classes.push(this.className);
      return classes.join(' ');
    }
  },
  methods: {
    afterLeave () {
      this.$el.remove();
    }
  }
};
</script>

<style lang="less" scoped>
.toast-mask-box {
  position: fixed;
  z-index: 999999;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  display: -webkit-flex;
  justify-content: center;
  align-items: center;
}

.toast-events-none {
  pointer-events: none;
}

.bc-toast {
  max-width: 80%;
  min-width: 300px;
  border-radius: 6px;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  box-sizing: border-box;
  text-align: center;
  word-break: break-all;
}

.bc-toast.is-placebottom {
  position: absolute;
  bottom: 100px;
}

.bc-toast.is-placemiddle {
}

.bc-toast.is-placetop {
  position: absolute;
  top: 350px;
}

.bc-toast-icon {
  display: block;
  text-align: center;
  font-size: 100px;
  &:before {
    color: #fff;
  }
}

.bc-toast-text {
  font-size: 28px;
  display: block;
  text-align: center;
}
</style>
