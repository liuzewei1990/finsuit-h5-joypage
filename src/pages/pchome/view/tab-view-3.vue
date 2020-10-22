<!-- 个投 视图 -->
<template>
  <section class='tab-view'>

    <div class="alone-box" :class="{'min-h':aloneData.isEmpty}">
      <div class="alone-list" v-show="!aloneData.isEmpty">
        <div class="alone-item" v-for="(item) in aloneData.list" :key="item.INVEST_ID">
          <component :is="aloneItemUi[item.BUY_ORG_STATUS]" :item="item.uiData" @click.native="toAloneDetail(item)"></component>
        </div>
      </div>
      <div class="empty-data-box" v-show="aloneData.isEmpty">
        <EmptyData class="empty-data" descText='<span style="width:4.3rem;display:inline-block;">休息一会儿，福利继续</span>' text="" :imgUrl="require('../assets/images/empty-data.png')" imgStyle="width:3.5rem;margin:0.5rem auto;"></EmptyData>
      </div>
    </div>

    <!-- 一分钟了解比财 -->
    <ComAbout class="" v-if="URLConfig.isBottom"></ComAbout>

    <!-- 用户为什么选择比财 -->
    <ComComment class="mar-top-20" v-if="URLConfig.isBottom"></ComComment>

    <!-- 分享pic -->
    <!-- <ComSharePic class="mar-top-20"></ComSharePic> -->

    <!-- 底部footer -->
    <ComFooter></ComFooter>
  </section>
</template>

<script>

import { mapState, mapActions, mapGetters } from "vuex"
import bus from "@common/finsuit-h5/libs/bus.js"

import EmptyData from "@common/finsuit-components/EmptyData"
import { AloneItemMin, AloneItemMax } from "@aloneItem/components/AloneItem2.0/index.js"

// import AloneItemMax from "../components/PrsItem2.0"

/* 底部模块信息 */
import ComAbout from "./modules/com-about.vue"
import ComComment from "./modules/com-comment.vue"
import ComSharePic from "./modules/com-share-pic.vue"
import ComFooter from "./modules/com-footer.vue"
export default {
  components: { EmptyData, AloneItemMin, AloneItemMax, AloneItemMax, ComAbout, ComComment, ComSharePic, ComFooter },
  computed: {
    ...mapGetters({
      isLogin: "isLogin"
    }),
    ...mapState({
      // URL配置
      URLConfig: state => state.MainConfig.URLConfig
    }),
  },
  watch: {
    isLogin () {
    }
  },
  data () {
    return {
      aloneItemUi: {
        // 非首投产品
        "0": "AloneItemMin",
        // 首投产品
        "1": "AloneItemMax",
      },
      aloneData: {
        isEmpty: false,
        list: []
      },
    };
  },
  activated () {
    this.getAloneList();
  },
  //方法集合
  methods: {
    async getAloneList () {
      try {
        let params = {};
        let data = await this.$api.getAloneList(params).then(this.$interfaceApi.createAloneUiData);
        this.aloneData.list = data;
      } catch (error) { }
      if (this.aloneData.list.length === 0) this.aloneData.isEmpty = true;
    },

    // 跳转到个投包装页
    toAloneDetail (item) {
      this.$trackEvents.PCB000A487({ ITEM_VALUE: item.INVEST_ID, ITEM_VALUE1: item.PRD_INDEX_ID });
      this.$h5PrdDetail(item.INVEST_ID, "alone", item);
    },

  },
}
</script>
<style lang='less' scoped>
.tab-view {
  .alone-box {
    background: #f7faff;
    position: relative;
    min-height: 300px;
    // border: 1px solid red;

    .alone-list {
      padding: 30px 32px;
    }
    .alone-list .alone-item:not(:nth-child(1)) {
      margin-top: 20px;
    }
    .empty-data-box {
      position: relative;
      min-height: 500px;
      .empty-data {
        background: rgba(0, 0, 0, 0);
        border-top: 1.5px solid #f2f2f2;
        border-bottom: 1.5px solid #f2f2f2;
        height: calc(100% - 2px);
        //   top: 10px;
      }
    }
  }
  .min-h {
  }
}
</style>