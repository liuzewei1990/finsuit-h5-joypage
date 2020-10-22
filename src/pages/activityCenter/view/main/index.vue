<template>
  <div class="main">
    <img class="loading loading-flash" v-if="loading" src="./loading.svg" alt="">
    <template v-else>

      <section class="banner">
        <!-- 轮播图模块 -->
        <div class="swiper-box" v-show="swiperList.length">
          <Swiper class="swiper" height="100%" :list="swiperList" v-model="bindSwiperIndex" @on-click-list-item="bannerItemClick" :showDescMask="false" :showDots="false" :loop="true" :auto="true">

            <!--slot dots -->
            <div class="dots" slot="dots" v-show="swiperList.length > 1">
              <div class="dot" :class="{'dot-active':index===bindSwiperIndex}" v-for="(item,index) in swiperList" :key="index"></div>
            </div>
          </Swiper>
        </div>

        <!-- Grid模块 -->
        <Grid class="main-grid" :no-border="true" :cols="gridList.length" v-show="gridList.length">
          <GridItem :label="item.name" :icon="item.iconUrl" v-for="(item,index) in gridList" :key="index" @on-item-click="gridItemClick(item)">
            <img slot="icon" v-lazy="item.iconUrl">
          </GridItem>
        </Grid>
      </section>
      <!-- 活动列表 -->
      <section class="activity-list">
        <empty-data v-show="isEmptyData" text="暂无数据"></empty-data>
        <div v-for="(item,index) in activityList" :key="index">
          <!-- 活动 -->
          <ActivityItem class="mar-top-20" v-if="item.templateType=='1'" :item="item" @on-item-click="activityItemClick(item)" :showTag="true" :showRate="false" />
          <ActivityItem class="mar-top-20" v-if="item.templateType=='2'" :item="item" @on-item-click="activityItemClick(item)" :showTag="true" :showRate="false" />
          <ActivityItem class="mar-top-20" v-if="item.templateType=='3'" :item="item" @on-item-click="activityItemClick(item)" :showTag="true" :showRate="false" />
          <!-- 资讯 -->
          <NewsItem class="mar-top-20" v-if="item.templateType=='4'" :item="item" @click.native="newsItemClick(item)"></NewsItem>
        </div>
      </section>
    </template>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from "@activityCenter/components/Swiper"
import { Grid, GridItem } from "@activityCenter/components/Grid"
import ActivityItem from "@activityCenter/components/ActivityItem"
import NewsItem from "@activityCenter/components/NewsItem"
import EmptyData from "@common/finsuit-components/EmptyData"
import { mapGetters } from "vuex"
// http://dummyimage.com/320x200
export default {
  components: { Swiper, SwiperItem, Grid, GridItem, ActivityItem, NewsItem, EmptyData },
  data () {
    return {
      bindSwiperIndex: 0,
      isEmptyData: false,
      loading: false,
      // 轮播图
      swiperList: [],
      // 九宫格
      gridList: [],
      // 活动列表
      activityList: []
    }
  },
  computed: {
    ...mapGetters({
      isLogin: "isLogin"
    })
  },
  watch: {
    isLogin () {
      this.renderData();
    }
  },

  created () {
    this.init();
    this.updateTitle();
  },

  mounted () {
    window.pageAppear = () => {
      this.$sendLoginResult();
    }
  },

  methods: {
    // 根据code指定首页标题
    updateTitle () {
      let title = this.$route.query["GROUP_CODE"] == "ACTIVITY_HOME_NOVICE" ? "新手" : "活动中心";
      this.$bcBridge.updateTitle(title);
    },

    async init () {
      try {
        this.loading = true;
        await this.renderData();
        this.loading = false;
      } catch (error) {
        if (error.code === 601 || error.code === 602) {
          this.$throwNewPage({ componentName: "NETWORK_ERROR_PAGE", onClick: this.init });
        }
      }
    },

    async renderData () {
      let params = {
        // 活动id:该参数是区分拼财审核版本二期，拼财底部tabar首页和tabar新手的标识。
        ACTIVITY_ID: this.$store.state.ACTITY_ID,
        // 分组code:该参数是区分拼财审核版本二期，拼财底部tabar首页和tabar新手的标识。
        GROUP_CODE: this.$route.query["GROUP_CODE"]
      };
      let data = await this.$api.getHomeBanner(params);

      // banner
      let swiperList = data.APPROVE_PIC || [];
      // grid
      let gridList = data.NAVIGATION_BUTTON || [];
      // 活动列表
      let activityList = data.ACTIVITY_REGION || [];

      this.renderBanner(swiperList);
      this.renderGrid(gridList);
      this.renderActivityList(activityList);
    },

    // 转换banner
    renderBanner (swiperList) {
      this.swiperList = swiperList.map(item => {
        let swiperItem = {};
        swiperItem["title"] = item.BANNER_TITLE;
        swiperItem["img"] = this.$transfromAliyunUrl(item.BANNER_URL);
        swiperItem["isLogin"] = item.IS_LOGIN;

        // 文章id
        swiperItem["articleId"] = item.NEWS_ID;

        // 1：活动列表，2：活动详情，3：H5链接 4:文章跳转
        swiperItem["linkType"] = item.BANNER_LINK_TYPE;
        swiperItem["1"] = item.GROUP_ID;
        swiperItem["2"] = item.DETAIL_ID;
        swiperItem["3"] = item.BANNER_LINK;
        return swiperItem;
      })
    },

    // 转换首页导航
    renderGrid (gridList) {
      gridList = gridList.slice(0, 5);
      this.gridList = gridList.map(item => {
        let gridItem = {};
        gridItem["name"] = item.BUTTON_TITLE;
        gridItem["iconUrl"] = this.$transfromAliyunUrl(item.BUTTON_URL);
        gridItem["isLogin"] = item.IS_LOGIN;

        // 文章id
        gridItem["articleId"] = item.NEWS_ID;

        // 1：活动列表，2：活动详情，3：H5链接 4:文章跳转
        gridItem["linkType"] = item.BUTTON_LINK_TYPE;
        gridItem["1"] = item.GROUP_ID;
        gridItem["2"] = item.DETAIL_ID;
        gridItem["3"] = item.BUTTON_LINK;
        return gridItem;
      })
    },

    // 转换首页活动列表
    renderActivityList (activityList) {
      if (activityList.length === 0) {
        this.isEmptyData = true;
        return;
      }
      this.activityList = activityList.map(item => {
        let newItem = {};
        /**
         * 公共参数
         */
        // 1:需要 0:不需要
        newItem["isLogin"] = item.IS_LOGIN;

        // 模版类型
        newItem["templateType"] = item.LOGO_LINK_TYPE;

        // 活动机构类型，1：比财机构；2：其他机构
        newItem["activityOrgType"] = item.ACTIVITY_ORG_TYPE;
        // 机构id
        newItem["activityOrgId"] = item.ACTIVITY_ORG_ID;
        // 机构名称
        newItem["orgName"] = item.ORG_NAME;
        // 活动LOGO图片地址
        newItem["activityBanner"] = this.$transfromAliyunUrl(item.ACTIVITY_LOGO);
        // 活动标题
        newItem["title"] = item.ACTIVITY_TITLE;
        // 奖品名称
        newItem["desc"] = item.ACTIVITY_REWARD;

        // 文章
        newItem["articleId"] = item.NEWS_ID;
        newItem["articleTitle"] = item.TITLE;
        newItem["articleAuthor"] = item.SOURCE;
        newItem["articleNums"] = item.REAL_CLICK_COUNT;
        newItem["articleDateTime"] = item.NEWS_START_TIME;
        newItem["articleCoverImg"] = item.IMG_URL;

        // 1：活动列表，2：活动详情，3：H5链接 4:文章跳转
        newItem["linkType"] = item.LOGO_LINK_TYPE;
        newItem["1"] = item.GROUP_ID;
        newItem["2"] = item.DETAIL_ID;
        newItem["3"] = item.LOGO_LINK;
        return newItem;

      })
    },

    // 文章点击
    newsItemClick (item) {
      let linkType = item.linkType;
      this.$trackEvents.PCB000A392({ ITEM_VALUE: item.articleId, ITEM_VALUE1: linkType });
      this.$toLinkType(item);
    },

    // 活动点击
    activityItemClick (item) {
      let linkType = item.linkType;
      let target = item[linkType];
      this.$trackEvents.PCB000A392({ ITEM_VALUE: item.title, ITEM_VALUE1: linkType, ITEM_VALUE2: encodeURIComponent(target) });
      this.$toLinkType(item);
    },

    // banner点击
    bannerItemClick (item) {
      let linkType = item.linkType;
      let target = item[linkType];
      this.$trackEvents.PCB000A381({ ITEM_VALUE: item.title, ITEM_VALUE1: linkType, ITEM_VALUE2: encodeURIComponent(target) });
      this.$toLinkType(item);
    },

    // 导航点击
    gridItemClick (item) {
      let linkType = item.linkType;
      let target = item[linkType];
      this.$trackEvents.PCB000A399({ ITEM_VALUE: item.name, ITEM_VALUE1: linkType, ITEM_VALUE2: encodeURIComponent(target) });
      this.$toLinkType(item);
    }
  },

}
</script>

<style lang="less" scoped>
.loading {
  position: absolute;
  width: 100%;
  z-index: 1;
}
.main {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.activity-list {
  padding-bottom: 30px;
  flex: 1;
  position: relative;
}

.banner {
  .swiper-box {
    height: 360px;
    width: 100%;

    .swiper {
      height: 100%;
    }

    .dots {
      display: flex;
      justify-content: center;
      //   margin-top: -22px;
      position: absolute;
      bottom: 15px;
      right: 50%;
      transform: translateX(50%);

      .dot {
        width: 10px;
        height: 10px;
        border-radius: 500px;
        background: rgba(255, 255, 255, 0.5);
        margin: 0 7px;
        transition: width 0.5s;
      }

      .dot-active {
        background: rgba(255, 255, 255, 1);
        width: 22px;
      }
    }
  }

  .main-grid {
    padding: 20px;
  }
}
</style>
