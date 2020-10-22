<template>
  <section class="order-item">

    <!-- 月份 -->
    <!-- <div class="grup-name">{{order.month}}月</div> -->
    <div :class="{border:border}"></div>
    <!-- 订单内容 -->
    <div class="grup-item" :class="{'lt-read':isItRead}" @click="onClick">
      <div class="activity-icon" :style="{backgroundImage:`url(${order.activityImg})`}"></div>
      <div class="activity-content">
        <p class="ellipsis">{{order.activityName}}</p>
        <span>{{order.orgName}}-{{order.prdName}}</span>
      </div>
      <div class="activity-status">
        <p class="ellipsis">
          <span>{{$orderStatus[order.orderStatus]}}</span>
          <span v-show="order.orderStatus=='0' || order.orderStatus=='2'"><i v-show="order.orderStatusReason">：{{order.orderStatusReason}}</i></span>
        </p>
        <span class="money">{{order.teadeAmount}}</span>
      </div>
    </div>

    <!-- 底部日期 -->
    <div class="footer">
      <span>{{order.flowCreateTime}}</span>
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
    display: flex;
    // align-items: center;
    // border: 1px solid red;
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
  }

  .activity-content {
    // flex: 1;
    width: 270px;
    p {
      //   width: 270px;
      font-size: 30px;
      color: #333;
      line-height: 60px;
    }
    span {
      font-size: 24px;
      color: #666;
      margin: 10px 0;
      display: inline-block;
    }
  }

  .activity-status {
    // flex: 1;
    width: 300px;
    text-align: right;
    p {
      color: #4f82ff;
      font-size: 24px;
      line-height: 60px;
    }
    .money {
      font-size: 30px;
      color: #666;
      margin: 10px 0;
      display: inline-block;
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
    border-top: 1px solid #e5e8f0;
  }
}
</style>
