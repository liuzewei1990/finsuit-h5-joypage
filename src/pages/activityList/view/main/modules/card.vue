<template>
  <div class="card">
    <div v-for="(item, index) in dataList" :key="index" class="card-list" @click="toDetail(item)">
      <div class="cover">
        <img :src="urlImg + item.activityPicture" alt="活动封面">
      </div>
      <h2>{{item.name}}</h2>
      <p>{{item.description}}</p>
    </div>
  </div>
</template>

<script>
import '../../../utils/setBgColor'
export default {
  props: {
    dataList: Array
  },
  data () {
    return {
      urlImg: this.$Config.aliyuncHost
    };
  },
  created () {
    let obj = new SetBgColor({ opacity: "0.1", el: ".cover" });
    this.$nextTick(() => {
      obj.setBg()
    })
  },
  mounted () {
  },
  methods: {
    toDetail (item) {
      this.$trackEvents.B000A554(() => { }, { FROM_ID: item.id });
      let data = { H5_URL: `${item.activityUrl}?NEED_LOGIN=1` }
      this.$bcBridge.gotoSecondaryH5Page(data)
    }
  }
};
</script>

<style scoped lang="less">
.card {
  .card-list {
    background: #fff;
    margin-bottom: 24px;
    padding: 32px;
    box-sizing: border-box;
  }
  .cover {
    min-height: 260px;
    // background: burlywood;
    img {
      max-height: 260px;
      width: 100%;
    }
  }
  h2 {
    font-size: 28px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weigh: 600;
    color: rgba(48, 49, 51, 1);
    margin: 24px 0 10px;
  }
  p {
    font-size: 24px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(96, 98, 102, 1);
  }
}
</style>

