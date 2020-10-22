<template>
  <section class="detail-products" v-show="list.length">

    <div class="title">推荐产品</div>
    <div class="list-container">
      <div class="list-item" v-for="(item,index) in list" :key="index">
        <div class="prd-box">

          <!-- 产品名称 -->
          <div class="prd">
            <div class="prd-icon">
              <img :src="$transfromAliyunUrl(item.prdHeader)" alt="">
            </div>
            <div class="prd-info">
              <p class="prd-name">{{item.prdName}}</p>
              <p class="prd-bank">{{item.prdBankName}}</p>
            </div>
          </div>

          <!-- 产品利率 -->
          <div class="rate">
            <div class="rate-t"></div>
            <div class="rate-l">
              <p class="ellipsis">{{item.itemValue1}}</p>
              <span class="ellipsis">{{item.itemValue2}}</span>
            </div>
            <div class="rate-r">
              <p class="ellipsis">{{item.itemValue3}}</p>
              <span class="ellipsis">{{item.itemValue4}}</span>
            </div>
          </div>

        </div>

        <div class="line">
          <div class="line-arc-top"></div>
          <div class="line-arc-bottom"></div>
        </div>

        <div class="btn-box">
          <p class="rate">{{item.prdRate}}%</p>
          <p class="rate-text">{{item.prdRateText}}</p>
          <a class="btn" href="javascript:void(0);" @click="$checkLogin({action:toAppPage,data:item})">查看详情</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import bus from "@common/finsuit-h5/libs/bus.js"
export default {
  components: {},
  data () {
    return {
      queryArticleData: JSON.parse(decodeURIComponent(this.$route.query["articleData"])),
      list: []
    }
  },
  created () {
    bus.$once("onProducts", this.renderData)
  },
  methods: {
    renderData (data) {
      this.list = data;
    },

    /**
     * 这里打开原生产品详情
     */
    toAppPage (item) {
      // api埋点
      this.$trackEvents.PCB000A058({ ITEM_VALUE: this.queryArticleData.articleId, ITEM_VALUE1: item.prdId });

      this.$bcBridge.toAppPage({
        LINK_TO: "PRD_DETAIL",
        PRD_TYPE: "1",
        PRD_ID: item.prdId,
        //"RATEID": '' //可选参数
      });
    }
  }
}
</script>

<style lang="less" scoped>
.detail-products {
  padding: 24px;
  box-sizing: border-box;
  .title {
    font-size: 32px;
    color: #527be0;
    font-weight: bold;
    line-height: 100px;
  }

  .list-container {
    .list-item {
      position: relative;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.12);
      border-radius: 15px;
      min-height: 204px;
      display: flex;
      align-items: center;
      padding: 20px;
      box-sizing: border-box;
      margin: 20px auto;
      //   overflow: hidden;
    }

    /* 产品区域 */
    .prd-box {
      flex: 1;
      display: flex;
      flex-direction: column;

      .prd {
        flex: 1;
        display: flex;
        align-items: center;
        padding: 5px 0;
      }

      .prd .prd-icon {
        width: 76px;
        height: 76px;
        border-radius: 10px;
        background: #eee;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .prd .prd-info {
        flex: 1;
        margin-left: 18px;
      }

      .prd .prd-info .prd-name {
        font-size: 32px;
        color: #333;
        font-weight: bold;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
      }

      .prd .prd-info .prd-bank {
        font-size: 22px;
        color: #999;
        margin-top: 5px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
      }
      .rate {
        flex: 1;
        display: flex;
        align-items: top;
        padding: 5px 0;
      }
      .rate .rate-t {
        width: 76px;
      }
      .rate .rate-l {
        width: 135px;
        margin-left: 18px;
      }

      .rate .rate-r {
        width: 150px;
      }

      .rate p {
        font-size: 28px;
        color: #527be0;
        line-height: 50px;
      }

      .rate span {
        display: block;
        font-size: 22px;
        color: #999;
      }
    }
    /* 按钮区域 */
    .btn-box {
      width: 230px;
      padding: 0 10px;
      text-align: center;

      .rate {
        font-size: 40px;
        color: #f65448;
        font-weight: bold;
      }

      .rate-text {
        font-size: 22px;
        color: #999;
        margin: 10px 0;
      }

      .btn {
        display: inline-block;
        margin: 0 auto;
        font-size: 28px;
        color: #fff;
        background: #527be0;
        border-radius: 500px;
        padding: 5px 30px;
      }
    }

    /* 线边圆大小 */
    @lineArc: 30px;

    .line {
      position: absolute;
      left: 430px;
      top: 0;
      height: 100%;

      &::before {
        content: "";
        display: block;
        height: 60%;
        width: 3px;
        background: #f3f3f3;
        position: absolute;
        top: 20%;
      }
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
      background-color: #fff;
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
      background-color: #fff;
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
}
</style>
