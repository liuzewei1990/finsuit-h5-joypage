<!-- 分享组件示例 -->
<template>
  <section class=''>

    <h2 class="mar-top-30">分享组件演示</h2>
    <Button type="primary" @click.native="show">分享</Button>

    <SharePopup ref="SharePopup">
      <div class="login" slot="header">自定义头部插槽</div>
      <div class="share" slot-scope="data">
        <div class="share-btn" @click="$refs['SharePopup'].clickShare(item)" v-for="(item,index) in data.btns" :key="index">
          <i :class="data.btnTypes[item.SHARE_PLACE] && data.btnTypes[item.SHARE_PLACE].icon"></i>
          <span>{{data.btnTypes[item.SHARE_PLACE] && data.btnTypes[item.SHARE_PLACE].name}}</span>
        </div>
      </div>
      <div class="login" slot="footer">自定义底部插槽</div>
    </SharePopup>
  </section>
</template>

<script>

import SharePopup from "@common/finsuit-components/SharePopup"
// import SharePopup from "@common/finsuit-components/SharePopup/index.3.0.vue"
import Button from "@common/finsuit-components/Button"
export default {
  components: { SharePopup, Button },
  data () {
    return {
      shareJson: [{ SHARE_PLACE: 0 }, { SHARE_PLACE: 1 }]
    }
  },
  mounted () {
    this.$refs.SharePopup.$on("clickShareBtn", this.clickShareBtn);
  },
  methods: {

    show () {
      let shareJson = this.getSahreJson();
      this.$refs.SharePopup.open(shareJson, this.shareCallBack);
    },

    getSahreJson () {
      let shareJson = JSON.parse(JSON.stringify(this.shareJson));
      return shareJson.map(item => {
        // 分享按钮是否自行调用，如果需要处理其他逻辑的话
        item["returnBtn"] = item.SHARE_PLACE == 0 ? true : false;
        // 分享方式 0:图片   1:链接  2: 小程序
        item["SHARE_TYPE"] = item.SHARE_TYPE || 1;
        // 分享渠道 0:分享给朋友  1:分享到朋友圈   2: QQ 3:QQ空间
        item["SHARE_PLACE"] = item.SHARE_PLACE;

        // 分享的图片地址或者小程序封面图
        item["SHARE_IMAGE"] = item.SHARE_URL;
        // 分享标题
        item["SHARE_TITLE"] = item.SHARE_TITLE || "默认标题";
        // 分享描述
        item["SHARE_DESC"] = item.SHARE_CONTENT || "默认描述";
        // 分享链接
        item["SHARE_URL"] = "http://www.baidu.com";
        return item;
      })
    },

    // 分享按钮点击回调
    clickShareBtn (item, btnType) {
      console.log(item, btnType);
      this.$refs.SharePopup.close();
    },

    // 分享成功回答
    shareCallBack (item) {
      console.log(item);
      this.$Toast("回调")
    }
  }
}
</script>
<style lang='less' scoped>
.login {
  height: 200px;
  background: #ccc;
}
.share {
  display: flex;
  background: #fff;
  padding: 50px;
  .share-btn {
    flex: 1;
    padding: 20px 50px;
    margin: 0 20px;
    background: #999;
  }
}
</style>