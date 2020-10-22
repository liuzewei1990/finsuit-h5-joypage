<!-- 精选活动 -->
<template>
  <section class='actity-module mar-top-20' v-show="activityList.length">

    <div class="panel-head">
      <p class="title ellipsis">{{activityTitle}}</p>
      <span class="desc" @click="toUrl">查看更多活动<i class="icon"></i></span>
    </div>

    <div class="panel-body">
      <ul class="clearfloat">
        <li class="item" v-for="(item,i) in activityList" :key="i" @click="clickItem(item)">
          <div class="icon">
            <img v-lazy="$transfromAliyunUrl(item.iconUrl)" alt="">
          </div>
          <div class="label ellipsis">
            {{item.name}}
          </div>
        </li>
      </ul>
    </div>

  </section>
</template>

<script>

import { mapState, mapActions, mapGetters } from "vuex"
export default {
  components: {},
  computed: {
    ...mapGetters({
      isLogin: "isLogin"
    }),
    ...mapState({
      // 导出活动列表
      activityList: state => state.MainData.activityList,
      // 导出活动标题
      activityTitle: state => state.MainData.activityTitle,
    }),
  },
  data () {
    return {

    };
  },
  created () {
    this.getActivityList()
  },
  //方法集合
  methods: {
    // 获取精选活动
    async getActivityList () {
      let params = { ACTITY_CODE: this.$Config.actityCode };
      let data = await this.$api.getActivityList(params);
      data = data.slice(0, 5);
      this.$store.commit("SET_ACTIVITY_LIST", data || []);
      this.$store.commit("SET_ACTIVITY_TITLE", "精选活动");
    },

    //   跳转到零花钱
    toUrl () {

      // 打点
      this.$trackEvents.B000A471({});

      let url = this.$conf.activityUrls.activityListUrl;
      //   let url = this.$Config.linghuaqianUrl;
      url += `#/`;
      url += `?ACTITY_ID=${this.$store.state.ACTITY_ID}`;
      url += `&customBar=1`;
      url += `&__with_login__=1`;
      url += `&hideRightShare=1`;
      url += `&hideLoadinghideProgress=1`;
      this.$openWebview(url);
    },

    // 点击活动跳转
    clickItem (item) {
      // 打点
      this.$trackEvents.B000A470({ ITEM_VALUE: item.name });

      this.$openWebview(item.activityUrl);
    }
  },
}
</script>
<style lang='less' scoped>
.actity-module {
  background: #fff;

  .panel-head {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 32px 32px 20px;
    box-sizing: border-box;
    .title {
      flex: 1;
      font-size: 36px;
      font-weight: 600;
      color: rgba(48, 49, 51, 1);
    }
    .desc {
      font-size: 24px;
      font-weight: 400;
      color: rgba(96, 98, 102, 1);
      display: flex;
      align-items: center;
      .icon {
        display: inline-block;
        margin-right: 10px;
        width: 15px;
        height: 15px;
        transform: rotate(-45deg);
        border-bottom: 2px solid #606266;
        border-right: 2px solid #606266;
      }
    }
  }

  .panel-body {
    // width: 750px;
    padding: 0px 30px;
    box-sizing: border-box;
    ul {
      //   justify-content: space-between;
      padding: 20px 0px;
      box-sizing: border-box;
      white-space: nowrap;
      overflow-y: hidden;
      overflow-x: scroll;
      display: flex;
      -webkit-overflow-scrolling: touch;
    }
    ul .item {
      width: 130px;
      margin-right: 10px;
      text-align: center;
      .icon {
        width: 80px;
        height: 80px;
        border-radius: 500px;
        overflow: hidden;
        background: #eee;
        margin: 0 auto;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .label {
        width: 130px;
        // white-space: normal;
        display: block;
        font-size: 26px;
        font-weight: 400;
        color: rgba(48, 49, 51, 1);
        margin-top: 15px;
      }
    }
  }
}
</style>