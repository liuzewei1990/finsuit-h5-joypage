<template>
  <div class="task-template">
    <div class="icon" @click="$emit('icon-click')">
      <img v-lazy="$transfromAliyunUrl(data.taskIcon)" alt="">
    </div>
    <div class="title" @click="$emit('content-click')">
      <p>{{data.taskTitle}}</p>
      <!-- <span class="desc">{{data.taskDesc}}</span> -->
      <span class="desc" v-html="data.taskDesc"></span>
    </div>
    <div class="action" @click="$emit('btn-click')">
      <slot name="action"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: () => {
      return {}
    },
    btnStatusText: String
  },
}
</script>

<style lang="less" scoped>
.task-template {
  width: 100%;
  min-height: 120px;
  background: #fff;
  display: flex;
  padding: 30px 0;
  box-sizing: border-box;
  align-items: center;
  position: relative;

  &::after {
    content: "";
    display: block;
    height: 0px;
    //减去图标的宽度 在减去margin
    width: calc(100% - 56px - 30px);
    border-bottom: 1.5px solid #eee;
    position: absolute;
    bottom: 2px;
    right: 0;
  }

  .icon {
    width: 56px;
    height: 56px;
    overflow: hidden;
    margin-right: 30px;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .title {
    flex: 1;
    padding-right: 10px;
    box-sizing: border-box;
    p {
      font-size: 24px;
      color: #333;
    }

    .desc {
      font-size: 20px;
      color: #999;
      display: flex;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      // 留着以下注释，否则wenpack打包不上
      /*! autoprefixer: off */
      -webkit-box-orient: vertical;

      /* autoprefixer: on */
      -webkit-line-clamp: 1;
    }
  }
  .action {
    width: 182px;
    display: flex;
    justify-content: center;
  }
}
</style>
