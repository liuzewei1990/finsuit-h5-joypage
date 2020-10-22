<template>
  <section class="dialog-common-box bounceIn">
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
.dialog-common-box {
  .dialog-common-inner {
    position: relative;
    z-index: 0;
    background: #ffa05a;
    display: flex;
    border-radius: @radius;
    flex-direction: column;
  }

  .dialog-common-card {
    position: absolute;
    z-index: 1;
    left: 50%;
    bottom: 20px;
    transform: translate3d(-50%, 0px, 0);
    width: 450px;
    height: 250px;
    display: flex;
  }

  .dialog-common-cover {
    position: relative;
    z-index: 2;
    width: 600px;
    min-height: 494px;
    margin-top: @radius;
    background: url("../../assets/images/dialog-cover.png") no-repeat;
    background-size: cover;
    background-position: center 1px;
    overflow: hidden;
    border-radius: 0 0 @radius @radius;
    padding: 80px 20px 20px;
    box-sizing: border-box;
    display: flex;
  }

  .animeta-show {
    animation: 0.6s show 0.3s both;
  }

  @keyframes show {
    0% {
      transform: translate3d(-50%, 0px, 0);
    }

    100% {
      transform: translate3d(-50%, -150%, 0);
    }
  }
}
</style>
