<template>
  <section class="detail-footerBar show">
    <input class="input" @click="toComment" v-if="$browser.OS === 'IOS' && $utils.isVersion($browser.OS_VERSION, '13')" type="text" placeholder="写评论">
    <div class="input" @click="toComment" v-else>写评论...</div>
    <div class="icon icon-comment" @click="toCommentPosition"></div>
    <div class="icon icon-share" @click="showSharePopup"></div>
  </section>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      shareApiLoading: this.$Loading(),
      queryArticleData: JSON.parse(decodeURIComponent(this.$route.query["articleData"]))
    }
  },
  methods: {

    /**
     * 去评论
     */
    toComment () {
      if (this.$browser.OS === "IOS") {
        setTimeout(() => {
          this.$router.push({ path: "comment", query: { articleId: this.queryArticleData.articleId } });
        }, 100);
      } else {
        this.$router.push({ path: "comment", query: { articleId: this.queryArticleData.articleId } });
      }
    },

    /**
     * 滚动条滚动到评论列表位置
     */
    toCommentPosition () {
      this.$parent.$refs["Comment"].toScrollPositon();
    },

    // 设置本地分享按钮
    setShareButton () {
      let data = [{ SHARE_PLACE: "0" }, { SHARE_PLACE: "1" }, { SHARE_PLACE: "2" }, { SHARE_PLACE: "3" }]
      let shareJson = this.getShareJson(data);
      this.$parent.$refs["SharePopup"].open(shareJson);
    },

    /**
     * 打开分享弹窗
     */
    async showSharePopup () {
      // api埋点
      this.$trackEvents.PCB000A026({ ITEM_VALUE: this.queryArticleData.articleId });

      this.setShareButton();
      return;
      try {
        if (this.shareApiLoading.isShow) return;
        this.shareApiLoading.show();
        let params = {
          APP_PLACE: "2",
          ACTITY_CODE: this.$Config.actityCode,
        }
        let data = await this.$api.getShareBtn(params);
        if (data.length === 0) {
          this.$Toast("请配置分享按钮");
          return;
        }
        let shareJson = this.getShareJson(data);
        this.$parent.$refs["SharePopup"].open(shareJson);
      } catch (error) {
        console.error(error);
      }
      this.shareApiLoading.close();
    },

    /**
     * 获取分享数据
     */
    getShareJson (data) {
      let shareTitle = this.$parent.$refs["Article"].articleData.articleTitle;
      let shareDesc = this.$parent.$refs["Article"].articleData.articleShareDesc;
      let shareLink = this.getShareLink();
      return data.map(item => {
        // 分享方式 0:图片   1:链接  2: 小程序
        item["SHARE_TYPE"] = "1";
        // 分享渠道 0:分享给朋友  1:分享到朋友圈   2: QQ 3:QQ空间
        item["SHARE_PLACE"] = item.SHARE_PLACE;

        // 分享标题
        item["SHARE_TITLE"] = shareTitle;
        // 分享描述
        item["SHARE_DESC"] = shareDesc;
        // 分享链接
        item["SHARE_URL"] = shareLink;
        // 分享IOCN或者图片
        item["SHARE_IMAGE"] = "";

        return item;
      });
    },

    /**
     * 获取分享链接
     */
    getShareLink () {
      let url;
      url = window.location.href.split("#")[0];
      url += `?a=1`;
      url += `#/detail`;
      // 活动id
      url += `?ACTITY_ID=${this.$store.state.ACTITY_ID}`;
      // 站外打开时来源APP_FLAG
      url += `&FROM_APP_FLAG=${this.$store.state.APP_FLAG}`;
      // 是否显示点赞按钮
      url += `&showLikeBtn=0`;
      // 是否显示产品列表
      url += `&showPrds=0`;
      // 是否显示评论
      url += `&showComment=1`;
      // 是否显示底部footer分享
      url += `&showFooter=0`;
      // 是否显示站外下载
      url += `&showDown=1`;
      // 跟踪文章id等数据
      url += `&articleData=${encodeURIComponent(this.$route.query["articleData"])}`;
      return url;
    }
  }
}
</script>

<style lang="less" scoped>
.detail-footerBar {
  width: 100%;
  height: 98px;
  background: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  box-shadow: 0px 2px 8px 2px rgba(169, 169, 169, 0.5);
  display: flex;
  align-items: center;
  padding: 0 24px;
  box-sizing: border-box;

  .input {
    width: 482px;
    height: 68px;
    background: #f7f7f7;
    border: 2px solid #e8e8e8;
    display: flex;
    align-items: center;
    padding-left: 26px;
    box-sizing: border-box;
    font-size: 28px;
    color: #999999;
    border-radius: 500px;
  }

  .icon {
    width: 48px;
    height: 48px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }

  .icon-comment {
    margin: 0 50px;
    background-image: url(../../../assets/images/msg.png);
  }
  .icon-share {
    background-image: url(../../../assets/images/share.png);
  }
}

.show {
  animation: show 0.3s 0.5s both;
}
@keyframes show {
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0%);
  }
}
</style>
