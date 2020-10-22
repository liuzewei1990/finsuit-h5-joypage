<template>
  <div class="login-component animeta-show" id="finsuit-login">
    <div class="finsuit-top">
      <img :src="componentData.applogo" alt="">
      <span>你好，欢迎来到{{componentData.appName}}</span>
    </div>
    <div class="finsuit-mobile-box">
      <input type="tel" class="finsuit-mobile" maxlength="11" v-model="formData.mobile" ref="mobile" placeholder="请输入手机号">
    </div>
    <div class="finsuit-code-box">
      <input type="text" class="finsuit-code" maxlength="6" v-model="formData.code" ref="code" placeholder="验证码">
      <p @click="getCodeFn" v-show="show">获取验证码</p>
      <p v-show="!show">{{count}}s 重新发送</p>
    </div>
    <Button class="finsuit-loginbtn" :disabled="btnDisabled" @click.native="login">立即登录</Button>
    <div class="finsuit-login-footer">
      <img :src="require('../../finsuit-assets/images/login-bot-text-1.png')" alt="">
      <img :src="require('../../finsuit-assets/images/login-bot-text-2.png')" alt="">
    </div>
    <!-- 关闭按钮 -->
    <i class="finsuit-close icon-close-1" @click="closeClick"></i>
  </div>
</template>
<script>
import Button from "@common/finsuit-components/Button";
export default {
  props: {
    componentData: {
      type: Object,
      default () { return {} }
    }
  },
  components: { Button },
  data () {
    return {

      // 校验规则
      phoneRule: [{
        name: "mobile",
        checkType: "notnull",
        checkRule: "",
        errorMsg: "请输入手机号码"
      }, {
        name: "mobile",
        checkType: "phoneno",
        checkRule: "",
        errorMsg: "请输入正确的手机号码"
      }],
      codeRule: [{
        name: "code",
        checkType: "string",
        checkRule: "6",
        errorMsg: "请输入验证码"
      }],
      // 表单数据
      formData: {
        mobile: "",
        code: ""
      },

      count: 60,
      show: true,

    }
  },
  computed: {
    btnDisabled () {
      let res = this.$formChecker.check(this.formData, [...this.phoneRule, ...this.codeRule]);
      return !res;
    }
  },
  methods: {
    // 点击获取验证码
    getCodeFn () {
      let res = this.$formChecker.check(this.formData, this.phoneRule);
      if (res) {
        this.ajaxPost(this.$Config.baseUrlHost + "/finsuit/finsuitSafeCode/outer", null, (response) => {
          // 保存sessionID
          this.componentData.saveSessionId(response.SESSION_ID);
          this.$iosConfirm({
            defaultOption: 'title',
            title: "请填写图像验证码",
            text: `<img style="margin: 0 auto" src="data:image/png;base64,${response.IMG}" alt="">`,
            input: true,
            placeholder: '请填写图像中的验证码',
            cancelText: '取消',
            okText: '确认',
            remindDuration: 650,
            appendChildClass: "",
          }).then(res => {
            if (res.value.length === 4) {
              let data = this.componentData.sendCode(this.formData.mobile, res.value, this.startTime);
            } else {
              this.$Toast("请输入4位图像验证码");
            }
          }).catch(res => { })
        });

      } else {
        this.$Toast(this.$formChecker.error);
      }
    },

    // 点击登陆按钮
    login () {
      this.componentData.login(this.formData.mobile, this.formData.code);
    },

    // 开始倒计时
    startTime () {
      this.show = false;
      this.count -= 1;
      if (this.count === 0) {
        this.count = 60;
        this.show = true;
        return;
      }
      setTimeout(this.startTime, 1000);
    },

    // 用户取消登录
    closeClick () {
      this.componentData.cancelLogin();
    },

    ajaxPost (url, data, fn) {
      var xhr = new XMLHttpRequest();
      xhr.open('POST', url, false);
      // 添加http头，发送信息至服务器时内容编码类型
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status == 200 || xhr.status == 304) {
            try {
              fn(JSON.parse(xhr.responseText));
            } catch (error) {

            }
          }
        }
      }
      xhr.send(data);
    }
  }
}
</script>
<style lang="less" scoped>
@keyframes show {
  0% {
    transform: translate3d(0, 100%, 0);
  }
  100% {
    transform: translate3d(0, 0%, 0);
  }
}
.animeta-show {
  animation: show 0.3s ease-out;
}
.login-component {
  background: #ffffff;
  padding: 100px 40px;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  box-sizing: border-box;
  .finsuit-top {
    display: flex;
    align-items: center;
    img {
      width: 114px;
      margin-right: 20px;
      //   height: 114px;
    }
    span {
      font-size: 36px;
      color: #333333;
    }
  }
  .finsuit-mobile-box {
    margin: 130px 0 0;
    padding-bottom: 6px;
    font-size: 36px;
    color: #999999;
    font-weight: 400;
    border-bottom: 1px solid #dddddd;
    .finsuit-mobile {
      min-height: 80px;
      font-size: inherit;
      color: inherit;
      width: 100%;
    }
  }
  .finsuit-code-box {
    margin: 80px 0 0;
    padding-bottom: 6px;
    font-size: 36px;
    color: #999999;
    font-weight: 400;
    border-bottom: 1.5px solid #dddddd;
    position: relative;
    .finsuit-code {
      min-height: 80px;
      font-size: inherit;
      color: inherit;
      width: 100%;
    }
    p {
      color: #508cee;
      font-size: 24px;
      width: 180px;
      line-height: 60px;
      text-align: center;
      height: 60px;
      border-radius: 4px;
      border: 1.5px solid rgba(80, 140, 238, 1);
      position: absolute;
      right: 0;
      bottom: 16px;
    }
    p:last-of-type {
      color: #ccc;
      border: 1px solid #ccc;
    }
  }
  .finsuit-loginbtn {
    font-size: 36px;
    color: #ffffff;
    text-align: center;
    line-height: 84px;
    margin-top: 76px;
    border-radius: 0px;
    font-weight: normal;
    background: linear-gradient(
      111deg,
      rgba(79, 130, 255, 1) 0%,
      rgba(59, 106, 220, 1) 100%
    );
    box-shadow: 0px 2px 4px 0px rgba(59, 106, 220, 0.53);
  }
  .finsuit-login-footer {
    position: absolute;
    bottom: 50px;
    left: 0;
    right: 0;
    img {
      display: block;
    }
    img:first-of-type {
      width: 364px;
      margin: 0 auto;
    }
    img:last-of-type {
      width: 422px;
      margin: 20px auto;
    }
  }
  @media screen and (max-height: 500px) {
    .finsuit-login-footer {
      display: none;
    }
  }

  .finsuit-close {
    position: absolute;
    top: 0px;
    right: 0px;
    font-size: 50px;
    color: #ccc;
    padding: 30px;
  }
}
</style>
