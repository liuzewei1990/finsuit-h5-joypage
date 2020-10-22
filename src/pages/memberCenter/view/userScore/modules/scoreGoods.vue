<!-- 积分商品 -->
<template>
  <!-- 热门兑换 -->
  <section class="score-goods">
    <div class="panel-head">
      <p class="title ellipsis">热门兑换</p>
      <span class="desc" v-show="goods.length" @click="toMallUrl">积分商城<i class="icon"></i></span>
    </div>

    <div class="panel-body">
      <!-- 缺省屏 -->
      <EmptyData class="empty-data" v-show="emptyData" imgStyle="width:5.46rem;height:4.61rem;margin:0.5rem auto;" :imgUrl="require('../../../assets/images/is-empty.png')" text="<span style='font-size:0.35rem; color:#999;'>积分商城搭建中，敬请期待...</span>"></EmptyData>

      <!-- 列表容器 -->
      <div class="content">
        <div class="list">
          <Goods class="item" :isShowBrief='false' v-for="(item,i) in goods" :item="item" :key="i" @click.native="toUrl(item)">{{i}}</Goods>
        </div>
        <div class="loading" ref="loading"></div>
      </div>
    </div>
  </section>
</template>

<script>

import Goods from "../../../components/Goods"
import EmptyData from "@common/finsuit-components/EmptyData"
export default {
  components: { Goods, EmptyData },
  data () {
    return {
      emptyData: true,
      goods: [],
      loading1: this.$Loading({ iconClass: 'loading-svg-icon-1' })
    };
  },
  mounted () {
    this.renderData();
  },
  activated () {
  },
  //方法集合
  methods: {
    async renderData () {
      this.emptyData = false;
      this.loading1.show(this.$refs["loading"]);
      try {
        let params = {};
        let data = await this.$api.getScoreGoodsList(params);
        this.mallHomeUrl = data.integralMallUrl;
        // data.goodsList = [];
        this.goods = data.goodsList;
        this.emptyData = this.goods.length === 0;
      } catch (error) {
        console.error(error);
      }
      this.loading1.close();
    },

    // 跳转到商品详情页面
    toUrl (item) {
      // 打点
      this.$trackEvents.B000A477({ ITEM_VALUE: item.goodsName });
      this.$openWebview(item.integralMallDetailUrl);
    },

    // 跳转到商城
    toMallUrl () {
      // 打点
      this.$trackEvents.B000A475({});
      this.$openWebview(this.mallHomeUrl);
    }
  },
}
</script>
<style lang='less' scoped>
.score-goods {
  //   flex: 1;
  display: flex;
  flex-direction: column;
  .panel-head {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 100px;
    .title {
      flex: 1;
      font-size: 36px;
      font-weight: 600;
      color: rgba(48, 49, 51, 1);
    }
    .desc {
      font-size: 24px;
      font-weight: 400;
      color: rgba(96, 98, 102, 1);
      display: flex;
      align-items: center;
      .icon {
        display: inline-block;
        margin-right: 10px;
        width: 15px;
        height: 15px;
        transform: rotate(-45deg);
        border-bottom: 2px solid #606266;
        border-right: 2px solid #606266;
      }
    }
  }

  .panel-body {
    position: relative;
    display: flex;
    flex-direction: column;
    flex: 1;
    .content {
      flex: 1;
    }
    .loading {
      position: relative;
      height: 100px;
    }
    .list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .item {
        width: calc(49% - 1px);
        // margin: 20px;
        padding: 0px;
        margin-bottom: 30px;
        background: #f5f7fa;

        border-radius: 20px;
        overflow: hidden;
      }
    }
  }
}
</style>