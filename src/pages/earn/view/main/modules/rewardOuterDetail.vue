<template>
  <ModuleBox class="module-" showTitle title="朋友获得" type="red">
    <div class="container">
      <div class="item" v-for="(item,index) in INVETED_AWARD" :key="index">
        <span v-if="item.AWARD_TYPE==2 && item.AMOUNT"><span class="val item-a">{{item.AMOUNT}}</span><span class="unit">元</span><span class="text">现金红包</span></span>
        <span v-if="item.AWARD_TYPE==1 && item.AMOUNT"> <span class="val item-b">{{item.AMOUNT}}</span><span class="unit">元</span><span class="text">现金券</span> </span>
        <span v-if="item.AWARD_TYPE==3 && item.AMOUNT"> <span class="val item-c">{{item.AMOUNT}}</span><span class="unit">元</span><span class="text">体验金</span> </span>
      </div>
    </div>
  </ModuleBox>
</template>

<script>
import ModuleBox from "@earn/components/ModuleBox/index.vue"
import { mapState } from "vuex"
export default {
  components: { ModuleBox },
  computed: {
    ...mapState({
      INVETED_AWARD: state => state.main.INVETED_AWARD
    })
  },
  mounted () {

  },

  methods: {

  }
}
</script>

<style lang="less" scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  padding-left: 50px;
  padding: 20px 30px;

  .item {
    width: 50%;
    // border: 1px solid red;
    box-sizing: border-box;
    font-size: 30px;
    span {
      position: relative;
    }
    .val {
      font-family: has_buy;
      font-size: 70px;
      background-image: -webkit-linear-gradient(bottom, #e23030, #f67c52);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .unit {
      background-image: -webkit-linear-gradient(bottom, #e23030, #f67c52);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-size: 58px;
      font-weight: 700;
    }
    .item-a {
      text-align: center;
    }
    .item-b {
      text-align: center;
    }
    .text {
      font-size: 30px;
      font-weight: 700;
      //   top: -12px;
      left: 10px;
    }
  }
}
</style>
