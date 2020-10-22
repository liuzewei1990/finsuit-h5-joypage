<!-- 场景二 -->
<template>
  <section class='scene-page scene-2' :style="{backgroundImage:`url(${$assets.scene2bj})`}" v-touchmove="$parent.touchmove">
    <div class="scene-container" id="scene-2">
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
    initFn() {
      this.root = document.getElementById('scene-2')
      this.renderDialogDz({opacity:0})
      this.renderDialogDengGuang2({opacity:0.5})
      this.renderDialogDengGuang1({opacity:0.3})
      this.renderDialogZx({opacity:0})
      this.renderDialogChiHe({opacity:0})
      this.renderDialogRenSheng({opacity:0})
      this.renderDialogXinLiGe({opacity:0})
      this.renderDialogShouRu({opacity:0})
      this.renderDialogJiuBeiShou({rotationZ: 90})
      this.renderDialogYeTiRongqi({opacity:0,overflow: 'hidden'})
      this.renderDialogPiJiuRongQi({opacity:0,overflow: 'hidden'})
      this.renderDialogBotJiuBeiRongQi({opacity:0,overflow: 'hidden'})
      this.renderDialogJianTou({ opacity: 0})
      this.renderCanCheDengGuang({opacity: 0})
      this.renderKongJiuBei()
      this.renderShou()
      this.play(0);
    },
    play(timer) {
      this.JTLine.add("LINE", 0);
      this.JTLine
        .to(this.dialogDz, 0.600,{ opacity: 1,ease: JT.Linear.In }, "LINE+=1.000")
        .to(this.dialogZx, 0.600,{ opacity: 1,ease: JT.Linear.In }, "LINE+=2.000")
        .to(this.dialogChiHe, 0.600,{ opacity: 1,ease: JT.Linear.In }, "LINE+=3.000")
        .to(this.dialogRenSheng, 0.600,{ opacity: 1,ease: JT.Linear.In }, "LINE+=4.000")
        .to(this.dialogXinliGe, 0.600,{ opacity: 1,ease: JT.Linear.In }, "LINE+=5.000")
        .to(this.dialogDengGuang, 4.000,{ opacity: 1,ease: JT.Linear.In,}, "LINE+=5.000")
        .to(this.dialogShouRu, 0.600,{ opacity: 1,ease: JT.Linear.In }, "LINE+=6.000")
        .to(this.dialogDengGuang1, 0.600,{ opacity: 1,ease: JT.Linear.In }, "LINE+=7.000")
        .to(this.dialogJiuBeiShou, 1.000,{rotationZ: 0,ease: JT.Cubic.out }, "LINE+=7.000")
        .to(this.dialogYeTiRongqi, 2.000,{ opacity: 1,ease: JT.Cubic.out }, "LINE+=7.450")
        .to(this.dialogPiJiuYeTi, 2.000,{top: this.$CommonStyle.px2rem(20),ease: JT.Cubic.out }, "LINE+=7.450")
        .to(this.dialogPiJiuRongQi, 1.750,{opacity: 1,ease: JT.Cubic.out }, "LINE+=8.000")
        .to(this.dialogCanCheDengGuang, 1.750,{opacity: 1,ease: JT.Cubic.out }, "LINE+=8.000")
        .to(this.dialogPiJiu, 1.750,{top: this.$CommonStyle.px2rem(0),ease: JT.Cubic.out }, "LINE+=8.000")
        .to(this.dialogPiJiuYeTi, 1.350,{opacity: 0,ease: JT.Cubic.out }, "LINE+=8.130")
//        .fromTo(this.dialogPiJiuYeTi,1.350, { opacity: 1 }, { onEnd: function () { }, opacity: 0, ease: JT.Cubic.out }, "LINE+=8.130")
        .to(this.dialogJiuBeiShou, 1.000,{rotationZ: 90,ease: JT.Cubic.out }, "LINE+=8.370")
        .to(this.dialogBotJiuBeiRongQi, 1.200,{opacity: 1,ease: JT.Cubic.out }, "LINE+=9.590")
        .to(this.dialogBotGiuBeiShou, 1.200,{top: 0,ease: JT.Cubic.out }, "LINE+=9.590")
        .fromTo(this.dialogShouRu,0.200, { opacity: 0 }, { onEnd: function () { }, opacity: 1, ease: JT.Linear.In }, "LINE+=10.570")
        .to(this.dialogJianTou, 0.200,{ opacity: 1,ease: JT.Cubic.In }, "LINE+=10.920")
      this.JTLine.play(timer);
    },
    /**
     * 绘制对话框 短暂
     */
    renderDialogDz (style = {}) {
      let dialogDz = this.dialogDz = document.createElement("div");
      this.root.appendChild(dialogDz);
      dialogDz.size = this.$CommonStyle.getCommonStyle(32, 99, 179, 49,this.$assets.scene2dz);
      JT.set(dialogDz, { ...dialogDz.size, ...style });
    },

    /**
     * 手
     */
    renderShou (style = {}) {
      let dialogShou = this.dialogShou = document.createElement("div");
      this.root.appendChild(dialogShou);
      dialogShou.size = this.$CommonStyle.getCommonStyle(0,358, 142, 134,this.$assets.scene2shou);
      JT.set(dialogShou, { ...dialogShou.size, ...style });
    },

    /**
     *  空酒杯
     */
    renderKongJiuBei(style = {}) {
      let dialogPijiubei = this.dialogPijiubei = document.createElement("div");
      this.root.appendChild(dialogPijiubei);
      dialogPijiubei.size = this.$CommonStyle.getCommonStyle(53, 448, 33, 38,this.$assets.scene2pijiubei);
      JT.set(dialogPijiubei, { ...dialogPijiubei.size, ...style });
    },

    /**
     *  餐车灯光
     */
    renderCanCheDengGuang(style = {}) {
      let dialogCanCheDengGuang = this.dialogCanCheDengGuang = document.createElement("div");
      this.root.appendChild(dialogCanCheDengGuang);
      dialogCanCheDengGuang.size = this.$CommonStyle.getCommonStyle(320, 239, 54, 17,this.$assets.scene2canchedengguang);
      JT.set(dialogCanCheDengGuang, { ...dialogCanCheDengGuang.size, ...style });
    },


    /**
     * 绘制对话框 灯光2
     */
    renderDialogDengGuang2 (style = {}) {
      let dialogDengGuang = this.dialogDengGuang = document.createElement("div");
      this.root.appendChild(dialogDengGuang);
      dialogDengGuang.size = this.$CommonStyle.getCommonStyle(66, 136, 236, 223,this.$assets.scene2dengguang2);
      JT.set(dialogDengGuang, { ...dialogDengGuang.size, ...style });
    },

    /**
     * 绘制对话框 灯光1
     */
    renderDialogDengGuang1 (style = {}) {
      let dialogDengGuang1 = this.dialogDengGuang1 = document.createElement("div");
      this.root.appendChild(dialogDengGuang1);
      dialogDengGuang1.size = this.$CommonStyle.getCommonStyle(13, 255, 143, 50,this.$assets.scene2dengguang1);
      JT.set(dialogDengGuang1, { ...dialogDengGuang1.size, ...style });
    },

    /**
     * 绘制对话框 珍惜
     */
    renderDialogZx (style = {}) {
      let dialogZx = this.dialogZx = document.createElement("div");
      this.root.appendChild(dialogZx);
      dialogZx.size = this.$CommonStyle.getCommonStyle(175, 161, 173, 38,this.$assets.scene2zx);
      JT.set(dialogZx, { ...dialogZx.size, ...style });
    },

    /**
     * 绘制对话框 吃喝
     */
    renderDialogChiHe (style = {}) {
      let dialogChiHe = this.dialogChiHe = document.createElement("div");
      this.root.appendChild(dialogChiHe);
      dialogChiHe.size = this.$CommonStyle.getCommonStyle(21, 229, 227, 39,this.$assets.scene2chihe);
      JT.set(dialogChiHe, { ...dialogChiHe.size, ...style });
    },

    /**
     * 绘制对话框 享受人生
     */
    renderDialogRenSheng (style = {}) {
      let dialogRenSheng = this.dialogRenSheng = document.createElement("div");
      this.root.appendChild(dialogRenSheng);
      dialogRenSheng.size = this.$CommonStyle.getCommonStyle(166, 285, 137, 25,this.$assets.scene2rensheng);
      JT.set(dialogRenSheng, { ...dialogRenSheng.size, ...style });
    },

    /**
     * 绘制对话框 心里搁
     */
    renderDialogXinLiGe (style = {}) {
      let dialogXinliGe = this.dialogXinliGe = document.createElement("div");
      this.root.appendChild(dialogXinliGe);
      dialogXinliGe.size = this.$CommonStyle.getCommonStyle(116, 328, 126, 30,this.$assets.scene2xinlige);
      JT.set(dialogXinliGe, { ...dialogXinliGe.size, ...style });
    },

    /**
     * 绘制对话框 税后收入
     */
    renderDialogShouRu (style = {}) {
      let dialogShouRu = this.dialogShouRu = document.createElement("div");
      this.root.appendChild(dialogShouRu);
      dialogShouRu.size = this.$CommonStyle.getCommonStyle(131, 372, 139, 30,this.$assets.scene2shuihoushouru);
      JT.set(dialogShouRu, { ...dialogShouRu.size, ...style });
    },

    /**
     *  酒杯手
     */
    renderDialogJiuBeiShou (style = {}) {
      let dialogJiuBeiShou = this.dialogJiuBeiShou = document.createElement("div");
      this.root.appendChild(dialogJiuBeiShou);
      dialogJiuBeiShou.size = this.$CommonStyle.getCommonStyle(68, 398, 97, 38,this.$assets.scene2jiupingshou);
      JT.set(dialogJiuBeiShou, { ...dialogJiuBeiShou.size, ...style });
    },

    /**
     *  液体容器
     */
    renderDialogYeTiRongqi (style = {}) {
      let dialogYeTiRongqi = this.dialogYeTiRongqi = document.createElement("div");
      this.root.appendChild(dialogYeTiRongqi);
      dialogYeTiRongqi.size = this.$CommonStyle.getCommonStyle(67, 420, 14, 54);
      JT.set(dialogYeTiRongqi, { ...dialogYeTiRongqi.size, ...style });

      /**
       *  酒杯液体
       */
      let dialogPiJiuYeTi = this.dialogPiJiuYeTi = document.createElement("div");
      dialogPiJiuYeTi.size = this.$CommonStyle.getCommonStyle(0, -54, 14, 54,this.$assets.scene2pijiuyeti);
      JT.set(dialogPiJiuYeTi, { ...dialogPiJiuYeTi.size, ...style });

      dialogYeTiRongqi.appendChild(dialogPiJiuYeTi)
    },

    /**
     *  啤酒容器
     */
    renderDialogPiJiuRongQi (style = {}) {
      let dialogPiJiuRongQi = this.dialogPiJiuRongQi = document.createElement("div");
      this.root.appendChild(dialogPiJiuRongQi);
      dialogPiJiuRongQi.size = this.$CommonStyle.getCommonStyle(56, 452, 35,35);
      JT.set(dialogPiJiuRongQi, { ...dialogPiJiuRongQi.size, ...style });

      /**
       *  啤酒
       */
      let dialogPiJiu = this.dialogPiJiu = document.createElement("div");
      dialogPiJiu.size = this.$CommonStyle.getCommonStyle(0,23,35, 45,this.$assets.scene2pijiu);
      JT.set(dialogPiJiu, { ...dialogPiJiu.size, ...style });

      dialogPiJiuRongQi.appendChild(dialogPiJiu)
    },

    /**
     *  底部啤酒容器
     */
    renderDialogBotJiuBeiRongQi (style = {}) {
      let dialogBotJiuBeiRongQi = this.dialogBotJiuBeiRongQi = document.createElement("div");
      this.root.appendChild(dialogBotJiuBeiRongQi);
      dialogBotJiuBeiRongQi.size = this.$CommonStyle.getCommonStyle(153, 533, 744, 79);
      JT.set(dialogBotJiuBeiRongQi, { ...dialogBotJiuBeiRongQi.size, ...style });

      /**
       *  啤酒
       */
      let dialogBotGiuBeiShou = this.dialogBotGiuBeiShou = document.createElement("div");
      dialogBotGiuBeiShou.size = this.$CommonStyle.getCommonStyle(0,80,43,79,this.$assets.scene2jiubeishou);
      JT.set(dialogBotGiuBeiShou, { ...dialogBotGiuBeiShou.size, ...style });

      dialogBotJiuBeiRongQi.appendChild(dialogBotGiuBeiShou)
    },

    /**
     * 绘制对话框 箭头
     */
    renderDialogJianTou (style = {}) {
      let dialogJianTou = this.dialogJianTou = document.createElement("div");
      this.root.appendChild(dialogJianTou);
      dialogJianTou.size = this.$CommonStyle.getCommonStyle('auto', 'auto', 24, 39,this.$assets.scenejiantou);
      JT.set(dialogJianTou, { ...dialogJianTou.size,left: '50%', marginLeft: this.$CommonStyle.px2rem(-12), position:'fixed', bottom: this.$CommonStyle.px2rem(23), ...style });
    },

  },
}
</script>
<style lang='less' scoped>
</style>
