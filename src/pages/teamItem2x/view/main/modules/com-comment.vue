<!-- 用户为什么选择比财 -->
<template>
  <section class='com-comment' v-show="isShow">
    <div class="btn-box">
      <p class="title">{{title}}</p>
      <span class="refresh" v-show="btnText" @click="refresh"><i class="icon" :class="{'loading-animeta':loading}"></i>{{btnText}}</span>
    </div>
    <span class="sub-title">{{subTitle}}</span>

    <div class="msg-scroll swiper">
      <transition-group tag="div" class="msg-scroll-box">

        <div class="item" v-for="(list,index) in list" :key="list">
          <ul>
            <li v-for="(item,index) in list" :key="index">
              <span class="header">
                <img :src="$transfromAliyunUrl(item.ICON)" alt="">
              </span>
              <p class="ellipsis">
                <span class="name">{{item.NICK_NAME}}：</span>
                <span class="content ellipsis">{{item.CONTENT}}</span>
              </p>
            </li>
          </ul>
        </div>
      </transition-group>
    </div>

    <div class="to-comment">
      <span @click="$checkLogin({action:toComment})">{{commentData.CUSTOM_SPEAK_TITLE||"去发言"}}</span>
    </div>
  </section>
</template>

<script>

import { mapState, mapActions } from "vuex"
import { Swiper, SwiperItem } from "../../../components/Swiper"
export default {
  components: { Swiper, SwiperItem },
  data () {
    return {
      list: [

      ],
      loading: false
    };
  },
  computed: {
    ...mapState({
      // 导出footer数据
      footerData: state => {
        return state.MainConfig.footerData;
      },

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
        return this.commentData.TITLE || "用户为什么选择比财？";
      },

      // 看看大家怎么说
      subTitle () {
        return this.commentData.SUB_TITLE || "看看大家怎么说";
      },

      // 换一批
      btnText () {
        return this.commentData.CUSTOMER_COMMENT_REFRESH_TITLE_BC || "换一换";
      }

    }),
  },
  created () {
  },
  mounted () {
    this.init();
    // this.play();
  },
  //方法集合
  methods: {

    // 初始化
    init () {
      let list = this.commentData.COMMENT_LIST || [];
      let newList = [];
      for (let index = 0; index < list.length; index++) {
        if (index % 3 === 0) newList.push(list.slice(index, 3 + index));
      }
      this.list = newList;
    },

    // 自动
    play () {
      window.requestAnimationFrame(() => {
        let _cache = this.list[0];
        this.list.shift();
        this.list.push(_cache);
        setTimeout(this.play, 2000)
      });
    },

    // 切换swiper
    async refresh () {
      // 打点
      this.$trackEvents.PCB000S008();

      if (this.loading) return;
      this.loading = true;
      try {
        let data = await this.$api.getFooterComment();
        let newItem = data.COMMENT.COMMENT_LIST;
        let _cache = this.list[0];
        this.list.shift();
        for (let index = 0; index < _cache.length; index++) {
          _cache[index].CONTENT = newItem[index].CONTENT;
          _cache[index].ICON = newItem[index].ICON;
          _cache[index].NICK_NAME = newItem[index].NICK_NAME;
        }
        this.list.push(_cache);
      } catch (error) {

      }
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    },

    // 点击去发言
    toComment () {
      // 打点
      this.$trackEvents.PCB000S009();

      let url = this.$Config.pincaiUrl;
      url += "#/toSpeak";
      url += `?ACTITY_ID=${this.$store.state.ACTITY_ID}`;
      url += `&PHONE_CALL=${this.footerData.SERVICE_PHONE_CALL}`;
      url += `&PHONE_SHOW=${this.footerData.SERVICE_PHONE_SHOW}`;
      this.$bcBridge.openWebview(url);
    }
  },
}
</script>
<style lang='less' scoped>
.com-comment {
  .msg-scroll {
    height: 210px;
    /* border: 1px solid red; */
    overflow: hidden;
  }
  .msg-scroll-box {
    margin-top: -210px;
  }

  .v-move {
    transition: transform 0.3s;
  }
  .msg-scroll-box .item:nth-last-child(1) {
    visibility: hidden;
  }
  .msg-scroll-box .item {
  }

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
        background: url(../../../assets/images/refresh.png) no-repeat;
        background-size: 100% 100%;
      }
      .loading-animeta {
        animation: loading 0.8s steps(12, end) infinite;
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
            display: flex;
            align-items: center;
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
    span {
      padding: 20px 30px;
    }
  }
}
</style>