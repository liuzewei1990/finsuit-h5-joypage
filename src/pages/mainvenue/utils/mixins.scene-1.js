
/**
 * 待开启
 */

export default {

    methods: {

        /**
           * 初始化场景一舞台 前场景
           */
        initStageOneBefore () {
            this.stage = document.getElementById("container");

            if (this.$store.state.APP_FLAG === "PC" || this.$store.state.APP_FLAG === "BC") {
                this.renderXin();
                this.renderjz();
                this.renderjzArc();
                this.renderTitle();
                this.renderPerson();
                this.renderTableRed();
                this.renderArc();
                this.renderBox();
                this.renderShareBtns2();
                this.renderfudai({ y: this.$px2rem(611) });
                /**
                 * 动画
                 */
                this.StageOneAnimate(0);
            } else {
                this.renderXin();
                this.renderjz();
                this.renderjzArc();
                this.renderTitle();
                this.renderPerson();
                this.renderTableRed();
                this.renderArc();
                this.renderBox();
                this.renderfudai({ y: this.$px2rem(611) });
                /**
                 * 动画
                 */
                this.StageOneAnimate(0);
            }
        },

        /**
         * 初始化场景一舞台 后场景
         */
        initStageOneAfter () {
            this.stage = document.getElementById("container");

            if (this.$store.state.APP_FLAG === "PC" || this.$store.state.APP_FLAG === "BC") {
                this.renderXin();
                this.renderjz();
                this.renderjzArc();
                this.renderTitle();
                this.renderPerson({ top: this.$px2rem(290) });
                this.renderTableRed({ opacity: 1 });
                this.renderfudai({ y: this.$px2rem(0) });

                // 显示分享按钮
                this.renderShareBtns2();
                JT.to(this.shareBtnsContainer, 0, { opacity: 1, left: 0 });
            } else {
                this.renderXin();
                this.renderjz();
                this.renderjzArc();
                this.renderTitle();
                this.renderPerson({ top: this.$px2rem(290) });
                this.renderTableRed({ opacity: 1 });
                this.renderfudai({ y: this.$px2rem(0) });
            }
        },

        /**
         * 场景一舞台动画时间轴
         */
        StageOneAnimate (timer = 0) {
            this.TweenLine.add("TIME_LINE", 1.200);
            // 玻璃遮罩
            /**
             * 前景出场时间线点位
             */
            // 玻璃罩罩
            this.TweenLine.to(this.box2, 1.070 * this.TweenLineScale, { top: this.$px2rem(-150), ease: JT.Cubic.In }, "TIME_LINE+=0")
            this.TweenLine.to(this.box2, 1.070 * this.TweenLineScale, { onEnd: removeDom, opacity: 0, ease: JT.Sine.In }, "TIME_LINE+=0")
            this.TweenLine.to(this.box3, 1.050 * this.TweenLineScale, { onEnd: removeDom, top: this.$px2rem(600), opacity: 0, ease: JT.Cubic.In }, "TIME_LINE+=0.040")
            this.TweenLine.to(this.box1, 1.060 * this.TweenLineScale, { onEnd: removeDom, top: this.$px2rem(-128.5), opacity: 0, ease: JT.Cubic.InOut }, "TIME_LINE+=1.020")

            // 人物组
            this.TweenLine.to(this.personContainer, 1.020 * this.TweenLineScale, { top: this.$px2rem(290), ease: JT.Cubic.InOut }, "TIME_LINE+=1.021")

            // 底部椭圆
            this.TweenLine.to(this.arcContainer, 1.090 * this.TweenLineScale, { onEnd: removeDom, opacity: 0, ease: JT.Linear.In }, "TIME_LINE+=1.800")

            // 福袋出现 --- 最后一个元素出现记录已读标记
            this.TweenLine.to(this.fudaiContainer, 1.800 * this.TweenLineScale, { onEnd: () => { this.$localStore("set", { key: "is_open", value: JSON.stringify({ isRead: "1", isOpen: "0" }) }); }, y: this.$px2rem(0), ease: JT.Cubic.Out }, "TIME_LINE+=2.000")

            // 桌面红包
            this.TweenLine.to(this.tableRedContainer, 0.950 * this.TweenLineScale, { opacity: 1, ease: JT.Linear.In }, "TIME_LINE+=2.870")

            // 顶部分享按钮组 只有APP内才执行动画针
            if (this.$store.state.APP_FLAG === "PC" || this.$store.state.APP_FLAG === "BC") {
                this.TweenLine.fromTo(this.shareBtnsContainer, 1.160 * this.TweenLineScale, { left: 0, }, { onEnd: function () { }, left: 0, opacity: 1, ease: JT.Linear.InOut }, "TIME_LINE+=1.920")
            }

            // 按钮缩放
            this.TweenLine.to(this.fudaiBtn, 0.650 * this.TweenLineScale, { scale: 1.2, repeat: -1, yoyo: true, ease: JT.Linear.In }, "TIME_LINE+=4")

            this.TweenLine.play(timer);

            function removeDom () {
                this.target.remove();
            }
        }
    }
}