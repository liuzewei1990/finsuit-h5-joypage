<template>
  <section id="page" class="comment">
    <div class="container">
      <Textarea class="post-area" fontSize="14px" v-model="text" fullHeight autofocus :border="true" placeholder="评论内容不超过100个字。"></Textarea>
    </div>
    <Button class="btn" @click.native="$checkLogin({action:submit})">提交</Button>
  </section>
</template>

<script>
import Textarea from "@news/components/Textarea";
import Button from "@common/finsuit-components/Button";
export default {
  components: { Textarea, Button },
  data () {
    return {
      text: ""
    }
  },
  mounted () {
    // api埋点
    this.$trackEvents.PCB000A024({ ITEM_VALUE: this.$route.query["articleId"] });
  },
  methods: {
    async submit () {
      if (!this.text) {
        this.$Toast("评论内容不能为空");
        return;
      }
      let params = {
        COMMENT_TYPE: "0",
        OBJ_ID: this.$route.query["articleId"],
        COMMENT: this.text
      };
      let data = await this.$api.postComment(params);
      this.$Toast("评论成功");
      this.$router.back();
    }
  }
}
</script>

<style lang="less" scoped>
.comment {
  min-height: 100vh;
  background: #fff;
  padding: 20px;
  box-sizing: border-box;
  .container {
    height: 300px;
    background: #eee;
    border-radius: 10px;
    overflow: hidden;
    padding: 10px 20px;
    box-sizing: border-box;
  }

  .post-area {
    // font-size: 28px;
  }

  .btn {
    // background: red;
    margin-top: 50px;
  }
}
</style>
