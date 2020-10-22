<!-- 个投 ui组件 -->
<template>
  <div class="alone-producd-max">
    <!-- 头部 -->
    <div class="top" v-show="item.labelText">
      <div class="stag">
        <p><span>{{item.labelText}}</span></p>
      </div>
    </div>

    <div class="item">
      <!-- 角标 -->

      <!-- 标题+产品 -->
      <div class="title">
        {{item.orgName}} <span v-show="item.orgName && item.prdName">|</span> {{item.prdName}}
      </div>

      <!-- 利率+加息 -->
      <RateTemplate :rateData="$handlePrdRate.handleRateAndCouponRate(item.prdRate,item.couponType,item.couponRate,item.couponAmount)" :prdRateText="item.prdRateText"></RateTemplate>

      <!-- 标签 -->
      <div class="tags">
        <span v-for="(item,index) in item.tags" :key="index">{{item}}</span>
      </div>

      <!-- 标签描述 -->
      <div class="tags-desc" v-show="item.tagText">
        {{item.tagText}}
      </div>

      <!-- btn按钮 -->
      <div class="footer">
        <Button class="btn" :showLoading="false" type="default" :disabled="false">安全购买</Button>
      </div>

    </div>
  </div>
</template>

<script>
import Button from "@common/finsuit-components/Button"
import RateTemplate from "@common/finsuit-components/RateTemplate"
import propsClass from "./index.class.js"
export default {
  components: { Button, RateTemplate },
  props: {
    item: {
      type: Object,
      default: () => { return propsClass }
    }
  },
  computed: {
    tags () {
      if (!this.item.LABEL_TEXT1) return [];
      return this.item.LABEL_TEXT1.split(",")
    }
  },
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {

  }

}
</script>

<style lang="less" scoped>
.alone-producd-max {
  //   overflow-y: hidden;
  //   min-height: 600px;
  position: relative;
  background: #fff;
  box-shadow: 0px 0px 32px 0px rgba(235, 239, 245, 1);
  border-radius: 16px;
}

.top {
  width: 95%;
  height: 90px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  font-size: 30px;
  .stag {
    margin-left: 10px;
    p {
      color: #fff;
      font-size: 24px;
      border-radius: 6px;
      height: 44px;
      transform: skew(-8deg);
      background: linear-gradient(90deg, #ff9c4c, #ff801a);
      text-align: center;
      line-height: 44px;
      display: inline-block;
      padding: 0 15px;
      span {
        transform: skew(8deg);
        display: inline-block;
        line-height: 47px;
      }
    }
  }
}

.item {
  border-radius: 14px;
  position: relative;
  display: flex;
  flex-direction: column;
}

.title {
  font-family: PingFangSC-Regular, PingFang SC;
  text-align: center;
  font-size: 30px;
  padding: 0 20px;
}

.tags {
  display: flex;
  justify-content: center;
  opacity: 0.8;
  margin: 20px 0;
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

.tags-desc {
  font-size: 22px;
  color: #999999;
  text-align: center;
}

.footer {
  padding: 20px 28px 41px;
  .btn {
    background: linear-gradient(to bottom, #477dff, #508cee);
    // background: #fc4e2b;
    color: #fff;
    border-radius: 500px;
    // 不加block载ios 10中文字会不居中
    display: block;
    line-height: 76px;
    font-size: 32px;
  }
}
</style>
