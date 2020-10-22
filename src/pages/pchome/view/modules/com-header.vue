<!-- 首页公共header -->
<template>
  <section class='com-header'>
    <div class="top-cntainer">

      <!-- 额外收益 -->
      <div class="money-box">
        <p class="title">
          <span>总资产(元)</span>
          <!-- 疑问弹窗 -->
          <img v-show="headerMoneyConfig.OTHER_INCOME_DESC_PIC" @click="showAlert" class="icon" :src="$transfromAliyunUrl(headerMoneyConfig.OTHER_INCOME_DESC_PIC)" alt="">
          <!-- 小眼睛 -->
          <span class="y-icon" @click="isShow = !isShow">
            <img v-show="isShow" :src="require('../../assets/images/y-1.png')" alt="">
            <img v-show="!isShow" :src="require('../../assets/images/y-2.png')" alt="">
          </span>
          <!-- 昨日收益 -->
          <span class="add-money" @click="isShow = !isShow">
            <span v-show="isShow">+{{$utils.moneyFormatCN(this.indexYsdData.YSD_INCOME,true)}}</span>
            <span v-show="!isShow">****</span>
          </span>
        </p>
        <p class="value" :class="isMaxMoney?'max-font-size':'min-font-size'" @click="gotoAssetPage">
          <!-- 总资产 -->
          <span v-show="isShow" class="money">{{$utils.moneyFormatCN(this.allAssetData.TOTAL_AMT, true)}}</span>
          <span v-show="!isShow" class="money">****</span>
        </p>
      </div>

      <!-- menu按钮 -->
      <div class="btns-box">
        <ul>
          <li class="ellipsis" v-for="(item,index) in headerMenuConfig" :key="index" @click="clickMenu(item)">
            <div class="icon">
              <img :src="$transfromAliyunUrl(item.imgUrl)" alt="">
            </div>
            <span class="text">{{item.menuName}}</span>
          </li>
        </ul>
      </div>

    </div>
  </section>
</template>

<script>

import { mapState, mapActions } from "vuex"
export default {
  components: {},
  data () {
    return {
      isShow: true,
    };
  },
  computed: {
    ...mapState({
      headerMoneyConfig: state => state.MainConfig.headerMoneyConfig,
      headerMenuConfig: state => state.MainConfig.headerMenuConfig,
      allAssetData: state => state.MainConfig.allAssetData,
      indexYsdData: state => state.MainConfig.indexYsdData,
    }),
    // 判断金额是否大于万元 显示不同字号
    isMaxMoney () {
      return Number(this.allAssetData.TOTAL_AMT) > 9999;
    }
  },

  watch: {
    isShow (v) {
      this.$localStore("set", { key: "money_is_eye", value: String(v) })
    }
  },

  created () {
    this.$localStore("get", { key: "money_is_eye" }, (res) => {
      this.isShow = res.value == "true";
    });
  },

  methods: {

    // 点击问号查看说明
    showAlert () {
      // 打点
      this.$trackEvents.PCB000A191();

      this.$finsuitAlert({
        title: this.headerMoneyConfig.OTHER_INCOME_TITLE,
        text: this.headerMoneyConfig.OTHER_INCOME_DESC,
        okText: '关闭'
      })
    },

    // 跳转到资产页面
    gotoAssetPage () {
      //   this.$bcBridge.gotoAssetPage();
    },

    // 点击右侧按钮跳转
    clickMenu (item) {
      // 打点
      this.$trackEvents.PCM000A005({ ITEM_VALUE: item.menuName, ITEM_VALUE1: item.id });

      let url = item.url;
      this.$bcBridge.openWebview(url);
    }
  },
}
</script>
<style lang='less' scoped>
.com-header {
  .top-cntainer {
    height: 180px;
    background: linear-gradient(
      111deg,
      rgba(79, 130, 255, 1) 0%,
      rgba(59, 106, 220, 1) 100%
    );
    display: flex;
    color: #fff;
    align-items: center;
    padding: 0px 20px;
    box-sizing: border-box;

    .money-box {
      min-width: 300px;
      p {
        font-size: 24px;
        margin-top: 0px;
      }
      .title {
        display: flex;
        align-items: center;
        height: 40px;
        .icon {
          margin-left: 10px;
          width: 28px;
          height: 28px;
          background: #eee;
        }
        .y-icon {
          display: inline-block;
          margin-left: 10px;
          width: 35px;
          height: 35px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .add-money {
          margin-left: 10px;
        }
      }
      .value {
        height: 80px;
        display: flex;
        align-items: center;
        .money {
          font-size: 56px;
        }
      }
      .max-font-size {
        .money {
          font-size: 44px;
        }
      }

      .min-font-size {
        .money {
          font-size: 56px;
        }
      }
    }

    .btns-box {
      flex: 1;
      margin-top: 8px;
      ul {
        display: flex;
        justify-content: flex-end;
        li {
          //   margin-left: 10px;
          width: 100px;
          //   border: 1px solid red;
          text-align: center;
          .icon {
            width: 48px;
            height: 48px;
            margin: 10px auto;
            // background: #eee;
            img {
              width: 100%;
              height: 100%;
            }
          }

          .text {
            font-size: 20px;
          }
        }
      }
    }
  }
}
</style>