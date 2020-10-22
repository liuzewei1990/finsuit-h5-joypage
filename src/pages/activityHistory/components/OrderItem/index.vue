<template>
  <section class="order-item">

    <!-- 月份 -->
    <!-- <div class="grup-name">{{order.month}}月</div> -->
    <div :class="{border:border}"></div>
    <!-- 订单内容 -->
    <div class="grup-item" :class="{'lt-read':isItRead}" @click="onClick">
      <div class="activity-icon" :style="{backgroundImage:`url(${order.activityImg})`}"></div>
      <div class="activity-box">
        <div class="activity-content">
          <p class="activity-name ellipsis">{{order.activityName}}</p>
          <p class="order-status">
            <span>{{$orderStatus[order.orderStatus]}}</span>
            <span v-show="order.orderStatus=='0' || order.orderStatus=='2'"><i v-show="order.orderStatusReason">：{{order.orderStatusReason}}</i></span>
          </p>
        </div>
        <div class="activity-status">
          <p class="prd-name">{{order.orgName}}{{order.orgName && order.prdName && '-'}}{{order.prdName}}</p>
          <p class="teade-amount">{{order.teadeAmount}}</p>
        </div>
      </div>
    </div>

    <!-- 底部日期 -->
    <div class="footer">
      <span>{{order.flowCreateTime | formatTime("Y.M.D")}}</span>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    order: {
      type: Object,
      default: () => { return {} }
    },
    border: Boolean,
    isItRead: Boolean
  },
  methods: {
    onClick () {
      this.isItRead = true;
      this.$emit("on-item-click");
    }
  }
}
</script>

<style lang="less" scoped>
.lt-read {
  opacity: 0.7;
}
.order-item {
  background: #fff;
  .grup-item {
    padding: 24px 24px 10px 24px;
    box-sizing: border-box;
  }

  .activity-icon {
    width: 80px;
    height: 80px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    border-radius: 500px;
    overflow: hidden;
    margin: 20px 45px 0 0px;
    float: left;
  }
  .activity-box {
    // flex: 1;
  }

  .activity-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .activity-name {
      //   width: 270px;
      font-size: 30px;
      color: #333;
      line-height: 60px;
      //   font-weight: 510;
      font-family: "PingFangSC-Medium", "Helvetica Neue", "Helvetica",
        "Hiragino Sans GB", "Microsoft YaHei", Arial, sans-serif;
    }
    .order-status {
      display: flex;
      flex-wrap: nowrap;
      white-space: nowrap;
      font-size: 24px;
      color: #4f82ff;
      margin: 10px 0;
      text-align: right;
    }
  }

  .activity-status {
    display: flex;
    align-items: top;
    margin: 10px 0;
    .prd-name {
      width: 400px;
      color: #666;
      font-size: 24px;
    }
    .teade-amount {
      flex: 1;
      font-size: 30px;
      color: #666;
      text-align: right;
    }
  }

  .footer {
    margin-left: 150px;
    padding-bottom: 25px;
    // line-height: 80px;
    span {
      color: #666666;
      font-size: 24px;
    }
  }
  .border {
    margin-left: 150px;
    border-top: 2px solid #e5e8f0;
  }
}
</style>
