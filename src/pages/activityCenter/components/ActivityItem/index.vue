<template>
  <div class="activity-item">
    <a href="javascript:void(0);" :class="{'activity-item-disabled':disabled}" @click="toUrl(item)">
      <!-- 图片 -->
      <div class="header">
        <div class="header-img yourclass" v-lazy:background-image="`${item.activityBanner}`" :key="`${item.activityBanner}`">
          <!-- <img v-lazy="item.activityBanner" :key="item.activityBanner" /> -->
        </div>
        <div v-show="showTag && item.orgName" class="header-tag">{{item.orgName}}</div>
      </div>

      <!-- 标题 -->
      <div class="content">
        <div class="content-l">
          <h3 class="title">{{item.title}}</h3>
          <small class="brief">{{item.desc || item.title}}</small>
        </div>

        <div class="content-r" v-show="showRate">
          <p>{{item.levelDesc || "活动热度"}}</p>
          <vm-rate v-model="item.level" disabled :allow-half="true" size="0.333rem" :colors="['#F65448', '#fe3b2d', '#fc1e0e']"></vm-rate>
        </div>
      </div>
    </a>
  </div>
</template>

<script>
import VmRate from 'vue-multiple-rate'
import 'vue-multiple-rate/lib/rate.css'
export default {
  components: { VmRate },
  props: {
    item: {
      type: Object,
      default () { return {} }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    showTag: {
      type: Boolean,
      default: false
    },
    showRate: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toUrl (item) {
      this.disabled || this.$emit("on-item-click", JSON.parse(JSON.stringify(item)));
    }
  }
}
</script>

<style lang="less" scoped>
.activity-item {
  padding: 30px 20px;
  box-sizing: border-box;
  position: relative;
  background: #fff;
}
.activity-item-disabled {
  opacity: 0.8;
}

.activity-item a {
  padding: 10px;
  box-sizing: border-box;
  display: block;
  background: rgba(255, 255, 255, 1);
  text-decoration: none;
  color: #222;
}

.header {
  position: relative;

  .header-img {
    position: relative;
    width: 100%;
    height: 0;
    // padding-top: 260px;
    height: 260px;
    // background-color: #f0f0f0;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    img {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      margin: auto;
      width: auto;
      height: auto;
      max-height: 100%;
      max-width: 100%;
    }
  }

  .header-tag {
    height: 40px;
    padding: 0 15px;
    background: #dfbc84;
    border-radius: 0px 0px 20px 0px;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;

    position: absolute;
    left: 0;
    top: 0;
  }
}

.activity-item .content {
  display: flex;
  .content-l {
    flex: 1;
  }
  .content-r {
    display: flex;
    flex-direction: column;
    // justify-content: center;
    align-items: flex-end;
    width: 200px;
    p {
      margin: 30px 10px 10px;
      color: #888;
      font-size: 22px;
      //   text-align: right;
    }
  }
  .title {
    margin: 20px 0 10px;
    font-size: 28px;
    color: #333333;
    display: flex;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    // 留着以下注释，否则wenpack打包不上
    /*! autoprefixer: off */
    -webkit-box-orient: vertical;
    /* autoprefixer: on */
    -webkit-line-clamp: 1;
  }
  .brief {
    font-size: 24px;
    color: #f65448;

    display: flex;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    // 留着以下注释，否则wenpack打包不上
    /*! autoprefixer: off */
    -webkit-box-orient: vertical;
    /* autoprefixer: on */
    -webkit-line-clamp: 2;
  }
}
</style>
