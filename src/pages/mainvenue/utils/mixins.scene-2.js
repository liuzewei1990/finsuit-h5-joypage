

/**
 * 已开启
 */

export default {



    methods: {

        /**
         * 初始化场景二舞台 -- 前景
         */
        initStageTwoBefore () {
            this.stage = document.getElementById("container");

            if (this.$store.state.APP_FLAG === "PC" || this.$store.state.APP_FLAG === "BC") {
                this.renderXin();
                this.renderjz();
                this.renderjzArc();
                this.renderTitle();
                this.renderPerson();
                this.renderArc();
                this.renderBox();
                this.renderActionBtns();
                this.renderSwiper();
                // app内有分享对象
                this.renderShareBtns();

                this.$mountSwiper("#swiper-container");
                this.StageTwoAnimate(0);
            } else {
                this.renderXin();
                this.renderjz();
                this.renderjzArc();
                this.renderTitle();
                this.renderPerson();
                this.renderArc();
                this.renderBox();
                this.renderActionBtns();
                this.renderSwiper();
                this.renderShareBtns();

                this.$mountSwiper("#swiper-container");
                this.StageTwoAnimate(0);
            }
        },

        /**
         * 初始化场景二舞台 -- 后景
         */
        initStageTwoAfter () {
            this.stage = document.getElementById("container");

            if (this.$store.state.APP_FLAG === "PC" || this.$store.state.APP_FLAG === "BC") {
                this.renderXin();
                this.renderjz();
                this.renderjzArc();
                this.renderTitle();
                //   this.renderPerson();
                //   this.renderArc();
                //   this.renderBox();
                this.renderActionBtns();
                this.renderSwiper();
                this.renderShareBtns();

                this.$mountSwiper("#swiper-container");

                this.StageTwoAnimate(1.200 + 1.900);
            } else {
                this.renderXin();
                this.renderjz();
                this.renderjzArc();
                this.renderTitle();
                //   this.renderPerson();
                //   this.renderArc();
                //   this.renderBox();
                this.renderActionBtns();
                this.renderSwiper();
                this.renderShareBtns();

                this.$mountSwiper("#swiper-container");

                this.StageTwoAnimate(1.200 + 1.900);
            }

        },

        /**
         * 场景二舞台动画时间轴
         */
        StageTwoAnimate (timer = 0) {
            this.TweenLine.add("TIME_LINE", 1.200);
            /**
             * 前景出场时间线点位
             */
            // 玻璃罩罩
            this.TweenLine.to(this.box2, 1.070 * this.TweenLineScale, { top: this.$px2rem(-150), ease: JT.Cubic.In }, "TIME_LINE+=0")
            this.TweenLine.to(this.box2, 1.070 * this.TweenLineScale, { onEnd: removeDom, opacity: 0, ease: JT.Sine.In }, "TIME_LINE+=0")
            this.TweenLine.to(this.box3, 1.050 * this.TweenLineScale, { onEnd: removeDom, top: this.$px2rem(600), opacity: 0, ease: JT.Cubic.In }, "TIME_LINE+=0.040")
            this.TweenLine.to(this.box1, 1.060 * this.TweenLineScale, { onEnd: removeDom, top: this.$px2rem(-128.5), opacity: 0, ease: JT.Cubic.In }, "TIME_LINE+=1.020")
            // 人物组
            this.TweenLine.to(this.personContainer, 0.250 * this.TweenLineScale, { onEnd: removeDom, opacity: 0, ease: JT.Linear.In }, "TIME_LINE+=1.890")
            // 底部椭圆
            this.TweenLine.to(this.arcContainer, 0.250 * this.TweenLineScale, { onEnd: removeDom, opacity: 0, ease: JT.Linear.In }, "TIME_LINE+=1.890")
            /**
             * 后景入场时间线点位
             */
            // 底部按钮
            this.TweenLine.to(this.footerBtnsContainer, 1.170 * this.TweenLineScale, { onEnd: function () { }, bottom: this.$px2rem(0), ease: JT.Cubic.Out }, "TIME_LINE+=1.900")
            // 建筑背景
            this.TweenLine.to(this.jzContainer, 0.920 * this.TweenLineScale, { onEnd: function () { }, opacity: 1, ease: JT.Quad.In }, "TIME_LINE+=1.920")
            // 建筑椭圆背景
            this.TweenLine.to(this.jzArcContainer, 1.060 * this.TweenLineScale, { onEnd: function () { }, opacity: 1, ease: JT.Quad.In }, "TIME_LINE+=1.920")
            // 顶部分享按钮组
            this.TweenLine.fromTo(this.shareBtnsContainer, 1.160 * this.TweenLineScale, { left: 0, }, { onEnd: function () { }, left: 0, opacity: 1, ease: JT.Linear.InOut }, "TIME_LINE+=1.920")
            // swiper  --- 最后一个元素出现记录已读标记
            this.TweenLine.to(this.swiperContainer, 1.800 * this.TweenLineScale, { onEnd: () => { this.$localStore("set", { key: "is_open", value: JSON.stringify({ isRead: "1", isOpen: "1" }) }); }, y: 0, ease: JT.Cubic.Out }, "TIME_LINE+=2")

            this.TweenLine.play(timer);

            function removeDom () {
                this.target.remove();
            }
        },

    }
}