<!--
 * 发送验证码按钮组件
 * 
 * 指定时间参数 time:2
 * 指定文字参数 text : "发送验证码"
 * 指定点击事件的回调函数
-->

<template>
  <a href="javascript:void(0);" class="timer-btn" @click="handleClick" :disabled="disabled">{{s}}</a>

</template>

<script>
export default {
  data () {
    return {
      disabled: false, //默认不disabled
      timerBtnActiveClass: false,
      s: this.text
    };
  },
  props: {
    cb: {
      type: Function,
      default: function () {
        console.info("请传入回调函数");
      }
    },
    time: {
      type: Number,
      default: 6,
      required: true
    },
    text: {
      type: String,
      default: "发送验证码"
    },
    textEnd: {
      type: String,
      default: "重新发送"
    }
  },
  methods: {
    handleClick () {
      if (this.disabled) return;
      this.cb();
    },
    //启动倒计时
    timer () {
      var num = this.time;
      var t = null;
      this.s = num + "s";
      t = setInterval(() => {
        if (num == 0) {
          this.disabled = false;
          this.s = this.textEnd;
          clearInterval(t);
          return;
        }
        num--;
        this.s = num + "s";
      }, 1000);
    }
  }
};
</script>

<style lang="less" scoped>
</style>
