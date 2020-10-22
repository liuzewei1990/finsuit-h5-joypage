<template>
  <section>
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
</template>

<script>
import { Swiper, SwiperItem } from "@activityCenter/components/Swiper"
import { Grid, GridItem } from "@activityCenter/components/Grid"
export default {
  props: {
    swiperList: {
      type: Array,
      default: () => { return [] }
    },
    gridList: {
      type: Array,
      default: () => { return [] }
    }
  },
  components: { Swiper, SwiperItem, Grid, GridItem },
  data () {
    return {
      bindSwiperIndex: 0
    }
  },
  methods: {

    bannerItemClick (item) {
      let linkType = item.linkType;
      let target = item[linkType];
      let isLogin = item.isLogin;
      this.$trackEvents.PCB000A381({ ITEM_VALUE: item.title, ITEM_VALUE1: linkType, ITEM_VALUE2: encodeURIComponent(target) });
      this.$toLinkType(linkType, target, isLogin);
    },

    gridItemClick (item) {
      let linkType = item.linkType;
      let target = item[linkType];
      let isLogin = item.isLogin;
      this.$trackEvents.PCB000A399({ ITEM_VALUE: item.name, ITEM_VALUE1: linkType, ITEM_VALUE2: encodeURIComponent(target) });
      this.$toLinkType(linkType, target, isLogin);
    }
  }
}
</script>

<style lang="less" scoped>
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
</style>
