<!-- 产品 -->
<template>
  <section class='prd-item'>
    <div class="content">
      <div class="prd-name">
        <p class="ellipsis">{{item.orgName}}-{{item.prdName}}</p>
      </div>
      <div class="prd-box">
        <div class="rate">
          <p>{{item.rate}}%</p>
          <p class="ellipsis">{{item.rateText}}</p>
        </div>
        <div class="tags">
          <div class="center">
            <span v-show="item.drawTimeText">{{item.drawTimeText}}</span><span v-show="item.minAmount">{{item.minAmount}}元起投</span>
          </div>
        </div>
      </div>
    </div>
    <div class="btn"><span>立即购买</span></div>
  </section>
</template>

<script>

export default {
  props: {
    item: {
      type: Object,
      default: () => { return {} }
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

  },
}
</script>
<style lang='less' scoped>
.prd-item {
  margin: 30px auto;
  width: 607px;
  min-height: 204px;
  background: rgba(240, 243, 253, 1);
  box-shadow: 0px 4px 10px 0px #d0dbff;
  border-radius: 10px;
  display: flex;

  .content {
    height: 100%;
    width: 85%;
    padding: 30px;
    box-sizing: border-box;
  }

  .prd-name {
    p {
      font-size: 29px;
      font-family: Microsoft YaHei;
      font-weight: 600;
      color: rgba(40, 40, 40, 1);
      line-height: 52px;
    }
  }

  .prd-box {
    display: flex;
  }

  .rate {
    display: flex;
    flex-direction: column;
    width: 250px;
    p:nth-child(1) {
      font-size: 40px;
      font-weight: bold;
      color: rgba(43, 86, 241, 1);
      line-height: 71px;
      flex: 1;
    }
    p:nth-child(2) {
      font-size: 24px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
    }
  }

  .tags {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    .center {
      text-align: center;
      span {
        min-width: 100px;
        margin: 5px auto;
        display: inline-block;
        text-align: center;
        padding: 0px 10px;
        border: 1.5px solid rgba(73, 109, 242, 1);
        border-radius: 6px;
        font-size: 21px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(73, 109, 242, 1);
      }
    }
  }

  .btn {
    width: 15%;
    background: rgba(73, 109, 242, 1);
    border-radius: 0px 10px 10px 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    span {
      display: block;
      width: 30px;
      font-size: 29px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
      line-height: 43px;
    }
  }
}
</style>