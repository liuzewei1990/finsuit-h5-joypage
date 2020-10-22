<!-- 首页banner模块 -->
<template>
  <div class='module-banner'>
    <a href="javascript:void(0);" class="rule-btn" @click="$router.push('/activityRule')"></a>
    <ScrollFixedEnd @scroll="isHidden=true" @scrollEnd="isHidden=false" :delay="500">
      <a href="javascript:void(0);" class="share-btn" :class="{'animeta-hidden':isHidden}" @click="showShare" v-show="$store.state.APP_FLAG==='PC' || $store.state.APP_FLAG==='BC'"></a>
    </ScrollFixedEnd>
  </div>
</template>

<script>
import ScrollFixedEnd from "@common/finsuit-components/ScrollFixedEnd"
export default {
  components: { ScrollFixedEnd },
  data () {
    return {
      isHidden: false,
      shareConfig: []
    };
  },
  created () {

  },
  mounted () {
    this.initShareConfig();
    this.$wxShare.registerShare(this.shareConfig);
  },
  //方法集合
  methods: {
    /**
     * 打开分享
     */
    showShare () {
      this.$root.$refs["SharePopup"].open(this.shareConfig, this.shareSuccess);
    },

    initShareConfig () {
      let btns = [{ SHARE_PLACE: "0" }, { SHARE_PLACE: "1" }]
      this.shareConfig = this.getShareConfig(btns);
    },

    /**
     * 分享成功回调
     */
    async shareSuccess (shareBtn) {
      // 没有登录不领取红包
      if (!this.$store.state.TOKEN) return;
      // 分享埋点
      this.$trackEvents.ACB0R015({ ITEM_VALUE: shareBtn.SHARE_TYPE, ITEM_VALUE1: shareBtn.SHARE_PLACE });

      let params = {
        ACTIVITY_CODE: this.$Config.actityCode,
        RWARD_CODE: "DRAW_COUPON_REWARD"
      };
      let data = await this.$api.getShareLottery(params);

      // 未开启
      if (data.IS_OPEN) return;

      if (data.AMOUNT != "0") {
        this.$CommonDialog({
          componentName: "LotteryMoney",
          appendElement: document.getElementById("page"),
          animation: true,
          value: `<span style="font-size:${this.$px2rem(40)};margin-bottom:${this.$px2rem(-15)};">￥</span><span>${data.AMOUNT}</span>`,
          title: "恭喜获得现金红包",
          desc: "请到我的账户中查看",
          descCallBack: () => { }
        })
      } else {
        this.$CommonDialog({
          componentName: "LotteryMoney",
          appendElement: document.getElementById("page"),
          animation: false,
          value: `未获得`,
          title: "请再接再厉",
          desc: "很遗憾本次分享您未获得奖励红包",
          descCallBack: () => { }
        })
      }
    },

    /**
     * 获取分享配置
     */
    getShareConfig (btns) {
      let shareLink = this.getShareLink();
      return btns.map(item => {
        // 分享方式 0:图片   1:链接  2: 小程序
        item["SHARE_TYPE"] = "1";
        // 分享渠道 0:分享给朋友  1:分享到朋友圈   2: QQ 3:QQ空间
        item["SHARE_PLACE"] = item.SHARE_PLACE;

        // 分享标题
        item["SHARE_TITLE"] = "他来了他来了，他带着超多福利，他来了~";
        // 分享描述
        item["SHARE_DESC"] = "1218理财节，超级福利提前抢，名额有限哦~";
        // 分享链接
        item["SHARE_URL"] = shareLink;
        // 分享IOCN或者图片
        item["SHARE_IMAGE"] = "";

        return item;
      })
    },

    /**
     * 获取分享链接
     */
    getShareLink () {
      let url;
      url = window.location.href.split("#")[0];
      url += `?a=1`;
      url += `#/`;
      // 活动id
      url += `?ACTITY_ID=${this.$store.state.ACTITY_ID}`;
      // 站外打开时来源APP_FLAG
      url += `&FROM_APP_FLAG=${this.$store.state.APP_FLAG || this.$store.state.FROM_APP_FLAG}`;
      return url;
    }
  },
}
</script>
<style lang='less' scoped>
.module-banner {
  height: 658px;
  background: url(../../../assets/images/banner.png) no-repeat;
  background-size: cover;
  //   position: relative;
  //   z-index: 0;

  .rule-btn {
    width: 86px;
    height: 49px;
    background: url(../../../assets/images/rule-icon.png) no-repeat;
    background-size: 100%;
    position: absolute;
    right: 0;
    top: 20px;
  }

  .share-btn {
    width: 90px;
    height: 83px;
    background: url(../../../assets/images/share-icon.png) no-repeat;
    background-size: 100%;
    position: fixed;
    z-index: 10;
    left: 627px;
    top: 379px;
    transition: all 0.3s ease-in-out;
    transform: translateX(0%);
  }

  .animeta-hidden {
    transform: translateX(75px);
  }
}
</style>