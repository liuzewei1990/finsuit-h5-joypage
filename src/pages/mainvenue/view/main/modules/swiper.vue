<!-- swiper -->
<template>
  <section class='main-swiper'>
    <!-- Swiper -->
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item,index) in swiperData" :key="index" :style="{backgroundImage:`url(${item.banner})`}">
          <div class="text-box" :class="item.type">
            <p>{{item.name}}</p>
            <span v-html="item.desc"></span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import assets from "../../../config/assets.config.js"
// import Swiper from 'swiper'; 注意：该方式在某些机型会报错 Unexpected token *
import Swiper from 'swiper/js/swiper.min.js';
import 'swiper/css/swiper.min.css';
export default {
  components: {},
  data () {
    return {
      swiperData: [{
        type: "nps",
        name: "新人",
        desc: "新人锦囊，开启财富之旅",
        link: this.nps(),
        banner: assets.npsSwiperBj
      }, {
        type: "nay",
        name: "拼团",
        desc: "银行产品安享高收益</br>任你来拼团",
        link: this.nay(),
        banner: assets.naySwiperBj
      }, {
        type: "ddf",
        name: "单单赚",
        desc: "单单有奖，天天狂享",
        link: this.ddf(),
        banner: assets.ddfSwiperBj
      }]
    };
  },
  created () {
  },
  mounted () {
    var mySwiper = new Swiper('.swiper-container', {
      effect: 'coverflow',
      on: {
        click: (event) => {
          this.clickItem(this.swiperData[mySwiper.realIndex]);
        },
        resize: () => {
          setTimeout(() => {
            mySwiper.update(true);
          }, 300);
          // mySwiper.resize();
          // mySwiper.updateSlides();
          // mySwiper.updateSize();
        }
      },
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 'auto',
      loop: true,
      coverflowEffect: {
        rotate: 0,
        stretch: -20,
        depth: 200,
        modifier: 3,
        slideShadows: false,
      },
    });
  },
  //方法集合
  methods: {
    clickItem (item) {
      setTimeout(() => {
        this.$checkLogin({ action: this.toUrl, data: item });
      }, 10);
    },
    toUrl (item) {
      switch (item.type) {
        case "ddf":
          this.$bcBridge.openWebview(item.link);
          break;
        case "nps":
          this.$bcBridge.openWebview(item.link);
          break;
        case "nay":
          if (this.$store.state.APP_FLAG === "PC") {
            this.$bcBridge.gotoMainPage();
          } else if (this.$store.state.APP_FLAG === "BC") {
            this.$bcBridge.openWebview(item.link);
          }
          break;
        default:
          break;
      }
      this.$trackEvents.ACB0R004({ ITEM_VALUE: item.name });
    },

    // 新手分会场链接
    nps () {
      let url = this.$Config.nps;
      url += `#/`;
      url += `?loading=1218`;
      url += `&__with_login__=1`;
      url += `&hideRightShare=1`;
      return url;
    },

    // 单单返分会场链接
    ddf () {
      let url = this.$Config.ddf;
      url += `#/flop`;
      url += `?loading=1218`;
      url += `&__with_login__=1`;
      url += `&hideRightShare=1`;
      url += `&ddf=lf`;
      return url;
    },

    // 比财拼团分会场
    nay () {
      let url = this.$Config.nay;
      url += `#/`;
      url += `?loading=1218`;
      url += `&__with_login__=1`;
      url += `&hideRightShare=1`;
      url += `&helpCenterCode=SFACT`;
      return url;
    }

  },
}
</script>
<style lang='less' scoped>
.swiper-container {
  width: 100%;
  //   padding-top: 50px;
  //   padding-bottom: 50px;
}

.swiper-slide {
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 687px;
  height: 421px;
  color: #fe6d32;
  position: relative;

  .text-box {
    margin-top: 90px;
    p {
      font-size: 45px;
      font-weight: 800;
      font-family: "MicrosoftYaHei";
    }
    span {
      font-size: 26px;
    }
  }
  .nps {
    margin-left: 270px;
    width: 300px;
  }
  .ddf {
    margin-left: 270px;
    width: 300px;
  }
  .nay {
    margin-left: 300px;
    width: 280px;
  }
}
</style>