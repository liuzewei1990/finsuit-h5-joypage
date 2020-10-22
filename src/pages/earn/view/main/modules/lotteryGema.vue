<template>
  <ModuleBox v-if="ROCK_AWARD_HIDE==1" class="module-lotteryGema" v-show="isInit" showTitle title="抽奖" type="orange">
    <div class="container">
      <!-- 大转盘 -->
      <Turnplate @on-click="btnClick" :pointerbg="pointerbg" v-if="isInit" @gameOver="gameOver" :gameCoverImg="gameCoverImg" ref="Turnplate"></Turnplate>
      <!-- 详情 -->
      <div class="info-box">
        <p class="nums">当前抽奖次数：{{numberOf}}</p>
        <p class="desc">每邀请{{REGIST_COUNT}}人实名即可获得一次抽奖机会哦~</p>
        <a class="btn" href="javascript:void(0);" @click="toMyPrize">我的权益</a>
      </div>
    </div>
  </ModuleBox>
</template>

<script>
import ModuleBox from "@earn/components/ModuleBox/index.vue"
// import Turnplate from "@earn/components/Turnplate/index.vue"
const Turnplate = () => import(/* webpackChunkName: "Turnplate" */ "@earn/components/Turnplate/index.vue");
export default {
  components: { ModuleBox, Turnplate },
  data () {
    return {
      // 中奖索引下标
      index: 0,
      // 是否加载转盘组件
      isInit: false,
      // 奖品列表
      lotteryList: 0,
      gameCoverImg: "",
      //   剩余抽奖次数
      numberOf: "",
      noclick: true,
      //   中奖数据
      hasGetaward: {},
      // 按钮背景
      pointerbg: "",
      //转盘是否隐藏 0隐藏  1显示
      ROCK_AWARD_HIDE: 0,
    }
  },

  mounted () {
    this.renderData();
  },

  methods: {
    async renderData () {
      let params = {};
      let data = await this.$api.getRockRewards();
      this.lotteryList = data.GET_ROCK_REWARDS;
      this.numberOf = data.REMAINING_ROCK_NUM;
      this.pointerbg = data.REMAINING_ROCK_NUM == 0 ? "gray" : "light";
      this.REGIST_COUNT = data.REGIST_COUNT;
      this.ROCK_AWARD_HIDE = data.ROCK_AWARD_HIDE;
      this.gameImgLoad(data.ROCK_PIC);
      console.log(this.lotteryList);
    },

    toMyPrize () {
      this.$trackEvents.ACB0K018();
      let url = "";
      url = window.location.href.split("#")[0];
      url += `#/myPrize`;
      url += `?ACTITY_ID=${this.$store.state.ACTITY_ID}`;
      this.$bcBridge.openWebview(url);
    },
    async btnClick () {
      if (!this.noclick) {
        return;
      }
      if (this.numberOf == 0) {
        this.$Toast("您的抽奖次数已用完")
        return;
      }
      this.$trackEvents.ACB0K016();
      let params = {
        INVITE_ID: this.$store.state.ID, // 邀请人id
        TASK_TYPE: "5"
      };
      this.noclick = false;
      try {
        let data = await this.$api.getReward(params);
        this.index = (data.INDEX - 0);
        this.hasGetaward = data;
        this.gameGoto(this.index);
      } catch (error) {
        this.noclick = true;
      }
    },

    // 转盘图片加载
    gameImgLoad (url) {
      let img = new Image();
      img.onload = () => {
        this.isInit = true;
        this.gameCoverImg = img.src;
      }
      img.onerror = () => {
        this.$Toast("转盘加载出错，请重试");
      }
      //   img.src = "https://finsuit-test.oss-cn-beijing.aliyuncs.com/CJ/1fb6ee70-023e-4742-b94f-c78904ca0422.png";
      img.src = this.$Config.aliyuncHost + url;
    },

    // 中奖后，转动到指定奖品位置
    gameGoto (index) {
      if (typeof index !== "number") {
        this.$Toast("抽奖出错,请稍候再试");
        return;
      }
      // 中奖后，计算转盘准备停止的目标角度
      var angles = index * (360 / this.lotteryList);

      // 开始转动转盘到指定的角度
      this.$refs["Turnplate"].goto(angles);
    },

    // 转盘结束
    gameOver () {
      this.renderData();
      //   this.$Toast(this.lotteryList[this.index].NAME);
      let type = this.hasGetaward.AWARD_TYPE;  // 1：红包；2：优惠券  3：爱奇艺兑换码  4现金券
      let award = this.hasGetaward.AWARD;
      let contentDesc = "";
      if (this.$store.state.APP_FLAG == "PMP") {
        contentDesc = "请下载比财APP查看/使用";
      } else {
        contentDesc = this.$store.state.APP_FLAG == "PC" && this.$browser.OS == "IOS" ? "请到我的账户中查看" : "请到我的红包查看";
      }
      if (type == 1) {
        let dialogComponent = this.$CommonDialog({
          componentName: "Coupon",
          appendElement: document.getElementById("page"),
          title: "现金红包",
          content: award + "元现金红包",
          contentStatus: "已发放",
          contentDesc: contentDesc,
          isCoupon: false // 是否为加息券
        })
      } else if (type == 2 || type == 4) {
        let dialogComponent = this.$CommonDialog({
          componentName: "Coupon",
          appendElement: document.getElementById("page"),
          title: "福利券",
          content: type == 2 ? award + "%加息券" : award + "现金券",
          contentStatus: "已发放",
          contentDesc: contentDesc,
          isCoupon: true // 是否为加息券
        })
      } else if (type == 3) {
        let dialogComponent = this.$CommonDialog({
          componentName: "MembershipCard",
          appendElement: document.getElementById("page"),
          title: "会员卡",
          content: "爱奇艺会员卡",
          exchangeCode: award,
          copyCallBack: () => {
            this.$trackEvents.ACB0K022();
            this.$Toast("复制成功");
            // dialogComponent.close()
          }
        })
      }
      this.noclick = true;
    }
  }
}
</script>

<style lang="less" scoped>
.info-box {
  text-align: center;
  .nums {
    color: #333;
    font-size: 25px;
    font-weight: bold;
  }

  .desc {
    color: #b5b5b5;
    font-size: 22px;
    margin-top: 10px;
  }

  .btn {
    display: inline-block;
    color: #fc8f10;
    border: 1.5px solid #fc8f10;
    border-radius: 500px;
    font-size: 26px;
    padding: 0 20px;
    margin: 31px 0;
  }
}
</style>
