<template>
  <mask-box v-model="visible" :show-loading="propsData.showLoading" :hideOnBlur="propsData.hideOnBlur" :defaultcloseBtnVisible="propsData.defaultcloseBtnVisible" :isTransparent="false" @on-show="$modalHelper.open(appendElement)" @on-hide="$modalHelper.close(appendElement)">
    <components :is="propsData.componentName" :componentData="propsData"></components>
  </mask-box>
</template>

<script>
import MaskBox from "@common/finsuit-components/MaskBox"
import DialogRule from "./Dialog-Rule"
import DialogLottery from "./Dialog-Lottery"
import DialogLotteryImg from "./Dialog-LotteryImg"
export default {
  components: { MaskBox, DialogRule, DialogLottery, DialogLotteryImg },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    propsData: {
      type: Object,
      default () { return {} }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
