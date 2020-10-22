<template>
  <section class="module-banner" :style="{backgroundImage:`url(${this.$Config.aliyuncHost + HEAD_PIC_URL})`}">
    <!-- btn -->
    <div class="btn btn-rule" @click="toActiveRule">
      <span>活动规则</span>
    </div>

    <!-- btn -->
    <!-- <div class="btn btn-box" @click="toMoneyStrategy">
      <span>赚钱攻略</span>
    </div> -->
  </section>
</template>

<script>
import { mapState } from "vuex"
export default {
  components: {},
  computed: {
    ...mapState({
      HEAD_PIC_URL: state => state.main.newRootObj.HEAD_PIC_URL //|| "http://a3.att.hudong.com/14/75/01300000164186121366756803686.jpg"
    })
  },
  mounted () {

  },

  methods: {
    toActiveRule () {
      this.$trackEvents.ACB0K003();
      let url = "";
      url = window.location.href.split("#")[0];
      url += `#/activeRule`;
      url += `?ACTITY_ID=${this.$store.state.ACTITY_ID}`;
      this.$bcBridge.openWebview(url);
    },
    toMoneyStrategy () {
      this.$trackEvents.ACB0K019();
      let url = "";
      let strategyUrl = this.$transfromAliyunUrl(this.$store.state.main.MARK_MONEY_STRATEGY)
      url = window.location.href.split("#")[0];
      url += `#/moneyStrategy`;
      url += `?ACTITY_ID=${this.$store.state.ACTITY_ID}`;
      url += `&strategyUrl=${strategyUrl}`;
      this.$bcBridge.openWebview(url);
    }
  }
}
</script>

<style lang="less" scoped>
.module-banner {
  height: 711px;
  background-repeat: no-repeat;
  background-size: 100%;
  .btn {
    min-width: 100px;
    height: 40px;
    background: rgba(255, 255, 255, 0.5);
    border-top-left-radius: 500px;
    border-bottom-left-radius: 500px;
    position: absolute;
    right: 0;
    color: #333;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    box-sizing: border-box;
  }

  .btn span {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    margin-left: 1px;
  }

  .btn-rule {
    top: 124px;
  }

  .btn-box {
    top: 494px;
  }
}
</style>
