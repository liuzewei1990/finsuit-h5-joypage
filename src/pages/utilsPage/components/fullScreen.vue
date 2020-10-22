<template>
  <div class="fullScreen">
    <el-button type="primary" icon="el-icon-full-screen" @click="fullScreen" circle></el-button>
  </div>
</template>

<script>
export default {
  data () {
    return {

    };
  },
  created () {

  },
  mounted () {

  },
  methods: {
    fullScreen () {
      var el = document.querySelector(".el-main")
      console.log(el);
      var rfs = el.requestFullScreen || el.webkitRequestFullScreen ||
        el.mozRequestFullScreen || el.msRequestFullScreen;
      if (typeof rfs != "undefined" && rfs) {
        rfs.call(el);
      } else if (typeof window.ActiveXObject != "undefined") {
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript != null) {
          wscript.SendKeys("{F11}");
        }
      }
    },
    exitFullScreen () {
      var el = document;
      var cfs = el.cancelFullScreen || el.webkitCancelFullScreen ||
        el.mozCancelFullScreen || el.exitFullScreen;
      if (typeof cfs != "undefined" && cfs) {
        cfs.call(el);
      } else if (typeof window.ActiveXObject != "undefined") {
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript != null) {
          wscript.SendKeys("{F11}");
        }
      }
    }
  }
};
</script>

<style scoped lang="less">
.fullScreen {
  float: right;
  margin-top: 10px;
}
</style>
