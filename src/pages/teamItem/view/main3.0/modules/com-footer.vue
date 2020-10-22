<!-- 首页公共footer -->
<template>
  <section class='com-footer'>
    <div>
      <!-- <p>{{winxinText}}</p> -->
      <p :class="SERVICE_PHONE_SHOW?'':'p-else'">
        <!-- <span class="css-line"></span>
        <span class="css-fang"></span> -->
        <span class="css-center">
          {{phoneText}}
          <a @click="handleClick" :href="'tel:'+phoneNumCall">{{phoneNumShow}}</a>
        </span>
        <span class="css-center-else"></span>
        <!-- <span class="css-fang"></span>
        <span class="css-line"></span> -->
      </p>
      <p>市场有风险,投资需谨慎</p>
    </div>
  </section>
</template>

<script>

import { mapState, mapActions } from "vuex"
export default {
  components: {},
  data () {
    return {

    };
  },
  computed: {
    ...mapState({
      // 导出footer数据
      footerData: state => {
        return state.MainConfig.footerData;
      },

      // 客服电话文案
      phoneText () {
        return this.footerData.SERVICE_PHONE_TEXT_SHOW || "客服电话:";
      },

      // 客服电话
      phoneNumCall () {
        return this.footerData.SERVICE_PHONE_CALL || "4000088692";
      },

      // 客服电话带杠
      phoneNumShow () {
        return this.footerData.SERVICE_PHONE_SHOW || "400-008-8692";
      },

      // 微信文本
      winxinText () {
        let text = this.footerData.SERVICE_CUSTOMER_WEIXIN_TEXT || "客服微信：";
        let weixin = this.footerData.SERVICE_CUSTOMER_WEIXIN || "bicaikefu";
        return text + weixin;
      }
    })
  },
  created () {
  },
  mounted () {

  },
  //方法集合
  methods: {
    // 客服电话点击
    handleClick () {
      this.$trackEvents.PCB000S010({ ITEM_VALUE: this.phoneNumCall });
    }
  },
}
</script>
<style lang='less' scoped>
.com-footer {
  font-family: "Microsoft YaHei", Arial, sans-serif;
  height: 248px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 24px;
  color: #a3a7ad;
  //   border-bottom: 10px solid #f6f6f9;
  //   border-top: 16px solid #f6f6f9;
  order: 8;
  line-height: 0.5rem;
  background: #f5f7fa;
  p {
    margin: 10px 0;
  }
  .css-line {
    display: inline-block;
    width: 100px;
    height: 2px;
    background: #e5e8f0;
    vertical-align: middle;
    margin-top: -2px;
  }
  .css-fang {
    // margin-left:px2rem(10);
    transform: rotate(45deg);
    display: inline-block;
    width: 16px;
    height: 16px;
    background: #e5e8f0;
  }
  .css-center {
    padding: 0 10px;
    a {
      color: #3e8bf6;
    }
  }

  .p-else {
  }
}
</style>