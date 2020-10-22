<!-- 活动规则 -->
<template>
  <div class="wap">
    <ul class="rules">
      <li v-for="(t,k) in data" :key="k">{{t}}</li>
    </ul>

    <div class="content"></div>

    <div class="bottom">
      <div class="bottom1"></div>
      <div class="bottom2"></div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      data: [
        "1、活动时间：2020年3月17日~2020年3月31日；",
        "2、活动期间，仅限新用户参与购买本活动页内产品领口罩。在本平台产生过任何其他购买行为的用户都将无法参与本活动；",
        "3、成功参与活动的用户可获得5个一次性口罩（以实物为准），无须支付邮费。奖品每日数量有限，先到先得。参与活动，建议在30分钟内完成购买并填写收货地址；",
        "4、购买产品参与活动需满足单笔满100元且持有5天无支取，奖品则给予发放。若购买订单有未满足金额、未满足持仓期限、5日内填未写收货地址任一情况，则无法领取奖品；",
        "5、本平台不提供收货地址更换服务，收货地址一旦提交，将按照所填地址发放奖品，请认真确认收货地址。受疫情影响，奖品到货时间以实际为准；",
        "6、奖品发放为普通寄件，收货地址限中国境内。满足活动规则的订单，请在活动页内了解奖品发放状态。发货后可在活动页面查看物流单号，自行查询物流动态。对物流信息如有疑问可以，可自行联系对应物流公司客服；",
        "7成功购买本活动页内产品，可至【资产】了解收益详情；",
        "8、同一个比财/拼财账号、手机号、身份证、手机终端，符合以上任一条件，均视为同一用户。"
      ]
    };
  },
  mounted () {
    let pageHeight = window.innerHeight + "px";
    document
      .getElementsByClassName("rules")[0]
      .style.setProperty("min-height", pageHeight);
  },
  //方法集合
  methods: {}
};
</script>
<style lang='less' scoped>
.wap {
  height: 100%;
  background: linear-gradient(
    0deg,
    rgba(11, 161, 245, 1) 0%,
    rgba(88, 112, 242, 1) 100%
  );
  position: relative;
  .rules {
    padding: 43px;
    font-size: 28px;
    line-height: 40px;
    box-sizing: border-box;
    color: rgba(255, 255, 255, 1);
  }
  .content {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-image: url("../../assets/images/8.png");
    background-size: 100% 100%;
    opacity: 0.2;
  }
}
.bottom {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 160px;
  display: flex;
  justify-content: space-between;

  .bottom1 {
    width: 50%;
    height: 100%;
    position: relative;
    background: url("../../assets/images/1.png"),
      url("../../assets/images/3.png"), url("../../assets/images/4.png"),
      url("../../assets/images/5.png");
    background-repeat: no-repeat;
    background-size: 60px 145px, 127px 115px, 107px 136px, 136px 121px;
    background-position: left bottom, left bottom, left bottom, left bottom;
  }
  .bottom2 {
    width: 50%;
    height: 100%;
    position: relative;
    background: url("../../assets/images/2.png"),
      url("../../assets/images/7.png"), url("../../assets/images/6.png");
    background-repeat: no-repeat;
    background-size: 142px 149px, 127px 115px, 113px 160px;
    background-position: 93% bottom, right bottom, right bottom;
  }
}
</style>