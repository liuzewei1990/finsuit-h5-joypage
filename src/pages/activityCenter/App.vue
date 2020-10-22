<template>
  <div id="app">
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
a {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
</style>
