<template>
  <!-- 利率+加息 -->
  <div class="content" :class="'a-'+align">
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
    align: {
      default: "center"
    }
  }
}
</script>

<style lang="less" scoped>
.a-left {
  text-align: left !important;
  .rate {
    justify-content: start !important;
  }
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  text-align: center;

  .rate {
    color: #3b6adc;
    margin: 10px 0;
    // height: 90px;
    display: flex;
    align-items: center;
    justify-content: center;
    .v1 {
      color: #477dff;
    }
    .u1 {
      color: #477dff;
    }

    .symbol {
      margin: 0 10px;
      color: #e75d22;
    }
    .v2 {
      color: #e75d22;
    }
    .u2 {
      color: #e75d22;
    }
  }
  .rate {
    .v1,
    .u1,
    .symbol,
    .v2,
    .u2 {
      font-family: HelveticaNeue-Bold, HelveticaNeue !important;
      font-weight: bold;
    }
  }

  .利率_利率 {
    .v1 {
      font-size: 64px;
    }
    .u1 {
      font-size: 30px;
      position: relative;
      bottom: 2px;
    }
    .symbol {
      position: relative;
      bottom: 5px;
      font-size: 50px;
    }
    .v2 {
      font-size: 64px;
    }
    .u2 {
      font-size: 30px;
      position: relative;
      bottom: 2px;
    }
  }

  .利率_红包 {
    .v1 {
      font-size: 64px;
    }
    .u1 {
      font-size: 30px;
      position: relative;
      bottom: 2px;
    }
    .symbol {
      position: relative;
      bottom: 5px;
      font-size: 50px;
    }
    .v2 {
      font-size: 64px;
    }
    .u2 {
      font-size: 30px;
      position: relative;
      bottom: 2px;
    }
  }

  .利率_文案 {
    .v1 {
      font-size: 64px;
    }
    .u1 {
      font-size: 30px;
    }
    .symbol {
      font-size: 50px;
    }
    .v2 {
      font-size: 48px;
    }
    .u2 {
      font-size: 30px;
    }
  }

  .利率 {
    .v1 {
      font-size: 64px;
    }
    .u1 {
      font-size: 30px;
      position: relative;
      bottom: 2px;
    }
  }

  .文案_利率 {
    .v1 {
      font-size: 48px;
    }

    .symbol {
      color: #ff9700;

      font-size: 50px;
      position: relative;
      top: -3px;
    }
    .v2 {
      color: #ff9700;

      font-size: 60px;
      position: relative;
      top: 0px;
    }
    .u2 {
      color: #ff9700;
      font-size: 40px;

      position: relative;
      bottom: 2px;
    }
  }

  .文案_红包 {
    .v1 {
      font-size: 40px;
      //位置纠正
      position: relative;
      top: 4px;
    }

    .symbol {
      position: relative;
      bottom: 5px;
      font-size: 50px;
    }
    .v2 {
      font-size: 64px;
    }
    .u2 {
      font-size: 30px;
      position: relative;
      bottom: 2px;
    }
  }

  .文案_文案 {
    .v1 {
      font-size: 40px;
    }
    .u1 {
    }
    .symbol {
      font-size: 50px;
      position: relative;
      top: -3px;
    }
    .v2 {
      font-size: 40px;
      //位置纠正
      position: relative;
      top: -4px;
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
    color: #606266;
    font-size: 24px;
  }
}
</style>
