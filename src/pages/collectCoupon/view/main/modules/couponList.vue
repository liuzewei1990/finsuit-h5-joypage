<!-- 优惠券列表模块 -->
<template>
  <section class='module-couponList'>
    <CouponItem class="mar-bottom-30" @on-click-btn="$checkLogin({action:couponBtnClick,data:{coupon:item,index:index}})" @on-click-prd="$checkLogin({action:prdClick,data:{coupon:item,index:index}})" v-for="(item,index) in couponList" :key="index" :coupon="item" :showPrd="item.prdId" :status="couponStatus[item.couponStatus]"></CouponItem>
  </section>
</template>

<script>
import CouponItem from "../../../components/CouponItem"
export default {
  components: { CouponItem },
  data () {
    return {
      // 优惠券列表
      couponList: [],
      // 优惠券状态
      couponStatus: {
        "1": "立即领取",
        "2": "去使用",
        "3": "已使用"
      },
      btnLoading: this.$Loading()
    };
  },
  created () {
    this.renderData();
  },
  mounted () {
    // 购买完成后，返回到领券首页刷新数据
    this.$bus.$on("pageAppear", this.renderData);
  },
  //方法集合
  methods: {
    // api转换层
    transfromApiData (data) {
      return data.map(item => {
        let coupon = {};
        // 券id
        coupon["couponId"] = item.ID;
        // 券类型 ：现金券 | 加息券
        coupon["couponType"] = item.TYPE;
        // 券状态 ：待领取 | 已领取
        coupon["couponStatus"] = item.MEM_COUPON_STATUS;
        // 券名称
        coupon["couponName"] = item.NAME;
        // 定购券金额
        coupon["couponAmount"] = item.AMOUNT;
        // 加息券费率
        coupon["couponRate"] = item.RATE;
        // 券的起购金额
        coupon["couponStartAmount"] = item.AMOUNT_REST;
        // 券开始有效期
        coupon["couponStartTime"] = (item.START_TIME + "").split(" ")[0].replace(/-/g, ".");
        // 券结束有效期
        coupon["couponEndTime"] = (item.END_TIME + "").split(" ")[0].replace(/-/g, ".");

        let prdItem = item.PRD_LIST[0] || {};
        // 产品id
        coupon["prdId"] = prdItem.PRD_INDEX_ID;
        // 产品名称
        coupon["prdName"] = prdItem.PRD_NAME;
        // 机构名称
        coupon["orgName"] = prdItem.ORG_NAME;
        // 产品利率
        coupon["prdRate"] = prdItem.RATE;
        // 产品利率描述
        coupon["prdRateText"] = prdItem.RATE_TEXT;
        // 产品标签数组
        coupon["prdTags"] = this.handleTag(prdItem.PRD_LABEL);
        // 灵活存取
        coupon["itemValue1"] = prdItem.DRAW_TIME_TEXT;
        // 起购金额
        coupon["itemValue2"] = prdItem.MIN_AMOUNT;
        // READID
        coupon["rateId"] = prdItem.RATEID;

        return coupon;
      })
    },

    // 加载数据
    async renderData () {
      let params = {};
      this.couponList = await this.$api.getCouponList(params).then(data => this.transfromApiData(data));
    },

    /**
     * 券按钮点击
     */
    couponBtnClick (dataset) {
      let coupon = dataset.coupon;
      let index = dataset.index;

      // 券按钮埋点
      this.$trackEvents.ACB0R016({ ITEM_VALUE: coupon.couponId, ITEM_VALUE1: coupon.couponStatus, ITEM_VALUE2: coupon.prdId });

      // 立即领取
      if (coupon.couponStatus == "1") this.postCoupon(coupon, index);
      // 去使用
      if (coupon.couponStatus == "2") this.useCoupon(coupon, index);
    },

    // 立即领取
    async postCoupon (coupon, index) {
      if (this.btnLoading.isShow) return;
      this.btnLoading.show();
      try {
        let params = { COUPON_ID: coupon.couponId };
        let data = await this.$api.postUserCoupon(params);
        if (data.FLAG == "1") {
          this.$Toast(data.FLAG_TEXT);
          this.couponList[index].couponStatus = "2";
        } else {
          this.$Toast(data.FLAG_TEXT);
        }
        this.renderData();
      } catch (error) {
        this.$Toast("领取失败，请重试");
      }
      this.btnLoading.close();
    },

    // 去使用
    async useCoupon (coupon, index) {
      if (this.btnLoading.isShow) return;
      this.btnLoading.show();
      try {
        let params = { COUPON_ID: coupon.couponId };
        let data = await this.$api.getMemCouponId(params);
        if (data.MEM_COUPON_ID) {
          this.$bcBridge.toAppPage({
            LINK_TO: "PRD_DETAIL",
            PRD_TYPE: "1",
            PRD_ID: coupon.prdId,
            COUPON_ID: coupon.couponId,
            MEM_COUPON_ID: data.MEM_COUPON_ID,
            RATEID: coupon.rateId //可选参数
          });
        }
      } catch (error) {
        console.error(error);
      }
      this.btnLoading.close(1500);
    },

    /**
     * 点击产品
     */
    prdClick (dataset) {
      let coupon = dataset.coupon;
      let index = dataset.index;
      if (this.btnLoading.isShow) return;
      this.btnLoading.show();
      this.$bcBridge.toAppPage({
        LINK_TO: "PRD_DETAIL",
        PRD_TYPE: "1",
        PRD_ID: coupon.prdId,
        RATEID: coupon.rateId //可选参数
      });
      this.btnLoading.close(1500);
    },

    // 处理标签规则 标签规则：单行标签文字最多为10个 双标签文字每个最多为5个 tagStr:周期灵活的|自动扣账的
    handleTag (tagStr) {
      let maxNum = 5;
      let newTags = [];
      if (!tagStr) return newTags;
      let tags = (tagStr += "").split("|", 2);
      if (tags.length === 0) return newTags;
      let tag1 = tags[0];
      let tag2 = tags[1];
      // 第一个为超长标签 只显示一行 限制10个字
      if (tag1 && tag1.length > maxNum) {
        newTags.push(tag1.slice(0, 10));
      }
      //  如果两个标签相加长度大于10个
      else if ((tag1 + tag2).length > 10) {
        tag1 && newTags.push(tag1.slice(0, maxNum));
        tag2 && newTags.push(tag2.slice(0, maxNum));
      }
      // 正常
      else {
        newTags.push(tag1);
        newTags.push(tag2);
      }
      return newTags;
    },
  },
}
</script>
<style lang='less' scoped>
.module-couponList {
  position: relative;
  padding: 30px;
  box-sizing: border-box;
  margin-top: -200px;
  padding-bottom: 98px;
}
</style>