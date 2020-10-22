<template>
  <mask-box v-model="visible" :show-loading="propsData.showLoading" :hideOnBlur="propsData.hideOnBlur" :defaultcloseBtnVisible="propsData.defaultcloseBtnVisible" :isTransparent="false" @on-show="$modalHelper.open(propsData.appendElement)" @on-hide="$modalHelper.close(propsData.appendElement)">
    <components :is="propsData.componentName" :componentData="propsData"></components>
  </mask-box>
</template>

<script>
import MaskBox from "@common/finsuit-components/MaskBox"
import Children from "./Children"
export default {
  components: { MaskBox, ...Children },
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
