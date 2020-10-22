<template>
  <div>
    <!-- <ModuleA></ModuleA> -->
    <!-- <ModuleB></ModuleB> -->
    <ProjectNav></ProjectNav>
  </div>
</template>

<script>
import ModuleA from "./modules/module-1.vue"
import ModuleB from "./modules/module-2.vue"
import ProjectNav from "./modules/projectNav.vue"
export default {
  components: { ModuleA, ModuleB, ProjectNav }
}
</script>

<style lang="less" scoped>
</style>
