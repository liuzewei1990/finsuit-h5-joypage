<!-- 首页 -->
<template>
  <section class="main" id="page">

    <!-- banner -->
    <ModuleBanner></ModuleBanner>

    <!-- 产品 -->
    <ModuleProducts class="mar-top-20"></ModuleProducts>

    <!-- 规则 -->
    <ModuleRule class="mar-top-50"></ModuleRule>

    <!-- 底部版权 -->
    <ModuleFooter></ModuleFooter>
  </section>
</template>

<script>
import ModuleBanner from "./modules/banner.vue";
import ModuleProducts from "./modules/products.vue";
import ModuleRule from "./modules/rule.vue";
import ModuleFooter from "./modules/footer.vue";

import bus from "@common/finsuit-h5/libs/bus.js";
import { mapState, mapGetters } from "vuex";
export default {
  components: { ModuleBanner, ModuleProducts, ModuleRule, ModuleFooter },
  data () {
    return {

    };
  },
  computed: {
    ...mapGetters({
      isLogin: "isLogin"
    })
  },
  watch: {
    isLogin () {
      this.getData();
    }
  },
  activated () {
    this.getData();
  },
  mounted () {
    this.$trackEvents.ACB0Y001();
    //  监听app返回事件 刷新必要的数据
    bus.$on("pageAppear", this.getData);
  },

  methods: {
    async getData () {
      let params = {};
      let data = await this.$api.getList(params);
      this.$store.commit("SET_PRD_LIST", data.prdList || []);
      this.$store.commit("SET_INVEST_INFO", data.investInfo);
      this.$store.commit("SET_IS_SELL", data.isSell);
      this.$store.commit("SET_NEW_USER_STATUS", data.memberNoviceStatus);
      this.$store.commit("SET_USER_STATUS", this.$myUtils.createUserStatus(data));
    }
  }
};
</script>
<style lang='less' scoped>
.main {
  background: #648af8;
  min-height: 100vh;
}
</style>