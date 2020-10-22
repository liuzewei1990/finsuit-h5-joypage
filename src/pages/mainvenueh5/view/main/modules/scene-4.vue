<!-- 场景四 -->
<template>
  <section class='scene-page scene-4' :style="{backgroundImage:`url(${$assets.scene4bj})`}" v-touchmove="$parent.touchmove">
    <div class="scene-container" id="scene-4">
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
      this.root = document.getElementById('scene-4')
      this.renderBiCai()
      this.renderJianZhu()
      this.renderNan()
      this.renderNanDunPan()
      this.renderNv()
      this.renderNvKuiJia()
      this.renderText2()
      this.renderText1()
      this.renderbotTable()
      this.renderBotNv()
      this.renderBotNan()
      this.renderKaFeiRongqi1({ opacity: 0, overflow: 'hidden' })
      this.renderKaFeiRongqi2({ opacity: 0, overflow: 'hidden' })
      this.renderBotCaFei()
      this.renderShouBiZheZhao({ opacity: 0 })
      this.renderGeBo({ opacity: 0 })
      this.renderJianTou({ opacity: 0 })
      this.play(0);
    },
    play (timer) {
      this.JTLine.add("LINE", 0);
      this.JTLine
        .to(this.nanDunPan, 0.800, { top: this.$CommonStyle.px2rem(240), ease: JT.Cubic.Out }, "LINE+=0.600")
        .to(this.text2, 0.800, { left: this.$CommonStyle.px2rem(239), ease: JT.Cubic.InOut }, "LINE+=1.300")
        .to(this.shouBiZheZhao, 0.100, { opacity: 1, ease: JT.Cubic.InOut }, "LINE+=2.000")
        .to(this.geBo, 0.100, { opacity: 1, ease: JT.Cubic.InOut }, "LINE+=2.000")
        .to(this.kaFeiRongQi1, 2.000, { opacity: 1, ease: JT.Cubic.InOut }, "LINE+=2.000")
        .to(this.kaFeiQi1, 2.000, { top: 0, opacity: 1, ease: JT.Cubic.InOut }, "LINE+=2.000")
        .to(this.kaFeiRongQi2, 2.000, { opacity: 1, ease: JT.Cubic.InOut }, "LINE+=2.700")
        .to(this.kaFeiQi2, 2.000, { top: 0, opacity: 1, ease: JT.Cubic.InOut }, "LINE+=2.700")
        .fromTo(this.geBo, 0.500, { rotationZ: 357 }, { rotationZ: 353, ease: JT.Cubic.InOut }, "LINE+=3.400")
        .to(this.text1, 0.800, { left: this.$CommonStyle.px2rem(12), ease: JT.Cubic.InOut }, "LINE+=1.300")
        .to(this.jianTou, 0.200, { opacity: 1, ease: JT.Cubic.In }, "LINE+=4.700")
      this.JTLine.play(timer);
    },
    // 比财
    renderBiCai (style = {}) {
      let biCai = this.biCai = document.createElement("div");
      this.root.appendChild(biCai);
      biCai.size = this.$CommonStyle.getCommonStyle(129, 110, 117, 56, this.$assets.scene4bicai);
      JT.set(biCai, { ...biCai.size, ...style });
    },

    // 建筑
    renderJianZhu (style = {}) {
      let jianZhu = this.jianZhu = document.createElement("div");
      this.root.appendChild(jianZhu);
      jianZhu.size = this.$CommonStyle.getCommonStyle(110, 226, 177, 123, this.$assets.scene4jianzhu);
      JT.set(jianZhu, { ...jianZhu.size, ...style });
    },


    // 男
    renderNan (style = {}) {
      let nan = this.nan = document.createElement("div");
      this.root.appendChild(nan);
      nan.size = this.$CommonStyle.getCommonStyle(74, 215, 59, 152, this.$assets.scene4nan);
      JT.set(nan, { ...nan.size, ...style });
    },

    // 男盾牌
    renderNanDunPan (style = {}) {
      let nanDunPan = this.nanDunPan = document.createElement("div");
      this.root.appendChild(nanDunPan);
      nanDunPan.size = this.$CommonStyle.getCommonStyle(60, 263, 44, 76, this.$assets.scene4nandunpan);
      JT.set(nanDunPan, { ...nanDunPan.size, ...style });
    },

    // nv
    renderNv (style = {}) {
      let nv = this.nv = document.createElement("div");
      this.root.appendChild(nv);
      nv.size = this.$CommonStyle.getCommonStyle(122, 229, 44, 140, this.$assets.scene4nv);
      JT.set(nv, { ...nv.size, ...style });
    },

    // 女盔甲
    renderNvKuiJia (style = {}) {
      let nvKuiJia = this.nvKuiJia = document.createElement("div");
      this.root.appendChild(nvKuiJia);
      nvKuiJia.size = this.$CommonStyle.getCommonStyle(137, 284, 39, 68, this.$assets.scene4nvkuijia);
      JT.set(nvKuiJia, { ...nvKuiJia.size, ...style });
    },


    // text2
    renderText2 (style = {}) {
      let text2 = this.text2 = document.createElement("div");
      this.root.appendChild(text2);
      text2.size = this.$CommonStyle.getCommonStyle(379, 268, 120, 26, this.$assets.scene4text2);
      JT.set(text2, { ...text2.size, ...style });
    },

    // text1
    renderText1 (style = {}) {
      let text1 = this.text1 = document.createElement("div");
      this.root.appendChild(text1);
      text1.size = this.$CommonStyle.getCommonStyle(-128, 514, 116, 24, this.$assets.scene4text1);
      JT.set(text1, { ...text1.size, ...style });
    },



    // bot桌子
    renderbotTable (style = {}) {
      let botTable = this.botTable = document.createElement("div");
      this.root.appendChild(botTable);
      botTable.size = this.$CommonStyle.getCommonStyle(161, 432, 145, 119, this.$assets.scene4bottable);
      JT.set(botTable, { ...botTable.size, ...style });
    },

    // bot女
    renderBotNv (style = {}) {
      let botNv = this.botNv = document.createElement("div");
      this.root.appendChild(botNv);
      botNv.size = this.$CommonStyle.getCommonStyle(82, 400, 222, 159, this.$assets.scene4botnv);
      JT.set(botNv, { ...botNv.size, ...style });
    },

    // bot男
    renderBotNan (style = {}) {
      let botNan = this.botNan = document.createElement("div");
      this.root.appendChild(botNan);
      botNan.size = this.$CommonStyle.getCommonStyle(213, 404, 112, 148, this.$assets.scene4botnan);
      JT.set(botNan, { ...botNan.size, ...style });
    },

    // bot咖啡
    renderBotCaFei (style = {}) {
      let botCaFei = this.botCaFei = document.createElement("div");
      this.root.appendChild(botCaFei);
      botCaFei.size = this.$CommonStyle.getCommonStyle(205, 464, 19, 16, this.$assets.scene4botcafei);
      JT.set(botCaFei, { ...botCaFei.size, ...style });
    },

    // 胳膊遮罩
    renderShouBiZheZhao (style = {}) {
      let shouBiZheZhao = this.shouBiZheZhao = document.createElement("div");
      this.root.appendChild(shouBiZheZhao);
      shouBiZheZhao.size = this.$CommonStyle.getCommonStyle(168, 443, 40, 27, this.$assets.scene4shoubizhezhao);
      JT.set(shouBiZheZhao, { ...shouBiZheZhao.size, ...style });
    },

    // 胳膊
    renderGeBo (style = {}) {
      let geBo = this.geBo = document.createElement("div");
      this.root.appendChild(geBo);
      geBo.size = this.$CommonStyle.getCommonStyle(154, 439, 45, 44, this.$assets.scene4gebo);
      JT.set(geBo, { ...geBo.size, ...style });
    },

    // 咖啡容器1
    renderKaFeiRongqi1 (style = {}) {
      let kaFeiRongQi1 = this.kaFeiRongQi1 = document.createElement("div");
      this.root.appendChild(kaFeiRongQi1);
      kaFeiRongQi1.size = this.$CommonStyle.getCommonStyle(153, 465, 8, 16);
      JT.set(kaFeiRongQi1, { ...kaFeiRongQi1.size, ...style });

      // 咖啡气
      let kaFeiQi1 = this.kaFeiQi1 = document.createElement("div");
      kaFeiQi1.size = this.$CommonStyle.getCommonStyle(0, 16, 8, 16, this.$assets.scene4cafeiqi1);
      JT.set(kaFeiQi1, { ...kaFeiQi1.size, ...style });
      kaFeiRongQi1.appendChild(kaFeiQi1);
    },

    // 咖啡容器2
    renderKaFeiRongqi2 (style = {}) {
      let kaFeiRongQi2 = this.kaFeiRongQi2 = document.createElement("div");
      this.root.appendChild(kaFeiRongQi2);
      kaFeiRongQi2.size = this.$CommonStyle.getCommonStyle(209, 454, 8, 16);
      JT.set(kaFeiRongQi2, { ...kaFeiRongQi2.size, ...style });

      // 咖啡气
      let kaFeiQi2 = this.kaFeiQi2 = document.createElement("div");
      kaFeiQi2.size = this.$CommonStyle.getCommonStyle(0, 16, 8, 16, this.$assets.scene4cafeiqi2);
      JT.set(kaFeiQi2, { ...kaFeiQi2.size, ...style });
      kaFeiRongQi2.appendChild(kaFeiQi2);
    },

    /**
     * 绘制对话框 箭头
     */
    renderJianTou (style = {}) {
      let jianTou = this.jianTou = document.createElement("div");
      this.root.appendChild(jianTou);
      jianTou.size = this.$CommonStyle.getCommonStyle('auto', 'auto', 24, 39, this.$assets.scenejiantou);
      JT.set(jianTou, { ...jianTou.size, position: 'fixed', left: '50%', marginLeft: this.$CommonStyle.px2rem(-12), bottom: this.$CommonStyle.px2rem(23), ...style });
    },
  },
}
</script>
<style lang='less' scoped>
.scene-4 {
  background-repeat: repeat;
  background-size: 100%;
}
</style>
