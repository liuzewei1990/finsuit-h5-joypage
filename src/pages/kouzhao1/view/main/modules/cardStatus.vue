<!-- 用户参与卡片状态 -->
<template>
  <section class='card-status'>

    <!-- 奖励失效 有收获地址-->
    <div class="card card-0" v-if="status == 0">
      <div class="content">
        <!-- 防止后台状态异常 无地址情况 去填写地址 -->
        <div class="address" v-show="!isAddress">
          <img :src="img" alt="">
          <p>奖励失效</p>
        </div>
        <!-- 有地址 -->
        <div class="top-box" v-show="isAddress">
          <p>{{userStatus.district}} {{userStatus.detailAddress}}</p>
          <span>{{userStatus.addressee}} {{userStatus.contactPhone}}</span>
        </div>
        <div class="bottom-box" v-show="isAddress">奖励失效</div>
      </div>
      <a class="btn" href="javascript:void(0);">奖励失效</a>
    </div>

    <!-- 持仓中 -->
    <div class="card card-1" v-if="status == 1">
      <div class="content">
        <!-- 防止后台状态异常 无地址情况 去填写地址 -->
        <div class="address" @click="toAddress" v-show="!isAddress">
          <img :src="img" alt="">
          <p>去填写收货地址</p>
        </div>
        <!-- 有地址 -->
        <div class="top-box" v-show="isAddress">
          <p>{{userStatus.district}} {{userStatus.detailAddress}}</p>
          <span>{{userStatus.addressee}} {{userStatus.contactPhone}}</span>
        </div>
        <div v-show="userStatus.investRemainDay" class="bottom-box">参与成功，还需持仓{{userStatus.investRemainDay}}天</div>
      </div>
      <a class="btn" href="javascript:void(0);">持仓中</a>
    </div>

    <!-- 等待发货 -->
    <div class="card card-2" v-if="status == 2">
      <div class="content">
        <!-- 防止后台状态异常 无地址情况 去填写地址 -->
        <div class="address" @click="toAddress" v-show="!isAddress">
          <img :src="img" alt="">
          <p>去填写收货地址</p>
        </div>
        <!-- 有地址 -->
        <div class="top-box" v-show="isAddress">
          <p>{{userStatus.district}} {{userStatus.detailAddress}}</p>
          <span>{{userStatus.addressee}} {{userStatus.contactPhone}}</span>
        </div>
        <div class="bottom-box">安排发货中，请耐心等待......</div>
      </div>
      <a class="btn" href="javascript:void(0);">等待发货</a>
    </div>

    <!-- 已发货 -->
    <div class="card card-3" v-if="status == 3">
      <div class="content">
        <!-- 防止后台状态异常 无地址情况 去填写地址 -->
        <div class="address" @click="toAddress" v-show="!isAddress">
          <img :src="img" alt="">
          <p>去填写收货地址</p>
        </div>
        <!-- 有地址 -->
        <div class="top-box" v-show="isAddress">
          <p>{{userStatus.district}} {{userStatus.detailAddress}}</p>
          <span>{{userStatus.addressee}} {{userStatus.contactPhone}}</span>
        </div>
        <div class="bottom-box">
          <p>口罩已发货，正在路上！</p>
          <div class="danhao" v-show="userStatus.logisticsNumber">
            <p>物流信息：{{userStatus.logisticsName}}{{userStatus.logisticsNumber}}</p>
            <a href="javascript:void(0);"  v-copy="userStatus.logisticsNumber"  v-copy:callback="copyCallback">复制</a>
          </div>
        </div>
      </div>
      <a class="btn" href="javascript:void(0);">已发货</a>
    </div>

    <!-- 投资成功，领取口罩 -->
    <div class="card-4" v-if="status == 4" @click="toAddress">
      <a class="btn" href="javascript:void(0);">投资成功，领取口罩</a>
    </div>

    <!-- 未参与 -->
    <div v-if="status == 5">

    </div>

  </section>
</template>

<script>

export default {
  props: {
    status: [String, Number],
    userStatus: {
      type: Object,
      default: () => { return {} }
    }
  },
  components: {},
  data () {
    return {
      img: require('../../../assets/images/11.png')
    };
  },
  computed: {
    isAddress () {
      return !!this.userStatus.contactPhone;
    }
  },
  created () {

  },
  mounted () {

  },
  //方法集合
  methods: {
    copyCallback () {
      // 打点
      this.$trackEvents.ACB0Y006();
      this.$Toast("复制成功");
    },
    toAddress () {
      // 打点
      this.$trackEvents.ACB0Y005();
      let url = this.$Config.kouzhaoHost;
      url += `#/address`;
      url += `?ACTITY_ID=${this.$store.state.ACTITY_ID}`;
      this.$bcBridge.openWebview(url);
    }
  },
}
</script>
<style lang='less' scoped>
.card {
  margin: 50px 0 20px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 4px 13px 0px rgba(0, 0, 0, 0.18);
  border-radius: 10px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  .content {
    flex: 1;
    padding: 26px;
    box-sizing: border-box;
  }

  .address {
    text-align: center;
    img {
      display: inline-block;
      width: 200px;
      height: 160px;
    }
    p {
      font-size: 29px;
      font-family: Source Han Sans SC;
      font-weight: 400;
      color: rgba(70, 70, 70, 1);
      line-height: 64px;
    }
  }

  .btn {
    display: block;
    height: 87px;
    background: #496df2;
    box-shadow: 0px 4px 13px 0px rgba(0, 0, 0, 0.18);
    border-radius: 0px 0px 10px 10px;
    font-size: 33px;
    font-family: Source Han Sans SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 87px;
    text-align: center;
  }
}

.card-0-0 {
  .content {
    text-align: center;
    img {
      display: inline-block;
      width: 200px;
      height: 160px;
    }
    p {
      font-size: 29px;
      font-family: Source Han Sans SC;
      font-weight: 400;
      color: rgba(70, 70, 70, 1);
      line-height: 64px;
    }
  }
  .btn {
    background: rgba(164, 164, 164, 1);
  }
}

.card-0 {
  .content {
    .top-box {
      border-bottom: 1.5px solid #a7a7a7;
      p {
        font-size: 29px;
        font-family: Source Han Sans SC;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
        line-height: 34px;
      }
      span {
        font-size: 25px;
        font-family: Source Han Sans SC;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 64px;
      }
    }
    .bottom-box {
      font-size: 29px;
      font-family: Source Han Sans SC;
      font-weight: 400;
      color: rgba(70, 70, 70, 1);
      line-height: 64px;
    }
  }
  .btn {
    background: rgba(164, 164, 164, 1);
  }
}

.card-1 {
  .content {
    .top-box {
      border-bottom: 1.5px solid #a7a7a7;
      p {
        font-size: 29px;
        font-family: Source Han Sans SC;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
        line-height: 34px;
      }
      span {
        font-size: 25px;
        font-family: Source Han Sans SC;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 64px;
      }
    }
    .bottom-box {
      font-size: 29px;
      font-family: Source Han Sans SC;
      font-weight: 400;
      color: rgba(70, 70, 70, 1);
      line-height: 64px;
    }
  }
  .btn {
  }
}

.card-2 {
  .content {
    .top-box {
      border-bottom: 1.5px solid #a7a7a7;
      p {
        font-size: 29px;
        font-family: Source Han Sans SC;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
        line-height: 34px;
      }
      span {
        font-size: 25px;
        font-family: Source Han Sans SC;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 64px;
      }
    }
    .bottom-box {
      font-size: 29px;
      font-family: Source Han Sans SC;
      font-weight: 400;
      color: rgba(70, 70, 70, 1);
      line-height: 64px;
    }
  }
  .btn {
  }
}

.card-3 {
  .content {
    .top-box {
      border-bottom: 1.5px solid #a7a7a7;
      p {
        font-size: 29px;
        font-family: Source Han Sans SC;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
        line-height: 34px;
      }
      span {
        font-size: 25px;
        font-family: Source Han Sans SC;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 64px;
      }
    }
    .bottom-box {
      font-size: 29px;
      font-family: Source Han Sans SC;
      font-weight: 400;
      color: rgba(70, 70, 70, 1);
      line-height: 64px;
      .danhao {
        display: flex;
        p {
          width: 80%;
        }
        a {
          color: #496df2;
          padding: 0 20px;
        }
      }
    }
  }
  .btn {
  }
}

.card-4 {
  margin: 50px 0 20px;
  box-sizing: border-box;
  .btn {
    display: block;
    margin: 0 auto;
    width: 607px;
    height: 86px;
    background: rgba(73, 109, 242, 1);
    box-shadow: 0px 4px 13px 0px rgba(73, 109, 242, 1);
    border-radius: 10px;

    font-size: 33px;
    font-family: Source Han Sans SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 86px;
    text-align: center;
  }
}
</style>