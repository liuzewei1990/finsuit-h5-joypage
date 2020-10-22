<template>
  <div>
    <div class="p-card" v-for="(item, index) in dataList" :key="index" @click="toUse(item)">
      <p class="p-title"><span>{{item.prdTypeName}}</span> | <span>{{item.orgName}}</span> - <span>{{item.prdName}}</span></p>
      <div class="p-describe">

        <div class="p-l">
          <rate :rateNumber="item.rate" :rateDescribe="item.rateText"></rate>
        </div>

        <div class="p-r">
          <p v-if="item.period">{{item.period}}{{unit[item.periodUnit]}}</p>
          <p v-else>0天</p>
          <p>
            <span>{{item.minAmount}}元起购</span>
            <span v-if="item.riskLevel">{{riskLevel[item.riskLevel]}}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import rate from './rate'
import linkprdDetail from '../../../utils/prdDetailUrl'
export default {
  components: { rate },
  props: {
    dataList: Array,
    memCouponId: [String, Number],
    couponId: [String, Number]
  },
  data () {
    return {
      riskLevel: {
        "-1": "暂无风险",
        "1": "低风险",
        "2": "中低风险",
        "3": "中风险",
        "4": "中高风险",
        "5": "高风险",
      },
      unit: {
        //   期限单位 0：天 1：月 2：年
        "0": "天",
        "1": "月",
        "2": "年",
      }
    };
  },
  created () {

  },
  mounted () {

  },
  methods: {
    toUse (item) {
      this.$trackEvents.B000A494(() => { }, { FROM_ID: item.prdIndexId });
      if (
        (this.$store.state.APP_FLAG === "BC" && this.$hasVersion("3.3.9"))
        || (this.$store.state.APP_FLAG === "PC" && this.$hasVersion("1.3.9"))
      ) {
        let data = { H5_URL: `${linkprdDetail(item.prdTypeId)}?ID=${item.prdIndexId}&RATE_ID=${item.rateId}&ORG_ID=${item.orgId}&MEM_COUPON_ID=${this.memCouponId}&_k=1` }
        // this.$bcBridge.gotoPrdDetailH5Page(data);
        this.$openWebview(data.H5_URL);
      } else {
        let data = { "LINK_TO": "PRD_DETAIL", "PRD_TYPE": "1", "PRD_ID": item.prdIndexId, "RATEID": item.rateId, "COUPON_ID": this.couponId, "MEM_COUPON_ID": this.memCouponId }
        this.$bcBridge.toAppPage(data)
        // this.$showTips("当前版本过低，请升级App版本");
      }
    }
  }
};
</script>

<style scoped lang="less">
.p-card {
  padding: 34px 10px 14px 0;
  min-height: 200px;
  &:not(:last-of-type) {
    border-bottom: 1px solid #e8eaed;
  }
  .p-title {
    font-size: 28px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 600;
    color: rgba(48, 49, 51, 1);
    .omit;
  }
  .p-describe {
    display: flex;
    .p-l {
      flex: 1;
      border-right: 1px solid #e8eaed;
      margin-top: 28px;
    }
    .p-r {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: start;
      justify-content: flex-end;
      padding-left: 20px;
      font-family: PingFangSC-Medium, PingFang SC;
      p:first-of-type {
        font-size: 32px;
        font-weight: 600;
        color: rgba(96, 98, 102, 1);
      }
      p:last-of-type {
        font-size: 24px;
        font-weight: 300;
        color: rgba(96, 98, 102, 1);
        span {
          display: inline-block;
          margin-right: 14px;
        }
      }
    }
  }
}
.omit {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}
</style>
