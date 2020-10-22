<!-- 关于我们 -->
<template>
  <section class='com-about' v-show="footerData.BOTTOM_TITLE">
    <!-- 标题 -->
    <div class="btn-box" @click="handleClickGo">
      <p class="title ellipsis">{{footerData.BOTTOM_TITLE}}</p>
      <span class="refresh"><i class="icon"></i></span>
    </div>
    <!-- 全面 安全 可靠 -->
    <div class="info-box">
      <ul>
        <li class="ellipsis" v-for="(item,index) in footerData.dataList" :key="index" @click="handleClickIcon(item)">
          <div class="logo">
            <img :src="$transfromAliyunUrl(item.BOTTOM_PIC)" alt="">
          </div>
          <p class="tag">{{item.BOTTOM_PIC_NAME}}</p>
          <span class="name">{{item.BOTTOM_PIC_DESC}}</span>
        </li>
      </ul>
    </div>

    <!-- 比财数据展示 -->
    <div class="data-box" v-show="noData">
      <ul>
        <li v-for="(item,index) in dataInfo" :key="index">
          <p v-if="index == 1" class="value"><span>{{$utils.moneyFormatCN(item.item1,true)}}</span>{{item.item2}}</p>
          <p v-else class="value"><span>{{item.item1}}</span>{{item.item2}}</p>
          <span class="name">{{item.item3}}</span>
        </li>
      </ul>
    </div>

    <!-- 数据更新于 -->
    <div class="tips-box" v-show="upDataDate.UPDATE_TIME_SWITCH=='0'">
      <span>{{upDataDate.UPDATE_TIME_DESC+upDataDate.UPDATE_TIME}}</span>
    </div>
  </section>
</template>

<script>

import { mapState, mapActions } from "vuex"
export default {
  components: {},
  data () {
    return {
      noData: false
    };
  },
  computed: {
    ...mapState({
      footerData: state => state.MainConfig.footerData,

      // 导出bank数据
      aboutData: state => {
        if (!state.MainConfig.footerData.HOME_PAGE_CONFIG_DATA) return {};
        return state.MainConfig.footerData.HOME_PAGE_CONFIG_DATA.PLAT_AMOUNT || {};
      },
      // 比财数据
      dataInfo () {
        let data = this.aboutData;

        // 是否展示
        this.noData = data.OPEN == 0 ? true : false

        let arr = Object.keys(data);
        if (arr.length == 0) {
          this.noData = false
          return
        }
        let result = [
          {
            //服务用户数
            item1: data.SERVICE_CUSTOMER || 100,//
            item2: data.SERVICE_CUSTOMER_UNIT || "万",//
            item3: data.SERVICE_CUSTOMER_INSTRUCT || "服务用户数"//
          },
          {
            //为用户赚取利息
            item1: data.EARN_INTEREST || 1000,//
            item2: data.EARN_INTEREST_UNIT || "元",//
            item3: data.EARN_INTEREST_INSTRUCT || "为用户赚取利息"//
          },
          {
            //合作银行
            item1: data.COOPERATIVE_BANK || 100,//
            item2: data.COOPERATIVE_UNIT || "家",//
            item3: data.COOPERATIVE_INSTRUCT || "合作银行"//
          }
        ];
        return result
      },

      // 数据更新时间
      upDataDate () {
        let data = {
          UPDATE_TIME: "",
          UPDATE_TIME_DESC: "",
          UPDATE_TIME_SWITCH: "1"
        }
        return this.footerData.HOME_PAGE_CONFIG_DATA ? this.footerData.HOME_PAGE_CONFIG_DATA : data;
      },
    }),
  },
  //方法集合
  methods: {
    // 点击标题进行跳转
    handleClickGo () {
      // 打点
      this.$trackEvents.PCB000S003();

      let url = this.footerData.BOTTOM_TITLE_LINK;
      if (!url) return;
      this.$bcBridge.openWebview(url);
    },

    // 点击icon跳转
    handleClickIcon (item) {
      // 打点 。。。 也不知道哪个x设计的点位 备注：写死了，"BOTTOM_PIC_DOT":null,
      if (item.BOTTOM_PIC_NAME == "全面") this.$trackEvents.PCB000S004();
      if (item.BOTTOM_PIC_NAME == "安全") this.$trackEvents.PCB000S005();
      if (item.BOTTOM_PIC_NAME == "可靠") this.$trackEvents.PCB000S006();

      let url = item.BOTTOM_PIC_LINK;
      if (!url) return;
      this.$bcBridge.openWebview(url);
    }
  },
}
</script>
<style lang='less' scoped>
.com-about {
  padding: 30px;
  background: #fff;
  font-family: "Microsoft YaHei", Arial, sans-serif;
  .btn-box {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .title {
      flex: 1;
      font-size: 32px;
      color: #333333;
    }
    .refresh {
      font-size: 20px;
      color: #666;
      display: flex;
      align-items: center;
      .icon {
        display: inline-block;
        margin-right: 10px;
        width: 15px;
        height: 15px;
        transform: rotate(-45deg);
        border-bottom: 2px solid #999;
        border-right: 2px solid #999;
      }
    }
  }
  .info-box {
    margin-top: 20px;
    ul {
      display: flex;
    }
    li {
      flex: 1;
      padding: 10px;
      text-align: center;
      .logo {
        width: 96px;
        height: 96px;
        border-radius: 500px;
        overflow: hidden;
        margin: 0 auto;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .tag {
        margin-top: 20px;
        margin-bottom: 5px;
        font-size: 24px;
        color: #333;
      }
      .name {
        font-size: 20px;
        color: #999999;
      }
    }
  }
  .data-box {
    margin-top: 40px;
    ul {
      display: flex;
      justify-content: space-between;
      flex-direction: row;
      flex-wrap: wrap;
      li {
        // width: 216px;
        flex: 1;
        margin: 0 5px;
        height: 144px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 0px 12px 0px rgba(238, 238, 238, 1);
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        .value {
          font-size: 24px;
          color: #333;
          font-family: "PingFangSC-Medium", "Helvetica Neue", "Helvetica",
            "Hiragino Sans GB", "Microsoft YaHei", Arial, sans-serif;
          span {
            font-weight: bold;
            font-size: 38px;
            position: relative;
            bottom: -3px;
          }
        }
        .name {
          font-size: 20px;
          color: #666;
          line-height: 40px;
        }
      }
    }
  }

  .tips-box {
    margin-top: 40px;
    color: #999;
    font-size: 20px;
  }
}
</style>