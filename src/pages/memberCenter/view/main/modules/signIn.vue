<!-- 签到模块 -->
<template>
  <section class='signIn-module'>
    <div class="box">
      <!-- 用户头像 -->
      <div class="user-header">
        <div class="head"><img :src="$transfromAliyunUrl(signData.userHeader)" alt=""></div>
        <span class="name">{{signData.userName}}</span>
      </div>

      <!-- 积分说明 -->
      <div class="box-info" v-show="signData.signDateList.length > 0">
        <p class="l ellipsis" v-if="isUserLevel" @click="toLevelUrl"><img class="level-icon" :src="userLevel.levelIcon" alt=""><span class="level-name" :class="userLevel.levelColor+'_T_Color'">{{userLevel.levelName}}</span><span class="level-value">经验值{{userLevel.score}}/{{userLevel.nextLevel}}</span></p>
        <span class="l ellipsis" v-else>{{signData.scoreInfoText}}</span>
        <span class="r" @click="toUrl">会员积分 {{signData.userScore}}</span>
        <span class="arraw-icon"></span>
      </div>
    </div>

    <!-- 签到日期 -->
    <div class="sign-date-box">
      <div class="sign-date" v-show="signData.signDateList.length > 0">
        <div class="sign-date-top">
          <p>已连续签到{{signData.signDayNum}}天，开启签到提醒</p>
          <XSwitch v-model="switchs" @click.native="clickSwitch" :disabled="false" />
        </div>
        <div class="sign-date-list">
          <div class="item-icon-block" v-for="(item,i) in signData.signDateList" :key="i">

            <!-- 一排图标 -->
            <div class="item-icon">
              <div class="icon icon-inner"></div>
              <div class="icon icon-outer" :class="{'animeta':item.isSign == '2'}"><span>+{{item.dateScore}}</span></div>
            </div>

            <!-- 一排线条 -->
            <div class="item-line">
              <StepLine :leftLine="i!=0" :rightLine="i!=signData.signDateList.length-1" :active="item.isSign == '2'" />
            </div>

            <!-- 一排日期 -->
            <div class="item-date">
              <span>{{item.dateTime}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import XSwitch from "../../../components/Switch"
import StepLine from "../../../components/StepLine"
import Countup from "../../../components/Countup"
import { mapState, mapActions, mapGetters } from "vuex"
export default {
  components: { XSwitch, StepLine, Countup },
  computed: {
    ...mapGetters({
      isLogin: "isLogin"
    }),
    ...mapState({
      // 导出签到数据
      signData: state => state.MainData.signData,
      //  导出会员等级
      userLevel: state => state.MainData.userLevel,
    }),

    // 是否配置会员等级
    isUserLevel () {
      return !(Object.keys(this.userLevel).length === 0)
    },

    signRemind () {

    },

    switchs: {
      get () {
        return this.signData.signRemind == "1";
      },
      set (v) {
        this.signData.signRemind = v ? "1" : "0"
      },
    }
  },
  data () {
    return {
      //   switchs: false
    };
  },
  created () {
  },
  mounted () {
  },
  //方法集合
  methods: {

    // 开始签到
    async sign () {
      let params = {};
      let data = await this.$api.sign(params);
      if (data.status == "1") {
        this.signData.signDayNum = Number(this.signData.signDayNum) + 1;
        this.signSuccessDialog(data.currentIntegral);
      }
    },

    // 签到成功弹窗
    // signSuccessDialog1 () {
    //   let dialog = this.$CommonDialog({
    //     appendElement: document.querySelector("#page"),
    //     defaultcloseBtnVisible: false,
    //     hideOnBlur: false,
    //     componentName: "SignSuccess",
    //     title: "签到成功!",
    //     content: "积分+1",
    //     btnText: "知道了",
    //     btnClick: () => {
    //       dialog.close();
    //       this.scoreNumAnimeta();
    //     }
    //   })
    // },

    signSuccessDialog (dateScore) {
      let signSuccess = this.$throwComponent.throw({
        component: require("../../../components/CommonDialog/Children/SignSuccess").default,
        maskConfig: {
          defaultcloseBtnVisible: false
        }
      });

      signSuccess.$props.componentData = {
        title: "签到成功!",
        content: dateScore && `积分+${dateScore}`,
        btnText: "知道了",
        btnClick: () => {
          this.$throwComponent.close();
        }
      }

      signSuccess.$on("onHide", this.scoreNumAnimeta);

    },

    // 积分动画
    scoreNumAnimeta () {
      let signData = this.signData;
      let item = signData.signDateList.find(item => item.dateTime === "今日");
      if (item.isSign == "2") {
        console.debug("今日已签");
        return;
      } else {
        item.isSign = "2";
        signData.userScore = Number(signData.userScore) + Number(item.dateScore);
      }
    },


    // 点击Switch
    async clickSwitch () {
      let isReminds = { "true": "1", "false": "0" }

      // 打点
      this.$trackEvents.B000A468({ ITEM_VALUE: this.switchs ? "打开" : "关闭" });

      try {
        let params = { isRemind: isReminds[this.switchs] };
        let data = await this.$api.postSignRemind(params);
        if (isReminds[this.switchs] == "1") {
          this.$showTips({
            position: "top",
            message: "已开启提醒，每日10:00推送"
          });
        } else {
          this.$showTips({
            position: "top",
            message: "已取消提醒"
          });
        }
      } catch (error) {
        this.signData.signRemind = !this.switchs ? "1" : "0";
      }
    },

    toUrl () {
      // 打点
      this.$trackEvents.B000A469();

      this.$router.push({ path: '/userScore' });
    },

    toLevelUrl () {
      this.$router.push({ path: '/userLevel' });
    }
  },
}
</script>
<style lang='less' scoped>
@import url(../../../assets/css/levelColor.less);
.signIn-module {
  //   min-height: 500px;
  //   font-family: PingFangSC-Medium, PingFang SC;
}

.box {
  background: #fff;
  padding: 32px;
  box-sizing: border-box;
  min-height: 370px;
  border-bottom-left-radius: 500px 2em;
  border-bottom-right-radius: 500px 2em;
}

.user-header {
  display: flex;
  align-items: center;
  .head {
    width: 72px;
    height: 72px;
    border: 1.5px solid #eee;
    border-radius: 500px;
    background: #eee;
    margin-right: 16px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .name {
    font-size: 40px;
    font-weight: bold;
    color: rgba(48, 49, 51, 1);
  }
}

.box-info {
  font-size: 24px;
  font-weight: 400;
  color: rgba(163, 167, 173, 1);
  display: flex;
  align-items: center;
  margin-top: 20px;
  .l {
    .level-icon {
      display: inline-block;
      width: 36px;
      height: 48px;
      margin-right: 10px;
    }
    .level-name {
      font-size: 28px;
      margin-right: 10px;
      font-family: PingFangSC-Medium;
    }
    .level-value {
      font-size: 24px;
      color: #a3a7ad;
    }
  }
  .l {
    flex: 1;
  }
  .r {
    float: right;
    color: #508cee;
    .countup {
      //   min-width: 60px;
      display: inline-block;
      text-align: right;
    }
  }

  .arraw-icon {
    margin-left: 10px;
    display: inline-block;
    width: 0px;
    height: 0px;
    border-top: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 8px solid transparent;
    border-left: 8px solid #508cee;
  }
}

.sign-date-box {
  //   width: 686px;
  min-height: 322px;
  background: #fff;
  border-radius: 16px;
  margin: -180px 32px 0;
  overflow: hidden;
  box-shadow: 0px 0px 8px 5px rgba(227, 231, 239, 0.26);
  .sign-date {
    display: flex;
    flex-direction: column;
    //   margin-top: 100px;

    /* 标题 */
    .sign-date-top {
      height: 102px;
      background: rgba(80, 140, 238, 1);
      display: flex;
      align-items: center;
      padding: 0 32px;
      box-sizing: border-box;
      p {
        color: #fff;
        font-size: 28px;
        flex: 1;
      }
    }

    /* 日期列表 */
    .sign-date-list {
      padding: 32px;
      box-sizing: border-box;
      flex: 1;

      display: flex;
      justify-content: space-between;
      .item-icon-block {
        display: flex;
        // justify-content: center;
        align-items: center;
        flex-direction: column;
        .item-icon {
          width: 62px;
          height: 62px;
          position: relative;
          .icon {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-size: 99% 100%;
            background-repeat: no-repeat;
            font-size: 20px;
          }
          .icon-inner {
            z-index: 0;
            background-image: url(../../../assets/images/sign-succ.png);
          }
          .icon-outer {
            z-index: 1;
            // display: none;
            background-image: url(../../../assets/images/sign-awa.png);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #ffefdd;
            transition: all 0.5s;
          }
          .animeta {
            top: -60px;
            opacity: 0;
          }
        }

        .item-line {
          height: 30px;
          width: 30px;
          //   background: #eee;
          margin-top: 16px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .item-date {
          color: #303133;
          font-size: 24px;
          line-height: 50px;
        }
      }
    }
  }
}
</style>