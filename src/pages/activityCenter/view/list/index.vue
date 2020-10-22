<template>
  <section class="activity-list">
    <empty-data v-show="isEmptyData" text="当前分类暂无数据"></empty-data>
    <div v-for="(item,index) in activityList" :key="index">
      <!-- 活动 -->
      <ActivityItem class="mar-top-20" v-if="item.templateType=='1'" :item="item" @on-item-click="activityItemClick(item)" :showTag="true" :showRate="true" />
      <ActivityItem class="mar-top-20" v-if="item.templateType=='2'" :item="item" @on-item-click="activityItemClick(item)" :showTag="true" :showRate="true" />
      <ActivityItem class="mar-top-20" v-if="item.templateType=='3'" :item="item" @on-item-click="activityItemClick(item)" :showTag="true" :showRate="true" />
      <!-- 资讯 -->
      <NewsItem class="mar-top-20" v-if="item.templateType=='4'" :item="item" @click.native="newsItemClick(item)"></NewsItem>
    </div>
  </section>
</template>

<script>
import ActivityItem from "@activityCenter/components/ActivityItem"
import NewsItem from "@activityCenter/components/NewsItem"
import EmptyData from "@common/finsuit-components/EmptyData"
export default {
  components: { ActivityItem, EmptyData, NewsItem },
  data () {
    return {
      activityList: [],
      isEmptyData: false,
      title: "活动列表",
    }
  },

  created () {
    this.renderData();
    this.$trackEvents.PCB000A395({ ITEM_VALUE: this.$route.query["id"] });
  },

  methods: {
    async renderData () {
      let params = { GROUP_ID: this.$route.query["id"] };
      let data = await this.$api.getActivityList(params);
      console.debug("获取列表页数据", data);
      this.renderActivityList(data);
      this.$bcBridge.updateTitle(this.title);
    },

    renderActivityList (activityList) {
      if (activityList.length == 0) {
        this.isEmptyData = true;
        return;
      }
      this.activityList = activityList.map(item => {
        // 页面分类标题
        item.GROUP_NAME && (this.title = item.GROUP_NAME);

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
        // 星级
        newItem["level"] = item.STAR_LEVEL;
        // 星级描述
        newItem["levelDesc"] = item.STAR_LEVEL_TITLE;

        // 文章
        newItem["articleId"] = item.NEWS_ID;
        newItem["articleTitle"] = item.TITLE;
        newItem["articleAuthor"] = item.SOURCE;
        newItem["articleNums"] = item.REAL_CLICK_COUNT;
        newItem["articleDateTime"] = item.NEWS_START_TIME;
        newItem["articleCoverImg"] = item.IMG_URL;

        // 1：活动列表，2：活动详情，3：H5链接
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
      this.$trackEvents.PCB000A397({ ITEM_VALUE: item.articleId, ITEM_VALUE1: linkType });
      this.$toLinkType(item);
    },

    // 活动点击
    activityItemClick (item) {
      let linkType = item.linkType;
      let target = item[linkType];
      this.$trackEvents.PCB000A397({ ITEM_VALUE: item.title, ITEM_VALUE1: linkType, ITEM_VALUE2: encodeURIComponent(target) });
      this.$toLinkType(item);
    }
  }
}
</script>

<style lang="less" scoped>
.activity-list {
  position: relative;
  min-height: 100vh;
  padding-bottom: 30px;
  box-sizing: border-box;
}
</style>
