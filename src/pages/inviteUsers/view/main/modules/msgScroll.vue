<template>
  <div class="msg-scroll" v-show="isShow">
    <div class="icon"></div>
    <transition-group tag="div" class="msg-scroll-box">
      <p v-for="(item) in list" :key="item.key" class="table">
        <span>{{ item.SCROLL_DATA }}</span>
      </p>
    </transition-group>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      isShow: false,
    };
  },

  mounted () {
    this.init();
  },
  methods: {
    async init () {

      let data = await this.$api.getData({
        "routeKey": "invitationInterFace-queryShuffling"
      });
      let msgArr = data.data;

      if (msgArr.length === 0) {
        this.isShow = false;
        return;
      }
      let newarr = [];
      for (let index = 0; index < msgArr.length; index++) {
        newarr.push({ "SCROLL_DATA": msgArr[index] })
      }
      this.isShow = true;
      this.list = this.createKey(newarr);
      this.play();
    },

    // 滚动函数
    play () {
      window.requestAnimationFrame(() => {
        let _cache = this.list[0];
        this.list.shift();
        this.list.push(_cache);
        setTimeout(this.play, 2500)
      });
    },

    /**
     * 接口数据createKey 不足三条数据时强制3条
     * 如果接口返回为0条时，轮播前端的注水数据
     * 如果接口返回为1条时，轮播该条数据
     * 如果接口返回为2条时，轮播该两条数据
     * 如果大于2条了，正常处理。
     * */
    createKey (data = []) {
      // 限制一下轮播条数

      let arr = [];
      if (data.length <= 1) {
        for (let index = 0; index < 3; index++) {
          let item = { ...data[0] };
          item["key"] = "key" + index;
          arr.push(item);
        }
        return arr;
      } else if (data.length === 2) {
        for (let index = 0; index < 4; index++) {
          let item = { ...data[index % 2] };
          item["key"] = "key" + index;
          arr.push(item);
        }
        return arr;
      } else {
        return data.map((item, index) => {
          item["key"] = "key" + index;
          return item;
        })
      }
    }
  }
};
</script>

<style scoped>
.msg-scroll {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
  width: 100%;
  height: 72px;
  overflow: hidden;
  background: #fff2dc;
  display: flex;
}

.icon {
  /* padding: 10px; */
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  background: url("../../../assets/images/gonggao@2x.png") no-repeat;
  background-size: 36px 36px;
  background-position: center center;
}

.msg-scroll-box {
  margin-top: -72px;
}

.v-move {
  transition: transform 0.3s;
}
.msg-scroll-box p:nth-last-child(1) {
  visibility: hidden;
}
.msg-scroll-box p {
  width: 100%;
  height: 72px;
  font-size: 22px;
  color: #fa670f;
  display: flex;
  align-items: center;
}
.msg-scroll-box p span {
  display: table-cell;
  vertical-align: middle;
}
</style>
