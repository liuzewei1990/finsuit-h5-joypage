<template>
  <div class="main">
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <div class="setargbox">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <div class="demonstration">
                <span>宽度：</span>
                <el-slider class="setWidth" v-model="form.widthVal" :min="280" :max="500"></el-slider>
              </div>
              <el-form-item label="小程序路径：" prop="desc">
                <el-input type="textarea" v-model="form.urlVal"></el-input>
              </el-form-item>
              <el-form-item label="是否透明底色">
                <el-switch v-model="form.isHyaline" inactive-color="#111"></el-switch>
              </el-form-item>
              <el-form-item label="设置颜色">
                <el-color-picker v-model="form.lineColor" color-format="rgb"></el-color-picker>{{form.lineColor}}
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple resultImg">
          <img :src="pmpQqrCode" alt="">
        </div>
      </el-col>
    </el-row>
    <el-button type="primary" :loading="loading" @click="getData">生成</el-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      pmpQqrCode: "",
      form: {
        widthVal: "280",
        isHyaline: false,
        urlVal: "page/index/index",
        lineColor: "rgb(0, 64, 255)"
      }
    };
  },
  created () {

  },
  mounted () {

  },
  methods: {
    async getData () {
      this.loading = true;
      let linecolor = this.form.lineColor.match(/\d+/g);
      let params = {
        routeKey: "finsuitSysShareService-getPMPQRCode",
        pmpQRCodeUrl: this.form.urlVal,  //小程序跳转路径
        width: this.form.widthVal,         // 二维码的宽度，单位 px，最小 280px，最大 1280px
        autoColor: "",     //自动配置线条颜色，如果颜色依然是黑色，则说明不建议配置主色调，默认 false
        lineColor: {
          r: linecolor[0],
          g: linecolor[1],
          b: linecolor[2]
        },     //auto_color 为 false 时生效，使用 rgb 设置颜色 例如 {"r":"xxx","g":"xxx","b":"xxx"} 十进制表示
        isHyaline: this.form.isHyaline      //是否需要透明底色，为 true 时，生成透明底色的小程序
      }
      try {
        let data = await this.$api.CAMPAIGN_SERVICE_HANDLER(params);
        console.log(data);
        this.pmpQqrCode = data.data.pmpQqrCode;
        this.loading = false;
      } catch (error) {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped lang="less">
.main {
  background-color: #e9eef3;
  color: #333;
  .setargbox {
    height: 400px;
    margin: 10px;
    .demonstration {
      display: flex;
      align-items: center;
      span {
        width: 100px;
        font-size: 20px;
        color: #606266;
      }
    }
  }
  .resultImg {
    margin: 10px;
    overflow: hidden;
    img {
      margin: 10px auto;
    }
  }
  .btn {
    width: 100px;
    height: 40px;
  }
  .setWidth {
    width: 95%;
    margin: 0 auto;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple {
    background: #d3dce6;
  }
}
</style>
