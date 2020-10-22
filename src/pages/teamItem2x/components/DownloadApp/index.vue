<!-- 站外下载悬浮按钮 -->
<template>
  <section class='download-app' :class="{'download-app-hidden':hidden}">
    <div class="box">
      <div class="logo">
        <img v-if="$store.state.FROM_APP_FLAG === 'BC'" :src="require('@common/finsuit-assets/images/bicai.png')" alt="">
        <img v-else :src="require('@common/finsuit-assets/images/pincai.png')" alt="">
      </div>
      <div class="title" v-show="!hidden">
        <p>银行产品 一站直达</p>
        <span v-if="$store.state.FROM_APP_FLAG === 'BC'">比财-银行产品拼团理财平台</span>
        <span v-else>拼财-银行产品拼团理财平台</span>
      </div>
      <div class="btn" v-show="!hidden" @click="toDownloadApp">下载App</div>
      <div class="close icon-close-1" v-show="!hidden" @click="clickClose"></div>

    </div>

    <!-- 收起来后的文案 -->
    <div class="text" v-show="textShow" @click="toDownloadApp">下载</div>
  </section>
</template>

<script>

export default {
  components: {},
  data () {
    return {
      hidden: false,
      textShow: false
    };
  },
  created () {

  },
  mounted () {

  },
  //方法集合
  methods: {
    clickClose () {
      this.hidden = true;
      this.$el.addEventListener('transitionend', () => {
        this.textShow = true;
      });
    },

    // 点击下载App
    toDownloadApp () {
      let appName = ({ PC: "pincai", BC: "bicai" }[this.$store.state.FROM_APP_FLAG]);
      this.$callapp[appName].open({
        path: "applink",
        param: {
          pjsonkey: this.$bcBridge.base64Encode({ "LINK_TO": "WEB_H5", "H5_URL": this.teamItemUrl(), "NEED_LOGIN": "0", "USE_LINK": "1" })
        }
      })
    },

    // 拼团活动链接 站外唤起App后打开
    teamItemUrl () {
      let url = this.$Config.teamItemUrl;
      url += `#/`;
      url += `?ACTITY_ID=${this.$store.state.ACTITY_ID}`;
      return url;
    }
  },
}
</script>
<style lang='less' scoped>
.download-app {
  position: fixed;
  left: 50%;
  bottom: 150px;
  z-index: 1;
  transform: translate(-50%, 0);
  width: 700px;
  //   min-height: 120px;
  border-radius: 500px;
  background: rgba(0, 0, 0, 0.7);
  transition: all 0.3s ease-out;
}
.download-app-hidden {
  left: 90%;
  width: 116px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid #f2f2f2;
}
.box {
  display: flex;
  align-items: center;
  padding: 8px;
  box-sizing: border-box;
  .logo {
    width: 100px;
    height: 100px;
    border-radius: 500px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .title {
    flex: 1;
    padding: 0 20px;
    p {
      font-size: 28px;
      color: #fff;
      line-height: 40px;
    }
    span {
      font-size: 24px;
      color: #dbdbdb;
    }
  }

  .btn {
    color: #fff;
    padding: 10px 15px;
    background: #709aff;
    border-radius: 5px;
    font-size: 20px;
  }

  .close {
    color: #dbdbdb;
    font-size: 50px;
    padding: 0 20px;
  }
}
.text {
  font-size: 20px;
  color: #fff;
  width: 116px;
  padding: 3px 0;
  text-align: center;
  background: #709aff;
  border-radius: 5px;
  position: absolute;
  bottom: -20px;
}
</style>