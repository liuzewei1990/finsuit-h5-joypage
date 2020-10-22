<template>
  <div class="my-prize" id="page">
    <div class="prize-total" v-if="gerReward">
      <div @click="toHongBao">
        <p class="havamoney">现金奖励<arrow></arrow>
        </p>
        <p class="amount">{{gerReward.amount}}元</p>
      </div>
      <hr>
      <div @click="toIntegral">
        <p class="havamoney">积分奖励<arrow></arrow>
        </p>
        <p class="amount">{{gerReward.integral}}积分</p>
      </div>
    </div>
    <p class="list-title">邀请及奖励明细</p>
    <card @againInvite="againInvite" :inviteFlows="gerReward.inviteFlows"></card>
    <!-- 分享popup -->
    <!-- <share-popup ref="share-popup"></share-popup> -->
  </div>
</template>
<script>
import card from './modules/card'
import SharePopup from "../main/modules/sharePopup.vue"
import arrow from '../../components/arrow'

export default {
  components: { card, SharePopup, arrow },
  data () {
    return {
      gerReward: ""
    }
  },
  created () {
    this.getReward()
  },
  mounted () {
    this.$bcBridge.updateTitle("邀新有礼")
  },
  methods: {
    toHongBao () {
      if (this.$store.state.APP_FLAG == "PC" || this.$store.state.APP_FLAG == "BC") {

        this.$openWebview("/asset/#/redPacket?customBar&h5HandleRightItems=1")
      }
    },
    toIntegral () {
      if (this.$store.state.APP_FLAG == "PC" || this.$store.state.APP_FLAG == "BC") {

        this.$openWebview("/activity/memberCenter/index.html#/userScore?ACTITY_ID=1040&customBar=1&needLogin=1&hideLoadinghideProgress=1&inviteId=87262&member_status=")
      }
    },
    againInvite () {
      this.$refs["share-popup"].show = true;
    },

    // 奖励明细
    async getReward (context) {
      let data = await this.$api.getData({
        "routeKey": "invitationInterFace-queryInvitationFlow"
      });
      console.log("奖励明细->", data.data);
      this.gerReward = data.data;
    },
  }
}
</script>
<style lang="less" scoped>
.my-prize {
  background: #ffe7be;
  min-height: 1334px;
  overflow: hidden;
  padding: 52px 30px 0;
  .prize-total {
    height: 154px;
    background-color: #ffae37;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #dcdcdc;
    border-radius: 8px;
    font-family: PingFangSC-Regular, PingFang SC;
    hr {
      height: 60px;
      width: 2.1px;
      background: #dcdcdc;
    }
    & > div {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
    .havamoney {
      font-size: 28px;
      color: #ffffff;
      display: flex;
      align-items: center;
    }
    .amount {
      color: #ffffff;
      font-size: 32px;
      font-weight: 600;
    }
  }
  .list-title {
    font-size: 32px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 600;
    color: #303133;
    margin: 40px 0 20px;
  }
}
</style>
