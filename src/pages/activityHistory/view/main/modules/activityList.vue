<template>
  <section class="activity-module" v-if="list.length">
    <div class="line"></div>
    <div class="title">为您推荐</div>
    <div class="activity-list">
      <!-- item -->
      <div class="activity-item" v-for="(item,index) in list" :key="index">
        <div class="activity-icon" :style="{backgroundImage:`url(${item.activityIcon})`}"></div>
        <div class="activity-title">
          <p>{{item.activityTitle}}</p>
          <span>{{item.activityDesc}}</span>
        </div>
        <div class="activity-btn" @click="checkLogin(item)">去赚钱</div>
      </div>

    </div>
  </section>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      list: []
    }
  },
  mounted () {
    this.renderData();
  },
  methods: {

    // api数据转换
    transfronData (apiData) {
      apiData = apiData.FIELD_DATA || [];
      if (!(apiData instanceof Array)) return;
      return apiData.map(item => {
        let newItem = {};
        newItem["id"] = item.ID;
        newItem["activityId"] = item.ACTITY_ID;
        newItem["activityIcon"] = this.$transfromAliyunUrl(item.ACT_IMG_URL);
        newItem["activityTitle"] = item.ACTIVITY_FIELD_TITLE;
        newItem["activityDesc"] = item.IMG_DESCRIBE;
        newItem["activityUrl"] = item.IMG_LINK_URL;
        newItem["isLogin"] = "1";
        return newItem;
      })
    },

    // 请求数据
    async renderData () {
      let params = { ACTITY_CODE: this.$Config.actityCode };
      let data = await this.$api.getActivityList(params).then(apiData => this.transfronData(apiData));
      this.list = data;
    },

    // 跳转链接
    checkLogin (item) {
      if (item.isLogin == "1") {
        this.$checkLogin({ action: this.toLink, data: item });
      } else {
        this.toLink(item);
      }
    },
    // 跳转链接
    toLink (item) {
      let url = item.activityUrl;
      this.$bcBridge.openWebview(url);
    }

  }
}
</script>

<style lang="less" scoped>
.activity-module {
  background: #fff;
  .line {
    height: 24px;
    background: #f5f5f5;
  }

  .title {
    line-height: 108px;
    font-size: 32px;
    color: #333;
    padding: 0 30px 0px;
    box-sizing: border-box;
  }

  .activity-list {
    padding: 0 30px 50px;
    box-sizing: border-box;
  }

  .activity-item {
    background: #fff;
    padding: 30px 24px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    border-radius: 4px;
    box-shadow: 0px 0px 15px 0px #eee;
    margin-bottom: 24px;
  }

  .activity-icon {
    width: 82px;
    height: 82px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    border-radius: 4px;
  }

  .activity-title {
    flex: 1;
    padding: 0 32px;
    box-sizing: border-box;
    p {
      font-size: 28px;
      color: #333;
      line-height: 50px;
      font-weight: 500;
    }
    span {
      font-size: 24px;
      color: #999;
    }
  }

  .activity-btn {
    color: #fff;
    background: #508cee;
    padding: 10px 30px;
    border-radius: 5px;
  }
}
</style>
