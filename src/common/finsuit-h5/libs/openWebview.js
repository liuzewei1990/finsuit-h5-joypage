
/**
 * H5打开新的H5页面
 * @param {Str} url 目标地址
 * @param {Str} title 标题
 * @param {Str} needLogin 打开页面之前是否需要强制登录，“1”： 强制登录，不传或者传"0", 为正常打开。 默认不用传
 * @param {Str} closeThis 是否关闭当前的webview, 1：关闭 不传或者传0，为正常打开，默认不用传
 * 【url支持的地址】
 * 1、H5半链接：/llz/xxx/xxx/xxx?a=2
 * 2、H5全链接：https://baidu.com/xxx/xxx/xx/
 * 3、小程序地址：pmp:/pages/xxx/xxx?a=1
 * 4、原生App地址: besharp://finsuit/applink?pjsonkey=Base64({...}) 
 * 【title】
 * 仅原生支持
 * 【needLogin】
 * 原生支持、小程序支持、H5支持
 * 【closeThis】
 * 仅原生支持、小程序支持
 */

export default function (url = "", title = "", needLogin = "", closeThis = "") {

    let options = { url: "", title: "", needLogin: "0", closeThis: "0" };

    // url地址
    if (url) options["url"] = url;

    // 页面标题，只对App内有效
    if (title) options["title"] = title;

    // 链接中包含 needLogin 代表强制登陆
    if (/needLogin=1/.test(url) || needLogin == "1") options["needLogin"] = "1";

    // 链接中包含 closeThis 代表重定向
    if (/closeThis=1/.test(url) || closeThis == "1") options["closeThis"] = "1";

    console.debug(`调用this.$openWebview(${JSON.stringify(options)})`);



    if (!options.url) {
        this.$showTips({ message: "链接地址为空", position: "bottom", duration: 1000, pointerEventsNone: true });
        return;
    }

    // 1、小程序内跳转
    else if (this.$store.state.APP_FLAG === "PMP") {
        if (options.needLogin == "1") this.$checkLogin({ action: this.$pmpBridge.gotoPage.bind(this), data: options });
        else this.$pmpBridge.gotoPage.call(this, options);
    }

    // 2、原生App跳转
    else if (this.$store.state.APP_FLAG === "BC" || this.$store.state.APP_FLAG === "PC") {
        if (this.$utils.isPMPUrl(options.url)) {
            this.$Toast("注意：该地址仅支持在小程序内打开");
            return;
        }
        // 半链接或全连接
        options.url = this.$utils.mergeUrlHost(options.url);
        let data = { H5_URL: options.url, TITLE: options.title, NEED_LOGIN: options.needLogin, CLOSE_THIS: options.closeThis };

        /***************由于原生的Webview区分普通H5和产品详情页专用，这里区分出链接是否为H5产品详情页的地址，兼容处理**************** */
        if (/&_k=1/.test(data.H5_URL)) {
            this.$bcBridge.gotoPrdDetailH5Page(data);
        } else {
            this.$bcBridge.gotoSecondaryH5Page(data);
        }
        /***************由于原生的Webview区分普通H5和产品详情页专用，这里区分出链接是否为H5产品详情页的地址，兼容处理**************** */
    }

    // 3、H5跳转
    else {
        if (this.$utils.isPMPUrl(options.url)) {
            this.$Toast("注意：该地址仅支持在小程序内打开");
            return;
        }
        if (options.needLogin == "1") this.$checkLogin({ action: this.$h5Bridge.gotoPage.bind(this), data: options });
        else this.$h5Bridge.gotoPage.call(this, options);
    }

}