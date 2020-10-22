<template>
  <div class="share-banks" v-show="bankList.length >0">
    <MainTitle class="main-title" :title="title" :isIcon="false" @iconClick="openRuleDialog" color="#fff" />
    <div class="bank-list">
      <ul>
        <li v-for="(item,index) in bankList" :key="index">
          <!-- openApi对接 -->
          <div class="bank-link yourclass" :class="{'default-bj-color':!item.LOGO_BACKGROUND_URL}" v-if="item.ORG_STATUS == '1'" v-lazy:background-image="`${$Config.aliyuncHost + item.LOGO_BACKGROUND_URL}`" :key="`${$Config.aliyuncHost + item.LOGO_BACKGROUND_URL}`">
            <div class="icon">
              <img :src="$Config.aliyuncHost + item.LOGO_URL" alt="">
            </div>
            <div class="content ellipsis">
              <p class="ellipsis">{{item.ORG_NAME}}</p>
              <span>{{item.DESCRIPT}}</span>
            </div>
            <div class="btn">立即开户</div>
          </div>
          <!-- H5合作行 -->
          <div class="h5-link" v-if="item.ORG_STATUS == '2'">
            <img :src="$Config.aliyuncHost + item.H5_PIC_URL" alt="">
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import MainTitle from "@topic/components/MainTitle/index.vue"
export default {
  props: ["isShare"],
  components: { MainTitle },
  data () {
    return {
      // 模块标题
      title: "开户有奖",
      bankList: [],
    }
  },
  mounted () {
    this.renderData();
  },
  methods: {
    // render
    async renderData () {
      let data = await this.$api.getBankList();
      console.debug("this.$api.getBankList", data);

      if (!(this.$utils.isObject(data) && data.STATUS == "0")) {
        this.$Toast(data.MSG || "数据异常 this.$api.getBankList");
        return;
      }
      // 弹窗规则
      let bankRule = data.OPEN_ACCOUNT_RULE || {};
      this.bankRule = bankRule;

      // 开户银行列表
      let bankList = data.OPEN_ACCOUNT_LIST || [];
      this.bankList = bankList.splice(0, 2);
    },

    // 开户有奖 - 规则弹窗
    openRuleDialog () {
      // 当时分享样板时不让点击
      if (this.isShare) return;

      let dialogComponent = this.$CommonDialog({
        type: "ACCOUNT-RULE",
        appendElement: this.$root.$el.querySelector("#page"),
        title: this.bankRule.RULE_TITLE,
        desc: "",
        content: this.bankRule.RULE_CONTENT
      })
    }
  }
}
</script>

<style lang="less" scoped>
.share-banks {
  padding: 0px 26px;
  box-sizing: border-box;
  .bank-list {
    ul {
      .bank-link,
      .h5-link {
        width: 100%;
        height: 160px;
        margin-bottom: 20px;
        border-radius: 10px;
        overflow: hidden;
        background-repeat: no-repeat;
        // background-size: 100% 100%;
        background-size: cover;
        background-position: center center;
        box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.2);
        background-color: #fd5861; // 勿删，分享的时候在canvas图片跨域加载失败时，使用默认底色。
      }

      .default-bj-color {
        background-image: linear-gradient(
          to right,
          #ff9483,
          #fd5861
        ) !important;
      }

      .bank-link {
        display: flex;
        align-items: center;
        color: #fff;
        padding: 0 26px;
        box-sizing: border-box;

        .icon {
          width: 60px;
          height: 60px;
          background: #eee;
          border-radius: 50%;
          overflow: hidden;
          border: 6px solid #fff;
          img {
            width: 100%;
            height: 100%;
          }
        }

        .content {
          flex: 1;
          margin: 0 26px;
          p {
            font-size: 36px;
            letter-spacing: 2px;
          }
          span {
            font-size: 24px;
          }
        }

        .btn {
          padding: 5px 15px;
          border: 1px solid #fff;
          border-radius: 5px;
        }
      }

      .h5-link {
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
