<template>
  <section class="module-footer" v-if="stepGetGoodGift&&stepGetGoodGift.length">
    <h4 class="title">简单四步立享多重好礼</h4>
    <div class="step-container">
      <div class="step-item step-1">
        <div class="step-icon"><img src="../../../assets/images/step-1.png" alt=""></div>
        <p class="step-name" v-html="stepGetGoodGift[0].value"></p>
      </div>
      <div class="step-item step-2">
        <div class="step-icon"><img src="../../../assets/images/step-2.png" alt=""></div>
        <p class="step-name" v-html="stepGetGoodGift[1].value"></p>
      </div>
      <div class="step-item step-3">
        <div class="step-icon"><img src="../../../assets/images/step-3.png" alt=""></div>
        <p class="step-name" v-html="stepGetGoodGift[2].value"></p>
      </div>
      <div class="step-item step-4">
        <div class="step-icon"><img src="../../../assets/images/step-4.png" alt=""></div>
        <p class="step-name" v-html="stepGetGoodGift[3].value"></p>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex"
export default {
  components: {},
  computed: {
    ...mapState({
      stepGetGoodGift: state => state.main.stepGetGoodGift
    })
  },
  mounted () {

  },

  methods: {

  }
}
</script>

<style lang="less" scoped>
.module-footer {
  .title {
    font-size: 30px;
    color: #fff;
    text-align: center;
    padding: 20px;
  }

  .step-container {
    display: flex;
    padding: 20px 0;
    box-sizing: border-box;
    justify-content: space-between;
    .step-item {
      position: relative;
      flex: 1;
      text-align: center;
      .step-icon {
        width: 68px;
        height: 68px;
        margin: 18px auto;
        box-sizing: border-box;
        img {
          width: 100%;
          height: 100%;
        }
      }

      .step-name {
        font-size: 24px;
        color: #fff;
      }
    }

    .step-item {
      &::after {
        content: "";
        display: block;
        width: 80px;
        border: 1px dashed #fff;
        position: absolute;
        right: -40px;
        top: 54px;
      }
    }
    .step-item:last-child {
      &::after {
        display: none;
      }
    }
  }
}
</style>
