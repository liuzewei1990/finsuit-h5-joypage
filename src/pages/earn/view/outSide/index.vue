<template>
  <section id="page" class="main" v-if="allTitle.HEAD_ING_URL">
    <!-- 消息滚动 -->
    <MsgScroll></MsgScroll>
    <p class="main-title">{{allTitle.EARN_MAIN_TITLE}}</p>
    <div class="sub-title">
      <span>{{ allTitle.EARN_VICE_TITLE_2}}</span><img src="../../assets/images/titile2yezi@2x.png" alt="">
    </div>
    <div class="fromuserinvite"><img :src="$Config.aliyuncHost+allTitle.HEAD_ING_URL" alt="" v-if="allTitle.HEAD_ING_URL">&nbsp;{{allTitle.EARN_VICE_TITLE_1}}</div>
    <div class="saomaInvitive-top">
      <img src="../../assets/images/outSide-gbbg@2x.png" alt>
      <p class="saomaInvitive-diriction">获得{{mountMoney}}元红包</p>
      <p class="saomaInvitive-money">
        <span class="forNum">{{mountMoney}} <i>￥</i></span>
      </p>
    </div>
    <div class="saomaInvitive-box">
      <input v-wxBlur type="tel" v-model="form.phoneNum" ref="phoneNum" placeholder="请输入手机号" maxlength="11" class="saomaInvitive-phone" />
      <div class="getCode">
        <input v-wxBlur type="tel" v-model="form.code" placeholder="请输入验证码" maxlength="6" class="saomaInvitive-code" />
        <TimerBtn class="label" ref="TimerBtn" :text="'获取验证码'" :time="60" :cb="sendCode"></TimerBtn>
      </div>
      <!-- <p @click="login" v-if="moreClick">立即领取</p>
      <p v-else style="filter:grayscale(100%)">立即领取</p> -->
      <Button class="submit" @click.native="submit" :show-loading="submitLoading" :disabled="submitDis">立即报名</Button>
    </div>
    <!-- 活动规则 -->
    <div class="rule-container" v-show="ruleData.length > 0">
      <div class="rule-title">
        <span>活动规则</span>
      </div>
      <div class="rule-list">
        <ul>
          <li v-for="(item,index) in ruleData" :key="index">
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
let wxload = () => import( /* webpackChunkName: "weixin-js-sdk" */ "weixin-js-sdk");
export default {
  components: { MsgScroll, TimerBtn, Button },
  data () {
    return {
      // 可配标题
      allTitle: "",
      // 规则列表
      ruleList: ["更健康是", "归属地还舍不得你"],
      // uid页面图片地址
      uuidPic: "",
      mountMoney: "", // 红包金额
      ruleData: "",  // 规则列表
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
        name: "PHONE_CODE",
        checkType: "string",
        checkRule: "6",
        errorMsg: "请输入正确的验证码"
      }]
    };
  },

  async created () {
    /**
     * 进入此页面需带参数说明：PMP_FLAG：1 PC，BC
     * NEWCHANNEL_ID：各种 异业渠道，由链接参数获取，若地址无CHANNEL_ID参数，则按上期连连赚的写法传
     * MEMBER_ID:INVITE_ID邀请人id
     */
    if (!!this.$route.query.mp) {
      this.wx = await wxload();
    }
    this.renderData();
    this.renderTitle();
  },

  async mounted () {
    let obj = {
      FUNCTION_STATUS: "1",  // 状态
      MEMBER_ID: this.$store.state.ID, // 用户，会员id
    }
    this.$trackEvents.ACB0K014();
  },

  methods: {
    async renderData () {
      let params = { APP_FLAG: this.$store.state.APP_FLAG };
      let data = await this.$api.getoutSideAvctiveRule(params);
      console.log("规则", data);
      this.mountMoney = data.MONEY;
      this.ruleData = data.RULE_LIST || [];
    },
    async renderTitle () {
      let params = { INVITE_ID: this.$store.state.ID };
      let res = await this.$api.getAllTitle(params);
      console.log("主副标题", res);
      this.allTitle = res;
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
      // 打点
      let obj = {
        ITEM_VALUE: this.mobile,
        SOURCE_ID: "2",  //  渠道
        FUNCTION_STATUS: "1",  // 状态
        MEMBER_ID: this.$store.state.ID, // 用户，会员id
      }
      this.$trackEvents.ACB0K007(() => { }, obj);
      let params = {
        PHONE_NUM: this.form.phoneNum,
        PHONE_CODE: this.form.code,
        APP_FLAG: "OUT_SIDE",
        INVITE_ID: this.$store.state.ID,
        HD_CODE: "EARN",
        APP_FLAG: this.$store.state.APP_FLAG || "BC",
        MARKETING_CHANNELS: this.$route.query.MARKETING_CHANNELS || "", // 新增此字段：后端为识别异业渠道APP_FLAG=PMP，
      };
      let NEWCHANNEL_ID = "";
      let NEWCHANNELOBJ = { BC: 1, PC: 11, PMP: 12 };
      if (this.$route.query.CHANNEL_ID) {
        NEWCHANNEL_ID = this.$route.query.CHANNEL_ID;  //各种 异业渠道，由链接参数获取
      } else {
        NEWCHANNEL_ID = NEWCHANNELOBJ[this.$store.state.APP_FLAG] || 1; // 若地址无CHANNEL_ID参数，则按上期连连赚的写法传 APP_FLAG == 'BC' ? 1 : PC :11， PMP --12; 
      }
      let head = {
        APP_FLAG: "OUT_SIDE",
        CHANNEL_ID: NEWCHANNEL_ID,
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
        if (!!this.$route.query.mp) {
          // 小程序都去首页
          setTimeout(() => {
            this.wx.miniProgram.switchTab({ url: '/pages/index/index' })
          }, 2000);
        } else {
          // 新用户
          if (data.EARN_USER_FLAG === "1") {
            this.$router.push({ path: "/newUser", query: { phoneNum: params.PHONE_NUM } });
          } else {
            this.$router.push({ path: "/oldUser", query: { phoneNum: params.PHONE_NUM } });
          }
        }
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
  background: linear-gradient(to bottom, #ff8762, #ff6949);
  padding-bottom: 50px;
  position: relative;
  z-index: 0;
  .main-title {
    font-size: 69px;
    color: #fff;
    font-family: Helvetica;
    margin-top: 150px;
    text-align: center;
    letter-spacing: 2px;
  }
  .sub-title {
    width: 83%;
    margin: 24px auto 0;
    height: 57px;
    background: #fff;
    position: relative;
    top: 0px;
    border-radius: 12px;
    color: #ff835f;
    font-size: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      max-width: 100%;
      overflow: hidden;
      height: 84%;
    }
    img {
      width: 70px;
      position: absolute;
      right: -42px;
      top: -20px;
      z-index: -1;
    }
  }
  .fromuserinvite {
    letter-spacing: 4px;
    margin-top: 31px;
    display: flex;
    justify-content: center;
    font-size: 26px;
    font-family: PingFangSC-Medium, PingFangSC;
    font-weight: 700;
    color: rgba(190, 32, 0, 1);
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
  .saomaInvitive-top {
    box-sizing: border-box;
    height: 686px;
    position: relative;
    margin-top: -290px;
    z-index: -1;
    img {
      width: 100%;
      height: 100%;
    }
    .saomaInvitive-diriction {
      position: absolute;
      top: 51%;
      width: 100%;
      text-align: center;
      font-size: 28px;
      font-family: PingFangSC-Semibold;
      font-weight: 600;
      color: #fb523c;
    }
    .saomaInvitive-money {
      position: absolute;
      text-align: center;

      top: 56%;
      width: 100%;
      .forNum {
        width: 135px;
        height: 157px;
        font-size: 100px;
        font-weight: 600;
        font-family: PingFangSC-Semibold;
        color: rgba(251, 82, 59, 1);
        -webkit-text-shadow: 0px 1px 16px #7e000094;
        -webkit-text-shadow: 0px 1px 16px rgba(126, 0, 0, 0.58);
        -moz-text-shadow: 0px 1px 16px #7e000094;
        -moz-text-shadow: 0px 1px 16px rgba(126, 0, 0, 0.58);
        -o-text-shadow: 0px 1px 16px #7e000094;
        -o-text-shadow: 0px 1px 16px rgba(126, 0, 0, 0.58);
        text-shadow: 0px 1px 16px #7e000094;
        text-shadow: 0px 1px 16px rgba(126, 0, 0, 0.58);
        position: relative;
      }
      // .forNum::after {
      //   content: "￥";
      //   position: absolute;
      //   right: -40px;
      //   top: 14%;
      //   font-size:40px;
      //   font-weight: 800;
      // }
      .forNum {
        i {
          position: absolute;
          right: -40px;
          top: 16%;
          font-size: 40px;
          font-weight: 800;
        }
      }
      i {
        font-size: 36px;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: rgba(251, 82, 59, 1);
        line-height: 50px;
        text-shadow: 0px 1px 10px rgba(126, 0, 0, 0.58);
      }
    }
  }
  .saomaInvitive-box {
    text-align: center;
    input {
      padding-left: 24px;
      box-sizing: border-box;
      font-size: 26px;
    }
    ::-webkit-input-placeholder {
      color: #b9b9b9ff;
      font-size: 26px;
    }
    .saomaInvitive-phone {
      width: 600px;
      min-height: 88px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 2px 10px 0px rgba(255, 178, 0, 0.06);
      border-radius: 16px;
      margin-top: 51px;
    }
    .submit {
      display: block;
      width: 600px;
      height: 88px;
      margin: 35px auto 0;
      border-radius: 500px;
      color: #fff;
      font-size: 32px;
      background: linear-gradient(to bottom, #fbb41f, #f79323);
    }
    .getCode {
      position: relative;
      margin-top: 35px;
      .label {
        color: #333333ff;
        font-size: 28px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        position: absolute;
        right: 13%;
        display: inline-block;
        height: 100%;
        line-height: 3.2;
      }
      .getCode-text {
        color: #333333ff;
        font-size: 28px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        position: absolute;
        right: 13%;
        display: inline-block;
        height: 100%;
        line-height: 3.2;
      }
      .getCode-count {
        position: absolute;
        right: 13%;
        color: #333333ff;
        font-size: 28px;
        display: inline-block;
        height: 100%;
        line-height: 3;
      }
      .saomaInvitive-code {
        width: 600px;
        min-height: 88px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 2px 10px 0px rgba(255, 178, 0, 0.06);
        border-radius: 16px;
      }
    }
    p {
      width: 600px;
      height: 88px;
      background: linear-gradient(
        180deg,
        rgba(255, 225, 105, 1) 0%,
        rgba(255, 178, 17, 1) 100%
      );
      box-shadow: 0px 10px 20px 0px rgba(236, 75, 42, 0.2);
      border-radius: 44px;
      font-size: 32px;
      font-family: PingFangSC-Semibold;
      font-weight: 600;
      color: rgba(136, 77, 43, 1);
      letter-spacing: 2px;
      text-shadow: 0px 2px 10px rgba(208, 112, 4, 0.2);
      margin: 35px auto 0;
      line-height: 88px;
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
