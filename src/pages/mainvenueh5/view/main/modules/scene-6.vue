<!-- 场景五 -->
<template>
  <section class='scene-main'>
    <div class="bj top" :style="{backgroundImage:`url(${$assets.maintopbj})`}">
      <!--<img class="back" :src="$assets.mainback">-->
      <img @click="playBackFn" class="huikan" :src="$assets.mainhuikan">
    </div>
    <div class="bj middle" :style="{backgroundImage:`url(${$assets.mainjianbian})`}">
      <div class="btn btn1" @click="goUrl('nps')">新人福利介绍</div>
      <div class="btn btn2" @click="goUrl('nay')">拼团介绍</div>
      <div class="btn btn3" @click="goUrl('ddf')">单单赚活动介绍</div>
    </div>
    <div class="bj bot" :style="{backgroundImage:`url(${$assets.mainbotbj})`}">
      <div class="btn">
        <img @click="actionFn('yq')" class="btn1" v-show="$store.state.APP_FLAG === 'PC' || $store.state.APP_FLAG === 'BC'" :src="$assets.mainbtn1">
        <img @click="actionFn('cy')" class="btn2" :src="$assets.mainbtn2">
      </div>
    </div>
  </section>
</template>

<script>
export default {
  components: {},
  data () {
    return {
    };
  },
  created () {

  },
  mounted () {
    this.$localStore("set", { key: 'isRead', value: '1' })
  },
  //方法集合
  methods: {
    // 回看
    playBackFn () {
      this.$parent.currSceneIndex = 1
      this.$trackEvents.ACB0R021()
    },
    // 跳转介绍页面
    goUrl (type) {
      let url;
      url = window.location.href.split("#")[0];
      url += `#/${type}`;
      url += `?ACTITY_ID=${this.$store.state.ACTITY_ID}`;
      url += `&loading=1218`;
      url += `&__with_login__=1`;
      url += `&finsuit=1`;
      this.$bcBridge.openWebview(url);
      switch (type) {
        case 'nps':
          this.$trackEvents.ACB0R018()
          break;
        case 'nay':
          this.$trackEvents.ACB0R019()
          break;
        case 'ddf':
          this.$trackEvents.ACB0R020()
          break;
      }
    },
    // 底部按钮
    actionFn (type) {
      switch (type) {
        case 'yq':
          this.$parent.openSharePopup()
          this.$trackEvents.ACB0R022()
          break;
        case 'cy':
          if (this.$store.state.APP_FLAG === "PC" || this.$store.state.APP_FLAG === "BC") {
            this.$bcBridge.gotoPreviousPage();
          } else {
            this.$downloadApp();
          }
          this.$trackEvents.ACB0R023()
          break;
      }
    }
  },
}
</script>
<style lang='less' scoped>
.scene-main {
  width: 100%;
  height: auto;
  background: #ff8a51;
}
.bj {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
}
.top {
  height: 630px;
  position: relative;
  .back {
    width: 68px;
    position: absolute;
    top: 80px;
    left: 38px;
  }
  .huikan {
    width: 80px;
    position: absolute;
    top: 80px;
    right: 0px;
  }
}
.middle {
  height: 600px;
  padding-top: 80px;
  .btn {
    background: #fffae9;
    height: 110px;
    width: 530px;
    line-height: 110px;
    text-align: center;
    color: #fb7f47;
    margin: auto;
    margin-bottom: 40px;
    font-size: 40px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    box-shadow: 0px 2px 0px 0px rgba(251, 127, 71, 1);
    border-radius: 56px;
  }
}
.bot {
  height: 1334px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  background-color: #2a2d4e;
  background-size: 100%;
  .btn {
    display: flex;
    height: 75px;
    margin-bottom: 40px;
    img {
      width: 246px;
    }
    .btn1 {
      margin-right: 60px;
    }
  }
}
</style>
