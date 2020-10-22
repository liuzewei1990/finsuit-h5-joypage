<template>
  <section class="main-module" v-infinite-scroll="loadBottom" infinite-scroll-immediate-check="false" infinite-scroll-disabled="infiniteDisabled" infinite-scroll-distance="80">
    <!-- tab -->
    <div class="tabar">
      <span class="tab" :class="{'tab-active':index === currTabIndex}" @click="tabClick(item,index)" v-for="(item,index) in tabs" :key="index">{{item.tabName}}</span>
    </div>

    <!-- 订单列表 -->
    <div class="container">

      <EmptyData class="empty-data" v-show="status=='暂无数据'" imgStyle="height:3.333333rem;" text="<span style='font-size:0.35rem; color:#999;'>暂未活动痕迹</span>" :imgUrl="require('../../../assets/images/empty-data.png')"></EmptyData>

      <section class="order-list" v-show="status!='暂无数据' && newList.length > 0">
        <!-- order item -->
        <div class="order-item" v-for="(item,index) in newList" :key="index">
          <div class="grup-name" v-show="item.month">{{item.month | handleMonth}}月</div>
          <OrderItem :order="item" :border="item.month == ''" @on-item-click="orderItemClick(item)" :isItRead="item.flowCreateTime | isItRead"></OrderItem>
        </div>
      </section>

      <!-- loadmore -->
      <div class="load-more">
        <Loadmore v-show="status=='请求中'" tip="努力加载中..." :showLoading="true"></Loadmore>
        <Loadmore v-show="status=='没有更多'" tip="没有更多了" :showLoading="false"></Loadmore>
        <Loadmore v-show="status=='请求失败'" tip="加载失败，点我重试" :showLoading="false" @click.native="reLoad"></Loadmore>
      </div>
    </div>
  </section>
</template>

<script>
import EmptyData from "@common/finsuit-components/EmptyData"
import infiniteScroll from "../../../utils/vue-infinite-scroll"
import OrderItem from "../../../components/OrderItem"
import Loadmore from "../../../components/Loadmore"
import { orderClickStorage } from "../../../utils/js-storage.js"
export default {
  directives: { infiniteScroll },
  components: { EmptyData, OrderItem, Loadmore },
  data () {
    return {
      currTabIndex: "",
      tabs: [{
        orderStatus: "3",
        tabName: "全部"
      }, {
        orderStatus: "1",
        tabName: "权益已发放"
      }, {
        orderStatus: "0",
        tabName: "权益待发放"
      }, {
        orderStatus: "2",
        tabName: "权益失效"
      }],
      list: [],
      status: "",
      query: {},
      loading: this.$Loading()
    }
  },
  computed: {
    newList () {
      return this.$apiDataTransfrom(this.list);
    },
    // 返回true禁用下拉加载
    infiniteDisabled () {
      return this.status == '请求中' || this.status == '没有更多' || this.status == '暂无数据' || this.status == '刷新中';
    }
  },
  filters: {
    handleMonth (v) {
      v += "";
      return v.split("-")[1]
    },
    // 解析已读标记
    isItRead (flowCreateTime) {
      flowCreateTime += '';
      return orderClickStorage.get(flowCreateTime) === "1";
    }
  },
  created () {
    this.initTab(this.$route.query["orderStatus"]);
  },
  methods: {
    initTab (orderStatus) {
      orderStatus = orderStatus || "3" // 默认全部
      this.currTabIndex = this.tabs.findIndex(tab => tab.orderStatus === orderStatus);
      this.initParams(orderStatus);
    },

    /**
    * 初始化请求参数
    */
    initParams (orderStatus) {
      this.query["position"] = this.$route.query["position"] || "all";
      this.query["rewardType"] = orderStatus;
      this.query["pageNum"] = 0;
      this.query["routeKey"] = "activityInvestRecordService-getActivityRecordList";
      this.loadTop();
    },

    /**
     * 返回列表最后一条投资时间，给后台去分页
     */
    getLastTime () {
      if (this.newList.length > 0) {
        return this.newList[this.newList.length - 1].flowCreateTime;// 让后台处理
      } else {
        return "";
      }
    },

    /**
     * tab点击
     */
    tabClick (tab, index) {
      if (tab.orderStatus === this.query.type || this.loading.isShow) return;
      this.currTabIndex = index;
      this.animateScrollTop();
      this.initParams(tab.orderStatus);
    },

    /**
     * 订单点击
     */
    orderItemClick (item) {
      //   let encodeOrder = encodeURIComponent(JSON.stringify(item));
      //   this.$router.push({ path: "/newDetail", query: { seqNo: item.tradeFlowNo, customBar: "1" } });
      this.$openWebview(this.$Config.baseUrlHost + "/activity/activityHistory/index.html#/newDetail?seqNo=" + item.tradeFlowNo + "&customBar=1");
      // 使用投资时间作为唯一ID 已读标记
      orderClickStorage.set(item.flowCreateTime + "", "1");
    },

    /**
     * 滚动置顶
     */
    animateScrollTop () {
      let pos = 300;
      let currPosition = document.documentElement.scrollTop || document.body.scrollTop;
      if (currPosition > pos) {
        window.scrollTo(0, pos);
      }
      this.$utils.animateScroll(0, 5);
    },

    /**
     * 下拉刷新操作
     */
    async loadTop () {
      if (this.loading.isShow) return;
      this.loading.show();
      try {
        this.query.pageNum++;
        this.status = "刷新中";
        let data = await this.$api.getActivityInvestment(this.query);
        this.list = data.data.retList;
        this.changeStatus(data);
      } catch (error) {
        this.status = "请求失败";
        this.list = [];
      }
      this.loading.close();
      this.isShowActivityList();
    },

    /**
     * 上拉加载操作
     */
    async loadBottom () {
      if (this.infiniteDisabled) {
        return;
      };
      if (this.status == '请求失败') {
        // this.reLoad();
        return;
      }
      try {
        this.query.pageNum++;
        // this.query.dateTime = this.getLastTime();
        this.status = "请求中";
        let data = await this.$api.getActivityInvestment(this.query);
        this.list = this.list.concat(data.data.retList || []);
        this.changeStatus(data);
      } catch (error) {
        this.status = "请求失败";
      }
    },

    /**
     * 网络错误 重新加载
     */
    async reLoad () {
      try {
        if (this.query.pageNum == 1) this.query.pageNum++;
        this.status = "请求中";
        let data = await this.$api.getActivityInvestment(this.query);
        this.list = this.list.concat(data.data.retList || []);
        this.changeStatus(data);
      } catch (error) {
        this.status = "请求失败";
      }
    },

    /**
     * 修改请求状态
     */
    changeStatus (data) {
      if (this.list === null) {
        this.status = "暂无数据";
      } else if (data.data.retList.length < 10) {
        this.status = "没有更多";
      } else {
        this.status = "请求更多";
      }
    },

    /**
     * 条件符合现实更多活动列表
     */
    isShowActivityList () {
      this.$parent.isShowActivityList = (this.status === "暂无数据");
    }
  }
}
</script>

<style lang="less" scoped>
.main-module {
  .tabar {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 2;
    width: 100%;
    height: 130px;
    background: #fff;
    padding: 0 30px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e5e8f0;
    .tab {
      display: block;
      color: #999;
      background: #f5f5f5;
      padding: 10px 15px;
      border-radius: 4px;
      font-size: 30px;
    }
    .tab-active {
      color: #4f82ff;
      background: rgba(79, 130, 255, 0.2);
    }
  }

  .container {
    min-height: 694px;
    position: relative;
    margin-top: 130px;
  }

  .order-list {
    border-bottom: 1px solid #e5e8f0;
  }

  .grup-name {
    line-height: 92px;
    background: #f6f6f9;
    color: #666666;
    font-size: 32px;
    padding: 0 24px;
    box-sizing: border-box;
    border-bottom: 1px solid #e5e8f0;
    border-top: 1px solid #e5e8f0;
  }

  .load-more {
    padding-top: 80px;
    min-height: 180px;
    overflow: hidden;
  }
}
</style>
