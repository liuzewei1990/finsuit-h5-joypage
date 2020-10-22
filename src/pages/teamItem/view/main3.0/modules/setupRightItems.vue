<!--  -->
<template>
  <section class=''></section>
</template>

<script>

export default {
  components: {},
  data () {
    return {
    };
  },
  created () {
    this.setupRightItems();
  },
  mounted () {

  },
  //方法集合
  methods: {
    setupRightItems () {

      let itemsjson = [{
        id: "0",
        normalImg: "https://finsuit.oss-cn-beijing.aliyuncs.com/ACT/note-x3.png",
        selectImg: "https://finsuit.oss-cn-beijing.aliyuncs.com/ACT/note-x3.png",
        selected: "0",
        fn: this.toUrl
      }];

      this.$bcBridge.setupRightItems(itemsjson, (res) => {
        let item = itemsjson.find(o => o.id == res.id);
        item.fn();
      });

    },

    // 跳转到活动投资
    toUrl () {
      let url = this.$Config.activityHistoryUrl;
      url += `#/`;
      url += `?ACTITY_ID=${this.$store.state.ACTITY_ID}`;
      url += `&customBar=1`;
      this.$openWebview(url);
    }
  },
}
</script>
<style lang='less' scoped>
</style>