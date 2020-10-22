<template>
  <section id="page" class="main ">
    <template v-if="dataList.length">
      <card :dataList="dataList"></card>
    </template>

    <!-- 加载骨架 -->
    <template v-if="skeleton && !dataList.length">
      <cardLoading></cardLoading>
    </template>

    <!-- 无数据 -->
    <template v-if="!skeleton && !dataList.length">
      <noData>
        <p>暂无活动</p>
      </noData>
    </template>
  </section>
</template>

<script>
import card from './modules/card'
import cardLoading from './modules/cardLoading2'
import noData from './modules/noData'
export default {
  components: { card, cardLoading, noData },
  data () {
    return {
      dataList: [],
      skeleton: true
    }
  },
  created () {
    this.$trackEvents.B000A553();
    this.getData()
    this.$bcBridge.updateTitle("活动中心");
  },
  mounted () {
  },

  methods: {
    toDetail () {
      this.$router.push({
        path: "/",
        query: ""
      })
    },
    async getData () {
      try {
        let params = { routeKey: "ActivityAppService-getAppActivityInfo" }
        let data = await this.$api.getActivityList(params, { TYPE: "CAMPAIGN_SERVICE_HANDLER" })
        this.dataList = (data.data instanceof Array) ? data.data : [];
      } catch (error) {
        console.log(error);
      }
      this.skeleton = false;
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  min-height: 100vh;
  background: #f5f7fa;
  padding: 24px 0;
  box-sizing: border-box;
}
.skeleton {
  position: relative;
  overflow: hidden;
  border: none !important;
  border-radius: 5px;
  background-color: transparent !important;
  background-image: none !important;
  &::after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    z-index: 9;
    width: 100%;
    height: 100%;
    background-color: #ebf1f8;
    display: block;
  }

  /* 下面这部分都是自定义的，看需求修改 */
  &:not(.not-round)::after {
    border-radius: 4px;
  }
  &:not(.not-before)::before {
    position: absolute;
    top: 0;
    width: 30%;
    height: 100%;
    content: "";
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 0,
      rgba(255, 255, 255, 0.3) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    transform: skewX(-45deg);
    z-index: 99;
    animation: skeleton-ani 1s ease infinite;
    display: block;
  }
  &.badge {
    &::after {
      background-color: #f8fafc;
    }
  }
}

@keyframes skeleton-ani {
  from {
    left: -100%;
  }
  to {
    left: 150%;
  }
}
</style>
