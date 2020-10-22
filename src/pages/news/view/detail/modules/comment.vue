<template>
  <section class="detail-comment" ref="comment" v-infinite-scroll="loadBottom" infinite-scroll-immediate-check="false" infinite-scroll-disabled="infiniteDisabled" infinite-scroll-distance="80">

    <div class="title">评论({{totalCount}})</div>

    <div class="comment-list">
      <div class="comment-item" v-for="(item,index) in list" :key="index">
        <div class="user-header" v-lazy:background-image="$transfromAliyunUrl(item.commentUserHeadImg)"></div>
        <div class="user-info">
          <p class="user-phone">
            <span>{{item.commentPhoneNum}}</span>
            <span>{{item.commentCreateTime | date}}</span>
          </p>
          <p class="user-comment">{{item.commentContent}}</p>
        </div>
      </div>
    </div>

    <div style="min-height:80px; overflow: hidden;">
      <Loadmore v-if="status=='请求中'" tip="努力加载中..." :showLoading="true"></Loadmore>
      <Loadmore v-if="status=='没有更多'" tip="没有更多了" :showLoading="false"></Loadmore>
      <Loadmore v-if="status=='请求失败'" tip="加载失败，点我重试" :showLoading="false" @click.native="reLoad"></Loadmore>
      <Loadmore v-if="status=='暂无数据'" tip="暂无评论" :showLoading="false"></Loadmore>
      <!-- <Nodata v-if="status=='暂无数据'" :imgurl="require('@src/assets/img/bg_empty_data.png')" content='暂无收藏记录'></Nodata> -->
    </div>

  </section>
</template>

<script>
import infiniteScroll from "@news/utils/vue-infinite-scroll"
import Loadmore from "@news/components/Loadmore"
export default {
  directives: { infiniteScroll },
  components: { Loadmore },
  data () {
    return {
      list: [],
      status: "",
      totalCount: 0,
      query: {
        pageSize: 20,
        currentPage: 0,
        COMMENT_TYPE: "1",
        OBJ_ID: "",
      },
    }
  },
  filters: {
    date (v) {
      return (v + "").split(" ")[0];
    }
  },
  computed: {
    // 返回true禁用下拉加载
    infiniteDisabled () {
      return this.status == '请求中' || this.status == '没有更多' || this.status == '暂无数据';
    }
  },
  created () {
    this.initParams();
  },
  methods: {
    /**
     * 初始化请求参数
     */
    initParams () {
      let queryArticleData = decodeURIComponent(this.$route.query["articleData"]);
      queryArticleData = JSON.parse(queryArticleData);
      this.query["OBJ_ID"] = queryArticleData.articleId;
    },

    /**
     * 初次加载
     */
    async initPage () {
      try {
        this.query.currentPage = 1;
        let data = await this.$api.getCommentList(this.query);
        this.list = this.list.concat(data.retList || []);
        this.changeStatus(data);
      } catch (error) {
        console.error(error);
      }
    },

    /**
     * 上拉加载操作
     */
    async loadBottom () {
      if (this.infiniteDisabled) {
        return;
      };
      if (this.status == '请求失败') {
        this.reLoad();
        return;
      }
      try {
        this.query.currentPage++;
        this.status = "请求中";
        let data = await this.$api.getCommentList(this.query);
        this.list = this.list.concat(data.retList || []);
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
        if (this.query.currentPage == 1) this.query.currentPage++;
        this.status = "请求中";
        let data = await this.$api.getCommentList(this.query);
        this.list = this.list.concat(data.retList || []);
        this.changeStatus(data);
      } catch (error) {
        this.status = "请求失败";
      }
    },

    /**
     * 修改请求状态
     */
    changeStatus (data) {
      this.totalCount = data.totalCount;
      if (this.list.length === 0) {
        this.status = "暂无数据";
      } else if (this.query.currentPage >= Math.ceil(data.totalCount / this.query.pageSize)) {
        this.status = "没有更多";
      } else {
        this.status = "请求更多";
      }
    },

    /**
     * body滚动条滚动到当前组件位置
     */

    toScrollPositon () {
      let pos = this.$refs["comment"].offsetTop;
      this.$utils.animateScroll(pos);
    }
  }
}
</script>

<style lang="less" scoped>
.detail-comment {
  padding: 24px;
  box-sizing: border-box;
  .title {
    font-size: 28px;
    color: #527be0;
    line-height: 100px;
  }

  .comment-list {
  }

  .comment-item {
    display: flex;
    border-bottom: 1px solid #eee;
    padding: 20px 0;
    box-sizing: border-box;
    .user-header {
      width: 60px;
      height: 60px;
      border-radius: 500px;
      overflow: hidden;
      background-position: center center;
      background-size: 100%;
      background-repeat: no-repeat;
    }

    .user-info {
      flex: 1;
      margin-left: 20px;
    }

    .user-phone {
      font-size: 28px;
      color: #999;
      display: flex;
      justify-content: space-between;
    }

    .user-comment {
      font-size: 28px;
      color: #333;
      margin-top: 20px;
    }
  }
}
</style>
