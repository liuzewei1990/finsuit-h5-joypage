<!--  -->
<template>
  <div id="main">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <SharePopup ref='SharePopup'></SharePopup>
  </div>
</template>

<script>

import SharePopup from "./components/SharePopup"
import router from "./router"
import store from "./store/index"
export default {
  components: { SharePopup },
  router,
  store
}
</script>
<style lang='less'>
html * {
  -webkit-text-size-adjust: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>