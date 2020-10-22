<template>
  <ModuleBox class="module-inviteUserList" showTitle title="我邀请的好友" type="green" v-if="EARN_INVEXT_REL&&EARN_INVEXT_REL.length">
    <div class="container">

      <!-- 头部小标题 -->
      <div class="header">
        <span class="h1">手机</span>
        <span class="h2" :class="EARN_INVITED_SHOW_COLUMN == 2 ?'isVisibility':''">{{EARN_INVITED_SHOW_COLUMN == 0 ? "开户奖励" : "实名奖励"}}</span>
        <span class="h3">投资奖励</span>
      </div>

      <!-- 邀请的用户列表 -->
      <div class="user-list" v-for="(item,index) in EARN_INVEXT_REL" :key="index">

        <div class="user-item">
          <div class="phone">
            <p>{{item.INVITED_PHONE_NUM}}</p>
            <span>{{item.CREATE_TIME}}</span>
          </div>
          <div class="box" :class="EARN_INVITED_SHOW_COLUMN == 2 ?'isVisibility':''">
            <!-- 全亮--提醒好友 -->
            <StatusBox showLine status="remind" v-show="item.AUTH_REMIND_FLAG==1" @toRemindFriends="toRemindFriends('2',item.INVITED_ID)"></StatusBox>
            <!-- 上亮下灰--已提醒 -->
            <StatusBox showLine status="remindSuccess" v-show="item.AUTH_REMIND_FLAG==2"></StatusBox>
            <!-- 全亮-点击领取 -->
            <StatusBox showLine status="reward" v-show="item.AUTH_REMIND_FLAG==3" @clickGet="clickGet('2',item.INVITED_ID)"></StatusBox>
            <!-- 全灰--已获得 -->
            <StatusBox showLine status="rewardSuccess" v-show="item.AUTH_REMIND_FLAG==0" :lineColor="(item.INVEST_REMIND_FLAG==4 || item.INVEST_REMIND_FLAG==0)?'#ccc':''"></StatusBox>
            <!-- 全灰--0元 -->
            <StatusBox showLine status="fail" v-show="item.AUTH_REMIND_FLAG==4" :lineColor="(item.INVEST_REMIND_FLAG==4 || item.INVEST_REMIND_FLAG==0)?'#ccc':''"></StatusBox>
          </div>
          <div class="box">
            <!-- 全亮--提醒好友 (status="remindDis"-->
            <StatusBox status="remind" v-show="item.INVEST_REMIND_FLAG==1" @toRemindFriends="toRemindFriends('1',item.INVITED_ID)"></StatusBox>
            <!-- 全亮-点击领取 -->
            <StatusBox status="reward" v-show="item.INVEST_REMIND_FLAG==3" @clickGet="clickGet('1',item.INVITED_ID)"></StatusBox>
            <!-- 上亮下灰--已提醒 -->
            <StatusBox status="remindSuccess" v-show="item.INVEST_REMIND_FLAG==2"></StatusBox>
            <!-- 全灰--已获得 -->
            <StatusBox status="rewardSuccess" v-show="item.INVEST_REMIND_FLAG==0"></StatusBox>
            <!-- 全灰--0元 -->
            <StatusBox status="fail" v-show="item.INVEST_REMIND_FLAG==4"></StatusBox>
          </div>
        </div>
      </div>

    </div>
  </ModuleBox>
</template>

<script>
import ModuleBox from "@earn/components/ModuleBox/index.vue"
import StatusBox from "@earn/components/StatusBox/index.vue"

export default {
  components: { ModuleBox, StatusBox },
  data () {
    return {
      EARN_INVEXT_REL: [],
      EARN_INVITED_SHOW_COLUMN: "", // 实名奖励 或者 开户奖励
    }
  },
  created () {
    this.getInviteList()
  },
  mounted () {

  },

  methods: {
    async getInviteList () {
      let params = {}
      let data = await this.$api.getInviteList();
      console.log("朋友列表->", data);
      this.EARN_INVEXT_REL = data.EARN_INVEXT_REL;
      this.EARN_INVITED_SHOW_COLUMN = data.EARN_INVITED_SHOW_COLUMN;  // 0 开户奖励 1实名奖励 2 开户实名都不显示，隐藏
    },
    // 提醒好友
    async toRemindFriends (type, id) {
      this.$trackEvents.ACB0K004();
      let params = {
        INVITED_ID: id, //被邀请人id
        TASK_TYPE: this.EARN_INVITED_SHOW_COLUMN == 0 && type == 2 ? "4" : type // 1：首投；2：实名认证 , 4 开户 
      }
      let data = await this.$api.getRemindFriend(params);
      this.$Toast("提醒成功");
      console.log("提醒好友->", data);
      this.getInviteList();
    },
    // 点击领取
    async clickGet (type, id) {
      this.$trackEvents.ACB0K015();
      let params = {
        INVITED_ID: id, // 被邀请人id
        TASK_TYPE: this.EARN_INVITED_SHOW_COLUMN == 0 && type == 2 ? "4" : type // 1：首投；2：实名认证 , 4 开户 
      }
      let data = await this.$api.getReward(params);
      console.log("领取奖励->", data);
      let contentDesc = "";
      if (this.$store.state.APP_FLAG == "PMP") {
        contentDesc = "请下载比财APP查看/使用";
      } else {
        contentDesc = data.FREEZE_FLAG == 1 ? "待好友投资后获得" : this.$store.state.APP_FLAG == "PC" && this.$browser.OS == "IOS" ? "请到我的账户中查看" : "请到我的红包查看"
      }
      if (data.AWARD_TYPE == 1) { //1红包  2优惠券  3爱奇艺 4现金券
        let dialogComponent = this.$CommonDialog({
          componentName: "Coupon",
          appendElement: document.getElementById("page"),
          title: "现金红包",
          content: data.AWARD + "元现金红包",
          contentStatus: data.FREEZE_FLAG == 1 ? "冻结中" : "已发放",
          contentDesc: contentDesc,
          isCoupon: false // 是否为加息券
        })
      } else if (data.AWARD_TYPE == 2 || data.AWARD_TYPE == 4) {
        let dialogComponent = this.$CommonDialog({
          componentName: "Coupon",
          appendElement: document.getElementById("page"),
          title: "福利券",
          content: data.AWARD_TYPE == 2 ? data.AWARD + "%加息券" : data.AWARD + "现金券",
          contentStatus: data.FREEZE_FLAG == 1 ? "冻结中" : "已发放",
          contentDesc: contentDesc,
          isCoupon: true // 是否为加息券
        })
      } else if (data.AWARD_TYPE == 3) {
        let dialogComponent = this.$CommonDialog({
          componentName: "MembershipCard",
          appendElement: document.getElementById("page"),
          title: "会员卡",
          desc: "抽奖获得",
          content: "爱奇艺会员卡",
          exchangeCode: data.AWARD,
          copyCallBack: () => {
            this.$trackEvents.ACB0K022();
            this.$Toast("复制成功");
            // dialogComponent.close()
          }
        })
      }
      this.getInviteList();

    },

  }
}
</script>

<style lang="less" scoped>
.container {
  margin: 28px;
  box-sizing: border-box;
  border-radius: 20px;
  box-shadow: 0px 0px 10px 0px #eee;
  overflow-y: scroll;
  max-height: 826px;
  padding-bottom: 50px;
  box-sizing: border-box;
  .isVisibility {
    visibility: hidden;
  }
  &::after {
    content: "";
    width: 88%;
    height: 60px;
    position: absolute;
    bottom: 4.5%;
    left: 6%;
    background-image: linear-gradient(
      -180deg,
      rgba(255, 255, 255, 0) 0%,
      #fff 70%
    );
  }
  &::-webkit-scrollbar-track-piece {
    background-color: rgba(0, 0, 0, 0);
    border-left: 1px solid rgba(0, 0, 0, 0);
  }
  &::-webkit-scrollbar {
    width: 3px;
    height: 10px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(59, 56, 56, 0.5);
    background-clip: padding-box;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    min-height: 18px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: rgba(0, 0, 0, 0.5);
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
  }
}
.header {
  display: flex;
  line-height: 50px;
  background: #ffece8;
  color: #884d2b;
  font-size: 22px;
  padding: 0 20px;
  box-sizing: border-box;
  .h1 {
    flex: 0.4;
  }
  .h2 {
    flex: 0.3;
    text-align: center;
  }
  .h3 {
    flex: 0.3;
    text-align: center;
  }
}

.user-list {
  .user-item:nth-of-type(even) {
    background: #fffbfb;
  }
  .user-item {
    display: flex;
    height: 144px;
    align-items: center;
    padding: 0 20px;
    box-sizing: border-box;

    .phone {
      flex: 0.4;
      font-size: 24px;
      color: #333;
      line-height: 40px;
      p {
        font-weight: 600;
      }
      span {
        font-size: 22px;
        color: #b5b5b5;
      }
    }
    .box {
      flex: 0.3;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
