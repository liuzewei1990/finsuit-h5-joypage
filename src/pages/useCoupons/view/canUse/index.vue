<template>
  <div class="can-use" id="can-use">

    <mescroll-vue ref="mescroll" :down="mescrollDown" @init="mescrollInit">
      <div class="mescrollbox">
        <product-card :dataList="dataList" :memCouponId="$route.query.memCouponId" :couponId="$route.query.couponId"></product-card>
      </div>
    </mescroll-vue>

    <template v-if="!dataList.length">
      <productSkeleton></productSkeleton>
    </template>
  </div>
</template>

<script>
import MescrollVue from '../../components/mescroll/mescroll'
import productCard from './modules/productCard'
import productSkeleton from './modules/productSkeleton'
export default {
  components: { productCard, MescrollVue, productSkeleton },
  data () {
    return {
      mescrollDown: {
        callback: this.downCallback
      },
      dataList: []
    };
  },
  created () {
    this.$bcBridge.updateTitle("可用产品")
  },
  mounted () {

  },
  methods: {
    // mescroll组件初始化的回调,可获取到mescroll对象
    mescrollInit (mescroll) {
      this.mescroll = mescroll
    },
    downCallback () {
      // 联网加载数据
      this.getListDataFromNet((data) => {
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
    async getListDataFromNet (successCallback, errorCallback) {
      try {
        let params = { couponId: this.$route.query.couponId, couponVersion: this.$route.query.couponVersion }
        let data = await this.$api.getcanuseProduct(params, { TYPE: "GET_COUPON_PRD_REL_INFO" })
        successCallback(data)
      } catch (error) {
        console.log(error);
        errorCallback && errorCallback()
      }
    },
  }
};
</script>

<style scoped lang="less">
.can-use {
}
.mescrollbox {
  padding-left: 30px;
  background-color: #fff;
}
.mescroll {
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
</style>
