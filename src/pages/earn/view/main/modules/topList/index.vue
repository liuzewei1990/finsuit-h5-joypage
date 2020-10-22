<template>
  <ModuleBox class="module-" showTitle title="排行榜" type="green">
    <div class="container">

      <!-- 导航tab -->
      <div class="tab">
        <span v-for="(item,index) in tabList" :key="index" :class="{'tab-active':index === bindTabIndex}" @click="bindTabIndex = index">
          <i class="name">{{item.tabName}}</i>
          <i class="tab-line tab-line-animation" v-show="index === bindTabIndex"></i>
        </span>
      </div>

      <!-- 主体内容 -->
      <Swiper class="views" height="100%" v-model="bindTabIndex" :loop="false" :auto="false" :showDots="false" :minMovingDistance="500">
        <SwiperItem v-for="(item,index) in tabList" :key="index">
          <div class="view">

            <!-- <keep-alive> -->
            <component v-if="item.isTabLoad" :is="item.tabComponent" :isTabShow="tabList[bindTabIndex].tabComponent === item.tabComponent"></component>
            <!-- </keep-alive> -->

          </div>
        </SwiperItem>
      </Swiper>

    </div>
  </ModuleBox>
</template>

<script>
import ModuleBox from "@earn/components/ModuleBox/index.vue";
import { Swiper, SwiperItem } from "@earn/components/Swiper";
import TopListView1 from "./topListView-1.vue";
import TopListView2 from "./topListView-2.vue";
import { mapActions } from "vuex"
export default {
  components: { ModuleBox, Swiper, SwiperItem, TopListView1, TopListView2 },
  data () {
    return {
      bindTabIndex: 0,
      tabList: [
        {
          tabName: "本月排名",
          tabComponent: "TopListView1",
          isTabLoad: false,
        },
        {
          tabName: "上月排名",
          tabComponent: "TopListView2",
          isTabLoad: false,
        }
      ]
    }
  },
  watch: {
    bindTabIndex (i) {
      this.loadTabComponent(i)
    }
  },
  created () {
    this.getRANKING_LIST(this)
  },
  mounted () {
    this.loadTabComponent(this.bindTabIndex);
  },
  methods: {
    ...mapActions(["getRANKING_LIST"]),
    loadTabComponent (index) {
      this.tabList[index].isTabLoad = true;
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  height: 920px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  .tab {
    // border: 1px solid red;
    display: flex;
    color: #333;
    font-size: 30px;
    font-weight: bold;
    text-align: center;
    padding: 0 30px;
    box-sizing: border-box;
    span {
      flex: 1;
      height: 80px;
      line-height: 80px;
      position: relative;
      z-index: 1;
    }
    .tab-line {
      display: block;
      width: 102px;
      height: 10px;
      background: #79d9f7;
      position: absolute;
      left: 50%;
      bottom: 20px;
      transform: translateX(-50%);
      z-index: -1;
      border-radius: 10px;
    }
  }

  .views {
    flex: 1;
  }
  .view {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
  }

  .tab-line-animation {
    // animation-delay: 1s;
    animation: tabLine 0.15s 0.1s both;
  }

  @keyframes tabLine {
    0% {
      width: 0px;
    }

    100% {
      width: 102px;
    }
  }
}
</style>
