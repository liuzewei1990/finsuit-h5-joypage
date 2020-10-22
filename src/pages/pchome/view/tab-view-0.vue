<!-- 拼团视图 -->
<template>
  <section class='team-view'>
    <!-- 标题 -->
    <div class="title" ref="title">
      <div class="l">
        <span class="icon"></span>
        <span>今日拼团</span>
      </div>
      <template v-if="showShare">
        <div class="r" @click="clickShare">
          分享
        </div>
      </template>
    </div>
    <!-- 时间轴 -->
    <StickyBox :zIndex="100" :stickyTop="50" :height="$px2rem(100)">
      <Tabbar class="tabbar" ref="Tabbar" v-if="tabReWrite" v-model="currentTabviewIndex" :lineWidth="0" activeColor="#3B6ADC">
        <TabbarItem class="tabbar-item" v-for="(item,index) in teamData" :key="index" @click.native="clickTabItem(item,index)">
          <p>{{item.START_TIME}}-{{item.END_TIME}}</p>
          <span>{{item.FLAG_TEXT}}</span>
        </TabbarItem>
      </Tabbar>
    </StickyBox>
    <!-- 时间轴列表数据 -->
    <Tabview class="tabview" :options="swiperOption" ref="Tabview" v-model="currentTabviewIndex" @slideChangeTransitionEnd="slideChangeTransitionEnd" @slideChangeTransitionStart="slideChangeTransitionStart" @touchEnd="touchEnd">
      <TabviewItem class="tabview-item" v-for="(itemObj,index) in teamData" :key="index" ref="TabviewItem">
        <div class="view-container view-list" id="view-container" ref="view-container">

          <div class="list-item">
            <!-- STATUS：1 拼团结束 -->
            <template v-if="itemObj.STATUS==1">
              <TeamOverItem class="mar-bottom-20" v-for="(item,index) in itemObj.LIST" :key="index" :item="item"></TeamOverItem>
            </template>
            <!-- STATUS：2 即将开始 -->
            <template v-if="itemObj.STATUS==2">
              <TeamItem class="mar-bottom-20" v-for="(item,index) in itemObj.LIST" :key="index" :item="item" @click.native="$checkLogin({action:handleClickItem,data:item})" @countdownOver="countdownOver" @reminBtn="handleClickReminBtn"></TeamItem>
            </template>
            <!-- STATUS：3 拼团中 -->
            <template v-if="itemObj.STATUS==3">
              <TeamItem class="mar-bottom-20" v-for="(item,index) in itemObj.LIST" :key="index" :item="item" @click.native="$checkLogin({action:handleClickItem,data:item})" @countdownOver="countdownOver"></TeamItem>
            </template>
          </div>

          <!-- 左右滑动切换 -->
          <!-- <template v-if="((itemObj.LIST.length == 1 || itemObj.LIST.length == 2) && itemObj.STATUS == 1) || (itemObj.LIST.length == 1 && itemObj.STATUS == 2) || (itemObj.LIST.length == 1 && itemObj.STATUS == 3)">
            <EmptyData class="empty-data" :descText="descText1" text="" :imgUrl="require('../../assets/images/shou.png')" imgStyle="margin:1rem auto 0rem;opacity: 0.7;"></EmptyData>
          </template> -->

          <!-- 数据为空 -->
          <EmptyData v-if="itemObj.LIST.length === 0" class="empty-data" :descText="descText" text="" :imgUrl="require('../assets/images/empty-data.png')" imgStyle="width:4.5rem;height:5rem;margin:0rem auto 1rem;"></EmptyData>

          <!-- 活动规则 -->
          <div class="rule-btn-box">
            <a href="javascript:void(0);" @click="toTeamPrdUrl"><span>拼金额活动规则<i class="icon"></i></span></a>
          </div>

          <!-- 一分钟了解比财 -->
          <ComAbout class="mar-top-20" v-if="URLConfig.isBottom"></ComAbout>

          <!-- 合作银行 -->
          <ComBank class="mar-top-20" v-if="URLConfig.isBottom" :disabled="comBankDisabled" ref="ComBank"></ComBank>

          <!-- 用户为什么选择比财 -->
          <ComComment class="mar-top-20" v-if="URLConfig.isBottom"></ComComment>

          <!-- 底部footer -->
          <ComFooter></ComFooter>

        </div>

      </TabviewItem>
    </Tabview>

  </section>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex"
import bus from "@common/finsuit-h5/libs/bus.js"
import EmptyData from "@common/finsuit-components/EmptyData"
import StickyBox from "../components/StickyBox/index.vue"
import { Tabbar, TabbarItem } from "../components/Tabs/index.js"
import { Tabview, TabviewItem } from "../components/Tabview/index.js"
import TeamItem from "../components/TeamItem/index.vue"
import TeamOverItem from "../components/TeamOverItem/index.vue"

import ComAbout from "./modules/com-about.vue"
import ComBank from "./modules/com-bank.vue"
import ComComment from "./modules/com-comment.vue"
import ComFooter from "./modules/com-footer.vue"

export default {
  components: { EmptyData, Tabbar, TabbarItem, StickyBox, Tabview, TabviewItem, TeamItem, TeamOverItem, ComFooter, ComAbout, ComBank, ComComment },
  data () {
    return {
      // swiper配置选项
      swiperOption: {
        autoHeight: true,
        resistanceRatio: 0,
        initialSlide: 0
      },
      // 当数据变化后,重载tabbar组件变量
      tabReWrite: true,

      descText: `<span style="width:3.3rem;display:inline-block;">团生成中，请稍安勿躁 休息一会儿，福利继续</span>`,
      descText1: `<span style="width:3.3rem;display:inline-block; color:rgb(119, 157, 248);">左右滑动切换时间</span>`,
      // 当前时间轴tab索引
      currentTabviewIndex: 0,
      // 默认禁止银行组件的自动轮播
      comBankDisabled: true
    };
  },
  computed: {
    ...mapGetters({
      isLogin: "isLogin"
    }),
    ...mapState({

      // 从stoer中导出tabs数据
      tabs: state => state.MainConfig.tabs,

      // 拼团产品数据
      teamData: state => state.MainData.teamData,

      // 导出分享配置
      teamShareJson: state => state.MainConfig.teamShareJson,

      // 是否显示分享按钮
      showShare () {
        return !!this.teamShareJson.length;
      },

      // URL配置
      URLConfig: state => state.MainConfig.URLConfig

    }),
  },
  watch: {
    currentTabviewIndex (a, b) {

    },
    // 监听数据变化重新初始化
    teamData (newData, oldData) {
      if (newData.length !== oldData.length) {
        console.info("拼团数据-发生变化-reInit");
        this.reInit();
      }
    },
    isLogin () {
      // 登录变化时...
    }
  },
  created () {
    this.init();
  },
  mounted () {
    this.handleCombankPlay();
  },
  activated () {
    this.getTeamList();
    this.clearTabListScrollCache();
    // 重新rerender是解决安卓中会有一个小问题，当在拼人数tab中登陆或退出后，在返回拼金额tab中，会导致tabView滑动错乱
    // this.$refs["Tabview"].rerender();
    // this.reInit();
    // 监听app返回重新拉取数据
    // bus.$on("pinCaiPageDidAppear", this.$root.$refs["App"].getTeamList)
  },
  deactivated () {
    // bus.$off("pinCaiPageDidAppear", this.$root.$refs["App"].getTeamList)
  },
  //方法集合
  methods: {
    // 获取拼团列表
    async getTeamList () {
      let data = await this.$api.getTeamList({ DEVICE_ID: this.$store.state.DEVICE_ID });
      this.$store.commit("SET_TEAM_LIST_DATA", data);
    },

    // 当拼团数据发生变化时 需要重新初始化tabview
    reInit () {
      // 重载tabbar时间轴
      this.tabbarReload();
      // 重新计算
      this.init();
      this.handleCombankPlay();
    },

    // 初始化tab索引位置
    init () {
      let index = this.teamData.findIndex(item => item.STATUS == 3);
      index = index === -1 ? 0 : index;
      this.currentTabviewIndex = index;
      this.swiperOption.initialSlide = index;
    },

    // 点击tab时间轴
    clickTabItem (item, index) {
      // 打点
      this.$trackEvents.ACB0G053({ ITEM_VALUE: `${item.START_TIME}-${item.END_TIME}`, ITEM_VALUE1: item.STATUS, ITEM_VALUE2: item.FLAG_TEXT });
    },

    // 点击立即拼团 以及产品区域
    async handleClickItem (item) {
      // 打点
      this.$trackEvents.PCB000A255({ ITEM_VALUE: item.TEAM_ID });

      let data = await this.$api.postCheckTeamStatus({ TEAM_ID: item.TEAM_ID });
      if (data.TEAM_IS_NORMAL == 1) {
        // 跳转到包装页
        this.$h5PrdDetail(item.TEAM_ID, "roll", item);
      } else {
        this.$Toast("拼团额度已满,敬请关注下期");
      }
    },

    // 产品倒计时结束 刷新数据
    countdownOver () {
      // 只有当前在拼金额tab下在刷新数据
      if (this.tabs[this.$parent.currentTabviewIndex].MODULE_CODE === "COLLAGEF_TEAM") {
        this.$root.$refs["App"].getTeamList();
      }
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

    // 点击分享按钮
    clickShare () {
      // 打点
      this.$trackEvents.ACB0G002({ ITEM_VALUE: "拼金额分享按钮" });

      this.$root.$refs["App"].openShare(this.getShareConfig());
    },

    // 获取分享配置
    getShareConfig () {
      return this.teamShareJson.map(item => {
        // 分享方式 0:图片   1:链接  2: 小程序
        item["SHARE_TYPE"] = item.SHARE_TYPE;
        // 分享渠道 0:分享给朋友  1:分享到朋友圈   2: QQ 3:QQ空间
        item["SHARE_PLACE"] = item.SHARE_PLACE;

        // 分享标题
        item["SHARE_TITLE"] = item.SHARE_TITLE;
        // 分享描述
        item["SHARE_DESC"] = item.SHARE_CONTENT;
        // 分享链接
        item["SHARE_URL"] = item.SHARE_URL;
        // 分享IOCN或者图片
        item["SHARE_IMAGE"] = item.SHARE_URL;

        return item;
      })
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
      this.handleCombankPlay();
    },

    // 当tabView左右滑动到中间时触发
    slideChangeTransitionStart () {
      let scrollPos = document.documentElement.scrollTop || document.body.scrollTop;
      let headerH = this.handleScrollTopHeight();
      if (scrollPos > headerH) {
        //  归位页面滚动条
        window.scrollTo(0, headerH);
      }

      // window.scrollTo(0, this.teamData[this.$refs["Tabview"].swiper.activeIndex].scroll || this.handleScrollTopHeight());
    },

    // 计算顶部距离
    handleScrollTopHeight () {
      let headerH = 0
        + document.querySelector("#headerContainer").clientHeight
        + this.$refs["title"].clientHeight;
      return headerH;
    },

    // 处理Combank银行轮播组件 滑动时卡顿问题
    handleCombankPlay () {
      let ComBanks = this.$refs["ComBank"];
      if (!ComBanks) return;
      for (let index = 0; index < ComBanks.length; index++) {
        ComBanks[index].disabledFn(true);
      }
      this.$refs["ComBank"][this.currentTabviewIndex].disabledFn(false);
    },

    // 点击拼金额活动规则跳转页面
    toTeamPrdUrl () {
      let url = this.$Config.teamItemUrl;
      url += `#/rule`;
      url += `?ACTITY_ID=${this.$store.state.ACTITY_ID}`;
      this.$bcBridge.openWebview(url);
    },

    // 重载tab时间轴组件用到
    tabbarReload () {
      this.tabReWrite = false;
      this.$nextTick(() => {
        this.tabReWrite = true;
      })
    },
  },
}
</script>
<style lang='less' scoped>
.team-view {
  //   font-family: "Microsoft YaHei", Arial, sans-serif;
  background: #fff;
  min-height: 100vh;
}

.title {
  height: 90px;
  font-size: 32px;
  display: flex;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
  background: #fff;
  display: flex;
  .l {
    flex: 1;
    font-weight: 600;
    .icon {
      display: inline-block;
      width: 8px;
      height: 30px;
      background: #3f6fe4;
      margin-right: 15px;
    }
  }
  .r {
    font-size: 24px;
    color: #3b6adc;
    display: flex;
    align-items: center;
    padding: 20px;
    box-sizing: border-box;
    &::after {
      content: "";
      display: inline-block;
      width: 10px;
      height: 10px;
      border-left: 2px solid #3b6adc;
      border-top: 2px solid #3b6adc;
      transform: rotate(135deg);
    }
  }
}

.tabbar {
  height: 100%;
  background: #fafcff;
}
.tabbar-item {
  font-size: 24px;
  color: #999999;
}

.tabview {
  flex: 1;
}
.tabview-item {
}
.view-container {
  min-height: calc(100vh - 300px);
  //   background: #fff;
  //   padding: 0 24px;
  //   box-sizing: border-box;
  //   min-height: calc(100vh - 300px);
  //   height: calc(100vh - 300px);
  //   overflow-y: scroll;
  .list-item {
    padding: 24px;
    box-sizing: border-box;
    background: #fff;
  }
}

.view-list {
  position: relative;
}

.empty-data {
  position: relative !important;
  padding: 50px 0;
  font-family: "Microsoft YaHei", Arial, sans-serif;
  //   background: #eee !important;
}

.rule-btn-box {
  text-align: center;
  padding: 30px;
  background: #fff;
  border-top: 1.5px solid #eee;
  a {
    display: inline-block;
  }
  span {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #3b6adc;
    font-size: 28px;
  }
  .icon {
    display: inline-block;
    width: 13px;
    height: 13px;
    border-bottom: 2px solid #3b6adc;
    border-right: 2px solid #3b6adc;
    transform: rotate(-45deg);
  }
}
</style>