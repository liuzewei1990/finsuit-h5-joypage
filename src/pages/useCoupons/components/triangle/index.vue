<template>
  <div class="trangle" :class="this.$browser.OS">
    <span :class="`t-${tClass}`"></span>
  </div>
</template>

<script>
export default {
  props: {
    tClass: {
      type: String,
      default: "right"
    },
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
.IOS {
  margin-top: 2px;
}
.Android {
  margin-top: 5px;
}
.trangle {
  span {
    display: inline-block;
    width: 0;
    height: 0;
    border-style: solid;
  }
  .t-bottom {
    border-width: 20px 20px 0 20px;
    border-color: #508cee transparent transparent transparent;
  }
  .t-top {
    border-width: 0 20px 20px 20px;
    border-color: transparent transparent #508cee transparent;
  }
  .t-left {
    border-width: 20px 20px 20px 0;
    border-color: transparent #508cee transparent transparent;
  }
  .t-right {
    border-width: 10px 0 10px 10px;
    border-color: transparent transparent transparent #508cee;
  }
}
</style>
