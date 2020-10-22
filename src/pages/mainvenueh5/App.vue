<template>
  <div id="main">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less">
body {
  max-width: 100vw !important;
}
</style>
