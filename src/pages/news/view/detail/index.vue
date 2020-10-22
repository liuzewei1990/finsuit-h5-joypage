<template>
  <section id="page" class="detail">
    <!-- 文章模块 -->
    <Article ref="Article"></Article>

    <!-- 推荐产品模块 -->
    <Products ref="Products" v-if="PAGE_Config.showPrds"></Products>

    <!-- 评价列表模块 -->
    <Comment ref="Comment" v-if="PAGE_Config.showComment"></Comment>

    <!-- 底部bar -->
    <FooterBar ref="FooterBar" v-if="PAGE_Config.showFooter"></FooterBar>

    <!-- 分享popup -->
    <SharePopup ref="SharePopup" v-if="PAGE_Config.showFooter"></SharePopup>

    <!-- 分享后站外下载按钮 -->
    <DownApp title="拼财" subTitle="银行产品 一键直达" v-if="PAGE_Config.showDown"></DownApp>
  </section>
</template>

<script>
import Article from "./modules/article.vue"
import Comment from "./modules/comment.vue"
import FooterBar from "./modules/footerBar.vue"
import Products from "./modules/products.vue"
import SharePopup from "./modules/sharePopup.vue"
import DownApp from "@news/components/DownApp"
export default {
  components: { Article, Comment, FooterBar, Products, SharePopup, DownApp },
  data () {
    return {
      PAGE_Config: {
        showLikeBtn: Number(this.$route.query["showLikeBtn"] || "1"),
        showPrds: Number(this.$route.query["showPrds"] || "1"),
        showComment: Number(this.$route.query["showComment"] || "1"),
        showFooter: Number(this.$route.query["showFooter"] || "0"),
        showDown: Number(this.$route.query["showDown"] || "0"),
      }
    }
  }
}
</script>

<style lang="less" scoped>
.detail {
  min-height: 100vh;
  background: #fff;
  padding: 0px 0px 100px;
  box-sizing: border-box;

  font-family: "Microsoft YaHei", Arial, sans-serif;
}
</style>
