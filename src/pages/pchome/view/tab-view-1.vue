<!-- 拼人数视图 -->
<template>
  <section class='prs-view'>
    <!-- 标题 -->
    <div class="title" ref="title">
      <div class="l">
        <span class="icon"></span>
        <span>人数拼团</span>
      </div>
      <template v-if="showShare">
        <div class="r" @click="clickShare" v-if="$store.state.APP_FLAG==='BC' || $store.state.APP_FLAG==='PC'">
          分享
        </div>
        <div class="r" v-copy="copyValue" v-copy:callback="copyCallback" v-else>
          分享
        </div>
      </template>
    </div>

    <!-- 拼人数列表 -->
    <div class="list-box" id="listBox">
      <EmptyData v-if="isEmptyData" class="empty-data" descText='<span style="width:3.3rem;display:inline-block;">团生成中，请稍安勿躁 休息一会儿，福利继续</span>' text="" :imgUrl="require('../assets/images/empty-data.png')" imgStyle="width:4.5rem;height:5rem;margin:0rem auto 1rem;"></EmptyData>
      <PrsItem :item="item" v-for="(item,index) in personData" @click.native="$checkLogin({action:toPersonalDetail,data:item})" :key="index"></PrsItem>
    </div>

    <!-- 一分钟了解比财 -->
    <ComAbout class="mar-top-20" v-if="URLConfig.isBottom"></ComAbout>

    <!-- 合作银行 -->
    <ComBank class="mar-top-20" v-if="URLConfig.isBottom" ref="ComBank"></ComBank>

    <!-- 用户为什么选择比财 -->
    <ComComment class="mar-top-20" v-if="URLConfig.isBottom"></ComComment>

    <!-- 底部footer -->
    <ComFooter></ComFooter>
  </section>
</template>

<script>

import { mapState, mapActions, mapGetters } from "vuex"
import bus from "@common/finsuit-h5/libs/bus.js"
import EmptyData from "@common/finsuit-components/EmptyData"
import PrsItem from "../components/PrsItem/index.vue"

import ComAbout from "./modules/com-about.vue"
import ComBank from "./modules/com-bank.vue"
import ComComment from "./modules/com-comment.vue"
import ComFooter from "./modules/com-footer.vue"
export default {
  components: { EmptyData, PrsItem, ComFooter, ComAbout, ComBank, ComComment, },
  data () {
    return {
      copyValue: window.location.href,
      isEmptyData: false
    };
  },
  computed: {
    ...mapGetters({
      isLogin: "isLogin"
    }),
    ...mapState({
      personData: state => state.MainData.personData,
      // 导出分享配置
      prsShareJson: state => state.MainConfig.prsShareJson,
      // 是否显示分享按钮
      showShare () {
        return !!this.prsShareJson.length;
      },

      // URL配置
      URLConfig: state => state.MainConfig.URLConfig
    }),
  },
  mounted () {
    this.comBankPlay();
  },
  activated () {
    this.getPersonData();
  },
  //方法集合
  methods: {
    // 获取拼人数数据接口
    async getPersonData () {
      let data = await this.$api.getPersonData();
      this.$store.commit("SET_PERSON_DATA", data);
      if (data.length === 0) this.isEmptyData = true;
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

    // 点击分享按钮
    clickShare () {
      // 打点
      this.$trackEvents.ACB0G002({ ITEM_VALUE: "拼人数分享按钮" });

      this.$root.$refs["App"].openShare(this.getShareConfig());
    },

    // 获取分享配置
    getShareConfig () {
      return this.prsShareJson.map(item => {
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

    // 复制客服微信号
    copyCallback (text) {
      this.$Toast("复制活动链接成功")
    },

    // 开启合作银行组件轮播
    comBankPlay () {
      let ComBank = this.$refs["ComBank"];
      if (!ComBank) return;
      ComBank.disabledFn(false);
    }
  },
}
</script>
<style lang='less' scoped>
.prs-view {
  display: flex;
  flex-direction: column;
  padding-bottom: 30px;
  //   background: #fff;
  //   height: calc(100vh - 100px);
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

.list-box {
  min-height: 600px;
  position: relative;
  background: #fff;
  padding: 0 30px;
  box-sizing: border-box;
  //   overflow: hidden;
  .empty-data {
    left: 0;
  }
}
.item {
  //   width: 100%;
  height: 100px;
  background: pink;
  margin: 10px auto;
}
</style>