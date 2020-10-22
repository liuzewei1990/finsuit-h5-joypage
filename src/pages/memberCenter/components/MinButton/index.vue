<template>
  <a href="javascript:void(0);" class="btn" :class="[type,{'loading':showLoding}]" @click="onClick">
    <i class="icon-loading" v-show="showLoding"></i>
    <span class="text" v-show="!showLoding">
      <slot></slot>
    </span>
  </a>
</template>

<script>
export default {
  props: {
    showLoding: Boolean,
    type: {
      type: String,
      default: "default"
    }
  },

  methods: {
    onClick () {
      if (this.showLoding) return;
      this.$emit('on-click');
    }
  }
}
</script>

<style lang="less" scoped>
.btn {
  min-width: 132px;
  line-height: 56px;
  padding: 0 20px;
  box-sizing: border-box;
  border-radius: 4px;
  display: inline-block;
  text-align: center;

  .text {
    font-size: 24px;
  }

  .icon-loading {
    width: 24px;
    height: 24px;
    display: inline-block;
    vertical-align: middle;
    animation: iconLoading 0.6s steps(12, end) infinite;
    transform-origin: 12px 12px;
    background: transparent
      url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABW0lEQVQ4T5VT7U3DQAz1cwagI5QJyMkZIGyQDSgTUDYoG5QNugHdgPT/nS4bwAhlgJ6RT5eqlKoflu5HZPvZfu8FdBQxxmlK6UVVWwC1pVV1ANAz87tz7vuwBYcfIYQlEVnzD4CBiOzVqloDuCu1CxF5G/v2ACGEQVWnAOYisjreLIQwU9VlAVqJyLPVZACbrKqzqqpa55xNPRkxxklKqSeiByJ6FZElys1fzPzonLPk2Ygx1imlSERbZr5HmT5tmqa71DzmvfcrAE+2hQHY7YumadY3AHQAPohoYwBqqxzLcw5sPNvOyAAi8kfOazbx3m+zCnYCM3e3bGCNMcY2AxRC+lPaXzrDhpqMbUrJ3JURrw3jIQMUI/XmsmuVMC+MhssAxWFrZp6fc6LVeu+7qqqGkbM9+yMIEX2Wvy6zPEaRrmPm9SHh/+QzTna73YyIJgDMslZjYNtTRP8C21PH400WIpAAAAAASUVORK5CYII=")
      no-repeat;
    background-size: 100% 100%;
    background-position: center center;
  }

  @keyframes iconLoading {
    0% {
      transform: rotate3d(0, 0, 1, 0deg);
    }

    100% {
      transform: rotate3d(0, 0, 1, 360deg);
    }
  }
}

.default {
  //   background: #eee;
  border: 1px solid #888;
  color: #333;
}

.start {
  //   background: linear-gradient(to bottom, #8cc4ff, #4e72fd);
  background: #508cee;
  color: #fff;
}
.await {
  //   background: linear-gradient(to bottom, #ffb738, #ff801a);
  background: #508cee;
  color: #fff;
}
.success {
  background: #e75d22;
  color: #fff;
}

.loading {
  opacity: 0.8;
}
</style>