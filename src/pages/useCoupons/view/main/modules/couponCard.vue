<template>
  <div>
    <div v-for="(item, index) in dataList" :key="index" class="cash" @click="toDetail(item)">
      <div class="cash-top">
        <div class="top-left">
          <h2>{{item.couponName}}</h2>
          <span>{{item.couponDescribe}}</span>
        </div>
        <div class="top-right">
          <!-- 加息券 -->
          <rate v-if="item.couponType == 2" :rateNumber="item.couponWeal"></rate>

          <!-- 现金券 -->
          <cashmoney v-else :cashNumber="item.couponWeal"></cashmoney>
        </div>
      </div>

      <!-- 未使用卡券 时间说明 -->
      <template v-if="couponesType=='1'">
        <!-- 可以使用 -->
        <div class="cash-bottom" v-if="item.couponStatus == 1">
          <span>有效期至 {{item.invalidDate}}</span>
          <div class="cash-use" :style="{color:showTriangle?'#508cee':'#A3A7AD'}">
            <span @click.stop="toUse(item)">{{statusText}}</span>
            <triangle v-if="showTriangle"></triangle>
          </div>
        </div>
        <!-- 规定时间段内使用 -->
        <div class="cash-bottom" v-if="item.couponStatus == 2">
          <span>使用时间 {{item.startDate}} 至 {{item.endDate}}</span>
        </div>
      </template>

      <!-- 失效卡券 时间说明 -->
      <template v-if="couponesType=='2'">
        <div class="cash-bottom">
          <span>已于 {{item.invalidDate}} {{item.couponStatus == 1 ? '过期' :'使用'}}</span>
        </div>
      </template>

    </div>
  </div>
</template>

<script>
import triangle from '../../../components/triangle'
import rate from './rate'
import cashmoney from './cashMoney'
export default {
  props: {
    showTriangle: {
      type: Boolean,
      default: true
    },
    statusText: {
      type: String,
      default: "立即使用"
    },
    toDetail: {
      type: Function,
      default: () => { }
    },
    toUse: {
      type: Function,
      default: () => { }
    },
    dataList: {
      type: Array,
      default: []
    },
    couponesType: {
      type: String
    }
  },
  data () {
    return {

    };
  },
  components: { triangle, rate, cashmoney },
  created () {

  },
  mounted () {

  },
  methods: {

  }
};
</script>

<style scoped lang="less">
.cash {
  background-color: #fff;
  border-radius: 12px;
  margin-bottom: 24px;
  min-height: 200px;
  padding: 34px 0 0;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  &::before {
    content: "";
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: #f5f7fa;
    position: absolute;
    bottom: 70px;
    left: -15px;
  }
  &::after {
    content: "";
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: #f5f7fa;
    position: absolute;
    bottom: 70px;
    right: -15px;
  }
  .cash-top {
    display: flex;
    padding-left: 32px;
    padding-bottom: 32px;
    box-sizing: border-box;
    h2 {
      font-size: 32px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: rgba(48, 49, 51, 1);
      .omit;
    }
    span {
      font-size: 24px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(163, 167, 173, 1);
      margin-top: 8px;
      .omit;
    }
    .top-left {
      flex: 1;
    }
    .top-right {
      width: 240px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .cash-bottom {
    height: 84px;
    padding-left: 32px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 2px dotted #e5e8f0;
    & > span {
      font-size: 24px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(163, 167, 173, 1);
    }
    .cash-use {
      display: flex;
      font-size: 24px;
      font-family: PingFangSC-Regular, PingFang SC;
      margin-right: 40px;
      span {
        margin-right: 10px;
      }
    }
  }
  .omit {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
}
</style>
