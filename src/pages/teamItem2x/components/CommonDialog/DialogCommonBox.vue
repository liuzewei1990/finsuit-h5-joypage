<template>
  <section class="dialog-common-box animeta-sacle">
    <div class="dialog-common-inner">
      <div class="dialog-common-card animeta-show">
        <slot name="card"></slot>
      </div>
      <div class="dialog-common-cover">
        <slot></slot>
      </div>
    </div>
  </section>
</template>

<script>
export default {
}
</script>

<style lang="less" scoped>
@radius: 25px;

.animeta-sacle {
  animation: sacle 0.3s ease-in-out both;
}
@keyframes sacle {
  from {
    transform: scale(0);
  }

  to {
    transform: scale(1);
  }
}

.animeta-show {
  //   animation: 0.6s show 0.5s both;
}

@keyframes show {
  0% {
    transform: translate3d(-50%, 0px, 0);
  }

  100% {
    transform: translate3d(-50%, -150%, 0);
  }
}
.dialog-common-box {
  .dialog-common-inner {
    position: relative;
    z-index: 0;
    background: #a92b07;
    display: flex;
    border-radius: @radius+20 @radius+20 @radius @radius;
    flex-direction: column;
  }

  .dialog-common-card {
    position: absolute;
    z-index: 1;
    left: 50%;
    top: -150px;
    // bottom: 20px;
    transform: translate3d(-50%, 0%, 0);
    width: 92%;
    height: 350px;
    display: flex;
  }

  .dialog-common-cover {
    position: relative;
    z-index: 2;
    width: 574px;
    min-height: 424px;
    margin-top: @radius+35;
    background: url("../../assets/images/dialog-cover.png") no-repeat;
    background-size: cover;
    background-position: center 1px;
    overflow: hidden;
    border-radius: 0 0 @radius @radius;
    padding: 80px 20px 20px;
    box-sizing: border-box;
    display: flex;
  }
}
</style>
