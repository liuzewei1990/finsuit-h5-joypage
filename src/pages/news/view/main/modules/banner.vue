<template>
  <section class="swiper-box" v-show="banner.length">
    <Swiper class="swiper" height="100%" :list="banner" v-model="bindSwiperIndex" @on-click-list-item="activityItemClick" :showDescMask="false" :showDots="false" :loop="true" :auto="true">

      <!--slot dots -->
      <div class="dots" slot="dots" v-show="banner.length > 1">
        <div class="dot" :class="{'dot-active':index===bindSwiperIndex}" v-for="(item,index) in banner" :key="index"></div>
      </div>
    </Swiper>
  </section>
</template>

<script>

import { Swiper, SwiperItem } from "@news/components/Swiper"
import bus from "@common/finsuit-h5/libs/bus.js"
export default {
  components: { Swiper, SwiperItem },
  data () {
    return {
      bindSwiperIndex: 0,
      banner: []
    }
  },
  created () {
    bus.$once("bannerData", this.renderData)
  },
  methods: {
    /**
     * 获取数据
     */
    renderData (list) {
      this.banner = list.map(item => {
        let bannerItem = {};
        bannerItem["img"] = this.$transfromAliyunUrl(item.ACT_IMG_URL);
        bannerItem["bannerUrl"] = item.IMG_LINK_URL;
        return bannerItem;
      })
    },

    /**
     * banner点击调整
     */
    activityItemClick (item) {
      if (!item.bannerUrl) return;
      if (item.bannerUrl.indexOf("http") !== 0) {
        this.$Toast("请检查跳转链接");
        return;
      }
      this.$bcBridge.openWebview(item.bannerUrl);
    },
  }
}
</script>

<style lang="less" scoped>
.swiper-box {
  height: 246px;
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
      width: 13px;
      height: 13px;
      border-radius: 500px;
      background: #aaaaaa;
      margin: 0 7px;
      transition: width 0.5s;
    }

    .dot-active {
      background: rgba(255, 255, 255, 1);
    }
  }
}
</style>
