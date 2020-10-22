
export default {
    data () {
        return {
            shareCallBack: null,
            show: false,
            // 按钮列表
            btns: [],
            clickItem: {},
            shareBtnLoading: this.$Loading(),
            // 小程序默认首页地址
            defaultPMPPath: "pages/index/index?source=" + this.$store.state.APP_FLAG + '&rand=' + Math.random() * 10,
            // 小程序重定向地址
            redirectPMPPath: "pages/activities/activities?link="
        }
    },
    methods: {
        open (shareJson = [], shareCallBack = () => { }) {
            console.debug("🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊\n", "【分享组件配置信息】\n", shareJson);
            this.btns = shareJson.slice(0, 10);
            if (this.btns.length === 0) {
                this.$Toast("请配置分享btn");
                return;
            }
            // 显示popup
            this.show = true;
            // 缓存回调函数
            this.shareCallBack = shareCallBack;
            // window注册方法，等待App分享成功调用
            window.sharedResult = this.sharedResult;
        },

        close () {
            this.show = false;
        },

        /**
         * 分享按钮点击
         */
        clickShare (item) {

            // 分享方式 0:图片   1:链接  2: 小程序
            let SHARE_TYPE = item.SHARE_TYPE;
            // 分享渠道 0:分享给朋友  1:分享到朋友圈  2:QQ  3:QQ空间
            let SHARE_PLACE = item.SHARE_PLACE;

            // 分享icon,当为链接时右边图标,App暂时不支持
            let SHARE_HEAD_IMG = "";
            // 分享标题
            let SHARE_TITLE = item.SHARE_TITLE;
            // 分享描述
            let SHARE_DESC = item.SHARE_DESC;
            // 分享链接
            let SHARE_URL = item.SHARE_URL;
            // 分享的图片地址或者小程序封面图
            let SHARE_IMAGE = item.SHARE_IMAGE;

            // 分享按钮点击回调
            let btnType = this.SHARE_PLACE_TYPE[SHARE_PLACE];
            this.$emit("clickShareBtn", item, btnType);

            // 缓存点击item,分享成功后回调参数
            this.clickItem = item;

            // 当前按钮是否需要自行调用原生方法，可通过clickShareBtn事件监听点击回调
            if (item.returnBtn === true) return;

            //   if (this.shareBtnLoading.isShow) return;
            //   this.shareBtnLoading.show();
            // 判断分享方式 图片 || 链接 || 小程序

            switch (SHARE_TYPE) {
                case "0": case 0:
                    this.shareImageTo(SHARE_PLACE, SHARE_IMAGE);
                    break;
                case "1": case 1:
                    this.shareLinkTo(SHARE_PLACE, SHARE_TITLE, SHARE_DESC, SHARE_URL);
                    break;
                case "2": case 2:
                    this.sharePmpTo(SHARE_PLACE, 0, SHARE_TITLE, SHARE_DESC, SHARE_URL, SHARE_IMAGE);
                    break;
                default:
                    this.$Toast("其他分享方式");
            }

            //   this.shareBtnLoading.close(1000);

        },

        /**
         * 分享图片类型到 指定渠道
         */
        async shareImageTo (SHARE_PLACE = 0, SHARE_IMAGE) {
            try {
                let imgUrl = SHARE_IMAGE.indexOf('data:image') > -1 ? SHARE_IMAGE : this.$transfromAliyunUrl(SHARE_IMAGE);
                let maxImgBase64 = await this.$utils.toBase64(imgUrl);
                let minImgBase64 = await this.$utils.toBase64(imgUrl, 10);
                let img = maxImgBase64.split("base64,")[1];
                let thumb = minImgBase64.split("base64,")[1];
                let params = {};
                params["type"] = Number(SHARE_PLACE) + 1;
                params["img"] = window.android ? maxImgBase64 : img;
                params["thumb"] = window.android ? maxImgBase64 : thumb;
                this.$bcBridge.h5ShareImage(params);
            } catch (error) {
                console.error(error);
                this.$Toast("请检查图片地址是否有效");
            }
        },

        /**
         * 分享链接到 指定渠道
         */
        async shareLinkTo (SHARE_PLACE = 0, SHARE_TITLE = "分享标题", SHARE_DESC = "分享描述", SHARE_URL = "") {
            try {
                let params = {};
                params["share_type"] = Number(SHARE_PLACE) + 1;
                params["share_title"] = SHARE_TITLE;
                params["share_msg"] = SHARE_DESC;
                params["share_url"] = SHARE_URL;
                // params["icon"] = URL; // 小程序的base64
                this.$bcBridge.h5Share(params);
            } catch (error) {
                console.error(error);
                this.$Toast("请检查链接配置信息");
            }
        },
        /**
         * 分享小程序到 指定渠道
         */
        async sharePmpTo (SHARE_PLACE = 0, type = 0, SHARE_TITLE = "拼财小程序", SHARE_DESC = "赞小钱，干大事", SHARE_URL = "", SHARE_IMAGE = "") {
            try {
                let imgUrl = SHARE_IMAGE.indexOf('data:image') > -1 ? SHARE_IMAGE : this.$transfromAliyunUrl(SHARE_IMAGE); // 分享小程序banner是半链接
                let maxImgBase64 = await this.$utils.toBase64(imgUrl, 2); // 尺寸除以2 否则图片过大
                let minImgBase64 = await this.$utils.toBase64(imgUrl, 10);
                let img = maxImgBase64.split("base64,")[1];
                let thumb = minImgBase64.split("base64,")[1];
                // 如果配置了活动地址，使用小程序重定向path+活动地址,没有配置则使用小程序首页path
                let path = SHARE_URL ? this.redirectPMPPath + escape(SHARE_URL) : this.defaultPMPPath;
                let params = {
                    share_type: Number(SHARE_PLACE) + 1,
                    type: type,
                    url: window.location.href,
                    user_name: "gh_2f5c0c78f880",
                    path: path,
                    title: SHARE_TITLE,
                    description: SHARE_DESC,
                    img: img,
                    thumb: window.android ? img : thumb // 缩略图
                };
                this.$bcBridge.h5ShareWXProgram(params);
            } catch (error) {
                console.error(error);
                this.$Toast("请检查小程序封面图是否有效");
            }
        },

        // 分享回调 APP调用
        sharedResult (res) {
            this.show = false;
            window.sharedResult = null;
            this.shareCallBack(this.clickItem);
            this.$emit("shareSuccess", this.clickItem);
        }
    }
}