<template>
  <div>
    <img class="loading loading-flash" v-if="loading" src="./loading.svg" alt="">
    <section class="activity-detail" v-else :class="{'btn-padding':detail.btnFlag == 0}">
      <!-- 头部信息 -->
      <div class="header">
        <h3 class="title">{{detail.title}}</h3>
        <p class="brief">{{detail.desc}}</p>
        <p class="bank">
          <i class="icon">
            <img :src="detail.orgLogo" alt="">
          </i>
          <span class="name">{{detail.orgName}}</span>
          <span class="date">{{detail.time}}</span>
        </p>
      </div>

      <!-- 富文本 -->
      <div class="content common-rich-max-img" v-html="detail.content">

      </div>

      <!-- footer -->
      <div class="footer" v-show="detail.btnFlag == 0">
        <Button class="btn" :disabled="false" @click.native="toUrl(detail.btnLink)">{{detail.btnText}}</Button>
      </div>
    </section>
  </div>
</template>

<script>
import Button from "@common/finsuit-components/Button"
export default {
  components: { Button },
  data () {
    return {
      detail: {},
      loading: false,
    }
  },
  created () {
    this.renderData();
  },
  mounted () {
    this.$trackEvents.PCB000A396({ ITEM_VALUE: this.$route.query["id"] });
  },
  methods: {
    async renderData () {
      this.loading = true;
      try {
        let params = { DETAIL_ID: this.$route.query["id"] };
        let data = await this.$api.getActivityDetail(params);
        console.debug("获取活动详情数据", data);
        this.renderContent(data);
      } catch (error) {

      }
      this.loading = false;
    },

    renderContent (data) {
      // 活动类型，1：银行活动，2：比财活动
      this.$set(this.detail, "type", data.ACTIVITY_TYPE);
      // 活动LOGO图片地址
      this.$set(this.detail, "banner", data.ACTIVITY_LOGO);
      // 活动标题
      this.$set(this.detail, "title", data.ACTIVITY_TITLE);
      // 奖品名称
      this.$set(this.detail, "desc", data.ACTIVITY_REWARD);
      // logo图片地址
      this.$set(this.detail, "orgLogo", this.$transfromAliyunUrl(data.LOGO_URL));
      // 机构名称
      this.$set(this.detail, "orgName", data.ORG_NAME);
      // 活动时间
      this.$set(this.detail, "time", data.ACTIVITY_TIME);
      // 活动内容
      this.$set(this.detail, "content", data.ACTIVITY_CONTENT);

      // 按钮文本
      this.$set(this.detail, "btnText", data.BUTTON_TEXT);
      // 按钮显示，0：显示；1：隐藏
      this.$set(this.detail, "btnFlag", data.BUTTON_FLAG);
      // 按钮跳转链接
      this.$set(this.detail, "btnLink", data.BUTTON_LINK);
    },

    toUrl (btnLink) {
      this.$trackEvents.PCB000A398({ ITEM_VALUE: encodeURIComponent(btnLink) });
      if (btnLink.indexOf("http") === 0) {
        this.$bcBridge.openWebview(btnLink);
      } else {
        this.$Toast("请检查跳转链接")
      }
    }
  }
}
</script>

<style lang="less" scoped>
.loading {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
}
.activity-detail {
  min-height: 100vh;
  background: #fff;
  padding: 0 30px;
  box-sizing: border-box;
  padding-bottom: 30px;
}
.btn-padding {
  padding-bottom: 150px;
}

.content {
  overflow: hidden;
}

.header {
  padding: 32px 0;
  .title {
    font-size: 32px;
    color: #333;
  }

  .brief {
    font-size: 28px;
    color: #f65448;
    margin: 16px 0;
  }

  .bank {
    color: #888888;
    display: flex;
    align-items: center;

    .icon {
      display: inline-block;
      width: 32px;
      height: 32px;
      border-radius: 500px;
      overflow: hidden;
      background: #eee;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }

    .name {
      margin-left: 20px;
    }

    .date {
      margin-left: 50px;
    }
  }
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 30px;
  box-sizing: border-box;
  background: #fff;
  width: 100%;
  border-top: 1px solid #eee;

  .btn {
    font-size: 32px;
    color: #fff;
    line-height: 90px;
    background: linear-gradient(
      to right,
      #1991f1,
      #396ffe
    ); /* 标准的语法（必须放在最后） */

    // &:not(.weui-btn_disabled):visited {
    //   color: #eee !important;
    // }
    // &:not(.weui-btn_disabled):active {
    //     opacity: 0.4;
    // }
  }
}
</style>
