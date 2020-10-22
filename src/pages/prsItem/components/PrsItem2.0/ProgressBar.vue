<!--
    使用说明：
        1. 使用progress进行父子组件传参
            type -> 类型 string【有warning，danger，success，info等；】
			haveAcount -> 是否有右边对金额 boolean
            value -> 当前值 number
            max -> 最大值 number
			百分比 -> 利用percent变量控制，这是通过value与max值计算出来的，为Vue的一个计算属性；
			显示的百分比值 -> 利用valueText值控制，为Vue的一个计算属性
-->
<template lang="html">
	<div class="box clearfloat">
		<div class="progress-outer float-left" >
			<div class="progress" :class="{'progress-striped active':animate}">
				<div class="progress-bar"
					:class="type && 'progress-bar-' + type"
					role="progressbar"
					:aria-valuenow="value"
					:aria-valuemin="0"
					:aria-valuemax="max"
					:style="{width:(percent < 100 ? percent : 100) + '%'}">
				</div>
			</div>
			<span class="progress-dian" :style="{left:(percent > 2 ? percent-2 : percent) + '%'}"></span>
			<!-- <span class="progress-text" :style="{left:(percent > 2 ? percent-2 : percent) + '%'}">{{valueText}}</span> -->
		</div>
		<div class="acount float-right" v-if="haveAcount">
			还差<span>{{acount}}</span>人拼成
		</div>
        <div class="acount float-right" v-else>
            <span>人数团已满</span>
        </div>
	</div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      required: true,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    type: {
      type: String,
      default: "success"
    },
    animate: {
      type: Boolean,
      default: false
    },
    haveAcount: {
      type: Boolean,
      default: false
    },
    acount: {
      type: [String, Number],
      default: "0"
    }
  },
  computed: {
    percent () {
      return parseInt(this.value * 100 / this.max, 10);
    },
    valueText () {
      return this.percent + "%";
    }
  },
  data () {
    return {

    }
  },
  methods: {

  }
}
</script>

<style scoped lang="less">
.box {
  margin-top: 30px;
  margin-bottom: 0.2rem;
}
.progress-outer {
  position: relative;
  margin-top: 16px;
  width: 65%;
}
.acount {
  color: #e75d22;
  font-size: 24px;
}
.progress-text {
  position: absolute;
  top: -40px;
  font-size: 24px;
  color: #e75d22;
}
.progress {
  width: 100%;
  height: 8px;
  border-radius: 100px;
  float: left;
  overflow: hidden;
  background: #e5e8f0;
}
.progress-bar {
  width: 0;
  height: 8px;
  border-radius: 100px;
  font-size: 24px;
  line-height: 40px;
  color: #fff;
  text-align: center;
  background: #e75d22;
  transition: width 0.6s ease;
}
.progress-dian {
  width: 28px;
  height: 28px;
  position: absolute;
  top: -10px;
  border-radius: 500px;
  background: linear-gradient(
    270deg,
    rgba(251, 176, 116, 1) 0%,
    rgba(255, 128, 26, 1) 100%
  );
}
.progress-bar-success {
  background: #ff801a;
}
.progress-bar-info {
  background: #5bc0de;
}
.progress-bar-danger {
  background: #d9534f;
}
.progress-bar-warning {
  background: #f0ad4e;
}
.progress .active .progress-bar {
  animation: progress-bar-stripes 2s linear infinite;
}
@keyframes progress-bar-stripes {
  0% {
    background-position: 40px 0;
  }
  100% {
    background-position: 0 0;
  }
}
.float-left {
  float: left;
}
.float-right {
  float: right;
}
.clearfloat:after {
  display: block;
  content: "";
  clear: both;
}
</style>
