<template>
  <div class="main">
    <ModuleA></ModuleA>
    <ModuleD></ModuleD>
    <Module5></Module5>
    <ModuleB></ModuleB>
    <ModuleC></ModuleC>
    <ProjectNav></ProjectNav>
    <ModuleE></ModuleE>
  </div>
</template>

<script>
import ModuleA from "./modules/module-1.vue"
import ModuleB from "./modules/module-2.vue"
import ModuleC from "./modules/module-3.vue"
import ModuleD from "./modules/module-4.vue"
import Module5 from "./modules/module-5.vue"
import ModuleE from "./modules/module-6.vue"
import ProjectNav from "./modules/projectNav.vue"
export default {
  components: { ModuleA, ModuleB, ModuleC, ModuleD, Module5, ProjectNav, ModuleE },

}
</script>

<style lang="less" scoped>
.main {
  padding: 30px;
  box-sizing: border-box;
}
</style>
