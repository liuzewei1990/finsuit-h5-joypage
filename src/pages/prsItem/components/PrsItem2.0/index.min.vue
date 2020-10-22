<template>
  <div class="alone-producd-min">
    <div class="boxList">
      <section class="sectionLeft">

        <!-- 标题+产品 -->
        <p class="productName">
          {{item.orgName}} <span v-show="item.orgName && item.prdName">|</span> {{item.prdName}}
        </p>

        <!-- 利率+加息 -->
        <RateTemplate align="left" :rateData="$handlePrdRate.handlePrdRateAndCouponType(item.prdRate,item.couponType,item.couponValue)" :prdRateText="item.prdRateText"></RateTemplate>
      </section>

      <!-- btn按钮 -->
      <section class="sectionRight">
        <Button class="btn" :showLoading="false" type="default" :disabled="false">立即拼团</Button>
      </section>
    </div>
    <!-- 标签 -->
    <div class="tags">
      <span v-for="(item,index) in item.tags" :key="index">{{item}}</span>
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

    };
  },
  created () {

  },
  mounted () {

  },
  methods: {

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
}
</style>
