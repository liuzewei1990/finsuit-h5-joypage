<!-- 场景一 -->
<template>
  <section class='scene-page scene-1' :style="{backgroundImage:`url(${$assets.scene1bj})`}" v-touchmove="$parent.touchmove">
    <div class="scene-container" id="scene-1"></div>
  </section>
</template>

<script>
import Preload from "@common/finsuit-plugins/preload.js"
export default {
  components: {},
  data () {
    return {
      JTLine: JTL.create()
    };
  },
  created () {
  },
  mounted () {
    this.init();
  },
  //方法集合
  methods: {
    init () {
      this.root = document.getElementById("scene-1");
      this.renderEle();
      this.renderjzArc();
      this.play();
    },
    play () {
      this.JTLine.add("LINE", 0);
      this.JTLine.to(this.yp, 0.880, { bezier: [{ top: this.$CommonStyle.px2rem(293 + 60) }, { top: this.$CommonStyle.px2rem(293) }], ease: JT.Quad.Out }, "LINE+=0.070");
      this.JTLine.to(this.yp1, 0.880, { bezier: [{ top: this.$CommonStyle.px2rem(276 + 60) }, { top: this.$CommonStyle.px2rem(276) }], ease: JT.Quad.Out }, "LINE+=0.130");
      this.JTLine.to(this.bl, 0.880, { bezier: [{ top: this.$CommonStyle.px2rem(224 + 60) }, { top: this.$CommonStyle.px2rem(224) }], ease: JT.Quad.Out }, "LINE+=0.490");
      this.JTLine.to(this.nf, 0.880, { bezier: [{ top: this.$CommonStyle.px2rem(92 + 60) }, { top: this.$CommonStyle.px2rem(92) }], ease: JT.Quad.Out }, "LINE+=0.550");
      this.JTLine.to(this.yw, 0.880, { bezier: [{ top: this.$CommonStyle.px2rem(237 + 60) }, { top: this.$CommonStyle.px2rem(237) }], ease: JT.Quad.Out }, "LINE+=0.670");
      this.JTLine.to(this.ys, 0.880, { bezier: [{ top: this.$CommonStyle.px2rem(222 + 60) }, { top: this.$CommonStyle.px2rem(222) }], ease: JT.Quad.Out }, "LINE+=0.780");
      this.JTLine.to(this.ys1, 0.880, { bezier: [{ top: this.$CommonStyle.px2rem(178 + 60) }, { top: this.$CommonStyle.px2rem(178) }], ease: JT.Quad.Out }, "LINE+=0.740");
      this.JTLine.to(this.fang, 0.880, { bezier: [{ top: this.$CommonStyle.px2rem(168 + 60) }, { top: this.$CommonStyle.px2rem(168) }], ease: JT.Quad.Out }, "LINE+=0.810");
      this.JTLine.to(this.ka, 0.880, { bezier: [{ top: this.$CommonStyle.px2rem(227 + 60) }, { top: this.$CommonStyle.px2rem(227) }], ease: JT.Quad.Out }, "LINE+=0.930");
      this.JTLine.to(this.yzwj, 0.880, { bezier: [{ top: this.$CommonStyle.px2rem(108 + 60) }, { top: this.$CommonStyle.px2rem(108) }], ease: JT.Quad.Out }, "LINE+=1.020");
      this.JTLine.to(this.qc, 0.880, { bezier: [{ top: this.$CommonStyle.px2rem(130 + 60) }, { top: this.$CommonStyle.px2rem(130) }], ease: JT.Quad.Out }, "LINE+=1.080");
      this.JTLine.to(this.nfs, 0.880, { bezier: [{ top: this.$CommonStyle.px2rem(40 + 30) }, { top: this.$CommonStyle.px2rem(40) }], ease: JT.Quad.Out }, "LINE+=1.210");
      this.JTLine.to(this.qyt, 0.880, { bezier: [{ top: this.$CommonStyle.px2rem(135 + 60) }, { top: this.$CommonStyle.px2rem(135) }], ease: JT.Quad.Out }, "LINE+=1.210");
      this.JTLine.to(this.qy, 0.880, { bezier: [{ top: this.$CommonStyle.px2rem(160 + 60) }, { top: this.$CommonStyle.px2rem(160) }], ease: JT.Quad.Out }, "LINE+=1.240");
      this.JTLine.to(this.zp2, 0.880, { bezier: [{ top: this.$CommonStyle.px2rem(71 + 60) }, { top: this.$CommonStyle.px2rem(71) }], ease: JT.Quad.Out }, "LINE+=1.390");
      this.JTLine.to(this.ka1, 0.880, { bezier: [{ top: this.$CommonStyle.px2rem(78 + 60) }, { top: this.$CommonStyle.px2rem(78) }], ease: JT.Quad.Out }, "LINE+=1.430");
      this.JTLine.to(this.zp1, 0.880, { bezier: [{ top: this.$CommonStyle.px2rem(33 + 60) }, { top: this.$CommonStyle.px2rem(33) }], ease: JT.Quad.Out }, "LINE+=1.550");
      this.JTLine.to(this.zp, 0.880, { bezier: [{ top: this.$CommonStyle.px2rem(0 + 30) }, { top: this.$CommonStyle.px2rem(0) }], ease: JT.Quad.Out }, "LINE+=1.720");
      this.JTLine.to(this.text, 0.940, { opacity: 1, ease: JT.Cubic.In }, "LINE+=2.140");
      this.JTLine.to(this.xy, 0.860, { opacity: 1, ease: JT.Cubic.In }, "LINE+=2.610");
      this.JTLine.to(this.tddg, 0.880, { opacity: 1, ease: JT.Cubic.In }, "LINE+=3.040");
      this.JTLine.to(this.text1, 0.880, { opacity: 1, ease: JT.Cubic.In }, "LINE+=3.380");
      this.JTLine.to(this.jiantou, 0.200, { opacity: 1, ease: JT.Cubic.In }, "LINE+=4.590");
      this.JTLine.play(0);
    },

    // 幻想元素
    renderjzArc () {

      let jzArcContainer = this.jzArcContainer = document.createElement("div");
      this.root.appendChild(jzArcContainer);
      jzArcContainer.size = this.$CommonStyle.getCommonStyle(0, 0, 750, 0);
      JT.set(jzArcContainer, { ...jzArcContainer.size });

      // 药瓶
      let yp = this.yp = document.createElement("div");
      yp.size = this.$CommonStyle.getCommonStyle(217, -150, 30, 29, this.$assets.yp);
      JT.set(yp, { ...yp.size });

      // 药瓶2
      let yp1 = this.yp1 = document.createElement("div");
      yp1.size = this.$CommonStyle.getCommonStyle(108, -150, 27, 22, this.$assets.yp1);
      JT.set(yp1, { ...yp1.size });

      // 病例
      let bl = this.bl = document.createElement("div");
      bl.size = this.$CommonStyle.getCommonStyle(191, -150, 59, 64, this.$assets.bl);
      JT.set(bl, { ...bl.size });

      // 奶粉
      let nf = this.nf = document.createElement("div");
      nf.size = this.$CommonStyle.getCommonStyle(2, -150, 96, 65, this.$assets.nf);
      JT.set(nf, { ...nf.size });

      // 药丸
      let yw = this.yw = document.createElement("div");
      yw.size = this.$CommonStyle.getCommonStyle(255, -150, 23, 31, this.$assets.yw);
      JT.set(yw, { ...yw.size });

      // 钥匙
      let ys = this.ys = document.createElement("div");
      ys.size = this.$CommonStyle.getCommonStyle(154, -150, 30, 43, this.$assets.ys);
      JT.set(ys, { ...ys.size });

      // 钥匙2
      let ys1 = this.ys1 = document.createElement("div");
      ys1.size = this.$CommonStyle.getCommonStyle(53, -150, 20, 37, this.$assets.ys1);
      JT.set(ys1, { ...ys1.size });

      // 房
      let fang = this.fang = document.createElement("div");
      fang.size = this.$CommonStyle.getCommonStyle(62, -150, 105, 81, this.$assets.fang);
      JT.set(fang, { ...fang.size });

      // 卡
      let ka = this.ka = document.createElement("div");
      ka.size = this.$CommonStyle.getCommonStyle(78, -150, 43, 38, this.$assets.ka);
      JT.set(ka, { ...ka.size });

      // 鸭子玩具
      let yzwj = this.yzwj = document.createElement("div");
      yzwj.size = this.$CommonStyle.getCommonStyle(87, -150, 44, 50, this.$assets.yzwj);
      JT.set(yzwj, { ...yzwj.size });

      // 汽车
      let qc = this.qc = document.createElement("div");
      qc.size = this.$CommonStyle.getCommonStyle(160, -200, 165, 108, this.$assets.qc);
      JT.set(qc, { ...qc.size });

      // 奶粉勺
      let nfs = this.nfs = document.createElement("div");
      nfs.size = this.$CommonStyle.getCommonStyle(67, -150, 31, 53, this.$assets.nfs);
      JT.set(nfs, { ...nfs.size });

      // 汽油桶
      let qyt = this.qyt = document.createElement("div");
      qyt.size = this.$CommonStyle.getCommonStyle(310, -150, 65, 51, this.$assets.qyt);
      JT.set(qyt, { ...qyt.size });

      // 汽油桶
      let qy = this.qy = document.createElement("div");
      qy.size = this.$CommonStyle.getCommonStyle(293, -150, 31, 49, this.$assets.qy);
      JT.set(qy, { ...qy.size });

      // 纸片3
      let zp2 = this.zp2 = document.createElement("div");
      zp2.size = this.$CommonStyle.getCommonStyle(122, -150, 38, 70, this.$assets.zp2);
      JT.set(zp2, { ...zp2.size });

      // 卡1
      let ka1 = this.ka1 = document.createElement("div");
      ka1.size = this.$CommonStyle.getCommonStyle(253, -150, 45, 32, this.$assets.ka1);
      JT.set(ka1, { ...ka1.size });

      // 纸片1
      let zp1 = this.zp1 = document.createElement("div");
      zp1.size = this.$CommonStyle.getCommonStyle(159, -150, 112, 68, this.$assets.zp1);
      JT.set(zp1, { ...zp1.size });
      // 纸片2
      let zp = this.zp = document.createElement("div");
      zp.size = this.$CommonStyle.getCommonStyle(147, -150, 28, 64, this.$assets.zp);
      JT.set(zp, { ...zp.size });

      jzArcContainer.appendChild(yp);
      jzArcContainer.appendChild(yp1);
      jzArcContainer.appendChild(bl);
      jzArcContainer.appendChild(nf);
      jzArcContainer.appendChild(yw);
      jzArcContainer.appendChild(ys);
      jzArcContainer.appendChild(ys1);
      jzArcContainer.appendChild(fang);
      jzArcContainer.appendChild(ka);
      jzArcContainer.appendChild(yzwj);
      jzArcContainer.appendChild(qc);
      jzArcContainer.appendChild(nfs);
      jzArcContainer.appendChild(qyt);
      jzArcContainer.appendChild(qy);
      jzArcContainer.appendChild(zp2);
      jzArcContainer.appendChild(ka1);
      jzArcContainer.appendChild(zp1);
      jzArcContainer.appendChild(zp);
    },


    renderEle () {

      // 背景光
      let guang = this.guang = document.createElement("div");
      this.root.appendChild(guang);
      guang.size = this.$CommonStyle.getCommonStyle(0, 26, 371, 331, this.$assets.guang);
      JT.set(guang, { ...guang.size });

      // 人物
      let rw = this.rw = document.createElement("div");
      this.root.appendChild(rw);
      rw.size = this.$CommonStyle.getCommonStyle(0, 286, 237, 306, this.$assets.rw);
      JT.set(rw, { ...rw.size });

      // 台灯
      let td = this.td = document.createElement("div");
      this.root.appendChild(td);
      td.size = this.$CommonStyle.getCommonStyle(305, 246, 67, 198, this.$assets.td);
      JT.set(td, { ...td.size });

      // 文字
      let text = this.text = document.createElement("div");
      this.root.appendChild(text);
      text.size = this.$CommonStyle.getCommonStyle(80, 455, 62, 52, this.$assets.text);
      JT.set(text, { ...text.size, opacity: 0 });

      // 烟灰缸
      let yhg = this.yhg = document.createElement("div");
      this.root.appendChild(yhg);
      yhg.size = this.$CommonStyle.getCommonStyle(6, 469, 64, 39, this.$assets.yhg);
      JT.set(yhg, { ...yhg.size });

      // 香烟
      let xy = this.xy = document.createElement("div");
      this.root.appendChild(xy);
      xy.size = this.$CommonStyle.getCommonStyle(6, 468, 33, 22, this.$assets.xy);
      JT.set(xy, { ...xy.size, opacity: 0 });

      // 台灯灯光
      let tddg = this.tddg = document.createElement("div");
      this.root.appendChild(tddg);
      tddg.size = this.$CommonStyle.getCommonStyle(230, 274, 142, 198, this.$assets.tddg);
      JT.set(tddg, { ...tddg.size, opacity: 0 });

      // 相框
      let xk = this.xk = document.createElement("div");
      this.root.appendChild(xk);
      xk.size = this.$CommonStyle.getCommonStyle(267, 389, 74, 69, this.$assets.xk);
      JT.set(xk, { ...xk.size });

      // 霸王洗发水
      let bw = this.bw = document.createElement("div");
      this.root.appendChild(bw);
      bw.size = this.$CommonStyle.getCommonStyle(251, 346, 30, 58, this.$assets.bw);
      JT.set(bw, { ...bw.size });

      // 手写文字
      let text1 = this.text1 = document.createElement("div");
      this.root.appendChild(text1);
      text1.size = this.$CommonStyle.getCommonStyle(139, 472, 222, 94, this.$assets.text1);
      JT.set(text1, { ...text1.size, opacity: 0 });

      // 箭头
      let jiantou = this.jiantou = document.createElement("div");
      this.root.appendChild(jiantou);
      jiantou.size = this.$CommonStyle.getCommonStyle('auto', 'auto', 24, 39, this.$assets.scenejiantou);
      JT.set(jiantou, { ...jiantou.size, left: '50%', marginLeft: this.$CommonStyle.px2rem(-12), position: 'fixed', bottom: this.$CommonStyle.px2rem(23), opacity: 0 });
    }
  },
}
</script>
<style lang='less' scoped>
</style>
