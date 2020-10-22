<template>
  <!-- 利率+加息 -->
  <div class="content">

    <p class="rate" :class="rateData.type" v-if="rateData">
      <!-- 利率模版 -->
      <!-- 登录前展示央行基准利率上浮30%， 登陆后展示2.7300%或者央行基准利率上浮30%； -->
      <template>
        <span class="ellipsis">
          <span class="v1 ellipsis">{{rateData.prdRate | rateToFixed}}</span><span class="u1" v-if="rateData.prdRateUnit">{{rateData.prdRateUnit}}</span>
        </span>
      </template>

      <!-- 加息模版 +4% -->
      <template>
        <span class="ellipsis" v-if="rateData.couponRate">
          <span class="symbol" v-if="rateData.symbol">{{rateData.symbol}}</span><span class="v2 ellipsis">{{rateData.couponRate}}</span><span class="u2" v-if="rateData.couponRateUnit">{{rateData.couponRateUnit}}</span>
        </span>
      </template>

      <!-- 产品名称 -->
      <span class="prd-name ellipsis">{{prdName}}</span>
    </p>
    <span class="desc">{{prdRateText}}</span>
  </div>
</template>

<script>
export default {
  props: {
    rateData: {
      default: () => { return {} }
    },
    prdRateText: {
      default: ""
    },
    prdName: {
      default: ""
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  //   text-align: center;
  .rate-text {
    color: #ff9700;
    font-size: 40px;
    margin-top: 15px;
    height: 90px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .prd-name {
    flex: 1;
    text-align: right;
    font-size: 28px;
    color: #979797;
    padding-left: 10px;
    box-sizing: border-box;
  }

  .rate {
    width: 500px;
    color: #ff9700;
    // height: 90px;
    display: flex;
    align-items: center;
    // justify-content: center;
    .symbol {
      margin: 0 10px;
    }
  }

  .利率_利率 {
    .v1 {
      font-family: has_buy;
      font-size: 55px;
    }
    .u1 {
      font-size: 35px;
      position: relative;
      bottom: 2px;
      font-family: has_buy;
    }
    .symbol {
      color: #ff9700;
      position: relative;
      bottom: 5px;
      font-family: has_buy;
      font-size: 55px;
    }
    .v2 {
      color: #ff9700;
      font-family: has_buy;
      font-size: 55px;
    }
    .u2 {
      color: #ff9700;
      font-size: 35px;
      margin-top: 10px;
      font-family: has_buy;
    }
  }

  .利率_红包 {
    .v1 {
      font-family: has_buy;
      font-size: 55px;
    }
    .u1 {
      font-size: 35px;
      position: relative;
      bottom: 2px;
      font-family: has_buy;
    }
    .symbol {
      color: #ff9700;
      position: relative;
      bottom: 5px;
      font-family: has_buy;
      font-size: 55px;
    }
    .v2 {
      color: #ff9700;
      font-family: has_buy;
      font-size: 55px;
    }
    .u2 {
      color: #ff9700;
      font-size: 30px;
      font-family: has_buy;
      position: relative;
      bottom: 2px;
    }
  }

  .利率_文案 {
    .v1 {
      font-family: has_buy;
      font-size: 55px;
    }
    .u1 {
      font-size: 35px;
      position: relative;
      bottom: 2px;
      font-family: has_buy;
    }
    .symbol {
      color: #ff9700;
      margin-bottom: 10px;
      font-family: has_buy;
      font-size: 55px;
    }
    .v2 {
      color: #ff9700;
      font-size: 30px;
      position: relative;
      bottom: 03px;
    }
    .u2 {
    }
  }

  .利率 {
    .v1 {
      font-family: has_buy;
      font-size: 55px;
    }
    .u1 {
      font-size: 35px;
      position: relative;
      bottom: 2px;
      font-family: has_buy;
    }
  }

  .文案_利率 {
    .v1 {
      font-size: 40px;
      //位置纠正
      position: relative;
      top: -4px;
    }

    .symbol {
      color: #ff9700;
      font-family: has_buy;
      font-size: 50px;
      position: relative;
      top: -3px;
    }
    .v2 {
      color: #ff9700;
      font-family: has_buy;
      font-size: 60px;
      position: relative;
      top: 0px;
    }
    .u2 {
      color: #ff9700;
      font-size: 40px;
      font-family: has_buy;
      position: relative;
      bottom: 2px;
    }
  }

  .文案_红包 {
    .v1 {
      font-size: 40px;
      //位置纠正
      position: relative;
      top: -4px;
    }

    .symbol {
      color: #ff9700;
      font-family: has_buy;
      font-size: 50px;
      position: relative;
      top: -3px;
    }
    .v2 {
      color: #ff9700;
      font-family: has_buy;
      font-size: 60px;
      position: relative;
      top: 0px;
    }
    .u2 {
      color: #ff9700;
      font-size: 40px;
      font-family: has_buy;
      position: relative;
      bottom: 2px;
    }
  }

  .文案_文案 {
    .v1 {
      font-size: 40px;
      //位置纠正
      position: relative;
      top: -4px;
    }
    .u1 {
    }
    .symbol {
      color: #ff9700;
      font-family: has_buy;
      font-size: 50px;
      position: relative;
      top: -3px;
    }
    .v2 {
      font-size: 40px;
      //位置纠正
      position: relative;
      //   top: -4px;
    }
    .u2 {
    }
  }

  .文案 {
    .v1 {
      font-size: 40px;
    }
    .u1 {
    }
    .symbol {
    }
    .v2 {
    }
    .u2 {
    }
  }

  .desc {
    color: #ff9700;
    font-size: 25px;
  }
}
</style>
