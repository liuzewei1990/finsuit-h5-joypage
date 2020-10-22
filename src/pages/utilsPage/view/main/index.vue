<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <asides></asides>
      </el-aside>
      <el-container>
        <el-header>
          <fullScreen />
        </el-header>
        <el-main>
          <component :is="this.$store.state.sides.sidesKey"></component>
        </el-main>
        <el-footer>Copyright © 2012 - 2020 bicai. All Rights Reserved.</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import asides from './modules/asides'
import mains from './modules/mains'
import getToken from './modules/getToken'
import fullScreen from '../../components/fullScreen'
import imgToSmall from './modules/imgToSmall'
import jsonParse from './modules/jsonParse'

export default {
  data () {
    return {
      componentId: "mains",
      widthVal: 280,
      urlVal: "",
      isHyaline: false
    };
  },
  components: { asides, mains, getToken, fullScreen, imgToSmall, jsonParse },
  created () {

  },
  mounted () {

  },
  methods: {

  }
};
</script>

<style scoped lang="less">
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
  height: 60px;
}
.el-header {
  text-align: initial;
}
.el-aside {
  background-color: rgb(84, 92, 100);
  color: #333;
  width: auto !important;
  overflow: inherit;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}
.el-container {
  height: 100vh;
}
</style>