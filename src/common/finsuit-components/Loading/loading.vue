<template>
  <div class="h5plus-loading" :class="{'show-mask':showMask}">
    <transition name="h5plus-loading-toast-pop">
      <div class="h5plus-loading-toast" v-show="visible" :class="[{'h5plus-loading-toast-column':isColumn},className]">
        <i v-if="iconClass" class="" :class="iconClass"></i>
        <i v-else class="loading-icon loading-bj-icon"></i>
        <span class="h5plus-loading-toast-text" v-show="message">{{ message }}</span>
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
    iconClass: {
      type: String,
      default: ''
    },
    isColumn: {
      type: String,
      default: false
    },
    showMask: {
      type: String,
      default: false
    },
  },
  data () {
    return {
      visible: false
    };
  }
};
</script>

<style lang="less" scoped>
.h5plus-loading {
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
  pointer-events: none;
}
.show-mask {
  pointer-events: auto;
}

.h5plus-loading-toast {
  max-width: 80%;
  border-radius: 3px;
  color: #fff;
  box-sizing: border-box;
  text-align: center;
  transition: opacity 0.2s linear;
  display: flex;
  align-items: center;
  padding: 16px;
}
.h5plus-loading-toast-column {
  flex-direction: column;
  padding: 35px 16px;
  .h5plus-loading-toast-text {
    text-align: center;
    margin: 20px 0 0;
  }
}

.icon {
  display: inline-block;
  font-size: 50px;
  transform-origin: 25px 24px;
  animation: loading 1s steps(12, end) infinite;
}

.loading-icon {
  width: 50px;
  height: 50px;
}

.h5plus-loading-toast-text {
  font-size: 26px;
  display: block;
  text-align: left;
  color: #d8d8d8;
  //   margin-left: 10px;
  // min-width: 220px;
  padding: 0 20px;
}
.h5plus-loading-toast-pop-enter,
.h5plus-loading-toast-pop-leave-active {
  opacity: 0;
}
// h5plus-loading-toast is-placemiddle h5plus-loading-toast-pop-enter-active h5plus-loading-toast-pop-enter-to
// h5plus-loading-toast is-placemiddle h5plus-loading-toast-pop-leave-active h5plus-loading-toast-pop-leave-to

.h5plus-loading-toast-pop-enter-active {
  animation-duration: 0.75s;
  animation-name: bounceIn;
}

// .h5plus-loading-toast-pop-leave-active {
//   animation-duration: 0.4s;
//   animation-name: bounceOut;
// }

@keyframes bounceIn {
  from,
  20%,
  40%,
  60%,
  80%,
  to {
    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  0% {
    opacity: 0;
    -webkit-transform: scale3d(0.3, 0.3, 0.3);
    transform: scale3d(0.3, 0.3, 0.3);
  }

  20% {
    -webkit-transform: scale3d(1.1, 1.1, 1.1);
    transform: scale3d(1.1, 1.1, 1.1);
  }

  40% {
    -webkit-transform: scale3d(0.9, 0.9, 0.9);
    transform: scale3d(0.9, 0.9, 0.9);
  }

  60% {
    opacity: 1;
    -webkit-transform: scale3d(1.03, 1.03, 1.03);
    transform: scale3d(1.03, 1.03, 1.03);
  }

  80% {
    -webkit-transform: scale3d(0.97, 0.97, 0.97);
    transform: scale3d(0.97, 0.97, 0.97);
  }

  to {
    opacity: 1;
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
}
@keyframes bounceOut {
  20% {
    // -webkit-transform: scale3d(0.9, 0.9, 0.9);
    // transform: scale3d(0.9, 0.9, 0.9);
  }

  50%,
  55% {
    opacity: 1;
    -webkit-transform: scale3d(1.1, 1.1, 1.1);
    transform: scale3d(1.1, 1.1, 1.1);
  }

  to {
    opacity: 0;
    -webkit-transform: scale3d(0.3, 0.3, 0.3);
    transform: scale3d(0.3, 0.3, 0.3);
  }
}
// @keyframes bounceOut {
//   20% {
//     -webkit-transform: scale3d(0.9, 0.9, 0.9);
//     transform: scale3d(0.9, 0.9, 0.9);
//   }

//   50%,
//   55% {
//     opacity: 1;
//     -webkit-transform: scale3d(1.1, 1.1, 1.1);
//     transform: scale3d(1.1, 1.1, 1.1);
//   }

//   to {
//     opacity: 0;
//     -webkit-transform: scale3d(0.3, 0.3, 0.3);
//     transform: scale3d(0.3, 0.3, 0.3);
//   }
// }

@-webkit-keyframes weuiLoading {
  0% {
    transform: rotate3d(0, 0, 1, 0deg);
  }

  100% {
    transform: rotate3d(0, 0, 1, 360deg);
  }
}

@keyframes weuiLoading {
  0% {
    transform: rotate3d(0, 0, 1, 0deg);
  }

  100% {
    transform: rotate3d(0, 0, 1, 360deg);
  }
}
</style>
