<!-- 任务历史 -->
<template>
  <section class='task-history-page' v-infinite-scroll="loadBottom" infinite-scroll-immediate-check="false" infinite-scroll-disabled="infiniteDisabled" infinite-scroll-distance="80">

    <div class="container">
      <!-- 数据为空 -->
      <EmptyData class="empty-data" v-show="status=='暂无数据'" imgStyle="width:5.46rem;height:4.61rem;margin:0.5rem auto;" :imgUrl="require('../../assets/images/is-empty.png')" text="<span style='font-size:0.35rem; color:#999;'>无内容</span>"></EmptyData>

      <!-- 列表 -->
      <ul class="list">
        <li class="list-item" v-for="(item,index) in list" :key="index">

          <div class="icon">
            <img :src="$transfromAliyunUrl(item.taskIcon)" alt="">
          </div>

          <div class="list-item-inner">
            <div class="content">
              <p class="title">{{item.taskName}}</p>
              <span class="sub-title">{{item.taskDesc}}</span>
            </div>
            <div class="action">
              <span v-show="item.taskStatus == '1'">未完成</span>
              <span v-show="item.taskStatus == '2'">待领取</span>
              <span v-show="item.taskStatus == '3'">已完成</span>
              <span v-show="item.taskStatus == '4'">已失效</span>
            </div>
          </div>
        </li>
      </ul>

      <!-- loadmore -->
      <div class="load-more">
        <Loadmore v-show="status=='请求中'" tip="努力加载中..." :showLoading="true"></Loadmore>
        <Loadmore v-show="status=='没有更多'" tip="已经到底了" :showLoading="false"></Loadmore>
        <Loadmore v-show="status=='请求失败'" tip="加载失败，点我重试" :showLoading="false" @click.native="reLoad"></Loadmore>
      </div>
    </div>
  </section>
</template>

<script>

import EmptyData from "@common/finsuit-components/EmptyData"
import infiniteScroll from "@common/finsuit-plugins/vue-infinite-scroll"
import Loadmore from "../../components/Loadmore"
export default {
  directives: { infiniteScroll },
  components: { EmptyData, Loadmore },
  computed: {
    // 返回true禁用下拉加载
    infiniteDisabled () {
      return this.status == '请求中' || this.status == '没有更多' || this.status == '暂无数据' || this.status == '刷新中';
    }
  },
  data () {
    return {
      list: [],
      status: "",
      query: {},
      loading: this.$Loading()
    };
  },

  created () {
    this.initTab(this.$route.query["orderStatus"]);
  },

  //方法集合
  methods: {
    initTab (orderStatus) {
      orderStatus = orderStatus || "3" // 默认全部
      this.initParams(orderStatus);
    },

    /**
    * 初始化请求参数
    */
    initParams (orderStatus) {
      this.query["type"] = orderStatus;
      this.query["pageSize"] = 20;
      this.query["currentPage"] = 0;
      this.loadTop();
    },

    /**
     * 订单点击
     */
    orderItemClick (item) {
    },

    /**
     * 下拉刷新操作
     */
    async loadTop () {
      if (this.loading.isShow) return;
      this.loading.show();
      try {
        this.query.currentPage++;
        this.status = "刷新中";
        let data = await this.$api.getTaskHistory(this.query).then(this.$interfaceApi.getTaskHistory);
        this.list = data.data;
        this.changeStatus(data);
      } catch (error) {
        this.status = "请求失败";
        this.list = [];
      }
      this.loading.close();
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
        this.query.currentPage++;
        this.status = "请求中";
        let data = await this.$api.getTaskHistory(this.query).then(this.$interfaceApi.getTaskHistory);
        this.list = this.list.concat(data.data || []);
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
        this.status = "请求中";
        let data = await this.$api.getTaskHistory(this.query).then(this.$interfaceApi.getTaskHistory);
        this.list = this.list.concat(data.data || []);
        this.changeStatus(data);
      } catch (error) {
        this.status = "请求失败";
      }
    },

    /**
     * 修改请求状态
     */
    changeStatus (data) {

      if (this.list.length === 0) {
        this.status = "暂无数据";
      } else if (this.query.currentPage >= Math.ceil(data.totalCount / this.query.pageSize)) {
        this.status = "没有更多";
      } else {
        this.status = "请求更多";
      }
    },
  }
}
</script>
<style lang='less' scoped>
.task-history-page {
  min-height: 100vh;
  background: #fff;
  padding: 20px 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  &::after {
    content: "";
    display: block;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 1.5px;
    background: #f2f2f2;
  }
  .container {
    flex: 1;
    position: relative;

    .list-item {
      font-size: 28px;
      padding-left: 30px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
    }

    .icon {
      width: 70px;
      height: 70px;
      margin-right: 30px;
      img {
        width: 100%;
        height: 100%;
      }
    }

    .list-item-inner {
      flex: 1;
      border-bottom: 1.5px solid #eee;
      display: flex;
      align-items: center;
      padding: 30px 30px 30px 0px;

      .content {
        flex: 1;
        .title {
        }
        .sub-title {
          font-size: 24px;
          color: #a3a7ad;
        }
      }
      .action {
        color: #a3a7ad;
      }
    }

    .load-more {
      padding-top: 80px;
      min-height: 180px;
      overflow: hidden;
    }
  }
}
</style>