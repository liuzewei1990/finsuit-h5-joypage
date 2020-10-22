<!-- 会员等级页面 -->
<template>
  <section class='user-level'>
    <div class="level">

      <!-- 等级卡片 -->
      <div class="level-card" :class="levelColor[userLevel.levelColor]">
        <div class="icon">
          <img :src="$transfromAliyunUrl(userLevel.levelIcon)" alt="">
        </div>
        <div class="contnet">
          <p class="name">{{userLevel.levelName}}</p>
          <span class="value">当前经验值{{userLevel.score || 0}}/升级{{userLevel.nextLevel || 0}}</span>
        </div>
      </div>

      <!-- 等级说明 富文本 -->
      <div class="level-info">
        <p class="title">等级说明</p>
        <div class="text common-rich-max-img" v-html="userLevel.levelInfo"></div>
      </div>

    </div>
  </section>
</template>

<script>

export default {
  components: {},
  data () {
    return {
      userLevel: {},
      levelColor: {
        "A": "A_B_Color",
        "B": "B_B_Color",
        "C": "C_B_Color",
      }
    };
  },
  activated () {
    this.getData(this.$route.query["memberId"]);
  },
  mounted () {

  },
  //方法集合
  methods: {
    async getData (memberId) {
      let params = {
        memberId: memberId || this.$store.state.ID
      };
      let data = await this.$api.getUserLevelInfo(params);
      if (Object.keys(data).length === 0) {
        this.$showTips("未配置会员等级");
      } else {
        this.userLevel = data;
      }
    }
  },
}
</script>
<style lang='less' scoped>
@import url(../../assets/css/levelColor.less);
.user-level {
  padding: 30px;
  box-sizing: border-box;
  min-height: 100vh;
}
.level-card {
  width: 686px;
  height: 172px;
  border-radius: 15px;
  padding: 20px 30px;
  box-sizing: border-box;
  margin: 20px auto;
  display: flex;
  align-items: center;
  .icon {
    width: 84px;
    height: 110px;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .contnet {
    margin-left: 32px;
    .name {
      font-size: 36px;
      margin-bottom: 5px;
      font-family: PingFangSC-Medium;
    }
    .value {
      font-size: 24px;
    }
  }
}

.level-info {
  .title {
    margin: 20px 0;
    color: #303133;
    font-size: 36px;
    font-family: PingFangSC-Medium;
  }
  .text {
  }
}
</style>