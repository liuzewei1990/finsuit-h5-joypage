<template>
  <section class="top-list">

    <!-- 前三名 -->
    <div class="top-container">
      <div class="top-list-top top-list-two">
        <div class="bar"></div>
        <div class="header" :style="{backgroundImage:`url(${list[1] && pathImgUrl + list[1].userHeader || 'http://dummyimage.com/84x84'})`}"></div>
        <div class="phone">{{list[1] && list[1].userPhone || "- -"}}</div>
        <div class="nums">已邀请{{list[1] && list[1].userNums || "- -"}}人实名</div>
      </div>
      <div class="top-list-top top-list-one">
        <div class="bar"></div>
        <div class="header" :style="{backgroundImage:`url(${list[0] && pathImgUrl + list[0].userHeader || 'http://dummyimage.com/84x84'})`}"></div>
        <div class="phone">{{list[0] && list[0].userPhone || "- -"}}</div>
        <div class="nums">已邀请{{list[0] && list[0].userNums || "- -"}}人实名</div>
      </div>
      <div class="top-list-top top-list-three">
        <div class="bar"></div>
        <div class="header" :style="{backgroundImage:`url(${list[2] && pathImgUrl + list[2].userHeader || 'http://dummyimage.com/84x84'})`}"></div>
        <div class="phone">{{list[2] && list[2].userPhone || "- -"}}</div>
        <div class="nums">已邀请{{list[2] && list[2].userNums || "- -"}}人实名</div>
      </div>
    </div>

    <!-- 更多排名 -->
    <div class="more-container" v-if="list.slice(3).length > 0">
      <div class="top-list-item" v-for="(item,index) in list.slice(3)" :key="index">
        <i>{{index+1+3}}</i>
        <div class="header" :style="{backgroundImage:`url(${ pathImgUrl + item.userHeader})`}"></div>
        <div class="phone">{{item.userPhone}}</div>
        <div class="nums">{{item.userNums}}人</div>
      </div>
    </div>

    <div class="more-nodata" v-else>
      <!-- <EmptyData imgUrl="https://finsuit.bicai365.com/tcc/static/img/kajuanwushuju.39d253e.png" text="暂无数据"></EmptyData> -->
      <img src="https://finsuit.bicai365.com/tcc/static/img/kajuanwushuju.39d253e.png" alt="暂无数据" />
      <p>暂无数据</p>
    </div>
  </section>
</template>

<script>
import EmptyData from "@common/finsuit-components/EmptyData";
export default {
  components: { EmptyData },
  props: {
    list: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data () {
    return {
      pathImgUrl: this.$Config.aliyuncHost
    }
  },
  computed: {

  },
  mounted () {
  },

  methods: {

  }
}
</script>

<style lang="less" scoped>
.top-list {
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex: 1;
  height: 100%;
  flex-direction: column;
}
.top-container {
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  margin-bottom: 30px;
  .top-list-top {
    height: 230px;
    width: 200px;
    background: #f5f5f5;
    text-align: center;

    .bar {
      position: relative;
      width: 100%;
      height: 10px;
      background: #fff;
    }

    .header {
      width: 84px;
      height: 84px;
      border-radius: 500px;
      margin: 40px auto 0;
      background-position: center center;
      background-repeat: no-repeat;
      background-size: cover;
    }

    .phone {
      font-size: 24px;
      color: #333;
      margin-top: 20px;
      font-weight: 600;
    }

    .nums {
      font-size: 22px;
      color: #b5b5b5;
    }
  }
  .top-list-one {
    height: 269px;
    .bar {
      background: #f7d48d;
      &::after {
        content: "";
        display: block;
        width: 30px;
        height: 38px;
        background: url("./top-1.png") no-repeat;
        background-size: cover;
        position: absolute;
        left: 0;
        top: 10px;
      }
    }
  }
  .top-list-two {
    .bar {
      background: #f7d48d;
      &::after {
        content: "";
        display: block;
        width: 30px;
        height: 38px;
        background: url("./top-2.png") no-repeat;
        background-size: cover;
        position: absolute;
        left: 0;
        top: 10px;
      }
    }
  }
  .top-list-three {
    .bar {
      background: #f7d48d;
      &::after {
        content: "";
        display: block;
        width: 30px;
        height: 38px;
        background: url("./top-3.png") no-repeat;
        background-size: cover;
        position: absolute;
        left: 0;
        top: 10px;
      }
    }
  }
}

.more-container {
  //   flex: 1;
  height: 500px;
  overflow-y: scroll;
  &::-webkit-scrollbar-track-piece {
    background-color: rgba(0, 0, 0, 0);
    border-left: 1px solid rgba(0, 0, 0, 0);
  }
  &::-webkit-scrollbar {
    width: 3px;
    height: 10px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(59, 56, 56, 0.5);
    background-clip: padding-box;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    min-height: 18px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: rgba(0, 0, 0, 0.5);
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
  }
  .top-list-item {
    display: flex;
    align-items: center;
    padding: 20px 0;
    box-sizing: border-box;
    i {
      padding: 10px;
    }

    .header {
      width: 64px;
      height: 64px;
      border-radius: 500px;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center center;
      margin: 0 20px;
    }

    .phone {
      flex: 1;
      font-size: 24px;
      font-weight: 600;
    }

    .nums {
      font-size: 22px;
      color: #b5b5b5;
    }
  }
}

.more-nodata {
  position: relative;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  img {
    width: 260px;
    height: 260px;
  }
}
</style>
