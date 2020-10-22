<template>
  <div id="countDown">
    <div class v-if="type == 1">
      <span v-if="countDownText">{{countDownText}}</span>
      <span>{{countDown.h}}</span> :
      <span>{{countDown.m}}</span> :
      <span>{{countDown.s}}</span>
    </div>
    <div class="boxTop" v-if="type == 2">
      <div class="span-box">
        <span>{{countDown.h}}</span> :
        <span>{{countDown.m}}</span> :
        <span>{{countDown.s}}</span>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { clearInterval, setTimeout, setInterval } from "timers";
export default {
  data () {
    return {
      // seeData: [],
      data_text: "结束",
      num: 0,
      timer: null
    };
  },
  props: ["data", "changeFn", "type", "countDownText"],
  computed: {
    countDown () {
      let obj = {};
      obj.h = ("" + Math.floor(this.num / 3600)).padStart(2, "0");
      obj.m = ("" + Math.floor((this.num % 3600) / 60)).padStart(2, "0");
      obj.s = ("" + Math.floor((this.num % 3600) % 60)).padStart(2, "0");
      return obj;
    }
  },
  mounted () {
    this.getCountDown(this.data)
  },
  methods: {
    // 倒计时
    getCountDown (data) {
      let start_time, end_time;
      if (true) {
        //立即拼团  NOW_TIME 2019/09/17 14:37:55
        // this.data_text = "结束";
        start_time = this.data.assembleEndTime && this.data.assembleEndTime.replace(new RegExp(/-/gm), "/");
        end_time = this.data.now && this.data.now.replace(new RegExp(/-/gm), "/");
      } else if (data.START_STATUS == 1) {
        //立即预约
        this.data_text = "开始";
        start_time = this.data.TEAM_START_TIME.replace(new RegExp(/-/gm), "/");
        end_time = this.data.THIS_SYS_TIME.replace(new RegExp(/-/gm), "/");
      }
      let timed = new Date(start_time).getTime();
      let newtime = new Date(end_time).getTime();
      this.num = Math.floor((timed - newtime) / 1000);
      var that = this;
      (function start () {
        setTimeout(function () {
          that.num--;
          if (that.num <= 0) {
            that.num = 0;
            if (that.changeFn) that.changeFn();
            return;
          } else {
            start();
          }
        }, 1000);
      })();
    }
  },
  watch: {
    data: {
      handler (newValue) {
        this.getCountDown(newValue)
      },
      deep: true
    }
  }
};
</script>

<style scoped lang="less">
#countDown {
  display: inline-block;
}
.box {
  border-top: 1px dashed #e5e8f0;
}
.boxTop {
  height: 21px;
  line-height: 21px;
  border-radius: 5px 5px 0 0;
  font-size: 24px;
  color: #666;
  padding: 0.3rem 0 0 0.1rem;
  .span-box {
    display: inline-block;
    color: #ff801a;
  }
  span {
    font-size: 24px;
    color: #ff801a;
    padding: 0.02rem 0.08rem;
    background: #ffe8d6;
    text-align: center;
    border-radius: 4px;
  }
}
</style>
