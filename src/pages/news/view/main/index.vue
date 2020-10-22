<template>
  <section id="page" class="main">
    <!-- banner轮播 -->
    <Banner></Banner>
    <!-- 新闻列表 -->
    <NewsList></NewsList>
  </section>
</template>

<script>
import Banner from "./modules/banner"
import NewsList from "./modules/newsList"
export default {
  components: { Banner, NewsList }
}
</script>

<style lang="less" scoped>
.main {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
