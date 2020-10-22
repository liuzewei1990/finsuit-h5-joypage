<!-- 拼财首页 -->
<template>
  <div class="banner-wrapper">
    <div class="slide-banner-scroll" :style="{height:xheight}" ref="slide">
      <div class="slide-banner-wrapper" :style="{height:wrapperHeight}">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core'
import Slide from '@better-scroll/slide'
BScroll.use(Slide);

export default {
  props: {
    loop: Boolean,
    aspectRatio: Number,
    height: {
      type: String,
      default: 'auto'
    },
    wrapperHeight: {
      type: String,
      default: 'auto'
    },
    value: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      hasRender: false,
      slide: null,
      currentIndex: 0,
      playTimer: 0,
      xheight: "auto"
    }
  },

  watch: {
    currentIndex (val) {
      this.$emit('input', val)
    },
    value (val) {
      this.currentIndex = val
    }
  },

  created () {
    this.currentIndex = this.value || 0;
  },

  mounted () {
    this.xheight = this.getHeight();
    this.init();
  },

  methods: {
    init () {
      //   console.log("init");
      /* 
      * slide配置文档：https://better-scroll.github.io/docs/en-US/plugins/slide.html#options
      */
      let options = {
        scrollX: true,
        scrollY: false,
        slide: {
          loop: this.loop,
          threshold: 100,
          // ios开启轻抚 安卓不开启（因为会误滑出错率高）
          listenFlick: this.$browser.OS === "IOS",

        },
        useTransition: true,
        momentum: false,
        bounce: {
          top: true,
          bottom: true,
          left: false,
          right: false
        },
        stopPropagation: true,
        directionLockThreshold: 50,
        probeType: 2,
        eventPassthrough: "vertical",

      }

      this.slide = new BScroll(this.$refs.slide, options)
      //   this.slide.disable();
      this.goToPage(this.currentIndex);
      this.slide.on('scrollEnd', this._onScrollEnd)

      // user touches the slide area
      this.slide.on('beforeScrollStart', () => {
        this.$emit("beforeScrollStart")
      })
      // user touched the slide done
      this.slide.on('scrollEnd', (e) => {
        this.$emit("scrollEnd", e)
      })

      this.slide.on("slideWillChange", this._slideWillChange)
    },
    rerender () {
      if (!this.$el || this.hasRender) {
        return
      }
      this.hasRender = true
      this.$nextTick(() => {
        this.destroy()
        this.init()
      })
    },
    destroy () {
      this.hasRender = false
      this.slide && this.slide.destroy()
    },
    nextPage () {
      this.slide.next()
    },
    prePage () {
      this.slide.prev()
    },
    _onScrollEnd () {
    },

    /**
     * 在横幅演示中，圆点图例用于指示当前页面的索引。当用户将横幅拖动到下一个横幅时，我们希望点图例同步更改
     */
    _slideWillChange (page) {
      this.$emit("slideWillChange", page);
      this.currentIndex = page.pageX;
    },

    /**
     * 切换到指定的Tabview
     */
    goToPage (index) {
      if (this.slide) {
        this.slide.goToPage(index, 0, 0, {});
      }
    },

    /**
     * 获取高度
     */
    getHeight () {
      const hasHeight = parseInt(this.height, 10)
      if (hasHeight) return this.height
      if (!hasHeight) {
        if (this.aspectRatio) {
          return this.$el.offsetWidth * this.aspectRatio + 'px'
        }
        return '180px'
      }
    }
  },

  beforeDestroy () {
    this.destroy()
  },
}
</script>
<style lang='less' scoped>
.banner-wrapper {
  position: relative;
}
.slide-banner-scroll {
  height: 100%;
  overflow: hidden;
}
.slide-banner-wrapper {
  height: 100%;
  //   white-space: nowrap;
}
</style>