<!-- 首页 -->
<template>
  <section id="page">
    <div class="top">
      <div>
        <p>一次性普通防护口罩</p>
        <p>（执行标准：T/CTCA 7-2019)</p>
      </div>
    </div>
    <div class="content">
      <div class="contentBackground">
        <div class="contentTop contentTop1"></div>
        <p class="tip">{{prodList.investInfo}}</p>

        <Product
          :datas="item"
          v-for="(item,index) of prodList.prdList"
          :key="index"
          @toBuy="toBuy"
        />

        <Buystatus :status="statue" v-if="statue" />
      </div>

      <div class="contentBackground">
        <div class="contentTop contentTop2"></div>
        <p class="xiangqing1">3月17日~3月31日，新用户成功投资100元，可获赠5个口罩，快递到家，先到先得</p>
        <p class="xiangqing2" @click="tosee">查看活动规则详情 ></p>
      </div>
    </div>

    <div class="bottom">本活动最终解释权归比财所有</div>
  </section>
</template>

<script>
import Product from "../../components/product";
import Buystatus from "../../components/status";
import bus from "@common/finsuit-h5/libs/bus.js";
import { mapState, mapGetters } from "vuex";
export default {
  components: { Product, Buystatus },
  data() {
    return {
      prodList: {}, // 产品列表
      dialog: null, // 页面弹框
      statue: null // 用户购买状态数据
    };
  },
  computed: {
    ...mapGetters({
      isLogin: "isLogin"
    })
  },
  watch: {
    isLogin() {
      // 这里监听登陆变化重新拉取数据
      this.getData();
    }
  },
  created() {
    this.getData();
  },
  mounted() {
    this.$trackEvents.ACB0Y001();
    // 设置页面高度，防止底下出现白板
    let isHeight = window.innerHeight + "px";
    document.getElementById("page").style.setProperty("min-height", isHeight); //  监听app返回事件 刷新必要的数据
    bus.$on("pageAppear", () => {
      this.getData();
    });
  },
  //方法集合
  methods: {
    // 获取数据
    getData() {
      // 拿列表数据
      this.$api.getList().then(res => {
        this.prodList = {
          memberNoviceStatus: +res.memberNoviceStatus, // 用户是否新手 1-新手 0-不是新手
          prdList: res.prdList.map(tar => ({
            // 产品集合
            prdIndexId: tar.prdIndexId, // 产品id
            investId: "", // 个投优选id
            title: `${tar.orgName} -- ${tar.prdName}`, // 机构名称 -- 产品名称
            lilv: `${tar.rate}%`, // 利率
            subTitle: `${tar.rateText}`, // 利率底下的文案
            maidian: [`${tar.drawTimeText}`, `${tar.minAmount}元起投`] //  支取文案,起投金额
          })),
          memberInvestStatus: +res.memberInvestStatus, //用户参与状态 0：奖励失效 1：持仓中 2：等待发货 3：已发货 4：已参与，未填写地址,5-用户未参与
          investInfo: res.investInfo, // 活动介绍文案(产品列表上边)
          investRemainDay: res.investRemainDay, // 需要持仓天数
          logisticsName: res.logisticsName, // 物流名称
          isSell: +res.isSell, // 口罩是否售罄 1-未售罄 0-售罄
          addressee: res.addressee, // 收件人
          detailAddress: res.district + res.detailAddress, // 详细地址
          contactPhone: res.contactPhone, // 收货人手机号
          logisticsNumber: res.logisticsNumber // 物流单号
        };
        if (this.prodList.isSell === 0) {
          // 口罩售罄
          this.statue = {
            num: 8,
            why: "今日口罩抢购已结束，明日再来"
          }; // 今日已空
        } else {
          // 口罩未售罄
          switch (this.prodList.memberInvestStatus) {
            case 1: // 1：持仓中
              this.statue = {
                num: 1, // 用来区分不同状态显示内容
                why: "持仓中", // 按钮文字
                data: {
                  address: this.prodList.detailAddress,
                  phone: this.prodList.contactPhone,
                  name: this.prodList.addressee,
                  other: `参与成功，还需持仓${this.prodList.investRemainDay}天`
                }
              };
              break;
            case 2: // 2：等待发货
              this.statue = {
                num: 2,
                why: "等待发货",
                data: {
                  address: this.prodList.detailAddress,
                  phone: this.prodList.contactPhone,
                  name: this.prodList.addressee,
                  other: "安排发货中，请耐心等待......"
                }
              };
              break;
            case 3: // 3：已发货
              this.statue = {
                num: 3,
                why: "已发货",
                data: {
                  address: this.prodList.detailAddress,
                  phone: this.prodList.contactPhone,
                  name: this.prodList.addressee,
                  other: {
                    gongsi: this.prodList.logisticsName, // 物流公司名称
                    number: this.prodList.logisticsNumber // 物流号
                  }
                }
              };
              break;
            case 4: //  4：已参与，未填写地址
              this.statue = {
                num: 4,
                why: "投资成功，领取口罩"
              };
              break;
            case 5: //  5：新用户，未参与
              this.statue = {
                num: 5
              };
              break;
            case 0: // 0：奖励失效，填写地址栏
              if (this.prodList.detailAddress) {
                this.statue = {
                  num: 6,
                  why: "奖励失效",
                  data: {
                    address: this.prodList.detailAddress,
                    phone: this.prodList.contactPhone,
                    name: this.prodList.addressee,
                    other: "奖励失效"
                  }
                }; // 奖励失效，没填地址
              } else {
                this.statue = {
                  num: 7,
                  why: "奖励失效"
                }; // 奖励失败
              }
              break;
          }
        }
      });
    },
    // 弹框
    dialogTest(data) {
      let _this = this;
      this.dialog = this.$CommonDialog({
        // dialog子组件
        componentName: "Tip",
        // 默认append到body中
        appendElement: document.getElementById("page"),
        // 是否点击蒙层关闭
        hideOnBlur: false,
        // 是否显示默认底部关闭按钮
        defaultcloseBtnVisible: false,
        // 是否动画效果
        animation: false,
        // 是否显示右上角关闭按钮
        closeVisible: true,
        title: data.title,
        desc: data.desc,
        btnText: data.btnText,
        btnClick: () => {
          _this.dialogAction(data);
          setTimeout(() => {
            _this.dialog.close();
          }, 300);
        }
      });
    },
    // 各种弹框的显示内容判断
    actionType(num, data) {
      let obj = {};
      switch (num) {
        // 老用户点击立即购买
        case 0:
          obj = {
            type: num,
            title: "您不是新用户哦",
            desc: "不能领取此奖品",
            btnText: "去看看其他活动"
          };
          break;
        // 售罄后点击立即购买
        case 8:
          obj = {
            title: "提示",
            desc: "很抱歉，口罩已经抢光，明天早点来吧",
            btnText: "我知道了"
          };
          break;
        case 4: // 已参与，未填写地址
          obj = {
            type: 4,
            title: "您已参与本次活动哦",
            desc: "请在7天内填写地址，防止奖品失效哦",
            btnText: "去填写地址等待发货吧"
          };
          break;
        case 5:
          // 新用户未参与，剩余时间大于10分钟
          obj = {
            type: 5,
            title: "提示",
            desc:
              "特殊时期，口罩数量有限，根据我们的大数据计算，建议您在半小时内完成购买，否则口罩有抢光的风险哦",
            btnText: "继续购买",
            data: data
          };
          break;
        case 6:
          // 新用户未参与，剩余时间小于10分钟
          obj = {
            type: 5,
            title: "提示",
            desc:
              "当前口罩数量有限，建议您尽快下单完成购买，否则口罩有缺货风险",
            btnText: "继续购买",
            data: data
          };
          break;
        ////////////////////////////////
        // case 1:
        //   // 购买成功弹框
        //   obj = {
        //     type: 1,
        //     title: "参与成功",
        //     desc:
        //       "恭喜您，您已购买并成功参与送口罩活动，再持仓7天，口罩就会发货啦！快去填写快递地址吧！",
        //     btnText: "去填写"
        //   };
        //   break;
        // case 2:
        //   // 购买完成，参与失败
        //   obj = {
        //     title: "参与失败",
        //     desc:
        //       "很抱歉，因操作时间过长，您所在地区的口罩已赠完，感谢您的参与",
        //     btnText: "我知道了"
        //   };
        //   break;
        // case 3:
        //   // 购买完成，金额不足
        //   obj = {
        //     title: "参与失败",
        //     desc: "很抱歉，您购买的金额未达到领取口罩的标准，感谢您的参与",
        //     btnText: "我知道了"
        //   };
        //   break;
      }
      this.dialogTest(obj);
    },
    // 立即购买按钮
    toBuy(data) {
      let num = null;
      if (this.prodList.memberNoviceStatus === 0) {
        num = 0; // 不是新手
      } else {
        //  8:售罄后点击立即购买
        //  4：已参与，未填写地址
        //  5：新用户，未参与
        if (this.statue.num === 8 || this.statue.num === 5) {
          // 0:小于十分钟 1：大于十分钟 2：口罩售罄
          this.$api.checkTime().then(res => {
            res = { popUp: 0 };
            if (+res.popUp === 2) {
              num = 8;
            }
            if (+res.popUp === 0) {
              num = 6;
            }
            if (+res.popUp === 1) {
              num = 5;
            }
            this.actionType(num, data);
          });
        } else if (this.statue.num === 4) {
          num = 4;
          this.actionType(num, data);
        } else {
          num = 0;
          this.actionType(num, data);
        }
      }
    },
    // 查看活动详情
    tosee() {
      this.$trackEvents.ACB0Y002();
      this.$router.push({ name: "rule" });
    },
    // 弹框的执行函数
    dialogAction(data) {
      // 去填写地址
      if (data.type === 4) {
        this.$trackEvents.ACB0Y011();
        let url = this.$Config.kouzhaoHost;
        url += `#/address`;
        url += `?ACTITY_ID=${this.$store.state.ACTITY_ID}`;
        this.$bcBridge.openWebview(url);

        // this.$router.push({ name: "address" });
      }
      // 去看其他活动
      if (data.type === 0) {
        this.$trackEvents.ACB0Y010();
        this.$bcBridge.openWebview("https://www.baidu.com");
      }
      // 继续购买
      if (data.type === 5) {
        this.$trackEvents.ACB0Y004();
        this.$h5PrdDetail(data.data.prdIndexId, "alone");
      }
    }
  }
};
</script>
<style lang='less' scoped>
#page {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}
.top {
  height: 700px;
  background-image: url("../../assets/images/top.png");
  background-size: 100% 100%;
  position: relative;
  div {
    position: absolute;
    width: 100%;
    color: rgba(255, 255, 255, 1);
    bottom: 48px;
    text-align: center;
  }
}
.bottom {
  font-size: 29px;
  font-family: Source Han Sans SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  background: #648af8;
  text-align: center;
  padding-bottom: 50px;
}
.content {
  flex: 1;
  background: #648af8;
  box-sizing: border-box;
}
.contentBackground {
  margin: 25px 30px 60px 30px;
  border-radius: 20px;
  background: #fff;
  box-shadow: 16px 16px #ffc600;
  padding-bottom: 40px;
}

.contentTop {
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center 78%;
  padding: 120px 0 30px 0;
  background-size: 72% 65%;
}
.contentTop1 {
  background-image: url("../../assets/images/9.png");
}
.contentTop2 {
  background-image: url("../../assets/images/10.png");
}
.tip {
  text-align: center;
  font-size: 28px;
  color: #606060;
  padding: 20px 0;
}
.xiangqing1 {
  color: #848484;
  font-size: 30px;
  line-height: 46px;
  margin: 0 33px 10px;
}
.xiangqing2 {
  color: #496df2;
  font-size: 30px;
  margin: 5px 33px 10px;
}
</style>