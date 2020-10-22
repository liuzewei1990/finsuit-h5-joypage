<!-- 用户为什么选择比财 -->
<template>
  <section class='com-comment' v-show="isShow">
    <div class="btn-box">
      <p class="title">{{title}}</p>
      <span class="refresh" v-show="btnText" @click="refresh"><i class="icon"></i>{{btnText}}</span>
    </div>
    <span class="sub-title">{{subTitle}}</span>
    <Swiper class="swiper" v-model="swiperIndex" :height="height" :loop="true" direction="vertical" :interval="2000" :duration="500" :show-dots="false">
      <SwiperItem class="item" v-for="(list,index) in commentList" :key="index">
        <ul>
          <li v-for="(item,index) in list" :key="index">
            <span class="header">
              <img :src="$transfromAliyunUrl(item.ICON)" alt="">
            </span>
            <p class="ellipsis">
              <span class="name ellipsis">{{item.NICK_NAME}}：</span>
              <span class="content">{{item.CONTENT}}</span>
            </p>
          </li>
        </ul>
      </SwiperItem>
    </Swiper>
    <div class="to-comment">
      <span>去发言</span>
    </div>
  </section>
</template>

<script>

import { mapState, mapActions } from "vuex"
import { Swiper, SwiperItem } from "../../components/Swiper"
export default {
  components: { Swiper, SwiperItem },
  data () {
    return {
      height: window.lib.flexible.rem2px(2.8) + "px",
      swiperIndex: 0
    };
  },
  computed: {
    ...mapState({
      // 导出bank数据
      commentData: state => {
        return state.MainConfig.commentData;
      },

      // 是否显示模块
      isShow () {
        return this.commentData.OPEN == 0 ? true : false
      },

      // 用户为什么选择比财
      title () {
        return this.commentData.TITLE;
      },

      // 看看大家怎么说
      subTitle () {
        return this.commentData.SUB_TITLE;
      },

      // 换一批
      btnText () {
        return this.commentData.CUSTOMER_COMMENT_REFRESH_TITLE_BC;
      },

      // 评论列表
      commentList () {
        let list = this.commentData.COMMENT_LIST || [];
        let newList = [];
        for (let index = 0; index < list.length; index++) {
          if (index % 3 === 0) newList.push(list.slice(index, 3 + index));
        }
        return newList;
      }

    }),
  },
  created () {
    this.getData();
    this.pushCommentList();
    this.pushCommentList();
    this.pushCommentList();
    this.pushCommentList();
    this.pushCommentList();
  },
  mounted () {

  },
  //方法集合
  methods: {
    // 切换swiper
    async refresh () {
      this.swiperIndex += 1;
    },

    // 获取下一批评论
    async getData () {
      let data = await this.$api.getFooterComment();
      this.$store.commit("SET_COMMENT_DATA", data.COMMENT);
    },

    // push评论
    async pushCommentList () {
      let data = await this.$api.getFooterComment();
      this.$store.commit("SET_COMMENT_LIST", data.COMMENT.COMMENT_LIST);
    }
  },
}
</script>
<style lang='less' scoped>
.com-comment {
  padding: 30px;
  background: #fff;
  font-family: "Microsoft YaHei", Arial, sans-serif;
  //   font-family: -apple-system, BlinkMacSystemFont, "PingFang SC",
  //     "Helvetica Neue", STHeiti, "Microsoft Yahei", Tahoma, Simsun, sans-serif;
  .btn-box {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 10px;
    .title {
      flex: 1;
      font-size: 32px;
      color: #333333;
    }
    .refresh {
      font-size: 20px;
      color: #666;
      display: flex;
      align-items: center;
      .icon {
        display: inline-block;
        margin-right: 10px;
        width: 35px;
        height: 35px;
        background: url(../../assets/images/refresh.png) no-repeat;
        background-size: 100% 100%;
      }
    }
  }

  .sub-title {
    font-size: 24px;
    color: #666;
  }

  .swiper {
    margin: 20px 0 0;
    .item {
      ul {
        li {
          display: flex;
          align-items: center;
          font-size: 24px;
          padding: 10px 0;

          .header {
            display: inline-block;
            width: 48px;
            height: 48px;
            border-radius: 500px;
            overflow: hidden;
            img {
              width: 100%;
              height: 100%;
            }
          }
          p {
            flex: 1;
            margin-left: 10px;
          }

          .name {
            color: #666;
            max-width: 300px;
            display: inline-block;
          }

          .content {
            color: #333;
          }
        }
      }
    }
  }

  .to-comment {
    text-align: center;
    color: #3b6adc;
    font-size: 24px;
  }
}
</style>