<template>
  <div class='com-bank' v-show="isShow">
    <p class="title">{{title}}</p>
    <div class="msg-scroll">
      <transition-group tag="div" class="msg-scroll-box swiper">
        <!-- <div class="item" v-for="(item,index) in list" :key="item.msg">{{item.msg}}</div> -->
        <div class="item" v-for="(list,index) in listData" :key="list">
          <ul>
            <li class="ellipsis" v-for="(item,index) in list" :key="index">
              <div class="logo">
                <img :src="$transfromAliyunUrl(item.LOGO_URL)" alt="">
              </div>
              <span class="name">{{item.ORG_NAME}}</span>
            </li>
          </ul>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>

import { mapState, mapActions } from "vuex"
export default {
  data () {
    return {
      listData: [],
      disabled: true
    };
  },
  computed: {
    ...mapState({

      // 导出bank数据
      bankData: state => {
        if (!state.MainConfig.footerData.HOME_PAGE_CONFIG_DATA) return {};
        return state.MainConfig.footerData.HOME_PAGE_CONFIG_DATA.COOPERATIVE_BANK;
      },

      // 是否隐藏
      isShow () {
        return this.bankData.OPEN == 0 ? true : false
      },

      // 模块标题
      title () {
        return this.bankData.TITLE || "合作银行";
      }
    }),
  },
  mounted () {
    this.init();
    this.play();
  },

  methods: {
    //  初始化数据
    init () {
      let list = this.bankData.BANK_LIST || [];

      // 把数组*4，凑成
      let rs = []
      let num = (list.length / 4) % 1 === 0 ? 1 : 4//获取的数据如果是4的倍数，遍历一次，否则4次
      var result = [];//最终算好的数组
      for (let i = 0; i < num; i++) {
        rs.push(...list)
      }

      // 每四条数据合并新数据
      for (var i = 0; i < rs.length; i += 4) {
        result.push(rs.slice(i, i + 4));
      }
      this.listData = result;
    },

    // 动画播放
    play () {
      window.requestAnimationFrame(() => {
        setTimeout(this.play, 6000)
        if (this.disabled) return;
        let _cache = this.listData[0];
        this.listData.shift();
        this.listData.push(_cache);
      });
    },
    disabledFn (flag) {
      this.disabled = flag;
    }

  }
};
</script>

<style scoped lang="less">
.com-bank {
  padding: 20px 30px;
  background: #fff;
  font-family: "Microsoft YaHei", Arial, sans-serif;
  .title {
    font-size: 32px;
    margin-bottom: 20px;
    color: #333333;
  }
  .msg-scroll {
    height: 130px;
    // border: 1px solid red;
    overflow: hidden;
  }
  .msg-scroll-box {
    margin-top: -130px;
  }

  .v-move {
    transition: transform 0.2s;
  }
  .msg-scroll-box .item:nth-last-child(1) {
    visibility: hidden;
  }
  .msg-scroll-box .item {
    font-size: 13px;
    text-align: center;
    //   line-height: 130px;
    background: #fff;
  }
  .swiper {
    .item {
    }
    ul {
      display: flex;
    }
    li {
      flex: 1;
      padding: 10px;
      text-align: center;
      .logo {
        width: 56px;
        height: 56px;
        border-radius: 500px;
        overflow: hidden;
        margin: 0 auto 25px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .name {
        font-size: 20px;
        color: #666666;
      }
    }
  }
}
</style>
