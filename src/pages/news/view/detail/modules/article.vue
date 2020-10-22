<template>
  <section class="detail-article">
    <div class="container">
      <div class="header">
        <h2 class="title">{{articleData.articleTitle}}</h2>
        <p class="desc"><span>{{articleData.articleAuthor}}</span><span>{{articleData.articleDateTime}}</span></p>
      </div>
      <div class="content common-rich-max-img" ref="htmlContent" v-html="articleData.articleContent">

      </div>
      <!-- <div class="content" v-html="articleData.articleContent"> -->

      <!-- </div> -->
      <div class="footer" v-show="$parent.PAGE_Config.showLikeBtn == '1'">
        <a href="javascript:void(0);" class="btn btn-up" @click="$checkLogin({action:upStars,data:'1'})">
          <i class="icon icon-up"></i>
          <span :class="{'checked':articleData.articleUserIsLike == '1'}">赞<i v-show="articleData.articleStars">（{{articleData.articleStars}}）</i></span>
        </a>
        <a href="javascript:void(0);" class="btn btn-down" @click="$checkLogin({action:upStars,data:'2'})">
          <i class="icon icon-down"></i>
          <span :class="{'checked':articleData.articleUserIsLike == '2'}">不喜欢</span>
        </a>
      </div>
    </div>
  </section>
</template>

<script>
import bus from "@common/finsuit-h5/libs/bus.js"
import { isLikeStorage } from "@news/utils/js-storage.js"
export default {
  components: {},
  data () {
    return {
      queryArticleData: JSON.parse(decodeURIComponent(this.$route.query["articleData"])),
      iframeSrc: "",
      // 文章
      articleData: {
        articleId: "",
        articleTitle: "",
        articleAuthor: "",
        articleDateTime: "",
        articleContent: "",
        articleStars: "",
        articleUserIsLike: "",
        articleShareDesc: "",
      }
    }
  },
  mounted () {
    this.renderQueryData();
    this.renderData();
  },
  methods: {
    /**
     * 渲染title
     */
    renderQueryData () {
      this.articleData.articleId = this.queryArticleData.articleId;
      this.articleData.articleTitle = this.queryArticleData.articleTitle;
      this.articleData.articleAuthor = this.queryArticleData.articleAuthor;
      this.articleData.articleDateTime = this.queryArticleData.articleDateTime;
    },

    /**
     * 请求详情接口
     */
    async renderData () {
      let params = { ID: this.articleData.articleId };
      let data = await this.$api.getArticleDetail(params);
      this.articleData.articleId = data.articleId;
      this.articleData.articleTitle = data.articleTitle;
      this.articleData.articleAuthor = data.articleAuthor;
      this.articleData.articleDateTime = data.articleDateTime;
      this.articleData.articleContent = this.handleHtmlStyle(data.articleContent);
      this.articleData.articleStars = data.articleStars;
      this.articleData.articleUserIsLike = isLikeStorage.get(this.articleData.articleId);
      this.articleData.articleShareDesc = data.articleShareDesc;

      //   this.createIframe();

      // 派发产品数据到组件中
      bus.$emit("onProducts", data.productsList);

      // 显示footerBar
      this.$parent.PAGE_Config.showFooter = 1;

    },

    /**
     * 过滤富文本全局style样式
     */
    handleHtmlStyle (articleContent) {
      return articleContent.replace(/<style([\s\S]*)<\/style>/g, "");
    },

    /**
     * 文章点赞
     */
    async upStars (type) {
      if (this.articleData.articleUserIsLike) {
        this.$Toast("您已经表过态了")
        return;
      }

      let params = {
        QRY_TYPE: type,//1:"喜欢" 2:“不喜欢”
        OBJ_TYPE: "1", // 1：理财圈（资讯）
        OBJ_ID: this.articleData.articleId // 点击对象ID
      };

      let data = await this.$api.postStars(params);
      if (type == "1") {
        this.articleData.articleStars++;
        this.$Toast("点赞成功");
      }
      // 记录是否点赞
      this.articleData.articleUserIsLike = type;
      isLikeStorage.set(this.articleData.articleId + "", type);

      // api埋点
      if (type == "1") {
        this.$trackEvents.PCB000A028({ ITEM_VALUE: this.queryArticleData.articleId });
      } else {
        this.$trackEvents.PCB000A029({ ITEM_VALUE: this.queryArticleData.articleId });
      }
    },

    /**
     * 加载iframe渲染富文本
     */
    createIframe () {

      window.iframeHeight = (h) => {
        var iframe = document.getElementById("menuFrame");
        iframe.height = h + 0;
      }

      let iframeSrc = "";
      iframeSrc = window.location.href.split("#")[0];
      iframeSrc += `#/iframe`
      iframeSrc += `?ACTITY_ID=${this.$store.state.ACTITY_ID}`;
      iframeSrc += `&articleData=${this.$route.query["articleData"]}`;

      iframeSrc += `&PMP_FLAG=${this.$store.state.APP_FLAG}`;
      iframeSrc += `&MEMBER_ID=${this.$store.state.ID}`;
      iframeSrc += `&PHONE_NUM=${this.$store.state.PHONE_NUM}`;
      iframeSrc += `&TOKEN=${this.$store.state.TOKEN}`;
      iframeSrc += `&SESSION_ID=${this.$store.state.SESSION_ID}`;
      iframeSrc += `&DEVICE_ID=${this.$store.state.DEVICE_ID}`;
      iframeSrc += `&SYSTEM_TYPE=${this.$store.state.SYSTEM_TYPE}`;
      iframeSrc += `&VERSION=${this.$store.state.VERSION}`;
      console.debug("当前文章详情iframe地址：", iframeSrc);

      let iframe = document.createElement('iframe');
      this.$refs["htmlContent"].appendChild(iframe);
      iframe.src = iframeSrc;
      iframe.id = "menuFrame";
      iframe.frameBorder = "0";
      iframe.scrolling = "no";
      iframe.width = "100%";
      iframe.onload = () => {
        window.frames[0].setContent(this.articleData.articleContent);
      };
    }
  }
}
</script>

<style lang="less" scoped>
.detail-article {
  .header {
    text-align: center;
    padding: 24px 24px 40px;
    box-sizing: border-box;
    .title {
      font-size: 36px;
      color: #333333;
      margin: 10px 0;
    }

    .desc {
      color: #999999;
      font-size: 28px;
      span {
        margin: 0 10px;
      }
    }
  }

  .content {
    padding: 0 24px;
    box-sizing: border-box;
    min-height: 800px;
    background: #fff;
    text-align: justify;
  }

  .footer {
    padding: 50px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;

    .btn {
      min-width: 242px;
      height: 72px;
      padding: 0 20px 0 25px;
      box-sizing: border-box;
      border: 1px solid #cfcfcf;
      border-radius: 500px;
      display: flex;
      align-items: center;
      font-size: 28px;
    }

    .btn .icon {
      width: 40px;
      height: 48px;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      margin-right: 20px;
    }

    .btn .icon-up {
      background-image: url(../../../assets/images/up.png);
      position: relative;
      top: -5px;
    }

    .btn .icon-down {
      background-image: url(../../../assets/images/down.png);
      position: relative;
      //   top: 5px;
    }

    span {
      flex: 1;
      //   text-align: center;
      font-size: 28px;
      color: #999;
    }

    .checked {
      color: #527be0;
    }
  }
}
</style>
