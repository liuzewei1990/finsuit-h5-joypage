<template>
    <div class="rule-box">
		<img class="rule-img" src="../../assets/images/rule.png" alt="">
		<div class="rule-conent">

		</div>
    </div>
</template>

<script>
export default {
	data () {
		return {}
	},
	created () {
	}
}
</script>

<style lang="less" scoped>
    .rule-box {
      position: relative;
      top:0;
      bottom:0;
      left:0;
      right:0;
      padding-top:10px;
      padding-bottom:46px;
      background:linear-gradient(180deg,rgba(255,115,84,1) 0%,rgba(254,66,82,1) 100%);
      .rule-img {
        width:543px;
        height:137px;
        margin:0 auto;
        margin-top:10px;
      }
      .rule-conent {
        width:702px;
        height:1305px;
        margin:0 auto;
        margin-top:-54px;
        background:rgba(255,255,255,1);
        border-radius:20px;
        border:6px solid rgba(255,194,180,1);
      }
    }
</style>
