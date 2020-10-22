<template>
  <div class="msg-scroll">
    <slot name="icon"></slot>
    <div class="msg-scroll-box" ref="scrollBox" @click="$emit('click')">
      <p class="scroll" ref="scroll" :style="{webkitTransform:`translateX(${-scrollValue}px)`,transform:`translateX(${-scrollValue}px)`}">
        <!-- <span ref="text1">{{text}}</span> -->
        <span ref="text1" v-html="text"></span>
      </p>
    </div>
    <slot name="action"></slot>
  </div>
</template>

<script>
export default {
  data () {
    return {
      aniFrame: null,
      timer: null,
      isStop: true,
      scrollValue: 0
    }
  },
  props: {
    // 文本内容，支持简单富文本
    text: String,
    //  间隔空格数
    nbspNum: {
      type: Number,
      default: 0
    },
    // 速度
    speed: {
      type: Number,
      default: 1
    },
    // 每一轮的间隔等待时长
    awaitTimer: {
      type: Number,
      default: 2000
    }
  },
  watch: {
    text (v) {
      if (v) {
        this.$nextTick(this.init);
      }
    }
  },
  mounted () {
    if (this.text) this.init();
  },
  methods: {
    // 初始化
    init () {
      let scrollBox = this.$refs["scrollBox"];
      let scroll = this.$refs["scroll"];
      let text1 = this.$refs["text1"];
      let nbsp = this.nbsp();
      let text2 = document.createElement("span");

      if (text1.getBoundingClientRect().width > scrollBox.getBoundingClientRect().width) {
        text1.innerHTML = text1.innerHTML + `<span class="bc-notice-nbsp1">${nbsp}</span>`;
        text2.innerHTML = text1.innerHTML;
        scroll.appendChild(text2);
        this.start();
      }
    },

    // 播放
    play () {
      window.cancelAnimationFrame(this.aniFrame);
      this.aniFrame = window.requestAnimationFrame(() => {
        let scrollBox = this.$refs["scrollBox"];
        let textWidth = this.$refs["text1"].getBoundingClientRect().width;
        if (textWidth - this.scrollValue <= 0) {
          this.scrollValue = 0;
          this._run();
        } else {
          this.scrollValue = this.scrollValue + this.speed;
          this.play();
        }
      });
    },

    _run () {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.play();
      }, this.awaitTimer);
    },

    // 开始
    start () {
      if (this.isStop) {
        this.isStop = false;
        this._run();
      }
    },

    // 停止
    stop () {
      this.isStop = true;
      window.cancelAnimationFrame(this.aniFrame);
    },

    // 重置
    reset () {
      this.stop();
      let scrollBox = this.$refs["scrollBox"];
      this.scrollValue = 0;
      this.start();
    },

    // 空格
    nbsp () {
      let nbspStr = "";
      for (let index = 0; index < this.nbspNum; index++) nbspStr += "&nbsp;";
      return nbspStr;
    }
  }
};
</script>

<style lang="less" scoped>
.msg-scroll {
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  display: flex;
}

.msg-scroll-box {
  flex: 1;
  overflow: hidden;
  white-space: nowrap;
  display: flex;
  align-items: center;

  transform: translateX();

  //   .scroll {
  //     &::before {
  //       content: "";
  //       display: block;
  //       width: 60px;
  //       border-bottom: 1px solid red;
  //     }
  //   }
}
</style>
