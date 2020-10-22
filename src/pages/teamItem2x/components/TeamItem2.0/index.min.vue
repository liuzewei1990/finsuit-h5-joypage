<template>
  <div class="alone-producd-min">
    <div class="boxList">
      <section class="sectionLeft">

        <!-- 标题+产品 -->
        <p class="productName">
          {{item.orgName}} <span v-show="item.orgName && item.prdName">|</span> {{item.prdName}}
        </p>

        <!-- 利率+加息 -->
        <RateTemplate align="left" :rateData="$handlePrdRate.handleTeamRateAndCouponRate('',item.pedRate,item.couponRate)" :prdRateText="item.prdRateText"></RateTemplate>
      </section>

      <!-- btn按钮 -->
      <section class="sectionRight">
        <Button class="btn" :showLoading="false" type="default" :disabled="false" v-if="item.teamStatus == '1' && item.isRemind == '0'" @click.native.stop="$checkLogin({action:handleClickReminBtn,data:item})">{{btnText[$store.state.APP_FLAG] || '立即预约'}}</Button>
        <Button class="btn" :showLoading="false" type="default" :disabled="false" v-if="item.teamStatus == '1' && item.isRemind == '1'">预约成功</Button>
        <Button class="btn" :showLoading="false" type="default" :disabled="false" v-if="item.teamStatus == '2'">立即拼团</Button>
        <div class="status-icon status-icon-fail" v-if="item.teamStatus == '3'"></div>
        <div class="status-icon status-icon-success" v-if="item.teamStatus == '4'"></div>
        <Button class="btn" :showLoading="false" type="default" :disabled="true" v-if="!item.teamStatus">已过期</Button>
      </section>
    </div>

    <!-- 标签 -->
    <div class="tags">
      <span v-for="(item,index) in item.tags" :key="index" v-show="item">{{item}}</span>
    </div>

    <!-- 拼团进度条 -->
    <div class="progress-bar-box">
      <progress-bar type="success" v-if="item.teamStatus != '1'" :value="item.teamSchedule" :max="100" :haveAcount="true" :acount="acountText"></progress-bar>
    </div>
  </div>
</template>

<script>
import Button from "@common/finsuit-components/Button"
import RateTemplate from "@common/finsuit-components/RateTemplate"
import ProgressBar from "./ProgressBar.vue"
export default {
  components: { Button, RateTemplate, ProgressBar },
  props: {
    item: {
      type: Object,
      default: () => {
        return {
          // 拼团状态 团展示状态 1-即将开始 2-立即拼团 3-拼团失败 4-拼团成功
          teamStatus: "1",
          // 是否开启开团提醒 预约提醒状态 0-不提醒 1-提醒
          isRemind: "0",
          // 银行名称
          orgName: "梅州客商银行",
          // 产品名称
          prdName: "周周利1号",
          // 利率
          pedRate: "0.000",
          // 加息
          couponRate: "0",
          // 利率描述
          prdRateText: "产品储蓄利率+平台奖励",
          // 标签
          tags: ["零花钱", "灵活支取", "灵活赎回", "1000元起投"],
          // 团进度
          teamSchedule: "20",
          // 剩余金额
          collagedAmount: "0万元",
          // 总金额
          totalAmount: "0万元"
        }
      }
    }
  },
  computed: {
    // 拼团进度条 - 剩余金额
    acountText () {
      if (this.item.teamStatus == "2") {
        return "剩余: " + this.$utils.toStrType(this.item.collagedAmount);
      } else if (this.item.teamStatus == "1" || this.item.teamStatus == "3" || this.item.teamStatus == "4") {
        return "总金额: " + this.$utils.toStrType(this.item.totalAmount);
      } else {
        return "";
      }
    }
  },
  data () {
    return {
      // 预约按钮文案
      btnText: {
        "PC": "开团提醒",
        "BC": "开团提醒",
        "PMP": "即将开始"
      }
    };
  },
  created () {

  },
  mounted () {

  },
  methods: {
    // 点击立即预约
    handleClickReminBtn (item) {
      this.$emit("reminBtn", item);
    },

    // 拼团产品倒计时结束后
    countdownOver () {
      this.$emit("countdownOver");
    }
  }
};
</script>

<style scoped lang="less">
.alone-producd-min {
  min-height: 250px;
  box-shadow: 0px 0px 32px 0px rgba(235, 239, 245, 1);
  border-radius: 16px;
  overflow: hidden;
  box-sizing: border-box;
  padding: 24px 24px 20px;
  background: #fff;
  .boxList {
    display: flex;
  }
  .sectionLeft {
    flex: 1;
    .productName {
      color: #303133;
      font-size: 26px;
      text-align: left;
    }
  }
  .sectionRight {
    width: 200px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-family: PingFangSC-Regular, PingFang SC;
    .btn {
      background: linear-gradient(to bottom, #477dff, #508cee);
      box-shadow: 0px 2px 8px 0px rgba(52, 115, 218, 0.31);
      // background: #fc4e2b;
      color: #fff;
      border-radius: 500px;
      // 不加block载ios 10中文字会不居中
      display: block;
      line-height: 76px;
      font-size: 32px;
      font-weight: normal;
    }

    .status-icon {
      width: 120px;
      height: 120px;
      // margin: 20px;
      background-size: 100%;
      background-repeat: no-repeat;
    }

    .status-icon-success {
      background-image: url(./home_yz_cg-1.png);
    }

    .status-icon-fail {
      background-image: url(./home_yz_sb-1.png);
    }
  }
  .tags {
    display: flex;
    opacity: 0.8;
    margin: 10px 0;
    span {
      font-size: 22px;
      border: 1.5px solid #e75d22;
      color: #e75d22;
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0px 10px;
      margin: 0 5px;
    }
  }

  .progress-bar-box {
  }
}
</style>
