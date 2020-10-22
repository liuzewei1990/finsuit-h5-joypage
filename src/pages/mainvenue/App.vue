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
html * {
  -webkit-text-size-adjust: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.dev {
  //   border: 1px solid red;
}
</style>
