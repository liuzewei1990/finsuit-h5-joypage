<template>
  <div class="swiper-container">
    <slot name="parallax-bg"></slot>
    <div :class="classes.wrapperClass">
      <slot></slot>
    </div>
    <slot name="pagination"></slot>
    <slot name="button-prev"></slot>
    <slot name="button-next"></slot>
    <slot name="scrollbar"></slot>
  </div>
</template>

<script>

import Swiper from 'swiper/js/swiper.min.js';
import 'swiper/css/swiper.min.css';
// pollfill
if (typeof Object.assign != 'function') {
  Object.defineProperty(Object, 'assign', {
    value (target, varArgs) {
      if (target == null) {
        throw new TypeError('Cannot convert undefined or null to object')
      }
      const to = Object(target)
      for (let index = 1; index < arguments.length; index++) {
        const nextSource = arguments[index]
        if (nextSource != null) {
          for (const nextKey in nextSource) {
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey]
            }
          }
        }
      }
      return to
    },
    writable: true,
    configurable: true
  })
}
// as of swiper 4.0.7
// http://idangero.us/swiper/api/#events
const DEFAULT_EVENTS = [
  'beforeDestroy',
  'slideChange',
  'slideChangeTransitionStart',
  'slideChangeTransitionEnd',
  'slideNextTransitionStart',
  'slideNextTransitionEnd',
  'slidePrevTransitionStart',
  'slidePrevTransitionEnd',
  'transitionStart',
  'transitionEnd',
  'touchStart',
  'touchMove',
  'touchMoveOpposite',
  'sliderMove',
  'touchEnd',
  'click',
  'tap',
  'doubleTap',
  'imagesReady',
  'progress',
  'reachBeginning',
  'reachEnd',
  'fromEdge',
  'setTranslate',
  'setTransition',
  'resize'
]
// export
export default {
  name: 'swiper',
  props: {
    options: {
      type: Object,
      default: () => ({})
    },
    globalOptions: {
      type: Object,
      required: false,
      default: () => ({})
    },
    value: {
      type: Number,
      default: 0
    }
  },

  watch: {
    currentIndex (val) {
      this.$emit('input', val)
    },
    value (val) {
      this.currentIndex = val;
      this.swiper.slideTo(val, 0);
    }
  },

  data () {
    return {
      swiper: null,
      currentIndex: 0,
      classes: {
        wrapperClass: 'swiper-wrapper'
      }
    }
  },
  ready () {
    if (!this.swiper) {
      this.mountInstance()
    }
  },
  created () {
    this.currentIndex = this.value || 0;
  },
  mounted () {
    if (!this.swiper) {
      let setClassName = false
      for (const className in this.classes) {
        if (this.classes.hasOwnProperty(className)) {
          if (this.options[className]) {
            setClassName = true
            this.classes[className] = this.options[className]
          }
        }
      }
      setClassName ? this.$nextTick(this.mountInstance) : this.mountInstance()
    }
  },
  activated () {
    this.update()
  },
  updated () {
    this.update()
  },
  beforeDestroy () {
    this.$nextTick(function () {
      if (this.swiper) {
        this.swiper.destroy && this.swiper.destroy()
        delete this.swiper
      }
    })
  },
  methods: {
    update () {
      if (this.swiper) {
        this.swiper.update && this.swiper.update()
        this.swiper.navigation && this.swiper.navigation.update()
        this.swiper.pagination && this.swiper.pagination.render()
        this.swiper.pagination && this.swiper.pagination.update()
      }
    },
    mountInstance () {
      const swiperOptions = Object.assign({}, this.globalOptions, this.options)
      this.swiper = new Swiper(this.$el, swiperOptions)
      this.bindEvents()
      this.$emit('ready', this.swiper)
      //   this.$nextTick(() => {
      //     this.swiper.slideTo(this.currentIndex, 0);
      //   })
    },
    bindEvents () {
      const vm = this
      DEFAULT_EVENTS.forEach(eventName => {
        this.swiper.on(eventName, () => {
          // 执行内部事件函数
          this[eventName] && this[eventName]();
          // 派发事件
          this.$emit(eventName, ...arguments)
          this.$emit(eventName.replace(/([A-Z])/g, '-$1').toLowerCase(), ...arguments)
        })
      })
    },
    slideChange () {
      this.currentIndex = this.swiper.activeIndex;
    }
  }
}
</script>