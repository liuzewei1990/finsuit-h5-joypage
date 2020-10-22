<!-- 积分 -->
<template>
  <section class='user-score-page'>
    <!-- 积分卡片 -->
    <UserScore></UserScore>
    <!-- 积分商品 -->
    <ScoreGoods class="score-goods"></ScoreGoods>
    <!-- 会员积分规则 按需要抽出去 -->
    <a href="javascript:void(0);" class="footer-btn" @click="toUrl">会员积分规则</a>
  </section>
</template>

<script>
import ScoreGoods from "./modules/scoreGoods"
import UserScore from "./modules/userScore"
export default {
  components: { UserScore, ScoreGoods },
  data () {
    return {
    };
  },
  created () {

  },
  mounted () {

  },
  //方法集合
  methods: {
    toUrl () {
      // 打点
      this.$trackEvents.B000A476({});
      this.$router.push({ path: '/userScoreRule' })
    }
  },
}
</script>
<style lang='less' scoped>
.user-score-page {
  padding: 32px;
  box-sizing: border-box;
  background: #fff;
  min-height: 100vh;
  &::after {
    content: "";
    display: block;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 1.5px;
    background: #f2f2f2;
  }

  .score-goods {
    min-height: calc(100vh - 270px - 32px - 32px - 50px);
  }

  .footer-btn {
    // margin-top: 22px;
    height: 50px;
    line-height: 50px;
    background: #fff;
    font-size: 28px;
    font-weight: 400;
    color: rgba(80, 140, 238, 1);
    text-align: center;
    display: block;
  }
}
</style>