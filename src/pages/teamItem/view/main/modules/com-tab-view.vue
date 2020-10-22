<!-- tabview -->
<template>
  <section class='com-tab-view'>

    <!-- 拼金额 | 拼人数 【导航】 -->
    <StickyBox :zIndex="100" :stickyTop="0" height="50px" class="tabbar-sticky-outer">
      <Tabbar class="tabbar" ref="tabbar" v-model="currentTabviewIndex" :lineWidth="2" :activeBarWidthScale="0.2" activeColor="#3B6ADC">
        <TabbarItem v-for="(item,index) in tabs" :key="index" @click.native="clickTabItem(item,index)">
          <span class="item">{{item.MODULE_TITLE}}</span>
        </TabbarItem>
      </Tabbar>
    </StickyBox>

    <!-- 拼金额 | 拼人数 【视图】-->
    <keep-alive>
      <components :is="tabComponentKeys[tabComponent]"></components>
    </keep-alive>

  </section>
</template>

<script>
import { mapState, mapActions } from "vuex"
/* tabs */
import { Tabbar, TabbarItem } from "../../../components/Tabs/index.js";
import StickyBox from "../../../components/StickyBox/index.vue"
/* tabs view */
import Tabview0 from "./tab-view-0.vue"
import Tabview1 from "./tab-view-1.vue"
import Tabview2 from "./tab-view-2.vue"

export default {
  components: { Tabbar, TabbarItem, StickyBox, Tabview0, Tabview1, Tabview2 },
  data () {
    return {
      currentTabviewIndex: Number(this.$utils.getQueryStr()["tabIndex"]) || 0,
      // 后台接口数据映射
      tabComponentKeys: { "COLLAGEF_TEAM": "Tabview0", "ASSEMBLE_PERSON": "Tabview1", "OUT": "Tabview2" }
    };
  },
  computed: {
    // 从stoer中导出tabs数据
    ...mapState({ tabs: state => state.MainConfig.tabs }),
    // 根据tabs索引找出对应的组件key
    tabComponent () {
      let tab = this.tabs[this.currentTabviewIndex] || {};
      return tab.MODULE_CODE || "OUT";
    }
  },

  watch: {
    currentTabviewIndex () {
      this.resetScrollPosition();
    }
  },
  created () {

  },
  mounted () {

  },
  //方法集合
  methods: {
    // 当切换tab时 重置滚动条位置
    resetScrollPosition () {
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      let comHeaderHeight = 0
        + document.querySelector("#headerContainer").clientHeight
      if (scrollTop > comHeaderHeight) window.scrollTo(0, comHeaderHeight);
    },

    // tab点击 
    clickTabItem (item, index) {
      // 通过history,记录tabIndex选中
      let query = this.$utils.getQueryStr();
      query["tabIndex"] = index;
      this.$utils.historyGoState(query);
      // 打点
      if (item.MODULE_CODE === "COLLAGEF_TEAM") this.$trackEvents.ACB0P002({ ITEM_VALUE: item.ID, ITEM_VALUE1: item.MODULE_CODE });
      if (item.MODULE_CODE === "ASSEMBLE_PERSON") this.$trackEvents.ACB0P003({ ITEM_VALUE: item.ID, ITEM_VALUE1: item.MODULE_CODE });
    }
  },
}
</script>
<style lang='less' scoped>
.com-tab-view {
  .sticky-box-outer {
    /deep/.sticky-box-inner {
      width: 100%;
      height: 90px;
      border: 1.5px solid #e5e8f0;
      background: #fff;
      padding: 0 80px;
      box-sizing: border-box;
    }
    .tabbar {
      height: 100%;
    }
    .item {
      font-size: 30px;
    }
  }
}
</style>