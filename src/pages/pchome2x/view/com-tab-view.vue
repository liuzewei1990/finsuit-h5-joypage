<!-- tabview -->
<template>
  <section class='com-tab-view'>

    <!-- 拼金额 | 拼人数 【导航】 -->
    <StickyBox :zIndex="100" :stickyTop="0" height="50px" class="tabbar-sticky-outer">
      <Tabbar class="tabbar" ref="tabbar" v-model="currentTabviewIndex" :lineWidth="2" :activeBarWidthScale="0.2" activeColor="#3B6ADC">
        <TabbarItem v-for="(item,index) in tabs" :key="index" @click.native="clickTabItem(item)">
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
import { Tabbar, TabbarItem } from "../components/Tabs/index.js";
import StickyBox from "../components/StickyBox/index.vue"
/* tabs view */
// import Tabview0 from "./tab-view-0.vue"
// import Tabview1 from "./tab-view-1.vue"
import Tabview2 from "./tab-view-2.vue"
import Tabview3 from "./tab-view-3.vue"
import Tabview4 from "./tab-view-4.vue"

export default {
  components: { Tabbar, TabbarItem, StickyBox, Tabview2, Tabview3, Tabview4 },
  props: {
    value: {
      type: [String, Number],
      default: 0
    }
  },
  data () {
    return {
      currentTabviewIndex: 0,
      // 后台接口数据映射
      tabComponentKeys: {
        "COLLAGEF_TEAM": "Tabview0",
        "ASSEMBLE_PERSON": "Tabview1",
        "TEAM_VIEW": "Tabview2",
        "ALONE_VIEW": "Tabview3",
        "OUT": "Tabview4"
      }
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
    value (newVal) {
      this.currentTabviewIndex = newVal;
    },
    currentTabviewIndex (newVal) {
      this.$emit("input", newVal)
      this.resetScrollPosition();
    }
  },

  created () {
    this.currentTabviewIndex = this.value || 0;
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
    clickTabItem (item) {
      this.$trackEvents.PCB000A486({ ITEM_VALUE: item.MODULE_TITLE });
    }
  },
}
</script>
<style lang='less' scoped>
.com-tab-view {
  font-family: PingFangSC-Regular, PingFang SC;
  .sticky-box-outer {
    /deep/.sticky-box-inner {
      width: 100%;
      height: 90px;
      //   border: 1.5px solid #e5e8f0;
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