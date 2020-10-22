<!-- 轮播图 -->
<template>
  <section class='com-banner' v-show="bannerList.length > 0">
    <Swiper class="swiper" height="100%" :list="bannerList" v-model="bindSwiperIndex" @on-click-list-item="clickBanner" :showDescMask="false" :showDots="false" :loop="true" :auto="true">
      <!--slot dots -->
      <div class="dots" slot="dots" v-show="bannerList.length > 1">
        <div class="dot" :class="{'dot-active':index===bindSwiperIndex}" v-for="(item,index) in bannerList" :key="index"></div>
      </div>
    </Swiper>
  </section>
</template>

<script>
import { mapState, mapActions } from "vuex"
import { Swiper, SwiperItem } from "../../components/Swiper"

export default {
  components: { Swiper, SwiperItem },
  data () {
    return {
      bindSwiperIndex: 0
    }
  },
  computed: {
    ...mapState({
      // 导出数据
      bannerData: state => state.MainConfig.banner,
      // 列表格式化
      bannerList () {
        if (this.bannerData.advList instanceof Array) {
          return this.bannerData.advList.map(item => ({ img: this.$transfromAliyunUrl(item.ADV_IMG_URL), url: item.ADV_URL, title: item.ADV_TITLE }));
        } else {
          return [];
        }
      }
    }),
  },
  created () {
  },
  //方法集合
  methods: {

    // 点击banner
    clickBanner (item) {
      if (!item.url) return;
      this.$trackEvents.PCB000A190({ ITEM_VALUE: item.title });
      this.$bcBridge.openWebview(item.url);
    }
  },
}
</script>
<style lang='less' scoped>
.com-banner {
  height: 180px;
  //   background: url(../../assets/images/header.png) no-repeat;
  //   background-size: 100% 100%;

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
      width: 15px;
      height: 15px;
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