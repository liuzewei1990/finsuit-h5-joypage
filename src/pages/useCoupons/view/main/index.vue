<template>
  <section id="page" class="main">
    <mescroll-vue ref="mescroll" :down="mescrollDown" @init="mescrollInit">
      <div v-if="dataList.length">
        <coupon-card :toDetail="toDetail" :toUse="toUse" :dataList="dataList" couponesType="1"></coupon-card>
      </div>

      <router-link to="/failure" tag="p" class="failure" :class="dataList.length >= 4 ? 'failure2' : 'failure1'">
        <span>查看已失效券</span>
        <arrow></arrow>
      </router-link>

      <!-- 暂无数据 -->
      <template>
        <nodata v-if="nodata">
          <p>当前没有可用卡券</p>
        </nodata>
      </template>

    </mescroll-vue>

    <!-- 骨架 -->
    <template v-if="skeletoning">
      <couponSkeleton></couponSkeleton>
    </template>
  </section>
</template>

<script>
import couponCard from './modules/couponCard'
import nodata from './modules/noData'
import arrow from '../../components/arrow'
import MescrollVue from '../../components/mescroll/mescroll'
import couponSkeleton from './modules/couponSkeleton'
export default {
  components: { couponCard, nodata, arrow, MescrollVue, couponSkeleton },
  data () {
    return {
      dataList: [],
      nodata: false,
      skeletoning: true,
      mescrollDown: {
        callback: this.downCallback,
        offset: 70,
        inOffsetRate: 0.4,

      },
    }
  },
  created () {
    this.$bcBridge.updateTitle("卡券");
  },
  mounted () {
  },

  methods: {
    toDetail (item) {
      this.$router.push({
        path: "/detail",
        query: { memCouponId: item.memCouponId, couponVersion: item.couponVersion }
      })
    },
    toUse (item) {
      this.$trackEvents.B000A492(() => { }, { FROM_ID: item.couponId, ITEM_VALUE: item.couponType });
      this.$router.push({
        path: "/canUse",
        query: { couponId: item.couponId, memCouponId: item.memCouponId, couponVersion: item.couponVersion }
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
        let params = { routeKey: "WealCouponAppServiceImpl-getCouponMainPageForUsable" }
        let data = await this.$api.getcanuselist(params, { TYPE: "CAMPAIGN_SERVICE_HANDLER" })
        if (!data.data.length) { this.nodata = true }
        successCallback(data.data)
      } catch (error) {
        console.log(error);
        this.nodata = true
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
  .failure {
    width: 100%;
    text-align: center;
    font-size: 28px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(80, 140, 238, 1);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .failure1 {
    position: fixed;
    bottom: 116px;
  }
  .failure2 {
    margin-top: 40px;
  }
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
