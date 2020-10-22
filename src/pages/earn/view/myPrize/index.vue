<template>
  <div class="my-prize" id="page">
    <div class="prize-total" v-if="INVITE_FRIENDS.SHOW_FLAG==1">
      <div>
        <p class="havamoney">已获得金额</p>
        <p class="amount">{{INVITE_FRIENDS.AWARD_TOTAL_AMOUNT}}元</p>
      </div>
      <hr>
      <div>
        <p class="havamoney">冻结中金额</p>
        <p class="amount">{{INVITE_FRIENDS.FREEZE_TOTAL_AMOUNT}}元</p>
      </div>
    </div>
    <div class="prize-list" v-for="(item,index) in PRIZE_LIST" :key="index">
      <div class="prize-date">
        <span>{{item.GET_TIME}}</span>
        <span>{{item.PHONE_NUM}}</span>
      </div>
      <div class="prize-type">{{item.lastAWARD}}</div>
      <div class="prize-btn">
        <a @click="showAlert(item)" :class="{'a-send-free':item.AWARD_TYPE !='3','a-look':item.AWARD_TYPE =='3'}">{{ item.AWARD_TYPE =='3' ? '点击查看' : item.AWARD_FLAG=='0' ? '已发放' :item.AWARD_FLAG=='4' ? '冻结中':''}}</a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      PRIZE_LIST: [], // 奖励列表
      INVITE_FRIENDS: {}
    }
  },
  created () {
    this.renderData();
  },
  mounted () {
    this.$bcBridge.updateTitle("我的权益")
  },
  methods: {
    async renderData () {
      let params = {};
      let data = await this.$api.getMyPrizeList(params);
      this.PRIZE_LIST = data.PRIZE_LIST;
      this.INVITE_FRIENDS = data.INVITE_FRIENDS
      console.log("规则", data);
      this.PRIZE_LIST.forEach((ele, index) => {
        // 获得方式组合
        switch (ele.TYPE + "") {
          case "1":
            ele.PHONE_NUM = ele.PHONE_NUM + "首投";
            break;
          case "2":
            ele.PHONE_NUM = ele.PHONE_NUM + "实名";
            break;
          case "3":
            ele.PHONE_NUM = "抽奖";
            break;
          case "4":
            ele.PHONE_NUM = ele.PHONE_NUM + "开户";
            break;
          default:
            break;
        }
        //奖品组合
        switch (ele.AWARD_TYPE + "") {
          case "1":
            ele.lastAWARD = ele.AWARD + "元现金红包";
            break;
          case "2":
            ele.lastAWARD = ele.AWARD + "%加息券";
            break;
          case "3":
            ele.lastAWARD = "爱奇艺会员";
            break;
          case "4":
            ele.lastAWARD = ele.AWARD + "现金券";
            break;
          default:
            break;
        }
      })
    },
    showAlert (item) {
      this.$trackEvents.ACB0K021();
      let statusJson = {};
      if (this.$store.state.APP_FLAG == "PMP") {
        statusJson = {
          "0": {
            name: "已发放",
            desc: "请下载比财APP查看/使用"
          },
          "4": {
            name: "冻结中",
            desc: "请下载比财APP查看/使用"
          }
        }
      } else {
        statusJson = {
          "0": {
            name: "已发放",
            desc: this.$store.state.APP_FLAG == "PC" && this.$browser.OS == "IOS" ? "请到我的账户中查看" : "请到我的红包查看"
          },
          "4": {
            name: "冻结中",
            desc: "待好友投资后获得"
          }
        }
      }
      switch (item.AWARD_TYPE + "") {
        case "1":
          this.showAlert1(item, statusJson)
          break;
        case "2":
        case "4":
          this.showAlert2(item, statusJson)
          break;
        case "3":
          this.showAlert3(item, statusJson)
          break;
        default:
          this.$Toast("无奖励类型")
          break;
      }
    },
    showAlert1 (item, statusJson) {
      console.log(item)
      let dialogComponent = this.$CommonDialog({
        componentName: "Coupon",
        appendElement: document.getElementById("page"),
        title: "现金红包",
        desc: `好友${item.PHONE_NUM}获得`,
        content: item.lastAWARD,
        contentStatus: statusJson[item.AWARD_FLAG].name,
        contentDesc: statusJson[item.AWARD_FLAG].desc,
        isCoupon: false // 是否为加息券
      })
    },
    showAlert2 (item, statusJson) {
      let dialogComponent = this.$CommonDialog({
        componentName: "Coupon",
        appendElement: document.getElementById("page"),
        title: "福利券",
        desc: `好友${item.PHONE_NUM}获得`,
        content: item.lastAWARD,
        contentStatus: statusJson[item.AWARD_FLAG].name,
        contentDesc: statusJson[item.AWARD_FLAG].desc,
        isCoupon: true // 是否为加息券
      })
    },
    showAlert3 (item, statusJson) {
      let dialogComponent = this.$CommonDialog({
        componentName: "MembershipCard",
        appendElement: document.getElementById("page"),
        title: "会员卡",
        desc: "抽奖获得",
        content: "爱奇艺会员卡",
        exchangeCode: item.AWARD,
        copyCallBack: () => {
          this.$trackEvents.ACB0K022();
          this.$Toast("复制成功")
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.my-prize {
  background: #fff;
  min-height: 1334px;
  .prize-total {
    height: 154px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #dcdcdc;
    hr {
      height: 60px;
      width: 2.1px;
      background: #dcdcdc;
    }
    & > div {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
    .havamoney {
      font-size: 22px;
      color: #333333;
      //   font-weight: 600;
    }
    .amount {
      color: #eb4928;
      font-size: 50px;
      //   font-weight: bold;
    }
  }
  .prize-list {
    display: flex;
    height: 100px;
    padding: 0 20px;
    box-sizing: border-box;
    justify-items: center;
    align-items: center;
    border-bottom: 1px solid #dcdcdc;
    .prize-date {
      flex: 2;
      display: flex;
      flex-direction: column;
      span:first-of-type {
        font-size: 28px;
        color: #333333;
        font-weight: 400;
      }
      span:last-of-type {
        font-size: 22px;
        color: #b5b5b5;
      }
    }
    .prize-type {
      flex: 2;
      display: flex;
      justify-content: start;
      align-items: center;
      font-size: 28px;
      color: #333333;
      font-weight: 400;
    }
    .prize-btn {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .a-look {
        height: 52px;
        width: 100px;
        background: #eb5f48;
        color: #fff;
        font-size: 24px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        padding: 0px 5px;
      }
      .a-send-free {
        height: 52px;
        width: 100px;
        background: rgba(235, 95, 72, 0.1);
        color: rgba(235, 95, 72, 1);
        font-size: 24px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        padding: 0px 5px;
      }
    }
  }
}
</style>
