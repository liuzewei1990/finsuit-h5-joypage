<template>
  <section class="news-list">
    <NewsItem v-for="(item,index) in news" :key="index" :item="item" :isItRead="item.articleId | isItRead" @click.native="clickItem(item)"></NewsItem>
  </section>
</template>

<script>
import NewsItem from "@news/components/NewsItem"
import bus from "@common/finsuit-h5/libs/bus.js"
import { isReadStorage } from "@news/utils/js-storage.js"
export default {
  components: { NewsItem },
  data () {
    return {
      news: []
    }
  },
  created () {
    this.renderData();
  },
  filters: {
    // 解析已读标记
    isItRead (articleId) {
      articleId += '';
      return isReadStorage.get(articleId) === "1";
    }
  },
  mounted () {
    bus.$on("pageAppear", () => {
      // 触发用户信息更新,无论用户信息是否发生变化，都会触发更新数据
      // 1.与pageAppear不同的是：每次调用的接口中用户信息是同步的。
      // 2.与watch不同的是：watch只会用户退出或登录时才会触发更新。
      this.$sendLoginResult(this.renderData);
    })
  },
  methods: {
    /**
     * 获取数据
     */
    async renderData () {
      let params = {
        currentPage: "1",
        pageSize: "20",
        NEW_TYPE: "0",
        appFlag: this.$store.state.APP_FLAG || this.$store.state.FROM_APP_FLAG,
        activityId: this.$store.state.ACTITY_ID,
        ACTIVITY_ID: this.$store.state.ACTITY_ID,
        GROUP_CODE: this.$route.query["GROUP_CODE"]
      };
      let data = await this.$api.getHomeData(params);
      this.news = data.news;
      bus.$emit("bannerData", data.banner);
    },

    /**
     * 列表点击
     */
    clickItem (item) {
      let queryStr = {
        articleId: item.articleId,
        articleTitle: item.articleTitle,
        articleAuthor: item.articleAuthor,
        articleDateTime: item.articleDateTime,
      }
      let articleData = encodeURIComponent(JSON.stringify(queryStr));

      let url;
      url = window.location.href.split("#")[0];
      url += `#/detail`
      url += `?ACTITY_ID=${this.$store.state.ACTITY_ID}`;
      url += `&finsuit=finsuit`;
      url += `&articleData=${articleData}`;

      this.$bcBridge.openWebview(url);
      // 已读标记
      isReadStorage.set(item.articleId + "", "1");
    }
  }
}
</script>

<style lang="less" scoped>
.news-list {
  flex: 1;
  background: #fbfbfb;
}
</style>
