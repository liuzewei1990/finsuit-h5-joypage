<template>
  <div class="productWap">
    <div class="jieshao">
      <p>{{datas.title}}</p>
    </div>
    <div class="toBuy">立即购买</div>
  </div>
</template>

<script>
export default {
  props: ["datas"],
  data() {
    return {};
  }
};
</script>

<style scoped>
.productWap {
  display: flex;
  justify-content: space-between;
}
.jieshao {
  width: calc(100% - 87px);
  border-radius: 10px 0 0 10px;
}
.toBuy {
  font-size: 29px;
  color: rgba(255, 255, 255, 1);
  background: #496df2;
  width: 87px;
  border-radius: 0px 10px 10px 0px;
}
</style>