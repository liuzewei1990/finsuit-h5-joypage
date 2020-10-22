<template>
  <div class="swiper-box" v-show="swiperList.length">
    <Swiper class="swiper" height="100%" :list="swiperList" v-model="bindSwiperIndex" @on-click-list-item="activityItemClick" :showDescMask="false" :showDots="false" :loop="true" :auto="true">

      <!--slot dots -->
      <div class="dots" slot="dots" v-show="swiperList.length > 1">
        <div class="dot" :class="{'dot-active':index===bindSwiperIndex}" v-for="(item,index) in swiperList" :key="index"></div>
      </div>
    </Swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from "../../../components/Swiper"
export default {
  components: { Swiper, SwiperItem },
  data () {
    return {
      bindSwiperIndex: 0,
      // 轮播图
      swiperList: [],
    }
  },

  created () {
    this.renderData();
  },

  methods: {
    async renderData () {
      let params = {};
      let data = await this.$api.getBanner(params);
      this.swiperList = data.map(item => {
        item["img"] = this.$transfromAliyunUrl(item["img"]);
        return item;
      });
    },

    // 轮播图点击
    activityItemClick (item) {
      if (!item.link) return;
      if (item.link.indexOf("http") !== 0) {
        this.$Toast("请检查跳转链接");
        return;
      }
      this.$bcBridge.openWebview(item.link);
    }
  }
}
</script>

<style lang="less" scoped>
.swiper-box {
  height: 344px;
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  z-index: 1;

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
    }
  }
}
</style>