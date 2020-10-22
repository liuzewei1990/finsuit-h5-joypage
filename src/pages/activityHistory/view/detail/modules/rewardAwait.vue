/* 
 *【奖励待发放】模版 
 * 活动状态：$activityStatus
 */


<template>
  <section class='template-detail template-detail-1'>

    <!-- 活动状态：持有天数不足 -->
    <template v-if="orderData.orderStatusReason === '持有天数不足'">
      <div class="detail-container">
        <div class="header">
          <p class="row row-title-1">
            <span class="label">{{orderData.activityName}}</span>
            <span class="value">{{$orderStatus[orderData.orderStatus]}}<span class="fail" v-show="orderData.orderStatusReason"><i>：{{orderData.orderStatusReason}}</i></span></span>
          </p>
        </div>
        <div class="content">
          <p class="row" v-if="orderData.prdName"><span class="label">产品名称：</span><span class="value">{{orderData.prdName}}</span></p>
          <p class="row" v-if="orderData.orgName"><span class="label">银行：</span><span class="value">{{orderData.orgName}}</span></p>
          <p class="row" v-if="orderData.teadeAmount"><span class="label">购买金额：</span><span class="value">￥{{orderData.teadeAmount || 0}}</span></p>
          <p class="row" v-if="orderData.amountToLimit"><span class="label">活动计息金额：</span><span class="value">￥{{orderData.amountToLimit || 0}}</span></p>

          <p class="row" v-if="orderData.additionalIncome"><span class="label">活动额外收益：</span><span class="value">+{{orderData.additionalIncome}}</span></p>
          <p class="row" v-if="orderData.ratePeriod"><span class="label">活动加息天数：</span><span class="value">{{orderData.ratePeriod || 0}}天</span></p>
          <p class="row" v-if="orderData.assistanceDay"><span class="label">活动助力天数：</span><span class="value">{{orderData.assistanceDay || 0}}天</span></p>
          <p class="row" v-if="(orderData.ratePeriod + orderData.assistanceDay) && orderData.assistanceDay"><span class="label">总加息天数：</span><span class="value">{{orderData.ratePeriod + orderData.assistanceDay}}天</span></p>
          <p class="row" v-if="orderData.totalNumbers"><span class="label">人数：</span><span class="value">{{orderData.totalNumbers || 0}}人团</span></p>
          <p class="row" v-if="orderData.flowCreateTime"><span class="label">投资时间：</span><span class="value">{{orderData.flowCreateTime | formatTime("Y年M月D日 h:m分")}}</span></p>
          <p class="row" v-if="orderData.reckonReteTime"><span class="label">计息时间：</span><span class="value">{{orderData.reckonReteTime | formatTime("Y年M月D日 h:m分")}}</span></p>
        </div>
        <div class="footer">
          <p class="row row-title-2" v-if="orderData.incomeAmount"><span class="label">预期权益</span><span class="value">{{orderData.incomeAmount}}</span></p>
          <p class="row row-title-3" v-if="orderData.prizeName"><span class="label">预期权益</span><span class="value">{{orderData.prizeName}}</span></p>
          <p class="row" v-if="orderData.realTime"><span class="label">权益预期到账时间：</span><span class="value">{{orderData.realTime | formatTime("Y年M月D日 h:m分")}}</span></p>
        </div>
      </div>
    </template>

    <!-- 活动状态：活动进行中 -->
    <template v-if="orderData.orderStatusReason === '活动进行中'">
      <div class="detail-container">
        <div class="header">
          <p class="row row-title-1">
            <span class="label">{{orderData.activityName}}</span>
            <span class="value">{{$orderStatus[orderData.orderStatus]}}<span class="fail" v-show="orderData.orderStatusReason"><i>：{{orderData.orderStatusReason}}</i></span></span>
          </p>
        </div>
        <div class="content">
          <p class="row" v-if="orderData.prdName"><span class="label">产品名称：</span><span class="value">{{orderData.prdName}}</span></p>
          <p class="row" v-if="orderData.orgName"><span class="label">银行：</span><span class="value">{{orderData.orgName}}</span></p>
          <p class="row" v-if="orderData.teadeAmount"><span class="label">购买金额：</span><span class="value">￥{{orderData.teadeAmount}}</span></p>
          <p class="row" v-if="orderData.amountToLimit"><span class="label">活动计息金额：</span><span class="value">￥{{orderData.amountToLimit}}</span></p>

          <p class="row" v-if="orderData.flowCreateTime"><span class="label">投资时间：</span><span class="value">{{orderData.flowCreateTime | formatTime("Y年M月D日 h:m分")}}</span></p>
        </div>
      </div>
    </template>

    <!-- 活动状态：未知 -->
    <template v-if="!orderData.orderStatusReason">
      <div class="detail-container">
        <div class="header">
          <p class="row row-title-1">
            <span class="label">{{orderData.activityName}}</span>
            <span class="value">{{$orderStatus[orderData.orderStatus]}}<span class="fail" v-show="orderData.orderStatusReason"><i>：{{orderData.orderStatusReason}}</i></span></span>
          </p>
        </div>
        <div class="content">
          <p class="row" v-if="orderData.prdName"><span class="label">产品名称：</span><span class="value">{{orderData.prdName}}</span></p>
          <p class="row" v-if="orderData.orgName"><span class="label">银行：</span><span class="value">{{orderData.orgName}}</span></p>
          <p class="row" v-if="orderData.teadeAmount"><span class="label">购买金额：</span><span class="value">￥{{orderData.teadeAmount}}</span></p>
          <p class="row" v-if="orderData.amountToLimit"><span class="label">活动计息金额：</span><span class="value">￥{{orderData.amountToLimit}}</span></p>

          <p class="row" v-if="orderData.flowCreateTime"><span class="label">投资时间：</span><span class="value">{{orderData.flowCreateTime | formatTime("Y年M月D日 h:m分")}}</span></p>
        </div>
      </div>
    </template>
  </section>
</template>

<script>

export default {
  props: {
    orderData: {
      type: Object,
      default () { return {} }
    }
  }
}
</script>
<style lang='less' scoped>
@import url(./template.less);
</style>