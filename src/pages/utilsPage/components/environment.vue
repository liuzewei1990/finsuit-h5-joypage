<template>
  <div>
    <div style="margin-bottom: 15px;">
      <el-input placeholder="切换环境" v-model="select" class="input-with-select">
        <el-select v-model="select" @change="change" slot="prepend" placeholder="请选择">
          <el-option label="test1" value="https://app-test1.bicai365.com"></el-option>
          <el-option label="test2" value="https://app-test2.bicai365.com"></el-option>
          <el-option label="test3" value="https://app-test3.bicai365.com"></el-option>
          <el-option label="test4" value="https://app-test4.bicai365.com"></el-option>
          <el-option label="test5" value="https://app-test5.bicai365.com"></el-option>
          <el-option label="test6" value="https://app-test6.bicai365.com"></el-option>
          <el-option label="finsuit" value="https://finsuit.bicai365.com"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-edit"></el-button>
      </el-input>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      select: this.$store.state.sides.env
    };
  },
  created () {

  },
  mounted () {

  },
  methods: {
    change (value) {
      this.$store.commit('CHANGEENV', value)
    }
  }
};
</script>

<style scoped lang="less">
.el-select {
  width: 120px;
}
</style>
