<template>
  <mask-box v-model="visible" :show-loading="false" :defaultcloseBtnVisible="false" :isTransparent="false" @on-show="$modalHelper.open" @on-hide="$modalHelper.close">

    <!-- 引入shareLink页面组件 -->
    <img class="pre-img" :class="{'pre-img-pmp':$store.state.APP_FLAG==='PMP'}" :src="base64" v-if="base64" alt="">

    <!-- 被截屏组件 -->
    <share-link class="share-link-conponent topHidden" ref="shareLinkComponent" :isShare="true"></share-link>

    <!-- 底部btn -->
    <Button slot="footer" class="share-link-btn" @click.native="btnConfirm">{{options.btnText}}</Button>

  </mask-box>
</template>

<script>
import Button from "@topic/components/Button"
import MaskBox from "@common/finsuit-components/MaskBox"
import ShareLink from "@topic/view/shareLink"
import html2canvas from "html2canvas"
import Preload from "@common/finsuit-plugins/preload.js"
export default {
  components: { MaskBox, Button, ShareLink },
  data () {
    return {
      visible: false,
      // 配置选项
      options: {},
      // 图片base64
      base64: ""
    }
  },

  methods: {
    open (options = {}) {
      this.options = options;
      this.visible = true;
      this.createImg();
    },

    // 创建图片预览
    async createImg () {
      setTimeout(async () => {
        try {
          this.base64 = await this.doHtml2canvas();
        } catch (error) {
          console.error(error);
          this.close();
          this.$Toast("图片生成失败，请重试！");
        }
      }, 500);
    },

    // 关闭
    close () {
      this.visible = false;
    },

    // 开始截图
    async doHtml2canvas () {
      let targetDom = this.$refs.shareLinkComponent.$el;

      // 进行一次预加载
      let imgs = this.getImgsSrcList(targetDom.querySelectorAll("img"));
      await new Preload().load(imgs);

      let canvas = await html2canvas(targetDom, {
        allowTaint: true,
        useCORS: true,
        height: targetDom.offsetHeight - 1, // -1 解决底部出现白边问题
        width: targetDom.offsetWidth,
        // windowWidth: document.body.scrollWidth,
        // windowHeight: document.body.scrollHeight,
        // // x: 0,
        // // y: 0,
        // dpi: window.devicePixelRatio * 2, // 解决图片不清晰问题
        // scale: 2
      });
      return canvas.toDataURL();
    },

    // 点击确认
    async btnConfirm () {
      this.$emit("shareImageBtnClick", this.base64);
    },

    // imgs dom 转src地址list数组
    getImgsSrcList (imgsDom) {
      let list = [];
      imgsDom.forEach(item => {
        list.push(item.src);
      })
      return list;
    }
  }
}
</script>

<style lang="less" scoped>
.share-link-conponent {
  transform-origin: top center;
  //   transform: scale(0.6) translate(0, -50%);
  position: absolute;
  max-width: 750px;
  left: 0;
  top: 0;
  width: 100%;
}

.topHidden {
  top: -2000px;
}

.pre-img {
  width: 450px;
  margin: 0 auto;
}
.pre-img-pmp {
  width: 550px;
}

.share-link-btn {
  margin: 60px auto;
  width: 80% !important;
  line-height: 80px;
  color: #fff !important;
  background: linear-gradient(to bottom, #3aa9f3, #3865ff);
  border-radius: 500px !important;
  font-size: 28px;
  &:not(.weui-btn_disabled):visited {
    color: #ffffff;
  }
  &:not(.weui-btn_disabled):active {
    color: rgba(255, 255, 255, 0.6);
  }
}
</style>
