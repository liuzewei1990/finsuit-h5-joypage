<!-- 场景五 -->
<template>
  <section class='scene-page scene-5' :style="{backgroundImage:`url(${$assets.scene4bj})`}">
    <div class="scene-container" id="scene-5">
    </div>
  </section>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      JTLine: JTL.create(),
      root: null
    };
  },
  created () {

  },
  mounted () {
    this.initFn()
  },
  //方法集合
  methods: {
    initFn () {
      this.root = document.getElementById('scene-5')
      this.renderTable()
      this.renderTipPhone({ opacity: 0, rotationZ: 10 })
      this.renderPhone()
      this.play(0);
    },
    play (timer) {
      let that = this
      this.JTLine.add("LINE", 0);
      this.JTLine
        .to(this.phone, 0.200, { opacity: 0, ease: JT.Linear.in }, "LINE+=0.990")
        .to(this.table, 0.20000, { opacity: 0, ease: JT.Linear.in }, "LINE+=0.990")
        .to(this.tipPhone, 0.200, { opacity: 1, ease: JT.Linear.in }, "LINE+=1.000")
        .to(this.tipPhone, 0.400, { onEnd: function () { }, rotationZ: -0.5, ease: JT.Cubic.in }, "LINE+=1.000")
        .to(this.tipPhone, 0.500, { scale: 3, left: this.$CommonStyle.px2rem(111), top: this.$CommonStyle.px2rem(193) }, "LINE+=1.500")
        .to(this.tipPhone, 0.100, { onEnd: () => { this.$parent.currSceneIndex = 6 }, ease: JT.Cubic.in }, "LINE+=2.000")
      this.JTLine.play(timer);
    },

    // 桌子
    renderTable (style = {}) {
      let table = this.table = document.createElement("div");
      this.root.appendChild(table);
      table.size = this.$CommonStyle.getCommonStyle(66, 207, 309, 323, this.$assets.scene5table);
      JT.set(table, { ...table.size, ...style });
    },

    // 手机
    renderPhone (style = {}) {
      let phone = this.phone = document.createElement("div");
      this.root.appendChild(phone);
      phone.size = this.$CommonStyle.getCommonStyle(0, 224, 322, 306, this.$assets.scene5phone);
      JT.set(phone, { ...phone.size, ...style });
    },

    // tip手机
    renderTipPhone (style = {}) {
      let tipPhone = this.tipPhone = document.createElement("div");
      this.root.appendChild(tipPhone);
      tipPhone.size = this.$CommonStyle.getCommonStyle(118, 230, 153.5, 279.5, this.$assets.scene5tipphone);
      JT.set(tipPhone, { ...tipPhone.size, ...style });
    },
  },
}
</script>
<style lang='less' scoped>
.scene-5 {
  background-repeat: repeat;
  background-size: 100%;
}
</style>
