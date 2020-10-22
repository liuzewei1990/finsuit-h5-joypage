<template>
  <section class="status-box" :class="status">
    <div class="icon">
      <i v-show="showLine" class="line" :style="{background:lineColor}"></i>
    </div>
    <a class="btn" v-show="status === 'remind'" @click="$emit('toRemindFriends')">提醒好友</a>
    <!-- <a class="btn" v-show="status === 'remindDis'" href="javascript:void(0);">提醒好友</a> 这个状态暂时不用 -->
    <a class="btn" v-show="status === 'remindSuccess'" href="javascript:void(0);">已提醒</a>
    <a class="btn" v-show="status === 'reward'" @click="$emit('clickGet')">点击领取</a>
    <a class="btn" v-show="status === 'rewardSuccess'" href="javascript:void(0);">已获得</a>
    <a class="btn" v-show="status === 'fail'" href="javascript:void(0);">0元</a>
  </section>
</template>

<script>
export default {
  props: {
    showLine: Boolean,
    lineColor: String,
    status: String
  },
  components: {},
}
</script>

<style lang="less" scoped>
.status-box {
  .icon {
    width: 46px;
    height: 46px;
    background-repeat: no-repeat;
    background-size: 100%;
    margin: 0px auto 10px;
    position: relative;

    .line {
      content: "";
      display: block;
      //   border: 1.5px solid #fc8f10;
      height: 2px;
      background: #fc8f10;
      position: absolute;
      top: 50%;
      left: 100%;
      width: 125px;
      transform: translateY(-50%);
    }
  }

  .btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 128px;
    color: #fc8f10;
    border: 1px solid #fff;
    border-radius: 500px;
    background: #fff;
    font-size: 26px;
  }
}

/* 提醒好友 */
.remind {
  .icon {
    background-image: url("../../assets/images/liwu-1.png");
  }
  .btn {
    color: #fc8f10;
    border: 1.5px solid #fc8f10;
  }
}

/* 达到上限 提醒按钮置灰 */
.remindDis {
  .icon {
    background-image: url("../../assets/images/liwu-1.png");
  }
  .btn {
    color: #b5b5b5;
    border: 1px solid #b5b5b5;
  }
}

/* 提醒成功 */
.remindSuccess {
  .icon {
    background-image: url("../../assets/images/liwu-1.png");
  }
  .btn {
    color: #b5b5b5;
    border: 1px solid #fff;
  }
}

/**点击领取 */

.reward {
  .icon {
    background-image: url("../../assets/images/liwu-1.png");
  }
  .btn {
    border: 1px solid #fc8f10;
    background: #fc8f10;
    color: #fff;
  }
}

/* 领取成功 */
.rewardSuccess {
  .icon {
    background-image: url("../../assets/images/liwu-2.png");
  }
  .btn {
    color: #b5b5b5;
    border: 1px solid #fff;
  }
}

/**邀请超限 */
.fail {
  .icon {
    background-image: url("../../assets/images/liwu-2.png");
  }
  .btn {
    color: #b5b5b5;
    border: 1px solid #fff;
  }
}
</style>
