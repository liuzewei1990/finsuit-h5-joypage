<template>
  <div class="imgToSmall">
    <el-input placeholder="请输入{xxx:'xx'}格式" v-model="inputVal" clearable>
    </el-input>
    <h1>比财：</h1>
    android:<el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textareaAndroid">
    </el-input>
    ios:<el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textareaIos">
    </el-input>

    <h1>拼财：</h1>
    android:<el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textareaAndroidPC">
    </el-input>
    ios:<el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textareaIosPC">
    </el-input>
    <el-button type="primary" @click="creaturl">生成链接</el-button>
  </div>
</template>

<script>
import { Base64 } from "js-base64";
export default {
  data () {
    return {
      inputVal: '',
      textareaAndroid: '',
      textareaIos: '',
      textareaAndroidPC: '',
      textareaIosPC: '',
    };
  },
  created () {

  },
  mounted () {

  },
  methods: {
    creaturl () {
      if (this.inputVal != "") {
        this.textareaAndroid = "besharp://finsuit/applink?pjsonkey=" + Base64.encode(encodeURIComponent(JSON.stringify(this.inputVal)));
        this.textareaIos = "besharp://finsuit/applink?pjsonkey=" + Base64.encode(JSON.stringify(this.inputVal));
        this.textareaAndroidPC = "pincai://finsuit/applink?pjsonkey=" + Base64.encode(encodeURIComponent(JSON.stringify(this.inputVal)));
        this.textareaIosPC = "pincai://finsuit/applink?pjsonkey=" + Base64.encode(JSON.stringify(this.inputVal))
        return;
      }
      this.$message('请输入一个对象格式的数据');
    }
  }
};
</script>

<style scoped lang="less">
.imgToSmall {
  width: 100%;
  height: 100%;
}
</style>
