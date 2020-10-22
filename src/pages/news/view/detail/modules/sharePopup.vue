<template>
  <popup v-model="show" position="bottom" :show-mask="true" :hide-on-blur="true" :is-transparent="false" @on-show="$modalHelper.open" @on-hide="$modalHelper.close">
    <div class="box">
      <div class="content">
        <div class="content-item" @click="clickShare(item)" v-for="(item,index) in btns" :key="index">
          <i :class="SHARE_PLACE_TYPE[item.SHARE_PLACE] && SHARE_PLACE_TYPE[item.SHARE_PLACE].icon"></i>
          <span>{{SHARE_PLACE_TYPE[item.SHARE_PLACE] && SHARE_PLACE_TYPE[item.SHARE_PLACE].name}}</span>
        </div>
      </div>
      <div class="btn" @click="show=false">
        取消
      </div>
    </div>
  </popup>
</template>

<script>
import Popup from "@common/finsuit-components/Popup"

export default {
  components: { Popup },
  data () {
    return {
      queryArticleData: JSON.parse(decodeURIComponent(this.$route.query["articleData"])),
      show: false,
      // 按钮列表
      btns: [],
      clickItem: {},
      // btn类型
      SHARE_PLACE_TYPE: {
        "0": {
          name: "微信",
          tName: "好友",
          icon: "icon-wechat"
        },
        "1": {
          name: "朋友圈",
          tName: "朋友圈",
          icon: "icon-wechat-circle"
        },
        "2": {
          name: "QQ",
          tName: "QQ好友",
          icon: "icon-qq"
        },
        "3": {
          name: "QQ空间",
          tName: "QQ空间",
          icon: "icon-qzone"
        },
      },

      shareBtnLoading: this.$Loading(),
    }
  },
  methods: {
    open (shareJson) {
      this.show = true;
      this.btns = shareJson.slice(0, 4);
      window.sharedResult = this.sharedResult;
    },

    close () {
      this.show = false;
    },

    // clickShare
    clickShare (item) {
      this.clickItem = item;
      if (this.shareBtnLoading.isShow) return;
      this.shareBtnLoading.show();
      // 分享方式 0:图片   1:链接  2: 小程序
      const SHARE_TYPE = item.SHARE_TYPE;
      // 分享渠道 0:分享给朋友  1:分享到朋友圈  
      const SHARE_PLACE = Number(item.SHARE_PLACE);

      // 分享标题
      const SHARE_TITLE = item.SHARE_TITLE;
      // 分享描述
      const SHARE_DESC = item.SHARE_DESC;
      // 分享链接 链接 或者 图片地址
      const SHARE_URL = item.SHARE_URL;
      // 分享图标
      const SHARE_IMAGE = item.SHARE_IMAGE;



      switch (SHARE_TYPE) {
        case "0":
          // 注意： SHARE_PLACE 对应sdk标识需要+1 -> 1微信好友，2朋友圈，3 qq，4qq空间
          this.shareImageTo(SHARE_PLACE + 1, SHARE_IMAGE);
          break;
        case "1":
          // 注意： SHARE_PLACE 对应sdk标识需要+1 -> 1微信好友，2朋友圈，3 qq，4qq空间
          this.shareLinkTo(SHARE_PLACE + 1, SHARE_TITLE, SHARE_DESC, SHARE_URL);
          break;
        case "2":
          // 注意： 对应sdk标识需要+1 -> 1微信好友，2朋友圈，3 qq，4qq空间
          this.sharePmpTo(SHARE_PLACE + 1, 0, "pages/index/index?source=" + this.$store.state.APP_FLAG + '&rand=' + Math.random() * 10, SHARE_TITLE, SHARE_DESC, SHARE_IMAGE);
          break;
      }

      this.shareBtnLoading.close(1000);

      // api埋点
      let items = {
        "0": "out-weixin",
        "1": "out-pyq",
        "2": "out-QQ",
        "3": "out-Qqzone",
      }
      this.$trackEvents.PCB000A027({
        ITEM_VALUE: this.queryArticleData.articleId,
        ITEM_VALUE1: items[SHARE_PLACE]
      });
    },

    /**
     * 分享图片类型到 指定渠道
     * @param {Str} SHARE_PLACE     私有域参数
     * @param {Url} IMG_SRC         公共域参数
     */
    async shareImageTo (SHARE_PLACE = 1, IMG_SRC) {
      try {
        // let imgUrl = this.$Config.aliyuncHost + IMG_SRC; IMG_SRC为图片类型时，后台配置全连接
        let imgUrl = IMG_SRC;
        let maxImgBase64 = await this.$utils.toBase64(imgUrl);
        let minImgBase64 = await this.$utils.toBase64(imgUrl, 10);
        let img = maxImgBase64.split("base64,")[1];
        let thumb = minImgBase64.split("base64,")[1];
        let params = {};
        params["type"] = SHARE_PLACE;
        params["img"] = window.android ? maxImgBase64 : img;
        params["thumb"] = window.android ? maxImgBase64 : thumb;
        this.$bcBridge.h5ShareImage(params);
      } catch (error) {
        console.error(error);
        this.$Toast("shareImageTo function error")
      }
    },

    // 分享链接到 指定渠道
    async shareLinkTo (SHARE_PLACE = 1, TITLE = "", CONTENT = "", URL = "") {
      try {
        let params = {};
        params["share_type"] = SHARE_PLACE;
        params["share_title"] = TITLE;
        params["share_msg"] = CONTENT;
        params["share_url"] = URL;
        // params["icon"] = URL; // 小程序的base64
        this.$bcBridge.h5Share(params);
      } catch (error) {
        console.error(error);
        this.$Toast("shareLinkTo function error")
      }
    },

    // 分享小程序到 指定渠道
    async sharePmpTo (SHARE_PLACE = 1, type = 0, path = "", title = "", description = "", IMG_SRC = "") {
      try {
        let imgUrl = this.$Config.aliyuncHost + IMG_SRC; // 分享小程序banner是半链接
        let maxImgBase64 = await this.$utils.toBase64(imgUrl, 2); // 尺寸除以2 否则图片过大
        let minImgBase64 = await this.$utils.toBase64(imgUrl, 10);
        let img = maxImgBase64.split("base64,")[1];
        let thumb = minImgBase64.split("base64,")[1];
        let params = {
          share_type: SHARE_PLACE,
          type: type,
          url: window.location.href,
          user_name: "gh_2f5c0c78f880",
          path: path,
          title: title,
          description: description,
          img: img,
          thumb: window.android ? img : thumb // 缩略图
        };
        this.$bcBridge.h5ShareWXProgram(params);
      } catch (error) {
        console.error(error);
        this.$Toast("sharePmpTo function error")
      }
    },

    // 分享回调 APP调用
    sharedResult (res) {
      this.show = false;
      window.sharedResult = null;
      this.$emit("shareSuccess", this.clickItem);
    }
  }
}
</script>

<style lang="less" scoped>
.box {
  height: 320px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.box .content {
  display: flex;
  flex: 1;
  background: #fff;
  overflow-y: auto;

  .content-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 20px;

    i {
      font-size: 80px;
      //   &::before {
      //     color: #03be02;
      //   }
    }
    span {
      font-size: 30px;
      margin: 5px 0;
    }
  }
}

.box .btn {
  height: 100px;
  line-height: 100px;
  text-align: center;
  margin-top: 4px;
  background: #fff;
  font-size: 30px;
}
</style>
