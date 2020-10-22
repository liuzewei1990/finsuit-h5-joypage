<!-- fixed定位容器 -->
<template>
  <section class='sticky-box-outer' :style="style">
    <div class="sticky-box-inner" :style="style">
      <slot></slot>
    </div>
  </section>
</template>

<script>

export default {
  props: {
    zIndex: {
      type: Number,
      default: 1000
    },
    stickyTop: {
      type: Number,
      default: 0
    },
    height: {
      type: String,
      default: "auto"
    }
  },
  computed: {
    style () {
      return {
        height: this.height,
        zIndex: this.zIndex,
        top: this.stickyTop + "px",
        left: "0px"
      }
    }
  },
  data () {
    return {
      active: false
    };
  },

  mounted () {
    window.addEventListener("scroll", this.initEvent);
    window.addEventListener("resize", this.onResize);
  },
  activated () {

    this.reset();
  },

  //方法集合
  methods: {
    initEvent () {
      const offsetTop = this.$el.getBoundingClientRect().top
      if (offsetTop <= this.stickyTop) {
        this.sticky()
        return
      }
      this.reset()
    },

    sticky () {
      if (this.active) {
        return
      }
      this.$el.firstElementChild.style.position = 'fixed'
      this.active = true
    },

    reset () {
      if (!this.active) {
        return
      }
      this.$el.firstElementChild.style.position = ''
      this.active = false
    },

    onResize () {
      this.reset();
    }
  },
  destroyed () {
    window.removeEventListener("scroll", this.initEvent);
  },
  deactivated () {
  }

}
</script>
<style lang='less' scoped>
.sticky-box-inner {
  width: 100%;
}
</style>