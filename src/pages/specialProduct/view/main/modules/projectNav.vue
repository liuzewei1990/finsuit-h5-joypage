<template>
  <div class="project-nav pad-30">
    <div class="item" :style="{backgroundColor:color16()}" v-for="item in list" :key="item" @click="toUrl(item)">{{item.projectName}}</div>
  </div>
</template>

<script>
import Button from "@common/finsuit-components/Button"
import { mapGetters } from "vuex"
export default {
  components: { Button },
  data () {
    return {
      list: [{
        projectName: "连连赚",
        projectUrl: "llz"
      }, {
        projectName: "每日任务",
        projectUrl: "oneTask"
      }, {
        projectName: "资讯",
        projectUrl: "news"
      }, {
        projectName: "每日一题",
        projectUrl: "topic"
      }, {
        projectName: "活动中心",
        projectUrl: "activityCenter"
      }, {
        projectName: "村村乐",
        projectUrl: "cuncunle"
      }, {
        projectName: "活动投资",
        projectUrl: "activityHistory"
      }, {
        projectName: "预约领券",
        projectUrl: "collectCoupon"
      }, {
        projectName: "1218主会场",
        projectUrl: "mainvenue"
      }, {
        projectName: "1218活动攻略",
        projectUrl: "mainvenueh5"
      }, {
        projectName: "红包裂变",
        projectUrl: "redPacketFission"
      }, {
        projectName: "拼财首页",
        projectUrl: "pchome"
      }, {
        projectName: "零花钱",
        projectUrl: "linghuaqian"
      }, {
        projectName: "下载落地页",
        projectUrl: "download"
      },]
    }
  },
  computed: {
    ...mapGetters(["isLogin"])
  },
  methods: {
    login (data) {
      this.$Toast(data)
    },
    toUrl (item) {
      let url = location.origin;
      url += `/${item.projectUrl}.html#/`;
      url += `?ACTITY_ID=123456&loading=1218`;
      this.$bcBridge.openWebview(url);
    },
    color16 () {//十六进制颜色随机
      var r = Math.floor(Math.random() * 256);
      var g = Math.floor(Math.random() * 256);
      var b = Math.floor(Math.random() * 256);
      var rgb = "rgb" + '(' + r + ',' + g + ',' + b + ')';
      return rgb;
    }
  }
}
</script>

<style lang="less" scoped>
.project-nav {
  display: flex;
  flex-wrap: wrap;

  .item {
    width: 50%;
    height: 150px;
    font-size: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
  }
}
</style>
