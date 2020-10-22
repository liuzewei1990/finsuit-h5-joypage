<template>
  <ModuleBox class="module-rewardInnerDetail" showTitle title="我获得" type="blue">
    <div class="container">
      <div class="item " v-for="(item,index) in meGet" :key="index">
        <span class="item-a" v-if="item.REWARD_TYPE == 1"> <span class="val">{{item.REWARD}}</span><span class="unit">元</span><span class="text">现金红包</span><br><span class="meget-from">{{item.TASK_TYPE | getStatus}}</span></span>
        <span class="item-b" :style="{'top':isios?'':'6px'}" v-if="item.REWARD_TYPE == 2"> <span class="val">{{item.REWARD}}</span><span class="unit">%</span><span class="text">优惠券</span><br><span class="meget-from">{{item.TASK_TYPE | getStatus}}</span></span>
        <span class="item-c" v-if="item.REWARD_TYPE == 3"> <span class="val"><img src="../../../assets/images/aiqiyi.png" alt=""></span><span class="unit"></span><span class="text">爱奇艺会员</span><br><span class="meget-from" style="top: -5px;">{{item.TASK_TYPE | getStatus}}</span></span>
        <span class="item-b" v-if="item.REWARD_TYPE == 4"> <span class="val">{{item.REWARD}}</span><span class="unit">元</span><span class="text">现金券</span><br><span class="meget-from">{{item.TASK_TYPE | getStatus}}</span></span>
      </div>
      <!-- <div class="item item-b">
        <span class="val">{{meGet.YHQ_REWARD}}</span><span class="unit">%</span><span class="text">升值券</span>
      </div>
      <div class="item item-c">
        <span class="val"><img src="../../../assets/images/aiqiyi.png" alt=""></span><span class="unit"></span><span class="text">爱奇艺会员</span>
      </div> -->
    </div>
  </ModuleBox>
</template>

<script>
import ModuleBox from "@earn/components/ModuleBox/index.vue"
import { mapState, mapActions } from "vuex"
export default {
  components: { ModuleBox },
  computed: {
    ...mapState({
      meGet: state => state.main.meGet
    })
  },
  data () {
    return {
      isios: ""
    }
  },
  created () {
    this.getMeGetData(this);
    this.isios = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  },
  mounted () {
  },
  filters: {
    getStatus: function (value) {
      if (value == 1) {
        return "首投获得";
      } else if (value == 2) {
        return "实名获得";
      } else if (value == 4) {
        return "开户获得";
      }
    }
  },
  methods: {
    ...mapActions(["getMeGetData"]),
  }
}
</script>

<style lang="less" scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  padding-left: 50px;
  padding: 20px 30px;

  .item {
    width: 50%;
    // border: 1px solid red;
    // padding-bottom: 16px;
    box-sizing: border-box;
    font-size: 30px;
    span {
      position: relative;
    }
    .val {
      font-family: has_buy;
      font-size: 70px;
      background-image: -webkit-linear-gradient(bottom, #e23030, #f67c52);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .unit {
      color: #f67c52;
      font-size: 40px;
      background-image: -webkit-linear-gradient(bottom, #e23030, #f67c52);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .text {
      font-weight: 700;
      top: -3px;
      left: 10px;
    }
    .meget-from {
      color: #b5b5b5;
      font-size: 22px;
      position: relative;
      top: -30px;
    }
  }

  .item-a {
    .val {
      font-size: 70px;
      //   font-weight: bold;
    }
    .unit {
      font-size: 58px;
      //   font-weight: bold;
      top: -3px;
    }
  }

  .item-b {
    .val {
      font-size: 70px;
      //   font-weight: bold;
    }
    .unit {
      font-size: 58px;
      //   font-weight: bold;
      top: -3px;
    }
    text-align: center;
  }
  .item-b {
    text-align: center;
  }
  .item-c {
    img {
      display: inherit;
      width: 60px;
      height: 60px;
    }
  }
}
</style>
