<template>
  <section id="page" class="main">
    <mescroll-vue ref="mescroll" :down="mescrollDown" @init="mescrollInit">
      <template v-if="dataList.length">
        <coupon-card :toDetail="toDetail" :showTriangle="false" couponesType="2" :dataList="dataList"></coupon-card>
      </template>
      <!-- 暂无数据 -->
      <template v-if="nodata">
        <nodata>
          <p>当前没有失效卡券</p>
        </nodata>
      </template>
    </mescroll-vue>

    <!-- 骨架 -->
    <template v-if="skeletoning">
      <couponeSkeleton></couponeSkeleton>
    </template>
  </section>
</template>

<script>
import MescrollVue from '../../components/mescroll/mescroll'
import couponCard from './modules/couponCard'
import nodata from './modules/noData'
import couponeSkeleton from './modules/couponSkeleton'
export default {
  components: { couponCard, MescrollVue, nodata, couponeSkeleton },
  data () {
    return {
      dataList: [],
      skeletoning: true,
      nodata: false,
      mescrollDown: {
        callback: this.downCallback,
        offset: 70,
        inOffsetRate: 0.4
      },
    }
  },
  created () {
    this.$trackEvents.B000A495();
    this.$bcBridge.updateTitle("已失效券")
  },
  mounted () {
  },

  methods: {
    toDetail (item) {
      this.$trackEvents.B000A496(() => { }, { FROM_ID: item.couponId, ITEM_VALUE: item.couponType });
      this.$router.push({
        path: "/detail",
        query: { memCouponId: item.memCouponId, couponVersion: item.couponVersion }
      })
    },
    // mescroll组件初始化的回调,可获取到mescroll对象
    mescrollInit (mescroll) {
      this.mescroll = mescroll
    },
    downCallback () {
      // 联网加载数据
      this.getListDataFromNet(0, 1, (data) => {
        // 添加新数据到列表顶部
        console.log("down");
        this.dataList = (data instanceof Array) ? data : [];
        // 数据渲染成功后,隐藏下拉刷新的状态
        this.$nextTick(() => {
          this.mescroll.endSuccess()// 结束下拉刷新,无参
        })
      }, () => {
        // 联网失败的回调,隐藏下拉刷新的状态
        this.mescroll.endErr()
      })
    },

    async getListDataFromNet (pageNum, pageSize, successCallback, errorCallback) {
      try {
        let params = { routeKey: "WealCouponAppServiceImpl-getCouponMainPageForInvalid" }
        let data = await this.$api.getnouselist(params, { TYPE: "CAMPAIGN_SERVICE_HANDLER" })
        if (!data.data.length) { this.nodata = true }
        successCallback(data.data)
      } catch (error) {
        console.log(error);
        this.nodata = true;
        errorCallback && errorCallback()
      }
      this.skeletoning = false;
    },
  }
}
</script>

<style lang="less" scoped>
.main {
  min-height: 100vh;
  background: #f5f7fa;

  .mescroll {
    padding: 26px 32px;
    box-sizing: border-box;
    position: fixed;
    top: 0;
    bottom: 0;
    height: auto;
    width: 100%;
    left: -50%;
    right: -50%;
    margin: auto;
    overflow-y: scroll;
  }
}
</style>
