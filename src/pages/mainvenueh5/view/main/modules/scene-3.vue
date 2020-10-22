<!-- 场景三 -->
<template>
  <section class='scene-page scene-3' :style="{backgroundImage:`url(${$assets.scene3bj})`}" v-touchmove="$parent.touchmove">
    <div class="scene-container" id="scene-3">
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
      this.root = document.getElementById('scene-3')
      this.renderTopRongQiYellow({ overflow: 'hidden', opacity: 0 })
      this.renderTopRongQi({ overflow: 'hidden' })
      this.renderChaoRen()
      this.renderTopRen()
      this.renderZuGeXian()
      this.renderBotRongQi({ overflow: 'hidden' })
      this.renderKuLian({ opacity: 1 })
      this.renderXiaoLian({ opacity: 0 })
      this.renderShouRu({ opacity: 0 })
      this.renderGanTan({ opacity: 0 })
      this.renderBotZhiQu({ opacity: 0 })
      this.renderBotBaoLei({ opacity: 0 })
      this.renderBotFeiCai({ opacity: 0 })
      this.renderPingMu({ opacity: 0 })
      this.renderBotText1()
      this.renderBotText2()
      this.renderBotText3()
      this.renderBotQiuZhu()
      this.renderBotRen({ opacity: 0 })
      this.renderBotDel1({ opacity: 0 })
      this.renderBotDel2({ opacity: 0 })
      this.renderBotDel3({ opacity: 0 })
      this.renderBotXiaoXi({ opacity: 0 })
      this.renderJianTou({ opacity: 0 })
      this.play(0);
    },
    play (timer) {
      this.JTLine.add("LINE", 0);
      this.JTLine
        .to(this.shouRu, 0.760, { opacity: 1, ease: JT.Linear.In }, "LINE+=0.800")
        .to(this.kuLian, 0.200, { opacity: 0, ease: JT.Linear.In }, "LINE+=2.250")
        .to(this.xiaoLian, 0.200, { opacity: 1, ease: JT.Linear.In }, "LINE+=2.250")
        .to(this.ganTan, 0.200, { opacity: 1, ease: JT.Cubic.InOut }, "LINE+=2.560")
        .to(this.ganTan, 0.780, { bezier: [{ top: this.$CommonStyle.px2rem(109 + 20), left: this.$CommonStyle.px2rem(239 - 20) }, { top: this.$CommonStyle.px2rem(109), left: this.$CommonStyle.px2rem(239) }], ease: JT.Cubic.InOut }, "LINE+=2.570")
        .to(this.topRongQi, 0.800, { opacity: 0, ease: JT.Linear.In }, "LINE+=2.800")
        .to(this.topRongQiYellow, 0.800, { opacity: 1, ease: JT.Linear.In }, "LINE+=2.800")
        .to(this.chaoRen, 0.500, { opacity: 1, ease: JT.Cubic.InOut }, "LINE+=3.400")
        .to(this.chaoRen, 1.560, { top: 0, left: this.$CommonStyle.px2rem(-150), ease: JT.Cubic.out }, "LINE+=3.500")
        .fromTo(this.botRongQi, 0.200, { opacity: 1 }, { onEnd: function () { }, opacity: 0, ease: JT.Linear.In }, "LINE+=4.800")
        .to(this.pingMu, 0.200, { opacity: 1, ease: JT.Linear.In }, "LINE+=4.800")
        .to(this.botRen, 0.200, { opacity: 1, ease: JT.Linear.In }, "LINE+=4.800")
        //        .to(this.botQiuZhu,0.200, { opacity: 1 ,ease: JT.Linear.In }, "LINE+=4.800")
        .fromTo(this.botQiuZhu, 0.200, { width: 0 }, { onEnd: function () { }, width: this.$CommonStyle.px2rem(77), ease: JT.Linear.in }, "LINE+=4.800")
        .fromTo(this.botText1, 1.000, { width: 0 }, { onEnd: function () { }, width: this.$CommonStyle.px2rem(159), ease: JT.Linear.in }, "LINE+=5.200")
        .fromTo(this.botText2, 1.000, { width: 0 }, { onEnd: function () { }, width: this.$CommonStyle.px2rem(159), ease: JT.Linear.in }, "LINE+=6.200")
        .fromTo(this.botText3, 1.000, { width: 0 }, { onEnd: function () { }, width: this.$CommonStyle.px2rem(159), ease: JT.Linear.in }, "LINE+=7.300")
        .to(this.botZhiQu, 0.400, { left: this.$CommonStyle.px2rem(224), opacity: 1, ease: JT.Cubic.InOut }, "LINE+=8.300")
        .to(this.botBaoLei, 0.400, { left: this.$CommonStyle.px2rem(224), opacity: 1, ease: JT.Cubic.InOut }, "LINE+=9.700")
        .to(this.botFeiCai, 0.400, { left: this.$CommonStyle.px2rem(224), opacity: 1, ease: JT.Cubic.InOut }, "LINE+=11.200")
        .to(this.botDel1, 0.200, { left: this.$CommonStyle.px2rem(275), opacity: 0.7, ease: JT.Cubic.In }, "LINE+=11.700")
        .to(this.botDel2, 0.200, { left: this.$CommonStyle.px2rem(275), opacity: 0.7, ease: JT.Cubic.In }, "LINE+=11.700")
        .to(this.botDel3, 0.200, { left: this.$CommonStyle.px2rem(275), opacity: 0.7, ease: JT.Cubic.In }, "LINE+=11.700")
        .to(this.botDel1, 0.200, { width: this.$CommonStyle.px2rem(47), height: this.$CommonStyle.px2rem(46), top: this.$CommonStyle.px2rem(356), left: this.$CommonStyle.px2rem(277), opacity: 1, ease: JT.Cubic.In }, "LINE+=12.200")
        .to(this.botDel2, 0.200, { width: this.$CommonStyle.px2rem(47), height: this.$CommonStyle.px2rem(46), top: this.$CommonStyle.px2rem(431), left: this.$CommonStyle.px2rem(277), opacity: 1, ease: JT.Cubic.In }, "LINE+=12.200")
        .to(this.botDel3, 0.200, { width: this.$CommonStyle.px2rem(47), height: this.$CommonStyle.px2rem(46), left: this.$CommonStyle.px2rem(277), opacity: 1, ease: JT.Cubic.In }, "LINE+=12.200")
        .to(this.botXiaoXi, 0.200, { opacity: 0.7, ease: JT.Cubic.InOut }, "LINE+=13.500")
        .to(this.botXiaoXi, 0.780, { opacity: 1, bezier: [{ top: this.$CommonStyle.px2rem(335) }, { top: this.$CommonStyle.px2rem(305) }] }, "LINE+=13.800")
        .to(this.jianTou, 0.200, { opacity: 1, ease: JT.Cubic.In }, "LINE+=14.400")
      this.JTLine.play(timer);
    },
    // 上面人
    renderTopRen (style = {}) {
      let topRen = this.topRen = document.createElement("div");
      this.root.appendChild(topRen);
      topRen.size = this.$CommonStyle.getCommonStyle(81, 116, 176, 166, this.$assets.scene3topren);
      JT.set(topRen, { ...topRen.size, ...style });
    },

    // 上步容器  蓝色
    renderTopRongQi (style = {}) {
      let topRongQi = this.topRongQi = document.createElement("div");
      this.root.appendChild(topRongQi);
      topRongQi.size = this.$CommonStyle.getCommonStyle(0, 0, 375, 255, this.$assets.scene3topbj);
      JT.set(topRongQi, { ...topRongQi.size, ...style });
    },
    // 上步容器  黄色
    renderTopRongQiYellow (style = {}) {
      let topRongQiYellow = this.topRongQiYellow = document.createElement("div");
      this.root.appendChild(topRongQiYellow);
      topRongQiYellow.size = this.$CommonStyle.getCommonStyle(0, 1, 375, 255);
      JT.set(topRongQiYellow, { ...topRongQiYellow.size, background: 'orange' });
    },
    // 下步容器
    renderBotRongQi (style = {}) {
      let botRongQi = this.botRongQi = document.createElement("div");
      this.root.appendChild(botRongQi);
      botRongQi.size = this.$CommonStyle.getCommonStyle(0, 265, 375, 402, this.$assets.scene3topbj);
      JT.set(botRongQi, { ...botRongQi.size, ...style });
    },
    // 横线
    renderZuGeXian (style = {}) {
      let zuGeXian = this.zuGeXian = document.createElement("div");
      this.root.appendChild(zuGeXian);
      zuGeXian.size = this.$CommonStyle.getCommonStyle(0, 253, 375, 10, this.$assets.scene3zugexian);
      JT.set(zuGeXian, { ...zuGeXian.size, ...style });
    },

    // 苦脸
    renderKuLian (style = {}) {
      let kuLian = this.kuLian = document.createElement("div");
      this.root.appendChild(kuLian);
      kuLian.size = this.$CommonStyle.getCommonStyle(182, 146, 44, 49, this.$assets.scene3kulian);
      JT.set(kuLian, { ...kuLian.size, ...style });
    },
    // 笑脸
    renderXiaoLian (style = {}) {
      let xiaoLian = this.xiaoLian = document.createElement("div");
      this.root.appendChild(xiaoLian);
      xiaoLian.size = this.$CommonStyle.getCommonStyle(182, 146, 44, 49, this.$assets.scene3xiaolian);
      JT.set(xiaoLian, { ...xiaoLian.size, ...style });
    },

    // 税后收入
    renderShouRu (style = {}) {
      let shouRu = this.shouRu = document.createElement("div");
      this.root.appendChild(shouRu);
      shouRu.size = this.$CommonStyle.getCommonStyle(13, 94, 162, 50, this.$assets.scene3shouru);
      JT.set(shouRu, { ...shouRu.size, ...style });
    },

    // 感叹
    renderGanTan (style = {}) {
      let ganTan = this.ganTan = document.createElement("div");
      this.root.appendChild(ganTan);
      ganTan.size = this.$CommonStyle.getCommonStyle(259, 84, 29, 58, this.$assets.scene3gantan);
      JT.set(ganTan, { ...ganTan.size, ...style });
    },

    // 超人
    renderChaoRen (style = {}) {
      let chaoRen = this.chaoRen = document.createElement("div");
      this.root.appendChild(chaoRen);
      chaoRen.size = this.$CommonStyle.getCommonStyle(447, 182, 143, 155, this.$assets.scene3chaoren);
      JT.set(chaoRen, { ...chaoRen.size, ...style });
    },

    // 电脑桌
    renderPingMu (style = {}) {
      let pingMu = this.pingMu = document.createElement("div");
      this.root.appendChild(pingMu);
      pingMu.size = this.$CommonStyle.getCommonStyle(28, 379, 205, 191, this.$assets.scene3pingmu);
      JT.set(pingMu, { ...pingMu.size, ...style });
    },

    // 底部人
    renderBotRen (style = {}) {
      let botRen = this.botRen = document.createElement("div");
      this.root.appendChild(botRen);
      botRen.size = this.$CommonStyle.getCommonStyle(10, 455, 179, 146, this.$assets.scene3botren);
      JT.set(botRen, { ...botRen.size, ...style });
    },

    // 文字1
    renderBotText1 (style = {}) {
      let botText1 = this.botText1 = document.createElement("div");
      this.root.appendChild(botText1);
      botText1.size = this.$CommonStyle.getCommonStyle(46, 424, 0, 17, this.$assets.scene3Text1);
      JT.set(botText1, { ...botText1.size, backgroundPosition: `0 0`, backgroundSize: `${this.$CommonStyle.px2rem(159)} ${this.$CommonStyle.px2rem(16)}`, ...style });
    },

    // 文字2
    renderBotText2 (style = {}) {
      let botText2 = this.botText2 = document.createElement("div");
      this.root.appendChild(botText2);
      botText2.size = this.$CommonStyle.getCommonStyle(46, 445, 0, 17, this.$assets.scene3Text2);
      JT.set(botText2, { ...botText2.size, backgroundPosition: `0 0`, backgroundSize: `${this.$CommonStyle.px2rem(159)} ${this.$CommonStyle.px2rem(16)}`, ...style });
    },

    // 文字3
    renderBotText3 (style = {}) {
      let botText3 = this.botText3 = document.createElement("div");
      this.root.appendChild(botText3);
      botText3.size = this.$CommonStyle.getCommonStyle(46, 462, 0, 17, this.$assets.scene3Text3);
      JT.set(botText3, { ...botText3.size, backgroundPosition: `0 0`, backgroundSize: `${this.$CommonStyle.px2rem(159)} ${this.$CommonStyle.px2rem(16)}`, ...style });
    },

    // 底部求助
    renderBotQiuZhu (style = {}) {
      let botQiuZhu = this.botQiuZhu = document.createElement("div");
      this.root.appendChild(botQiuZhu);
      botQiuZhu.size = this.$CommonStyle.getCommonStyle(87, 395, 0, 24, this.$assets.scene3qiuzhu);
      JT.set(botQiuZhu, { ...botQiuZhu.size, backgroundPosition: `0 0`, backgroundSize: `${this.$CommonStyle.px2rem(77)} ${this.$CommonStyle.px2rem(20)}`, ...style });
    },

    // 提前支取
    renderBotZhiQu (style = {}) {
      let botZhiQu = this.botZhiQu = document.createElement("div");
      this.root.appendChild(botZhiQu);
      botZhiQu.size = this.$CommonStyle.getCommonStyle(393, 346, 141, 72, this.$assets.scene3zhuqu);
      JT.set(botZhiQu, { ...botZhiQu.size, ...style });
    },

    // 暴雷
    renderBotBaoLei (style = {}) {
      let botBaoLei = this.botBaoLei = document.createElement("div");
      this.root.appendChild(botBaoLei);
      botBaoLei.size = this.$CommonStyle.getCommonStyle(349, 422, 141, 72, this.$assets.scene3baolei);
      JT.set(botBaoLei, { ...botBaoLei.size, ...style });
    },

    // 匪菜
    renderBotFeiCai (style = {}) {
      let botFeiCai = this.botFeiCai = document.createElement("div");
      this.root.appendChild(botFeiCai);
      botFeiCai.size = this.$CommonStyle.getCommonStyle(393, 496, 141, 72, this.$assets.scene3feicai);
      JT.set(botFeiCai, { ...botFeiCai.size, ...style });
    },

    // 删除按钮1
    renderBotDel1 (style = {}) {
      let botDel1 = this.botDel1 = document.createElement("div");
      this.root.appendChild(botDel1);
      botDel1.size = this.$CommonStyle.getCommonStyle(393, 366, 141, 138, this.$assets.scene3del1);
      JT.set(botDel1, { ...botDel1.size, ...style });
    },

    // 删除按钮2
    renderBotDel2 (style = {}) {
      let botDel2 = this.botDel2 = document.createElement("div");
      this.root.appendChild(botDel2);
      botDel2.size = this.$CommonStyle.getCommonStyle(393, 439, 141, 138, this.$assets.scene3del2);
      JT.set(botDel2, { ...botDel2.size, ...style });
    },

    // 删除按钮3
    renderBotDel3 (style = {}) {
      let botDel3 = this.botDel3 = document.createElement("div");
      this.root.appendChild(botDel3);
      botDel3.size = this.$CommonStyle.getCommonStyle(393, 506, 141, 138, this.$assets.scene3del3);
      JT.set(botDel3, { ...botDel3.size, ...style });
    },

    // 消息
    renderBotXiaoXi (style = {}) {
      let botXiaoXi = this.botXiaoXi = document.createElement("div");
      this.root.appendChild(botXiaoXi);
      botXiaoXi.size = this.$CommonStyle.getCommonStyle(50, 305, 122, 75, this.$assets.scene3xiaoxi);
      JT.set(botXiaoXi, { ...botXiaoXi.size, ...style });
    },

    /**
     * 绘制对话框 箭头
     */
    renderJianTou (style = {}) {
      let jianTou = this.jianTou = document.createElement("div");
      this.root.appendChild(jianTou);
      jianTou.size = this.$CommonStyle.getCommonStyle('auto', 'auto', 24, 39, this.$assets.scenejiantou);
      JT.set(jianTou, { ...jianTou.size, ...style, left: '50%', marginLeft: this.$CommonStyle.px2rem(-12), position: 'fixed', bottom: this.$CommonStyle.px2rem(23) });
    },
  },
}
</script>
<style lang='less' scoped>
.scene-3 {
  background-repeat: repeat;
  background-size: 100%;
}
</style>
