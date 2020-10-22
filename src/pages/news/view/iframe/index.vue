<template>
  <section id="page" class="iframe">
    <div v-html="articleContent"></div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      articleContent: "",
    }
  },
  mounted () {
    window.setContent = (articleContent) => {
      this.articleContent = articleContent;
      this.dss(200);
    }
  },

  methods: {
    // 自检函数
    dss (i) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        let bHeight = document.body.scrollHeight;
        let dHeight = document.documentElement.scrollHeight;
        let height = Math.min(bHeight, dHeight);
        console.log("height----:", height);
        window.parent.iframeHeight(height);
        i += 100;
        this.dss(i);
      }, i);
    }
  }
}
</script>

<style lang="less" scoped>
.iframe {
}
</style>
