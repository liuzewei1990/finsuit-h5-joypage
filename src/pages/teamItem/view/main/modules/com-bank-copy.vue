<!-- 银行推荐 -->
<template>
  <section class='com-bank' v-show="isShow">
    <p class="title">合作银行</p>
    <Swiper class="swiper" auto :height="height" :loop="true" direction="vertical" :interval="4000" :duration="800" :show-dots="false">
      <!-- bank组 -->
      <SwiperItem class="item" v-for="(list,index) in bankList" :key="index">
        <ul>
          <li class="ellipsis" v-for="(item,index) in list" :key="index">
            <div class="logo">
              <img :src="$transfromAliyunUrl(item.LOGO_URL)" alt="">
            </div>
            <span class="name">{{item.ORG_NAME}}</span>
          </li>
        </ul>
      </SwiperItem>

    </Swiper>
  </section>
</template>

<script>

import { mapState, mapActions } from "vuex"
import { Swiper, SwiperItem } from "../../components/Swiper"
export default {
  components: { Swiper, SwiperItem },
  data () {
    return {
      height: window.lib.flexible.rem2px(2) + "px"
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

      // 数据列表
      bankList () {
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
        return result;
      }
    }),
  },
  created () {

  },
  mounted () {

  },
  //方法集合
  methods: {

  },
}
</script>
<style lang='less' scoped>
.com-bank {
  padding: 20px 30px;
  background: #fff;
  font-family: "Microsoft YaHei", Arial, sans-serif;
  .title {
    font-size: 32px;
    margin-bottom: 20px;
    color: #333333;
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