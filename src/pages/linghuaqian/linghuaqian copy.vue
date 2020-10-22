<!-- 零花钱 -->
<template>
  <div class="main" :style="{backgroundColor:backgroundColor,}">
    <div class="activity">
      <div class="header">
        <img class="bg-img" v-if="bannerUrl" :src="$transfromAliyunUrl(bannerUrl)">
      </div>
      <div :class="content">
        <div class='div-img'>
          <div class="li-img" v-for="(item,index) in activityList" :key="index">
            <img :src="$transfromAliyunUrl(item.ACTIVTY_IMG)" @click.stop="handleGoItem(item)">
          </div>
          <div style="clear:both"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapState, mapActions } from "vuex"
export default {
  components: {},
  data () {
    return {
      content: 'content-more',
    };
  },
  computed: {
    ...mapState({
      backgroundColor: state => state.MainData.backgroundColor,
      bannerUrl: state => state.MainData.bannerUrl,
      activityList: state => state.MainData.activityList,
    })
  },
  created () {
    this.getPocketMoney();
  },
  mounted () {
  },
  //方法集合
  methods: {
    // 获取零花钱数据
    async getPocketMoney () {
      try {
        let data = await this.$api.getPocketMoney();
        this.$store.commit("SET_BACKGROUND_COLOR", data.BRANKGROUP_COLOR);
        this.$store.commit("SET_BANNER_IMG", data.CENTER_IMG_URL);
        this.$store.commit("SET_ACTIVITY_LIST", data.QUERY_ACTIVTY_CENTERS);
        // 采用哪种布局
        this.content = (data.QUERY_ACTIVTY_CENTERS.length === 2) ? 'content-two' : 'content-more';
      } catch (error) {
        console.error("获取零花钱数据：", error);
      }
    },
    // 跳转
    handleGoItem (data) {
      if (data.ACTIVTY_URL) {
        // if (data.ACTIVTY_CODE == "EARN" && !this.$store.getters.isLogin) {//连连赚需要登录
        //   this.$bcBridge.goLogin();
        //   return
        // }
        // if (data.ACTIVTY_CODE == "SINGINF" && !this.$store.getters.isLogin) {//签到需要登录
        //   this.$bcBridge.goLogin();
        //   return
        // }
        // if (data.ACTIVTY_CODE == "DAILY_TASK_ACTIVITY" && !this.$store.getters.isLogin) {//每日任务需要登录
        //   this.$bcBridge.goLogin();
        //   return
        // }
        // 打点
        let params = {
          ITEM_VALUE: data.ID,//banner_id
          ITEM_VALUE1: data.ACTIVTY_NAME,//活动名称
          ITEM_VALUE2: data.ACTIVTY_ID//活动ID
        };
        if (this.$store.state.APP_FLAG === "PC") {
          this.$trackEvent.PCB000A265(params);
        } else if (this.$store.state.APP_FLAG === "BC") {
          this.$trackEvent.B000A249(params);
        }

        // 跳转
        this.$bcBridge.openWebview(data.ACTIVTY_URL);
      }
    }
  },
}
</script>
<style lang='less' scoped>
.main {
  width: 100%;
  min-height: 100vh;
  .activity {
    padding-bottom: 72px;
    .header {
      height: 411px;
      .bg-img {
        width: 100%;
        height: 100%;
      }
    }

    .content-more {
      .div-img {
        width: 698px;
        margin: 0 auto 0;
        display: flex;
        flex-wrap: wrap;
        .li-img {
          width: 338px;
          margin-top: 21px;
          float: left;
          img {
            border-radius: 8px;
            width: 100%;
            height: 100%;
          }
        }
        .li-img:nth-child(odd) {
          margin-left: 21px;
        }
        .li-img:first-child {
          width: 100%;
          float: none;
          margin-left: 0;
        }
      }
    }
    .content-two {
      .div-img {
        width: 698px;
        margin: 11px auto 0.2rem;
        div:nth-of-type(1) {
          margin-top: 10px;
        }
        .li-img {
          border-radius: 3px;
          height: 3.6rem;
          margin-top: 20px;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}
</style>
