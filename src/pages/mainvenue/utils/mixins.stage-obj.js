

/**
 * 舞台对象 Mixins
 */

export default {

    methods: {

        getCommonStyle (x, y, w, h, img = false) {
            let style = {}
            style["position"] = "absolute";
            style["left"] = this.$px2rem(x);
            style["top"] = this.$px2rem(y);
            style["width"] = this.$px2rem(w);
            style["height"] = this.$px2rem(h);

            if (img === false) return style;
            style["backgroundImage"] = `url(${img})`;
            style["backgroundRepeat"] = "no-repeat";
            style["backgroundSize"] = "cover";
            style["backgroundPosition"] = "center center";
            return style;
        },

        /**
         * 绘制底部椭圆
         */
        renderArc (style = {}) {
            let arcContainer = this.arcContainer = document.createElement("div");
            this.stage.appendChild(arcContainer);
            arcContainer.size = this.getCommonStyle((750 - 1111) / 2, 761, 1111, 952);
            JT.set(arcContainer, { ...arcContainer.size, ...style });

            let jb = document.createElement("div");
            jb.size = this.getCommonStyle((1111 - 614) / 2, 240, 614, 73, this.assets.jb);
            JT.set(jb, { ...jb.size });

            let arc = document.createElement("div");
            arc.size = this.getCommonStyle(0, 0, 1111, 952, this.assets.arc);
            JT.set(arc, { ...arc.size });

            arcContainer.appendChild(arc);
            arcContainer.appendChild(jb);

        },

        /**
         * 绘制玻璃宝盖
         */
        renderBox () {

            let container = this.container = document.createElement("div");
            this.stage.appendChild(container);
            container.size = this.getCommonStyle(0, 533, 750, 0);
            JT.set(container, { ...container.size });

            let box3 = this.box3 = document.createElement("div");
            box3.size = this.getCommonStyle((750 - 485) / 2, 268, 485, 225, this.assets.box3);
            box3.addEventListener("click", this.start, false);
            JT.set(box3, { ...box3.size });

            let box1 = this.box1 = document.createElement("div");
            box1.size = this.getCommonStyle((750 - 326) / 2, 100, 326, 239, this.assets.box1);
            box1.addEventListener("click", this.start, false);
            JT.set(box1, { ...box1.size });

            let box2 = this.box2 = document.createElement("div");
            box2.size = this.getCommonStyle((750 - 345) / 2, 0, 339, 349, this.assets.box2);
            box2.addEventListener("click", this.start, false);
            JT.set(box2, { ...box2.size });

            container.appendChild(box3);
            container.appendChild(box1);
            container.appendChild(box2);

        },

        /**
         * 绘制人物
         */
        renderPerson (style = {}) {
            let personContainer = this.personContainer = document.createElement("div");
            this.stage.appendChild(personContainer);
            personContainer.size = this.getCommonStyle(0, 504, 750, 0);
            JT.set(personContainer, { ...personContainer.size, ...style });

            let person1 = this.person1 = document.createElement("div");
            person1.size = this.getCommonStyle(-30, 0, 232, 388, this.assets.person1);
            JT.set(person1, { ...person1.size });

            let person2 = this.person2 = document.createElement("div");
            person2.size = this.getCommonStyle(570, 0, 256, 381, this.assets.person2);
            JT.set(person2, { ...person2.size });

            personContainer.appendChild(person1);
            personContainer.appendChild(person2);

        },

        /**
         * 绘制标题
         */
        renderTitle () {
            let container = this.container = document.createElement("div");
            this.stage.appendChild(container);
            container.size = this.getCommonStyle(0, 0, 750, 0);
            JT.set(container, { ...container.size });

            let minTitle1 = this.minTitle1 = document.createElement("div");
            minTitle1.size = this.getCommonStyle((750 - 349) / 2, 72, 349, 36, this.assets.minTitle1);
            JT.set(minTitle1, { ...minTitle1.size });

            let mainTitle = this.mainTitle = document.createElement("div");
            mainTitle.size = this.getCommonStyle((750 - 600) / 2, 98, 600, 184, this.assets.mainTitle);
            JT.set(mainTitle, { ...mainTitle.size });

            let minTitle2 = this.minTitle2 = document.createElement("div");
            minTitle2.size = this.getCommonStyle((750 - 514) / 2, 241, 514, 135, this.assets.minTitle2);
            JT.set(minTitle2, { ...minTitle2.size });

            container.appendChild(minTitle1);
            container.appendChild(mainTitle);
            container.appendChild(minTitle2);

        },

        /**
         * 绘制纸币
         */
        renderXin () {
            let container = this.container = document.createElement("div");
            this.stage.appendChild(container);
            container.size = this.getCommonStyle(37, 79, 636, 694, this.assets.xin);
            JT.set(container, { ...container.size });

        },

        /**
         * 绘制Swiper
         */
        renderSwiper () {
            let swiperContainer = this.swiperContainer = document.createElement("div");
            let mountContainer = document.createElement("div");
            mountContainer.id = "swiper-container";
            swiperContainer.style.zIndex = "10";
            swiperContainer.appendChild(mountContainer);
            this.stage.appendChild(swiperContainer);
            swiperContainer.size = this.getCommonStyle((750 - 1177) / 2, 480, 1177, 490);
            JT.set(swiperContainer, {
                ...swiperContainer.size,
                y: 600
                // border: "1px solid red"
            });

        },

        /**
         * 绘制楼房背景
         */
        renderjz () {
            let jzContainer = this.jzContainer = document.createElement("div");
            this.stage.appendChild(jzContainer);
            jzContainer.size = this.getCommonStyle((750 - 816) / 2, 332, 816, 501, this.assets.jz);
            JT.set(jzContainer, {
                ...jzContainer.size,
                opacity: 0,
            });
        },

        /**
         * 绘制椭圆背景
         */
        renderjzArc () {

            let jzArcContainer = this.jzArcContainer = document.createElement("div");
            this.stage.appendChild(jzArcContainer);
            jzArcContainer.size = this.getCommonStyle((750 - 1111 * 1.5) / 2, 552, 1111 * 1.5, 952 * 1.5);
            JT.set(jzArcContainer, {
                ...jzArcContainer.size,
                opacity: 0,
            });

            let jb = document.createElement("div");
            jb.size = this.getCommonStyle((1111 * 1.5 - 614) / 2, 380, 614, 73, this.assets.jb);
            JT.set(jb, { ...jb.size });

            let arc = document.createElement("div");
            arc.size = this.getCommonStyle(0, 0, 1111 * 1.5, 952 * 1.5, this.assets.arc);
            JT.set(arc, { ...arc.size });

            jzArcContainer.appendChild(arc);
            jzArcContainer.appendChild(jb);

        },

        /**
         * 绘制底部活动投资按钮和领券按钮
         */
        renderActionBtns () {
            let scale = 1;
            let footerBtnsContainer = this.footerBtnsContainer = document.createElement("div");
            // this.stage.appendChild(footerBtnsContainer);
            document.getElementById("out-container").appendChild(footerBtnsContainer);
            // footerBtnsContainer.size = this.getCommonStyle((750 - 1181 * scale) / 2, 1501, 1181 * scale, 205 * scale, this.assets.btnsBj);
            footerBtnsContainer.size = this.getCommonStyle("auto", "auto", 1181 * scale, 205 * scale, this.assets.btnsBj);
            JT.set(footerBtnsContainer, {
                ...footerBtnsContainer.size,
                bottom: this.$px2rem(-611),
                left: "50%",
                marginLeft: this.$px2rem(-(1181 * scale / 2))
            });

            let touziBtn = this.touziBtn = document.createElement("a");
            touziBtn.addEventListener("click", this.touziBtnClick, false);
            touziBtn.size = this.getCommonStyle(120 + (1181 * scale - 750) / 2, 0, 215, 195, this.assets.touzi);
            JT.set(touziBtn, { ...touziBtn.size });

            let conponBtn = this.conponBtn = document.createElement("a");
            conponBtn.addEventListener("click", this.couponBtnClick, false);
            conponBtn.size = this.getCommonStyle(415 + (1181 * scale - 750) / 2, 0, 215, 195, this.assets.lingquan);
            JT.set(conponBtn, { ...conponBtn.size });

            footerBtnsContainer.appendChild(touziBtn);
            footerBtnsContainer.appendChild(conponBtn);
        },

        /**
         * 绘制头部分享按钮和攻略按钮组
         */

        renderShareBtns () {
            let shareBtnsContainer = this.shareBtnsContainer = document.createElement("div");
            this.stage.appendChild(shareBtnsContainer);
            shareBtnsContainer.size = this.getCommonStyle(1000, 25, 750, 0);
            JT.set(shareBtnsContainer, {
                ...shareBtnsContainer.size,
                opacity: 0
            });

            // 攻略按钮
            let ruleBtn = this.ruleBtn = document.createElement("a");
            ruleBtn.addEventListener("click", this.ruleBtnClick, false);
            ruleBtn.size = this.getCommonStyle(750 - 90, 0, 120, 50, this.assets.ruleBtn);
            shareBtnsContainer.appendChild(ruleBtn);
            JT.set(ruleBtn, { ...ruleBtn.size });

            if (this.$store.state.APP_FLAG === "PC" || this.$store.state.APP_FLAG === "BC") {
                // 分享按钮
                let shareBtn = this.shareBtn = document.createElement("a");
                shareBtn.addEventListener("click", this.shareBtnClick, false);
                shareBtn.size = this.getCommonStyle(750 - 90, 69, 120, 50, this.assets.shareBtn);
                shareBtnsContainer.appendChild(shareBtn);
                JT.set(shareBtn, { ...shareBtn.size });
            }

        },

        /**
         * 绘制头部分享按钮和攻略按钮组
         */

        renderShareBtns2 (style = {}) {
            let shareBtnsContainer = this.shareBtnsContainer = document.createElement("div");
            this.stage.appendChild(shareBtnsContainer);
            shareBtnsContainer.size = this.getCommonStyle(1000, 25, 750, 0);
            JT.set(shareBtnsContainer, {
                ...shareBtnsContainer.size,
                opacity: 0,
                ...style
            });

            // 分享按钮
            let shareBtn = this.shareBtn = document.createElement("a");
            shareBtn.addEventListener("click", this.shareBtnClick, false);
            shareBtn.size = this.getCommonStyle(750 - 90, 0, 120, 50, this.assets.shareBtn);
            shareBtnsContainer.appendChild(shareBtn);
            JT.set(shareBtn, { ...shareBtn.size });
        },

        /**
         * 绘制桌面和红包
         */
        renderTableRed (style = {}) {
            let tableRedContainer = this.tableRedContainer = document.createElement("div");
            this.stage.appendChild(tableRedContainer);
            tableRedContainer.size = this.getCommonStyle(0, 420, 750, 0);
            JT.set(tableRedContainer, {
                ...tableRedContainer.size,
                opacity: 0,
                ...style
            });

            let table = this.table = document.createElement("div");
            table.size = this.getCommonStyle(0, 155, 750, 49, this.assets.table);
            tableRedContainer.appendChild(table);
            JT.set(table, {
                ...table.size,
                backgroundSize: "contain",
                backgroundPosition: "center top",
            });

            let tablebj = this.tablebj = document.createElement("div");
            tablebj.size = this.getCommonStyle(0, 155 + 49, 750, 870);
            tableRedContainer.appendChild(tablebj);
            JT.set(tablebj, {
                ...tablebj.size,
                background: `-webkit-linear-gradient(to bottom,#ef8f5d,#ee4d34 50% )`,
                background: `linear-gradient(to bottom,#ef8f5d,#ee4d34 70% )`,
            });

            let tableRed = this.tableRed = document.createElement("div");
            tableRed.size = this.getCommonStyle((750 - 545) / 2 + 10, 0, 545, 211, this.assets.red);
            tableRedContainer.appendChild(tableRed);
            JT.set(tableRed, { ...tableRed.size });
        },

        /**
         * 绘制福袋
         */
        renderfudai (style = {}) {
            let fudaiContainer = this.fudaiContainer = document.createElement("div");
            document.getElementById("out-container").appendChild(fudaiContainer);
            fudaiContainer.size = this.getCommonStyle("auto", "auto", 750, 611);
            JT.set(fudaiContainer, {
                ...fudaiContainer.size,
                y: this.$px2rem(0),
                x: 0,
                left: "50%",
                bottom: 0,
                marginLeft: this.$px2rem(-375),
                ...style
            });

            let fudai = this.fudai = document.createElement("div");
            fudai.size = this.getCommonStyle(0, 0, 750, 611, this.assets.fudai);
            fudaiContainer.appendChild(fudai);
            JT.set(fudai, {
                ...fudai.size
            });


            let fudaiText = this.fudaiText = document.createElement("div");
            fudaiText.size = this.getCommonStyle((750 - 208) / 2, 140, 208, 105, this.assets.text);
            fudaiContainer.appendChild(fudaiText);
            JT.set(fudaiText, {
                ...fudaiText.size
            });

            let fudaiBtn = this.fudaiBtn = document.createElement("a");
            fudaiBtn.size = this.getCommonStyle((750 - 338) / 2, 280, 338, 80, this.assets.btn);
            fudaiBtn.addEventListener("click", this.fudaiBtnClick, false);
            fudaiContainer.appendChild(fudaiBtn);
            JT.set(fudaiBtn, {
                ...fudaiBtn.size,
                scale: 1
            });
        },

    }
}