<template>
  <div class="t-table">
    <template v-if="taskAwardList && taskAwardList.length">
      <div class="t-t1">
        <span>邀请人数</span>
        <span>投资金额</span>
        <span>持仓时间</span>
        <span>任务奖励</span>
      </div>

      <div class="t-t2" v-for="(item,index) in taskAwardList" :key="index">
        <span>{{item.inviteCount}}</span>
        <span>{{item.investAmount}}</span>
        <span>{{item.investHoldDay}}</span>
        <span>{{item.reward}}</span>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    taskAwardList: Array,
  },
  data () {
    return {
      list: [
        { person: "1人", amount: "1万/人", date: "30天", reward: "4%加息券" },
        { person: "5人", amount: "10万/人", date: "30天", reward: "12元现金" },
        { person: "10人", amount: "20万/人", date: "30天", reward: "2000积分" },
      ]
    };
  },
  created () {

  },
  mounted () {

  },
  methods: {

  }
};
</script>

<style scoped lang="less">
.t-table {
  text-align: center;
  .t-t1 {
    font-size: 24px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 600;
    color: #303133;
    display: flex;
    line-height: 3;
    span {
      border: 1.5px solid #f29f7f;
      border-top: 0;
      line-height: 3;
      background: #fff;
    }
    span:nth-child(even) {
      border-left: 0;
      border-right: 0;
    }
    span:first-of-type {
      flex: 1;
      border-top-left-radius: 16px;
      border-left: 0;
    }
    span:nth-of-type(2) {
      flex: 1;
    }
    span:nth-of-type(3) {
      flex: 1;
    }
    span:nth-of-type(4) {
      flex: 1;
      border-top-right-radius: 16px;
    }
  }
  .t-t2 {
    font-size: 24px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #606266;
    display: flex;
    span {
      border: 1.5px solid #f29f7f;
      border-top: 0;
      line-height: 3;
      background: #fff;
    }
    span:nth-child(even) {
      border-left: 0;
      border-right: 0;
    }
    span:first-of-type {
      flex: 1;
      border-left: 0;
    }
    span:nth-of-type(2) {
      flex: 1;
    }
    span:nth-of-type(3) {
      flex: 1;
    }
    span:nth-of-type(4) {
      flex: 1;
    }
  }
  .t-t2:last-of-type {
    span {
      border-bottom: 0;
    }
    span:first-of-type {
      border-bottom-left-radius: 16px;
    }
    span:nth-of-type(4) {
      border-bottom-right-radius: 16px;
    }
  }
}
</style>
