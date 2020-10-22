<template>
  <div class="main-market" v-show="list.length">
    <MainTitle :title="title" />
    <div class="market-box dev">
      <!-- 小于等于两条时 展示宽版，大于两条时展示，前两条宽版，剩余窄版 -->
      <div class="item dev" :class="(list.length === 2 || index === 0)?'item-max':'item-min'" v-for="(item,index) in list" :key="index" @click="clickItem(item,index)" v-track:ACB0I017.click="{handleClick:()=>{},item}">
        <img v-lazy="$Config.aliyuncHost + item.ACT_IMG_URL" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import MainTitle from "@topic/components/MainTitle/index.vue"
export default {
  components: { MainTitle },
  created () {
    this.getActivityList();
  },
  data () {
    return {
      // 模块标题
      title: "",
      // 活动列表
      list: [],
      // 当前点击item
      currClickItem: {},
      clickItemLoading: this.$Loading()
    }
  },
  methods: {
    // 获取活动列表
    async getActivityList () {
      try {
        let params = {
          ACTITY_CODE: this.$Config.actityCode,
        };
        let data = await this.$api.getActivityList(params);
        console.debug("this.$api.getActivityList", data);
        if (this.$utils.isObject(data)) {
          this.title = data.ACTIVITY_FIELD_CONFIG || "更多活动";
          let list = data.FIELD_DATA || [];
          list.sort((a, b) => a.ACTIVITY_FIELD_SORT - b.ACTIVITY_FIELD_SORT);
          this.list = list;
        } else {
          this.$Toast("getActivityList api data error");
        }
      } catch (error) {
        console.error("getActivityList", error);
      }
    },

    // 点击活动跳转链接
    clickItem (item, index) {
      // 如果没有IMG_LINK_URL 链接地址 判定为最后一个不可点击
      if (!item.IMG_LINK_URL) return;
      this.currClickItem = item;
      this.$openWebview(item.IMG_LINK_URL);
    }
  }
}
</script>

<style lang="less" scoped>
.main-market {
  background: #fff;
  padding: 26px;
  box-sizing: border-box;
}

.market-box {
}

.market-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  img {
    width: 100%;
    height: 100%;
  }

  .item {
    border-radius: 10px;
    overflow: hidden;
  }

  .item-max {
    width: 698px;
    height: 180px;
    border-radius: 12px;
    margin-bottom: 20px;
  }

  .item-min {
    // width: 339px;
    width: 48.5%;
    height: 180px;
    border-radius: 12px;
    margin-bottom: 20px;
  }
}
</style>
