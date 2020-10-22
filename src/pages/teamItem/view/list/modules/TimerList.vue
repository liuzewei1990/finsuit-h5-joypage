<template>
  <div class="timer-list-main">
    <!-- 时间轴 -->
    <StickyBox :zIndex="100" :stickyTop="0" :height="$px2rem(100)">
      <Tabbar class="tabbar" ref="Tabbar" v-model="currentTabviewIndex" :lineWidth="0" activeColor="#477DFF">
        <TabbarItem class="tabbar-item" v-for="(item,index) in teamData" :key="index" @click.native="clickTabItem(item,index)">
          <p :class="{'font':currentTabviewIndex==index}">{{(item.START_TIME+"").slice(0,5)}}-{{(item.END_TIME+"").slice(0,5)}}</p>
          <span>{{item.FLAG_TEXT}}</span>
        </TabbarItem>
      </Tabbar>
    </StickyBox>
    <!-- 时间轴列表数据 -->
    <Tabview class="tabview" :options="swiperOption" ref="Tabview" v-model="currentTabviewIndex" @slideChangeTransitionEnd="slideChangeTransitionEnd" @slideChangeTransitionStart="slideChangeTransitionStart" @touchEnd="touchEnd">
      <TabviewItem class="tabview-item" v-for="(itemObj,index) in teamData" :key="index" ref="TabviewItem">
        <div class="view-container view-list" id="view-container" ref="view-container">
          <div class="list-item">
            <!-- 顶部倒计时，只有在拼团中和即将开始的团中有 -->
            <countdown class="countdown" v-if="(itemObj.STATUS == '2' || itemObj.STATUS == '3') && itemObj.LIST.length !== 0" :data="itemObj" :changeFn="countdownOver"></countdown>

            <TeamItemMin class="mar-top-20 mar-bottom-20" :item="item.uiData" v-for="(item,index) in itemObj.LIST" :key="index" @click.native="$checkLogin({action:handleClickItem,data:item})" @reminBtn="handleClickReminBtn(item)"></TeamItemMin>
            <!-- <pre>
                {{itemObj}}
            </pre> -->
            <!-- 数据为空 -->
            <EmptyData v-if="itemObj.LIST.length === 0" class="empty-data" :descText="descText" text="" :imgUrl="require('../../../assets/images/empty-data.png')" imgStyle="width:4.5rem;height:5rem;margin:0rem auto 1rem;"></EmptyData>
          </div>
        </div>
      </TabviewItem>
    </Tabview>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex"
import EmptyData from "@common/finsuit-components/EmptyData"
import bus from "@common/finsuit-h5/libs/bus.js"

import { TeamItemMin } from "@teamItem/components/TeamItem2.0/index.js"

import Countdown from "../../../components/Countdown/index.vue"
import StickyBox from "../../../components/StickyBox/index.vue"
import { Tabbar, TabbarItem } from "../../../components/Tabs/index.js";
import { Tabview, TabviewItem } from "../../../components/Tabview/index.js"
export default {
  components: { Tabbar, TabbarItem, StickyBox, Tabview, TabviewItem, EmptyData, Countdown, TeamItemMin },
  props: {
    value: {
      type: [Number, String],
      default: 0
    },
  },
  created () {
    this.init();
  },
  data () {
    return {
      // swiper配置选项
      swiperOption: {
        autoHeight: true,
        resistanceRatio: 0,
        initialSlide: 0,
      },

      descText: `<span style="width:3.3rem;display:inline-block;">团生成中，请稍安勿躁 休息一会儿，福利继续</span>`,
      // 当前时间轴tab索引
      currentTabviewIndex: 0
    }
  },
  watch: {
    value (newValue, oldValue) {
      this.init();
    },
    currentTabviewIndex (newValue, oldValue) {
      this.$emit("input", newValue);
    }
  },
  computed: {
    ...mapGetters({
      isLogin: "isLogin"
    }),
    ...mapState({

      // 导出拼团产品数据
      teamDatas: state => state.MainData.teamData

    }),
    teamData () {
      return this.teamDatas.map(groupItem => {
        groupItem.LIST = this.$interfaceApi.createTeamUiData(groupItem.LIST || []);
        return groupItem;
      })
    }
  },
  methods: {
    init () {
      this.currentTabviewIndex = this.value;
      this.swiperOption.initialSlide = this.value;
    },

    // 点击tab时间轴
    clickTabItem (item, index) {
      // 打点
      this.$trackEvents.ACB0G053({ ITEM_VALUE: `${item.START_TIME}-${item.END_TIME}`, ITEM_VALUE1: item.STATUS, ITEM_VALUE2: item.FLAG_TEXT });
    },

    // 点击立即拼团 以及产品区域
    async handleClickItem (item) {

      if (item.START_STATUS == "3" || item.START_STATUS == "4") return;

      // 打点
      this.$trackEvents.PCB000A255({ ITEM_VALUE: item.TEAM_ID });

      this.$toNewPrdDetail({ activityType: "1", ...item });
    },

    // 产品倒计时结束 刷新数据
    countdownOver () {
      //   this.$parent.getTeamList();
    },

    // 点击立即预约
    async handleClickReminBtn (item) {
      // 打点
      this.$trackEvents.PCB000A254({ ITEM_VALUE: item.TEAM_ID, FUNCTION_STATUS: 1 });

      // APP内调用预约接口 - 打开提醒
      let params = {
        IS_REMIND: 0,
        DEVICE_ID: this.$store.state.DEVICE_ID,
        TEAM_ID: item.TEAM_ID,
        SYSTEM_TYPE: this.$store.state.SYSTEM_TYPE,
        APP_FLAG: this.$store.state.APP_FLAG,
      };
      let data;

      // 比财接口
      if (this.$store.state.APP_FLAG === "BC") {
        data = await this.$api.BC_PostTeamOpenRemind(params);
        if (String(data.SUCCESS) === "0") {
          this.$Toast("预约成功");
          //   this.renderData();
          item.IS_REMIND = 1;
        }
      }

      // 拼财接口
      if (this.$store.state.APP_FLAG === "PC") {
        data = await this.$api.PC_PostTeamOpenRemind(params);
        if (String(data.SUCCESS) === "0") {
          this.$Toast("预约成功");
          //   this.renderData();
          item.IS_REMIND = 1;
        }
      }

      // 小程序直接跳到包装页
      if (this.$store.state.APP_FLAG === "PMP") {
        // 跳转到包装页
        this.$h5PrdDetail(item.TEAM_ID, "roll", item);
      }
    },


    //  清除tabList缓存的滚动条位置值
    clearTabListScrollCache () {
      this.teamData.forEach(item => { item.scroll = null })
    },

    // 缓存tabList滚动条位置
    tabListScrollCache () {
      let scrollPos = document.documentElement.scrollTop || document.body.scrollTop;
      let headerH = this.handleScrollTopHeight();
      this.teamData[this.currentTabviewIndex].scroll = scrollPos < headerH ? headerH : scrollPos;
    },

    // scroll 开始滑动手指按下时触发
    touchEnd () {
      this.tabListScrollCache();
    },

    // tabView滑动结束时触发
    slideChangeTransitionEnd () {
    },

    // 当tabView左右滑动到中间时触发
    slideChangeTransitionStart () {
      //  归位页面滚动条
      window.scrollTo(0, this.teamData[this.$refs["Tabview"].swiper.activeIndex].scroll || this.handleScrollTopHeight());
    },

    // 计算顶部距离
    handleScrollTopHeight () {
      let headerH = 0
        + document.querySelector("#headerContainer").clientHeight
      // + this.$refs["title"].clientHeight;
      return headerH;
    }
  },
}
</script>

<style lang="less" scoped>
.timer-list-main {
  background-color: #f5f7fa;
  min-height: 100vh;
  user-select: none;
  box-sizing: border-box;
  padding-bottom: 150px;
  .tabbar {
    height: 100%;
    background: #fafcff;
  }
  .tabbar-item {
    font-size: 24px;
    color: #999999;
    .font {
      transform: scale(1.2);
    }
  }
  .tabview {
    flex: 1;
  }
  .view-container {
    min-height: calc(100vh - 300px);
    .list-item {
      padding: 0 24px;
      box-sizing: border-box;
      min-height: 800px;
      .countdown {
        margin: 20px auto;
      }
    }
  }
  .view-list {
    position: relative;
  }

  .empty-data {
    background: rgba(0, 0, 0, 0);
    position: relative !important;
    padding: 50px 0;
    font-family: "Microsoft YaHei", Arial, sans-serif;
  }
  .box1 {
    border: 0;
  }
}
</style>

