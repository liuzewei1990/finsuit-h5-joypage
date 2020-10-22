<template>
  <div class="aside">
    <el-button class="isopen" style="height: 60px" type="primary" :icon="isCollapse?'el-icon-caret-right':'el-icon-caret-left'" @click="isCollapse= !isCollapse"></el-button>
    <el-menu default-active="mains" class="el-menu-vertical-demo" @select="selectcomponent" @open="handleOpen" @close="handleClose" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" :collapse="isCollapse">
      <el-menu-item index="mains">
        <i class="el-icon-menu"></i>
        <span slot="title">生成小程序码</span>
      </el-menu-item>

      <el-menu-item index="getToken">
        <i class="el-icon-document"></i>
        <span slot="title">生成TOKEN</span>
      </el-menu-item>
      <el-menu-item index="jsonParse">
        <i class="el-icon-setting"></i>
        <span slot="title">JSON解析</span>
      </el-menu-item>
      <el-menu-item index="imgToSmall">
        <i class="el-icon-setting"></i>
        <span slot="title">图片压缩</span>
      </el-menu-item>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>综合</span>
        </template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="4-1">选项1</el-menu-item>
          <el-menu-item index="4-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="4-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="4-4">
          <template slot="title">选项4</template>
          <el-menu-item index="4-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isCollapse: false
    };
  },
  created () {

  },
  mounted () {

  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath);
    },
    selectcomponent (key, keyPath) {
      this.$store.commit('CHANGESIDEKEY', key)
      console.log(key, keyPath);
    }
  }
};
</script>

<style scoped lang="less">
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 300px;
  min-height: 400px;
}
.aside {
  position: relative;
  .isopen {
    position: absolute;
    right: -73px;
    top: 0;
    z-index: 1;
    background-color: rgb(84, 92, 100);
    border: 0;
    border-radius: 0;
  }
}
</style>
