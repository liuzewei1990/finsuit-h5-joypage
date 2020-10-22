<template>
  <div class="box">
    <div class="boxTop">
      拼团{{data_text}}倒计时
      <div class="span-box">
        <span>{{countDown.h}}</span> :
        <span>{{countDown.m}}</span> :
        <span>{{countDown.s}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // seeData: [],
      data_text: "结束",
      num: 0,
      timer: null,
    }
  },
  props: ['data', 'changeFn'],
  computed: {
    countDown () {
      let obj = {}
      obj.h = ('' + Math.floor(this.num / 3600)).padStart(2, '0')
      obj.m = ('' + Math.floor(this.num % 3600 / 60)).padStart(2, '0')
      obj.s = ('' + Math.floor(this.num % 3600 % 60)).padStart(2, '0')
      return obj
    }
  },
  watch: {
    "data" (newVal, oldVal) {
      this.getCountDown(newVal);
    }
  },
  mounted () {
    this.getCountDown(this.data);
  },
  methods: {
    // 倒计时
    getCountDown (data) {
      clearInterval(this.timer);
      let start_time, end_time;
      if (data.STATUS == 3) {
        //立即拼团
        this.data_text = "结束";
        start_time = this.data.TEAM_END_TIME.replace(new RegExp(/-/gm), "/");
        end_time = this.data.THIS_SYS_TIME.replace(new RegExp(/-/gm), "/");
      } else if (data.STATUS == 2) {
        //立即预约
        this.data_text = "开始";
        start_time = this.data.TEAM_START_TIME.replace(new RegExp(/-/gm), "/");
        end_time = this.data.THIS_SYS_TIME.replace(new RegExp(/-/gm), "/");
      }
      let timed = new Date(start_time).getTime();
      let newtime = new Date(end_time).getTime();
      this.num = Math.floor((timed - newtime) / 1000);
      this.timer = setInterval(() => {
        this.num--
        if (this.num <= 0) {
          clearInterval(this.timer);
          this.num = 0;
          this.timer = null
          if (this.changeFn) this.changeFn()
        }
      }, 1000)
    },
  }
}
</script>

<style scoped lang="less">
.box {
}
.boxTop {
  height: 42px;
  line-height: 42px;
  border-radius: 10px 10px 0 0;
  font-size: 24px;
  color: #666;
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
    border-radius: 8px;
  }
}
</style>
