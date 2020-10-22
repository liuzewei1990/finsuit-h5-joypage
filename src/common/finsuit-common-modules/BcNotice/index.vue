

<!-- 比财公共公告业务模块 -->
<template>
  <ScreenMsgScroll ref="ScreenMsgScroll" class="bc-notice" v-if="noticeShow && noticeData.text" :text="noticeData.text" :nbspNum="8" :speed="0.55" :awaitTimer="1250" @click="toNoticeList">
    <div slot="icon" class="icon" @click="toNoticeList">
      <span>公告</span>
    </div>
    <!-- <div slot="icon" class="icon" @click="test">
      <span>秒测</span>
    </div> -->
    <!-- <div slot="icon" class="icon" @click="test1">
      <span>开始</span>
    </div> -->
    <!-- <div slot="icon" class="icon" @click="test2">
      <span>暂停</span>
    </div> -->
    <div slot="action" class="close" @click="noticeShow = false">
      <span class="icon-close-1"></span>
    </div>
  </ScreenMsgScroll>
</template>

<script>
import ScreenMsgScroll from "@common/finsuit-components/ScreenMsgScroll"
export default {
  components: { ScreenMsgScroll },
  props: {
    noticeList: {
      type: Array,
      default: () => { return [] }
    }
  },
  data () {
    return {
      noticeShow: true,
      noticeData: {}
    };
  },
  mounted () {
    this.noticeData = this.handleNoticeData(this.noticeList);
  },
  //方法集合
  methods: {
    // 处理api数据转换前端需要的数据格式
    handleNoticeData (noticeList) {
      let noticeData = { text: "", url: "" };
      let nbsp = "";
      if (noticeList.length === 0) return noticeData;
      noticeData.url = noticeList[0].JUMP_URL;
      if (noticeList.length > 1) nbsp = "<span class='bc-notice-nbsp'></span>"
      for (let i = 0; i < noticeList.length; i++) {
        noticeData.text += noticeList[i].CONTENTS + nbsp;
      }
      return noticeData;
    },

    toNoticeList () {
      if (!this.noticeData.url) return;
      this.$openWebview(this.noticeData.url);
    },

    test () {
      this.$refs["ScreenMsgScroll"].play();
      setTimeout(() => {
        this.$refs["ScreenMsgScroll"].stop();
      }, 1000);
    },
    test1 () {
      this.$refs["ScreenMsgScroll"].play();
    },
    test2 () {
      this.$refs["ScreenMsgScroll"].stop();
    }
  },
}
</script>
<style lang="less">
.bc-notice-nbsp1 {
  //   border-bottom: 1px solid red;
}
.bc-notice-nbsp {
  display: inline-block;
  width: 32px;
}
</style>
<style lang='less' scoped>
.bc-notice {
  padding: 0 10px;
  box-sizing: border-box;
  width: 100%;
  height: 66px;
  overflow: hidden;
  background: #f5f7fa;
  display: flex;
  font-family: PingFangSC-Light;
  font-size: 26px;
  color: #303133;

  .icon {
    // padding: 0 15px;
    padding: 0 20px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: PingFangSC-Regular, PingFang SC;
    span {
      padding: 3px 15px;
      background: rgba(255, 91, 5, 0.1);
      border-radius: 8px;
      border-radius: 8px;
      color: #ff5b05;
      font-size: 20px;
    }
  }

  .close {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 15px;
    span {
      font-size: 30px;
      color: #333;
    }
  }
}
</style>