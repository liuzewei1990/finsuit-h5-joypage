<!-- 零花钱 -->
<template>
  <div class="main" :style="{backgroundColor:backgroundColor,}">
    <div class="activity">
      <!-- 头部 -->
      <div class="header">
        <img class="bg-img" v-if="bannerUrl" :src="$transfromAliyunUrl(bannerUrl)" />
      </div>

      <!-- 活动列表 -->
      <div class="container" :class="{'min-height':activityList.length > 5}">
        <div class="market-box dev" ref="activityList">
          <!-- 小于等于两条时 展示宽版，大于两条时展示，前两条宽版，剩余窄版 -->
          <div class="item dev" :class="(activityList.length === 2 || index === 0)?'item-max':'item-min'" v-for="(item,index) in activityList" :key="index" @click="handleGoItem(item,index)">
            <img :src="$transfromAliyunUrl(item.ACTIVTY_IMG)" alt />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  components: {},
  data () {
    return {
      // 用户是否手动滚动了页面
      isTouchMove: false
    };
  },
  computed: {
    ...mapState({
      backgroundColor: state => state.MainData.backgroundColor,
      bannerUrl: state => state.MainData.bannerUrl,
      activityList: state => state.MainData.activityList
    })
  },
  created () {
    this.getPocketMoney();
  },
  mounted () {
    window.addEventListener("touchstart", () => {
      this.isTouchMove = true;
    }, true);
  },
  //方法集合
  methods: {
    // 956需求 - 用户进入零花钱页面，栏位达到四行，3s内没有任何操作，页面自动向上滚动，滚动至：第一个栏位和导航栏接近处（距离和其他栏位间隔一致）
    autoScrollPage () {
      setTimeout(() => {
        // 如果用户手动滚动了页面，不在自动滚动
        if (this.isTouchMove || this.activityList.length <= 5) return;

        let pos = this.$refs["activityList"].offsetTop - 10;

        // let pos = this.$refs["activityList"].getBoundingClientRect().y;
        console.log("滚动到指定位置为：", pos);
        this.$utils.animateScroll(pos, 3);
      }, 3000);
    },
    // 获取零花钱数据
    async getPocketMoney () {
      try {
        let data = await this.$api.getPocketMoney();
        // 背景色配置
        this.$store.commit("SET_BACKGROUND_COLOR", data.BRANKGROUP_COLOR);
        // banner配置
        this.$store.commit("SET_BANNER_IMG", data.CENTER_IMG_URL);
        // 活动列表
        this.$store.commit("SET_ACTIVITY_LIST", data.QUERY_ACTIVTY_CENTERS);

        this.autoScrollPage();
      } catch (error) {
        console.error("获取零花钱数据：", error);
      }
    },
    // 获取图片点击事件数据
    async getInfoUrl (linkurl) {
      try {
        let params = {
          LINK_URL: encodeURIComponent(linkurl)
        }
        let data = await this.$api.getInfoUrl(params);
        // 跳转
        this.$bcBridge.openWebview(data.url);
      } catch (error) {
        console.error("获取零花钱点击数据：", error);
      }
    },
    // 跳转
    handleGoItem (item) {
      if (item.ACTIVTY_URL) {
        // 打点
        let params = {
          ITEM_VALUE: item.ID, //banner_id
          ITEM_VALUE1: item.ACTIVTY_NAME, //活动名称
          ITEM_VALUE2: item.ACTIVTY_ID //活动ID
        };
        if (this.$store.state.APP_FLAG === "PC") {
          this.$trackEvents.PCB000A265(params);
        } else if (this.$store.state.APP_FLAG === "BC") {
          this.$trackEvents.B000A249(params);
        }
        this.getInfoUrl(item.ACTIVTY_URL)
      }
    }
  }
};
</script>
<style lang='less' scoped>
.main {
  width: 100%;
  min-height: 100vh;
  .activity {
    padding-bottom: 70px;
    .header {
      height: 405px;
      .bg-img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .container {
  }

  .min-height {
    // min-height: calc(100vh - 26px - 70px);
  }

  .market-box {
    display: flex;
    // justify-content: end;
    align-items: flex-start;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0 26px;
    box-sizing: border-box;
    img {
      width: 100%;
      height: 100%;
    }

    .item {
      border-radius: 20px;
      overflow: hidden;
    }

    .item-max {
      width: 100%;
      height: 280px;
      border-radius: 12px;
      margin-bottom: 24px;
    }

    .item-min {
      // width: 339px;
      width: 48.5%;
      height: 280px;
      border-radius: 12px;
      margin-bottom: 20px;
    }
  }
}
</style>
