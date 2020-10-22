<template>
  <section class="news-item">
    <div class="inner-box">
      <div class="info">
        <div class="title">
          <p>{{item.articleTitle}}</p>
        </div>
        <div class="tags">
          <span class="nums" v-show="item.articleNums"><i class="icon icon-nums"></i>{{item.articleNums}}</span>
          <span class="time" v-show="item.articleDateTime"><i class="icon icon-time"></i>{{item.articleDateTime | dateTimeToRelativeTime}}</span>
        </div>
      </div>
      <div class="cover-img yourclass" v-lazy:background-image="`${$transfromAliyunUrl(item.articleCoverImg)}`" :key="`${item.articleCoverImg}`"></div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => { return [] }
    }
  }
}
</script>

<style lang="less" scoped>
.news-item {
  position: relative;
  padding: 0 24px;
  box-sizing: border-box;
  background: #fff;

  .inner-box {
    padding: 24px 0;
    box-sizing: border-box;
    display: flex;
    border-bottom: 1px solid #eee;
  }

  .info {
    flex: 1;
    padding-right: 40px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    .title {
      flex: 1;
    }

    .title p {
      font-size: 28px;
      color: #444;
      font-family: "Microsoft YaHei", Arial, sans-serif;

      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }

    .tags {
      display: flex;
      align-items: center;
    }
    .tags span {
      display: flex;
      align-items: center;
    }
    .nums {
      flex: 1;
      color: #999;
      font-size: 20px;
    }
    .time {
      flex: 1;
      color: #ccc;
      font-size: 20px;
    }
    .icon {
      display: inline-block;
      background-size: 100%;
      background-repeat: no-repeat;
      background-position: center center;
      margin: 0 10px 0 0;
    }
    .icon-nums {
      width: 30px;
      height: 30px;
      background-image: url(./icon-yan.png);
    }
    .icon-time {
      width: 20px;
      height: 20px;
      background-image: url(./icon-time.png);
    }
  }

  .cover-img {
    width: 280px;
    height: 154px;
    // background-image: url(http://dummyimage.com/140x77);
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: center center;
    border-radius: 8px;
  }
}
</style>
