<template>
  <div id="arrow">
    <span :class="`${direction}-arrow`"></span>
  </div>
</template>

<script>
export default {
  props: {
    direction: {
      type: String,
      default: "right"
    }
  },
  data () {
    return {

    };
  },
  created () {

  },
  mounted () {

  },
  methods: {

  }
};
</script>

<style scoped lang="less">
#arrow {
  display: flex;
}
// 右箭头
.right-arrow {
  display: inline-block;
  position: relative;
  width: 36px;
  height: 36px;
  margin-right: 20px;
}

.right-arrow::after {
  display: inline-block;
  content: " ";
  height: 14px;
  width: 14px;
  border-width: 3px 3px 0 0;
  border-color: #508cee;
  border-style: solid;
  transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
  position: absolute;
  top: 56%;
  right: 6px;
  margin-top: -9px;
}
// 下箭头
.down-arrow {
  display: inline-block;
  position: relative;
  width: 36px;
  height: 36px;
  margin-right: 20px;
}

.down-arrow::after {
  display: inline-block;
  content: " ";
  height: 14px;
  width: 14px;
  border-width: 0 3px 3px 0;
  border-color: #508cee;
  border-style: solid;
  transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
  transform-origin: center;
  transition: transform 0.3s;
  position: absolute;
  top: 50%;
  right: 10px;
  margin-top: -10px;
}
// 加上active旋转成 上箭头
.down-arrow.active::after {
  transform-origin: center;
  transform: rotate(-135deg);
  transition: transform 0.3s;
}
</style>
