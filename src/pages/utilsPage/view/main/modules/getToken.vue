<template>
  <!-- <div class="getMobileCode">
    <environment />
    <el-row>
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <el-form ref="form" :model="form" label-width="80px">
            <div class="getmobile">
              <el-button type="success" @click="getMoble">生成手机号</el-button>
              <el-input v-model="form.mobile"></el-input>
            </div>
            <div class="getmobile">
              <el-button type="success" @click="getImgCode">获取图片验证码</el-button>
              <el-image style="width: 200px; height: 50px" :src="form.ImgCode || 'http://temp.im/240x160'" :fit="fit">
              </el-image>
              <el-input v-model="form.saftCode"></el-input>
            </div>
            <div class="getmobile">
              <el-button type="success" @click="sendCode">获取手机验证码</el-button>
              <el-input v-model="form.phoneCode"></el-input>
            </div>
            <el-input type="textarea" v-model="form.param_key" rows="5" placeholder="登录参数"></el-input>
            <div class="">
              <el-button type="success" @click="login">登录</el-button>
            </div>
          </el-form>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-light">
          <el-input type="textarea" v-model="form.requestData" disabled rows="20" placeholder="接口TYPE"></el-input>
        </div>
      </el-col>
    </el-row>
  </div> -->
  <div style="width:100%;height:100%">
    <iframe src="http://liuup.com/bctest/" width="100%" height="100%" frameborder="0"></iframe>
  </div>
</template>

<script>
import environment from '../../../components/environment'
export default {
  data () {
    return {
      form: {
        mobile: "",  // 手机号
        phoneCode: "123456",  // 手机验证码
        responseData: "",
        param_key: "",
        requestData: "",
        ImgCode: "", // 验证码图片
        saftCode: "", // 输入图片验证码
        SESSION_ID: ""
      }
    };
  },
  components: { environment },
  created () {
    this.getMoble()
  },
  mounted () {

  },
  methods: {
    getMoble () {
      let prefixArray = new Array("130", "131", "132", "133", "135", "137", "138", "170", "187", "189");
      let i = parseInt(10 * Math.random());
      let prefix = prefixArray[i];

      for (let j = 0; j < 8; j++) {
        prefix = prefix + Math.floor(Math.random() * 10);
      }
      this.form.mobile = prefix
    },
    async getImgCode () {
      try {
        let data = await this.$tool.ajax_method('https://app-test4.bicai365.com/finsuit/finsuitSafeCode/outer');
        this.form.ImgCode = "data:image/png;base64," + data.IMG;
        this.form.SESSION_ID = data.SESSION_ID;
      } catch (error) {
        console.log(error);
      }
    },
    async sendCode () {
      let params = {
        PHONE_NUM: this.form.mobile,
        SAFT_CODE: this.form.saftCode
      }
      try {
        let data = await this.$api.GETMOBILECODE(params, { SESSION_ID: this.form.SESSION_ID, SYSTEM_TYPE: "", APP_FLAG: "" });
        console.log(data);
        let param = `{head:{TYPE:"LOGIN",TOKEN:"",APP_FLAG:"PMP",SESSION_ID:${this.form.SESSION_ID},DEVICE_ID:""
            param:{PHONE_NUM:${this.form.mobile},PHONE_CODE:${this.form.phoneCode}`;
        this.form.param_key = param;
      } catch (error) {
      }
    },
    async login () {
      let data = await this.$api.LOGIN({ "PHONE_NUM": this.form.mobile, "PHONE_CODE": this.form.phoneCode }, { "APP_FLAG": "PMP", "SESSION_ID": this.form.SESSION_ID });
      console.log(data);
      this.form.requestData = JSON.stringify(data);
    },

  }
};
</script>

<style scoped lang="less">
.getMobileCode {
  .bg-purple {
    background: #d3dce6;
  }
  .getmobile {
    display: flex;
    margin-bottom: 10px;
  }
}
</style>
