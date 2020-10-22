<template>
  <div>
    <div class="card" v-for="(item,index) in inviteFlows" :key="index">
      <p class="title">{{item.phoneNum}}</p>
      <div v-for="(_item,_index) in item.flowList" :key="_index">
        <p class="item" v-if="_item.invitedStatus==1">
          <span><i></i></span>
          <span>{{_item.createTime}}&emsp;好友接受邀请</span>
        </p>
        <p class="item" v-if="_item.invitedStatus==2">
          <span><em></em></span>
          <span>{{_item.createTime}}&emsp;好友开始投资</span>
        </p>
        <p class="item" v-if="_item.invitedStatus==3">
          <span><em></em></span>
          <span>{{_item.createTime}}&emsp;邀请已过期，请重新邀请</span>
        </p>

        <template v-if="_item.invitedStatus==4">
          <p class="item" v-if="_item.investStatus==1">
            <span><em></em></span>
            <span>{{_item.createTime}}&emsp;预计奖励30元现金</span>
          </p>
          <p class="item" v-if="_item.investStatus==2">
            <span><em></em></span>
            <span>{{_item.createTime}}&emsp;已奖励{{_item.expectReward}}{{_item.expectRewardType == 1 ? "元现金":"积分"}}至会员权益</span>
          </p>
          <p class="item" v-if="_item.investStatus==3">
            <span><em></em></span>
            <span>{{_item.createTime}}&emsp;好友提前支取，奖励失效</span>
          </p>
        </template>
        <p class="again-invite" @click="invite" v-if="item.invitedStatus==3">重新邀请</p>
      </div>
    </div>

  </div>
</template>

<script>

export default {
  data () {
    return {

    };
  },
  props: ["inviteFlows"],
  created () {

  },
  mounted () {
    setTimeout(() => {
      console.log("inviteFlows", this.inviteFlows);
    }, 1000);
  },
  methods: {
    invite () {
      this.$emit("againInvite")
    }
  }
};
</script>

<style scoped lang="less">
.card {
  min-height: 136px;
  background: #ffffff;
  border-radius: 8px;
  padding: 30px;
  font-family: PingFangSC-Regular, PingFang SC;
  margin: 24px 0;
  > div:last-of-type {
    .item {
      .black;
    }
  }
  .title {
    font-size: 28px;
    color: #303133;
  }
  .item {
    display: flex;
    margin: 14px 0;
    color: #a3a7ad;
    span:first-of-type {
      width: 28px;
      line-height: 1.4;
      i {
        width: 10px;
        height: 10px;
        display: inline-block;
        background-color: #a3a7ad;
        border-radius: 50%;
      }
      em {
        width: 10px;
        height: 10px;
        display: inline-block;
        background-color: #a3a7ad;
        border-radius: 50%;
        &::before {
          content: "";
          width: 1px;
          height: 40px;
          background-color: #a3a7ad;
          position: absolute;
          margin-left: 4px;
          margin-top: -40px;
        }
      }
    }
  }
  .black {
    color: #333333;
    span:first-of-type {
      i,
      em {
        background-color: #333333;
      }
    }
  }
  .again-invite {
    width: 136px;
    height: 56px;
    line-height: 56px;
    text-align: center;
    background: linear-gradient(180deg, #fff4a2 0%, #ffc812 100%);
    border-radius: 28px;
    font-size: 28px;
    font-family: PingFangSC-Regular, PingFang SC;
    color: #b14318;
    position: absolute;
    margin-top: -100px;
    margin-left: 494px;
  }
}
</style>
