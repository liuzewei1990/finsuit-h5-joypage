<!--  拼团 && 拼人数 视图 -->
<template>
  <section class='tab-view'>

    <div class="tab-view-content" ref="tabViewContent">

      <div v-show="true">
        <!-- 标题 -->
        <div class="title" ref="title">
          <div class="l">
            <span class="icon"></span>
            <span>人数拼团</span>
          </div>
          <div class="r" @click="toPrsItemList">
            更多拼团
          </div>
        </div>

        <!-- 拼人数 -->
        <div class="list-box" :class="{'min-h':prsData.isEmpty}" ref="prsBox">
          <div class="alone-list">
            <block v-for="(item,index) in prsData.list" :key="index">
              <PrsItemMax class="mar-bottom-20" :item="item.uiData" v-if="item.ASSEMBLE_TYPE=='1'" @click.native="toPersonalDetail(item)"></PrsItemMax>
              <PrsItemMin class="mar-bottom-20" :item="item.uiData" v-if="item.ASSEMBLE_TYPE=='2'" @click.native="toPersonalDetail(item)"></PrsItemMin>
            </block>
          </div>
          <!-- 数据为空 -->
          <EmptyData class="empty-data" v-show="prsData.isEmpty" descText='<span style="width:3.3rem;display:inline-block;">团生成中，请稍安勿躁 休息一会儿，福利继续</span>' text="" :imgUrl="require('../assets/images/empty-data.png')" imgStyle="width:3.5rem;margin:0.2rem auto;"></EmptyData>
        </div>

        <!-- 标题 -->
        <div class="title" ref="title">
          <div class="l">
            <span class="icon"></span>
            <span>金额拼团</span>
          </div>
          <div class="r" @click="toTeamItemList">
            更多拼团
          </div>
        </div>

        <!-- 拼金额 -->
        <div class="list-box" :class="{'min-h':teamData.isEmpty}" ref="teamBox">
          <div class="alone-list">
            <TeamItemMin class="mar-bottom-20" :item="item.uiData" v-for="(item,index) in teamData.list" :key="index" @click.native="$checkLogin({action:handleClickItem,data:item})" @reminBtn="handleClickReminBtn(item)"></TeamItemMin>
          </div>
          <!-- 数据为空 -->
          <EmptyData class="empty-data" v-show="teamData.isEmpty" descText='<span style="width:3.3rem;display:inline-block;">团生成中，请稍安勿躁 休息一会儿，福利继续</span>' text="" :imgUrl="require('../assets/images/empty-data.png')" imgStyle="width:3.5rem;margin:0.2rem auto;"></EmptyData>
        </div>
      </div>

    </div>

    <!-- 一分钟了解比财 -->
    <ComAbout class="" v-if="URLConfig.isBottom"></ComAbout>

    <!-- 用户为什么选择比财 -->
    <ComComment class="mar-top-20" v-if="URLConfig.isBottom"></ComComment>

    <!-- 分享pic -->
    <!-- <ComSharePic class="mar-top-20" @click.native="clickShare"></ComSharePic> -->

    <!-- 底部footer -->
    <ComFooter></ComFooter>
  </section>
</template>

<script>

import { mapState, mapActions, mapGetters } from "vuex"
import bus from "@common/finsuit-h5/libs/bus.js"

import EmptyData from "@common/finsuit-components/EmptyData"

import { PrsItemMin, PrsItemMax } from "@prsItem/components/PrsItem2.0/index.js"
import { TeamItemMin } from "@teamItem/components/TeamItem2.0/index.js"

/* 底部模块信息 */
import ComAbout from "./modules/com-about.vue"
import ComComment from "./modules/com-comment.vue"
import ComSharePic from "./modules/com-share-pic.vue"
import ComFooter from "./modules/com-footer.vue"
export default {
  components: { EmptyData, PrsItemMin, PrsItemMax, TeamItemMin, ComAbout, ComComment, ComSharePic, ComFooter },
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
      viewLoging: false,
      // 拼人数数据
      prsData: {
        isEmpty: false,
        list: [],
      },
      // 拼团数据
      teamData: {
        isEmpty: false,
        list: [],
      }
    };
  },
  activated () {
    this.initData();
  },
  //方法集合
  methods: {
    // 入口
    async initData () {
      let promise = [];
      promise.push(this.getHomePrsList());
      promise.push(this.getHomeTeamList());

      try {
        await Promise.all(promise);
      } catch (error) {
        console.error(error);
      }
      this.viewLoging = true;
    },

    //  获取拼人数列表数据
    async getHomePrsList () {
      try {
        let params = {};
        let data = await this.$api.getPersonData(params).then(this.$interfaceApi.createPersonUiData);
        this.prsData.list = (data || []).slice(0, 3);
      } catch (error) { }
      if (this.prsData.list.length === 0) this.prsData.isEmpty = true;
    },

    // 点击产品去拼人数包装页
    toPersonalDetail (item) {
      // 打点
      this.$trackEvents.ACB0P004({ ITEM_VALUE: item.ASSEMBLE_TYPE, ITEM_VALUE1: item.PRD_INDEX_ID, ITEM_VALUE2: item.ID });

      let url = this.$Config.prsDetailUrl;
      url += `#/prs_detail`;
      url += `?FROM_ID=${this.$store.state.ACTITY_ID}`;
      url += `&INFO_ID=${item.INFO_ID}`;
      url += `&ASSEMBLE_TYPE=${item.ASSEMBLE_TYPE}`;
      url += `&PRD_INDEX_ID=${item.PRD_INDEX_ID}`;
      url += `&ORG_ID=${item.ORG_ID}`;
      url += `&helpCenterCode=PC_PRODUCT_PACKAGE_PAGE`;
      url += `&hideRightShare=`;
      this.$bcBridge.openWebview(url);
    },

    // 获取拼团列表数据
    async getHomeTeamList () {
      try {
        let params = {};
        let data = await this.$api.getHomeTeamList(params).then(this.$interfaceApi.createTeamUiData);
        this.teamData.list = data || [];
      } catch (error) { }
      if (this.teamData.list.length === 0) this.teamData.isEmpty = true;
    },

    // 点击立即拼团 以及产品区域
    async handleClickItem (item) {
      if (item.START_STATUS == "3" || item.START_STATUS == "4") return;
      // 打点
      this.$trackEvents.PCB000A255({ ITEM_VALUE: item.TEAM_ID });

      let data = await this.$api.postCheckTeamStatus({ TEAM_ID: item.TEAM_ID });
      if (data.TEAM_IS_NORMAL == 1) {
        // 跳转到包装页
        this.$h5PrdDetail(item.TEAM_ID, "roll", item);
      } else {
        this.$Toast("拼团额度已满,敬请关注下期");
        this.getHomeTeamList();
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
          item.uiData.isRemind = 1;
        }
      }

      // 拼财接口
      if (this.$store.state.APP_FLAG === "PC") {
        data = await this.$api.PC_PostTeamOpenRemind(params);
        if (String(data.SUCCESS) === "0") {
          this.$Toast("预约成功");
          //   this.renderData();
          item.uiData.isRemind = 1;
        }
      }

      // 小程序直接跳到包装页
      if (this.$store.state.APP_FLAG === "PMP") {
        // 跳转到包装页
        this.$h5PrdDetail(item.TEAM_ID, "roll", item);
      }
    },

    // 点击更多拼团跳转到拼团列表页
    toTeamItemList () {
      this.$trackEvents.PCB000A489();
      let url = this.$Config.teamItemUrl;
      url += `#/list`;
      url += `?ACTITY_ID=${this.$store.state.ACTITY_ID}`;
      // 原生白色导航
      url += `&customBar=1`;
      url += `&hideLoadinghideProgress=1`;
      url += `&finsuit=1`;
      this.$bcBridge.openWebview(url);
    },

    // 点击更多拼团跳转到拼人数列表页
    toPrsItemList () {
      this.$trackEvents.PCB000A488();
      let url = this.$Config.prsItemUrl;
      url += `#/list`;
      url += `?ACTITY_ID=${this.$store.state.ACTITY_ID}`;
      // 原生白色导航
      url += `&customBar=1`;
      url += `&hideLoadinghideProgress=1`;
      url += `&finsuit=1`;
      this.$bcBridge.openWebview(url);
    },

    // 点击分享按钮
    clickShare () {
      // 打点
      //   this.$trackEvents.ACB0G002({ ITEM_VALUE: "拼人数分享按钮" });

      this.$root.$refs["App"].openShare(this.getShareConfig());
    },
  },
}
</script>
<style lang='less' scoped>
.tab-view {
  .tab-view-content {
    position: relative;
    min-height: 0px;
  }
  .title {
    height: 90px;
    font-size: 32px;
    display: flex;
    align-items: center;
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    background: #f7faff;
    .l {
      flex: 1;
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
      color: #a3a7ad;
      display: flex;
      align-items: center;
      padding: 20px;
      box-sizing: border-box;
      &::after {
        content: "";
        display: inline-block;
        width: 10px;
        height: 10px;
        border-left: 2px solid #a3a7ad;
        border-top: 2px solid #a3a7ad;
        transform: rotate(135deg);
      }
    }
  }

  .list-box {
    background: #f7faff;
    position: relative;
    // border: 1px solid red;
    overflow: hidden;
    min-height: 300px;

    // min-height: 400px;
    .alone-list {
      padding: 0 32px;
    }

    .empty-data {
      background: rgba(0, 0, 0, 0);
      border-top: 1.5px solid #f2f2f2;
      border-bottom: 1.5px solid #f2f2f2;
      height: calc(100% - 2px);
    }
  }
  .min-h {
    min-height: 500px;
  }
}
</style>