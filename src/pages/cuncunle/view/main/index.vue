<template>
  <section id="page" class="main">
    <!-- 消息滚动 -->
    <MsgScroll></MsgScroll>

    <!-- banner标题 -->
    <div class="banner-container">
      <div v-show="bannerTitle" class="banner-title">{{bannerTitle}}</div>
    </div>

    <!-- 表单 -->
    <div class="form-container">
      <div class="form-controll">
        <input v-wxBlur type="tel" v-model="form.phoneNum" ref="phoneNum" placeholder="请输入手机号" maxlength="11" />
      </div>
      <div class="form-controll">
        <input v-wxBlur type="text" v-model="form.uuid" placeholder="请填写您的UID" />
        <a href="javascript:void(0);" class="label" @click="$router.push({path:'uidHelp',query:{uuidPic:uuidPic}})">如何获取UID</a>
      </div>
      <div class="form-controll">
        <input v-wxBlur type="tel" v-model="form.code" placeholder="请输入验证码" maxlength="6" />
        <TimerBtn class="label" ref="TimerBtn" :text="'获取验证码'" :time="60" :cb="sendCode"></TimerBtn>
      </div>
      <Button class="submit" @click.native="submit" :show-loading="submitLoading" :disabled="submitDis">立即报名</Button>
    </div>

    <!-- 活动规则 -->
    <div class="rule-container" v-show="ruleList.length > 0">
      <div class="rule-title">
        <span>活动规则</span>
      </div>
      <div class="rule-list">
        <ul>
          <li v-for="(item,index) in ruleList" :key="index">
            <i>{{index+1}}</i>
            <span>{{item}}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import MsgScroll from "./modules/msgScroll.vue";
import TimerBtn from "../../components/TimerBtn";
import Button from "@common/finsuit-components/Button";
export default {
  components: { MsgScroll, TimerBtn, Button },

  data () {
    return {
      // banner标题
      bannerTitle: "",
      // 规则列表
      ruleList: [],
      // uid页面图片地址
      uuidPic: "",
      // 表单
      form: {
        phoneNum: "",
        uuid: "",
        code: ""
      },
      // 验证码SESSION_ID,提交报名时使用
      CODE_SESSION_ID: "",
      // 提交按钮loading
      submitLoading: false,
      // 提交按钮禁用
      submitDis: false,
      // 验证码校验规则
      sendCodeRule: [{
        name: "PHONE_NUM",
        checkType: "notnull",
        checkRule: "",
        errorMsg: "手机号不能为空"
      }, {
        name: "PHONE_NUM",
        checkType: "phoneno",
        checkRule: "",
        errorMsg: "手机号格式不正确"
      }],
      // 报名校验规则
      submitRule: [{
        name: "PHONE_NUM",
        checkType: "notnull",
        checkRule: "",
        errorMsg: "手机号不能为空"
      }, {
        name: "PHONE_NUM",
        checkType: "phoneno",
        checkRule: "",
        errorMsg: "手机号格式不正确"
      }, {
        name: "UID",
        checkType: "notnull",
        checkRule: "",
        errorMsg: "UID不能为空"
      }, {
        name: "PHONE_CODE",
        checkType: "string",
        checkRule: "6",
        errorMsg: "请输入正确的验证码"
      }]
    };
  },

  created () {
    this.renderData();
  },

  mounted () {
    this.$trackEvents.ACB0K013();
  },

  methods: {
    async renderData () {
      let params = {};
      let data = await this.$api.getHomeData(params);
      console.debug("获取首页数据", data);

      this.bannerTitle = data.MONEY;

      this.ruleList = data.RULE_LIST || [];

      this.uuidPic = data.UUID_PIC_URL;
    },

    /* 发送短信验证码 */
    async sendCode () {
      let params = { PHONE_NUM: this.form.phoneNum, CHECK_SAFT_CODE_FLAG: "1" };
      let checkRes = this.$formChecker.check(params, this.sendCodeRule);
      if (!checkRes) {
        this.$Toast(this.$formChecker.error);
        this.$refs.phoneNum.focus();
        return;
      }
      let res = await this.$api.getMsgCode(params);
      console.debug("发送验证码", res);
      let data = res.data;
      let head = res.head;
      if (head.CODE == "0") {
        this.CODE_SESSION_ID = head.SESSION_ID;
        this.startTimer();
      } else {
        this.$Toast(head.MSG);
      }
    },

    /* 倒计时开始 */
    startTimer () {
      this.$refs.TimerBtn.disabled = true;
      this.$refs.TimerBtn.timer();
    },

    /* 立即报名 */
    async submit () {
      let params = {
        PHONE_NUM: this.form.phoneNum,
        PHONE_CODE: this.form.code,
        UID: this.form.uuid,
        HD_CODE: "EARN",
        APP_FLAG: this.$store.state.APP_FLAG || "BC",
        OUTSIDE_ROLE: "CCL_HEADER"
      };

      let head = {
        APP_FLAG: "OUT_SIDE",
        CHANNEL_ID: "163",
        SESSION_ID: this.CODE_SESSION_ID
      };

      let checkRes = this.$formChecker.check(params, this.submitRule);
      if (!checkRes) {
        this.$Toast(this.$formChecker.error);
        return;
      }

      this.submitLoading = true;
      try {
        let data = await this.$api.postUser(params, head);
        console.debug("立即报名", data);

        // 如果验证码错误会走catch,这里永远禁用按钮
        this.submitDis = true;
        // 新用户
        if (data.EARN_USER_FLAG === "1") {
          this.$router.push({ path: "/newUser", query: { phoneNum: params.PHONE_NUM } });
        } else {
          this.$router.push({ path: "/oldUser", query: { phoneNum: params.PHONE_NUM } });
        }
        // 打点
        this.$trackEvents.ACB0K012({ ITEM_VALUE: params.PHONE_NUM });
      } catch (error) {
        console.error(error);
      }
      this.submitLoading = false;
    }
  }
};
</script>

<style lang="less" scoped>
.main {
  min-height: 100vh;
  background: #c11515;
  padding-bottom: 50px;

  .banner-container {
    width: 654px;
    height: 737px;
    margin: 80px auto 0;
    background: url("../../assets/images/banner.png") no-repeat;
    background-size: cover;
    overflow: hidden;

    .banner-title {
      width: 546px;
      height: 120px;
      margin: 590px auto 0;
      background: url("../../assets/images/title.png") no-repeat;
      background-size: cover;
      font-size: 30px;
      color: #fff;
      text-align: center;
      line-height: 100px;
    }
  }

  .form-container {
    width: 702px;
    padding: 35px 50px;
    box-sizing: border-box;
    background: #fff9f3;
    border-radius: 10px;
    border: 4px solid #ffb200;
    margin: 0 auto;
    a {
      &:hover,
      &:active,
      &:visited {
        color: black;
      }
    }
    .form-controll {
      background: #fff;
      border-radius: 20px;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      box-sizing: border-box;

      input {
        flex: 1;
        height: 88px;
        font-size: 26px;
        padding: 0px 20px;
      }

      .label {
        margin: 0 20px;
        font-size: 28px;
        min-width: 160px;
        text-align: center;
      }
    }

    .submit {
      display: block;
      width: 600px;
      //   height: 88px;
      margin: 0px auto;
      border-radius: 500px;
      color: #fff;
      font-size: 32px;
      background: linear-gradient(to bottom, #fbb41f, #f79323);
    }
  }

  .rule-container {
    padding: 0px 25px;
    box-sizing: border-box;
    .rule-title {
      font-size: 28px;
      color: #fff;
      text-align: center;
      margin: 30px 0;

      span {
        position: relative;
        display: inline-block;
        &::after,
        &::before {
          content: "";
          display: block;
          border-bottom: 1.5px solid #fff;
          width: 100px;
          position: absolute;
          top: 49.5%;
        }
        &::after {
          left: 130%;
        }

        &::before {
          right: 130%;
        }
      }
    }

    .rule-list {
      color: #fff;
      font-size: 28px;

      li {
        margin-bottom: 50px;
        padding-left: 50px;
        box-sizing: border-box;
        position: relative;

        i {
          display: inline-block;
          width: 36px;
          height: 36px;
          border-radius: 500px;
          background: #fff;
          color: #ff7251;
          font-size: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          left: 0;
          top: 5px;
        }
      }
    }
  }
}
</style>
