<template>
  <div class="productWap">
    <div class="jieshao">
      <p class="title">{{datas.title}}</p>
      <div class="content">
        <div class="left">
          <p>{{datas.lilv}}</p>
          <p>{{datas.subTitle}}</p>
        </div>
        <div class="right">
          <p v-for="(tar,ind) of datas.maidian" :key="ind">{{tar}}</p>
        </div>
      </div>
    </div>
    <div class="toBuy" @click="$checkLogin({action:toBuy,data:datas},false)">立即购买</div>
  </div>
</template>

<script>
export default {
  props: ["datas"],
  data() {
    return {};
  },
  methods: {
    // 点击立即购买
    toBuy() {
      this.$trackEvents.ACB0Y003({ ITEM_VALUE: this.datas.prdIndexId });
      this.$emit("toBuy", this.datas);
    }
  }
};
</script>

<style scoped>
.productWap {
  display: flex;
  justify-content: space-between;
  margin: 0 33px 35px;
  box-shadow: 0px 4px 16px 0px rgba(100, 248, 138, 0.35);
}
.jieshao {
  width: calc(100% - 87px);
  border-radius: 10px 0 0 10px;
  padding: 20px;
  background: rgba(240, 243, 253, 1);
}
.toBuy {
  font-size: 28px;
  color: rgba(255, 255, 255, 1);
  background: #496df2;
  width: 87px;
  border-radius: 0px 10px 10px 0px;
  writing-mode: vertical-lr;
  padding-top: 10px;
  text-align: center;
  line-height: 87px;
  letter-spacing: 12px;
}
.title {
  color: #282828;
  font-size: 29px;
  font-weight: bold;
}
.content {
  display: flex;
  justify-content: space-between;
}

.left > p:nth-child(1) {
  font-size: 40px;
  color: #2b56f1;
  padding: 10px 0;
  font-weight: bold;
}
.left > p:nth-child(2) {
  font-size: 24px;
  color: #999999;
  padding: 10px 0;
}
.right {
  width: 170px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  padding: 5px 0;
}
.right > p {
  font-size: 20px;
  color: rgba(73, 109, 242, 1);
  border-radius: 5px;
  padding: 0 4px;
  border: 1px solid #496df2;
}
</style>