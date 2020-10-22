<!-- 用户积分 -->
<template>
  <section class=''>
    <!-- 会员卡片 -->
    <div class="user-score">
      <div class="content">
        <p>
          <Countup :start-val="0" :end-val="userScoreData.userScore" :duration="2" :decimals="0" class="countup"></Countup>
        </p>
        <span>积分</span>
      </div>

      <div class="footer">
        <span class="date"><span v-show="userScoreData.userExpireScore">{{userScoreData.userExpireScore}}积分将于 {{userScoreData.userExpireScoreDate}} 过期</span></span>
        <span @click="toUrl">积分明细</span>
        <span class="arraw-icon"></span>
      </div>
    </div>
  </section>
</template>

<script>

import Countup from "../../../components/Countup"
export default {
  components: { Countup },
  data () {
    return {
      userScoreData: {
        userScore: 0,
        userExpireScore: 0,
        userExpireScoreDate: '--'
      }
    };
  },
  created () {

  },
  activated () {
    this.renderData();
    this.$bus.$on("pageAppear", this.renderData);
  },
  deactivated () {
    this.$bus.$off("pageAppear");
  },
  //方法集合
  methods: {
    async renderData () {
      let params = {};
      let data = await this.$api.getUserScoreCard(params).then(this.$interfaceApi.getUserScoreCard);
      this.userScoreData = data;
    },
    toUrl () {
      // 打点
      this.$trackEvents.B000A474({});

      this.$router.push({ path: '/userScoreNote' })
    }
  },
}
</script>
<style lang='less' scoped>
.user-score {
  // width: ;
  height: 270px;
  background: url(../../../assets/images/scoreBj.png) no-repeat;
  background-size: 110% 110%;
  background-position: center center;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  .content {
    color: #fff;
    text-align: center;
    margin-top: 50px;
    flex: 1;
    p {
      font-size: 45px;
      font-weight: bold;
    }
    .countup {
      //   color: red;
      letter-spacing: 2px;
    }
  }

  .footer {
    height: 60px;
    padding: 0 20px;
    background: rgba(255, 255, 255, 0.5);
    color: #fff;
    display: flex;
    align-items: center;
    // background: red;
    .date {
      flex: 1;
    }
    .arraw-icon {
      margin-left: 10px;
      display: inline-block;
      width: 0px;
      height: 0px;
      border-top: 8px solid transparent;
      border-right: 8px solid transparent;
      border-bottom: 8px solid transparent;
      border-left: 8px solid #fff;
    }
  }
}
</style>