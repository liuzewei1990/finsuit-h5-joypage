<!-- 领券列表-券组件（包含产品信息） -->
<template>
  <section class='coupon-component'>
    <!-- 券 -->
    <div class="coupon-item">
      <div class="inner">
        <div class="coupon-money">
          <p class="money" v-show="coupon.couponType=='1'"><i class="t">￥</i><i class="n">{{coupon.couponAmount}}</i></p>
          <p class="coupon" v-show="coupon.couponType=='2'"><i class="n">{{coupon.couponRate}}</i><i class="t">%</i></p>
          <span class="ellipsis" v-show="coupon.couponStartAmount">满{{coupon.couponStartAmount}}元可用</span>
        </div>

        <div class="line">
          <div class="line-arc-top"></div>
          <div class="line-arc-bottom"></div>
        </div>

        <div class="coupon-info">
          <p class="ellipsis1">{{coupon.couponName}}</p>
          <span class="ellipsis1">有效期：{{coupon.couponStartTime}}-{{coupon.couponEndTime}}</span>
        </div>

        <!-- 已领取的章-->
        <div class="zhang" v-show="coupon.couponStatus === '2'"></div>
      </div>

      <a href="javascript:void(0);" class="coupon-btn" @click="onClickBtn">
        <!-- <span>立<br />即<br />领<br />取</span> -->
        <span>{{status}}</span>
      </a>

      <!-- disabled 遮罩 -->
      <div class="disabled" v-show="disabled"></div>
    </div>
    <!-- 产品 -->
    <div class="prd-item" v-if="showPrd" @click="onClickPrd">
      <div class="top">
        <h6 class="ellipsis">{{coupon.orgName}}|{{coupon.prdName}}</h6>
        <div class="tags" v-show="coupon.prdTags.length>0">
          <span class="tag" v-for="(item,index) in coupon.prdTags" :key="index">{{item}}</span>
        </div>
      </div>
      <div class="bottom">
        <div class="rate">
          <p>{{coupon.prdRate}}%</p>
          <span>{{coupon.prdRateText}}</span>
        </div>
        <div class="info">
          <p>{{coupon.itemValue1}}</p>
          <span>{{coupon.itemValue2}}元起投</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

export default {
  props: {
    coupon: {
      type: Object,
      default: () => { return {} }
    },
    showPrd: Boolean,
    status: String
  },
  computed: {
    disabled () {
      // 如果券状态已使用
      if (this.coupon.couponStatus === "3")
        return true;
      // 如果圈状态已领取 并且 没有配置产品(没有产品id)
      else if (this.coupon.couponStatus === "2" && Boolean(this.coupon.prdId) === false)
        return true;
      else
        return false
    }
  },
  components: {},
  data () {
    return {

    };
  },
  created () {

  },
  mounted () {

  },
  //方法集合
  methods: {
    onClickBtn () {
      this.$emit('on-click-btn');
    },

    onClickPrd () {
      this.$emit('on-click-prd');
    }
  },
}
</script>
<style lang='less' scoped>
.coupon-component {
  background: #fff;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 20px;

  /* 优惠券开始 */
  .coupon-item {
    position: relative;
    padding: 15px;
    box-sizing: border-box;
    border-radius: 16px;
    background: linear-gradient(to right, #ff7500 -30%, #ff2300);
  }
  .inner {
    position: relative;
    overflow: hidden;
    background: #fff;
    border-radius: 16px;
    min-height: 188px;
    display: flex;
    align-items: center;
    padding: 20px 0;
    box-sizing: border-box;
  }

  .disabled {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.5);
  }

  .zhang {
    width: 92px;
    height: 92px;
    border-radius: 500px;
    position: absolute;
    right: 100px;
    bottom: -20px;
    z-index: 2;
    background: url(../../assets/images/zhang.png) no-repeat;
    background-size: 100%;
  }

  .coupon-money {
    width: 203px;
    text-align: center;
    display: flex;
    flex-direction: column;
    p {
      color: #ff421d;
      font-weight: bold;
      .n {
        font-family: "has_buy";
        font-size: 80px;
        position: relative;
      }
    }
    .money {
      position: relative;
      left: -10px;
      .t {
        font-size: 35px;
        position: relative;
        top: -25px;
        left: 0px;
      }
    }
    .coupon {
      position: relative;
      left: 5px;
      .t {
        font-size: 35px;
        position: relative;
        top: -25px;
        right: 0px;
      }
    }

    span {
      font-size: 22px;
      color: #ff421d;
      //   line-height: 40px;
    }
  }

  .coupon-info {
    width: 310px;
    padding-left: 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    p {
      font-size: 26px;
      color: #000;
    }
    span {
      margin-top: 10px;
      font-size: 20px;
      color: #999;
    }
  }

  .coupon-btn {
    width: 120px;
    height: 100%;
    background: url(../../assets/images/coupon-btn-icon.png) no-repeat;
    background-size: 100% 100%;
    position: absolute;
    top: 0;
    right: 0;
    // writing-mode: lr-tb;
    font-size: 28px;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    span {
      display: block;
      width: 30px;
      margin-left: 20px;
      line-height: 35px;
    }
  }

  /* 线边圆大小 */
  @lineArc: 20px;

  .line {
    position: absolute;
    left: 203px;
    top: 0;
    height: 100%;

    &::before {
      content: "";
      display: block;
      height: 70%;
      width: 0px;
      border-right: 2px dashed #ff441d;
      position: absolute;
      top: 15%;
    }

    .line-arc-top::before,
    .line-arc-bottom::before {
      position: absolute;
      content: "";
      left: -@lineArc / 2;
      width: @lineArc;
      padding: @lineArc / 2 0;
      border-radius: 50%;
      box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.12) inset;
      background-color: #ff441d;
    }
    .line-arc-top::before {
      top: -@lineArc / 2;
    }
    .line-arc-bottom::before {
      bottom: -@lineArc / 2;
    }
    .line-arc-top::after,
    .line-arc-bottom::after {
      position: absolute;
      left: -@lineArc / 2;
      content: "";
      width: @lineArc;
      height: @lineArc / 2;
      background-color: #ff441d;
    }
    .line-arc-top::after {
      top: -@lineArc / 2;
    }
    .line-arc-bottom::after {
      bottom: -@lineArc / 2;
    }

    .line-inner {
      &::after,
      &::before {
        content: "";
        display: block;
        width: @lineArc;
        height: @lineArc / 2;
        position: absolute;
        left: -25px;
        background: red;
        z-index: 2;
      }
      &::after {
        top: -75px;
      }
      &::before {
        bottom: -60px;
      }
    }
  }

  /* 优惠券结束 */

  /* 产品开始 */
  .prd-item {
    min-height: 204px;
    background: #f5f5f5;
    margin-top: 10px;
    border-radius: 16px;
    padding: 20px 20px 20px 40px;
    box-sizing: border-box;

    .top {
      display: flex;
      align-items: top;
      h6 {
        // max-width: 290px;
        // flex: 1;
        font-size: 28px;
        color: #333;
        margin-right: 30px;
        margin-top: 2px;
      }
      .tags {
        // flex: 1;
        // max-width: 270px;
        display: flex;
        flex-wrap: nowrap;
      }
      .tag {
        color: #ff421d;
        font-size: 20px;
        background: rgba(255, 66, 29, 0.2);
        padding: 2px 5px;
        box-sizing: border-box;
        margin: 5px;
        white-space: nowrap;
      }
    }

    .bottom {
      display: flex;
      align-items: center;
      margin-top: 20px;
      .rate {
        width: 240px;
        border-right: 1px solid #ddd;
        p {
          font-weight: bold;
          font-size: 40px;
          color: #333;
        }
        span {
          font-size: 22px;
          color: #999;
        }
      }
      .info {
        overflow: hidden;
        flex: 1;
        text-align: center;
        p {
          font-size: 22px;
          color: #333;
          margin: 15px 0 10px;
        }
        span {
          font-size: 22px;
          color: #333;
        }
      }
    }
  }
  /*  产品结束 */
}
</style>