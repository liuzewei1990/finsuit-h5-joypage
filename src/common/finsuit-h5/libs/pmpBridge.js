
import wx from "weixin-js-sdk";
/**
 * 对weixin-js-sdk的二次封装
 */
export default {

    async gotoPage (options) {
        // 链接为小程序原生地址，地址必须以/开头 代表小程序原生地址 例如：/pages/xxx/xxx?a=1&b=2
        if (this.$utils.isPMPUrl(options.url)) {
            options.url = options.url.replace("pmp:", "");
            // 小程序tabbar页面
            if ((/^\/pages\/index\/index/.test(options.url) || /^\/pages\/my\/my/.test(options.url))) this.$pmpBridge.switchTab({ url: options.url });
            // 是否使用redirectTo跳转，预留判断
            else if (options.closeThis == "1") this.$pmpBridge.redirectTo({ url: options.url });
            // 小程序非tabbar页面
            else this.$pmpBridge.navigateTo({ url: options.url });
        } else {
            // 不是在小程序环境中
            if (await this.$pmpBridge.isWeChatMiniApp() === false) {
                window.location.href = options.url;
                return;
            }
            // 检测半链接
            options.url = this.$utils.mergeUrlHost(options.url);

            /******************兼容鹏飞那链接中没有参数的情况split报错问题，后续删掉****************** */
            let tmpQuery = this.$utils.getQueryStr(options.url);
            tmpQuery["a"] = "1"; //手动添加一个参数 不让那边报错
            options.url = options.url.split("?")[0] + this.$utils.createQueryStr(tmpQuery, "?");
            /******************兼容鹏飞那链接中没有参数的情况split报错问题，后续删掉****************** */

            // 是在小程序环境中
            if (options.closeThis == "1") this.$pmpBridge.redirectTo({ url: `/pages/activities/activities?link=${escape(options.url)}` });
            else this.$pmpBridge.navigateTo({ url: `/pages/activities/activities?link=${escape(options.url)}` });
        }
    },

    /**
     * 检测为小程序环境
     */
    isWeChatMiniApp () {
        const ua = window.navigator.userAgent.toLowerCase();
        return new Promise((resolve) => {
            if (ua.indexOf('micromessenger') == -1) {
                // 不在微信或者小程序中
                resolve(false);
            } else {
                wx.miniProgram.getEnv((res) => {
                    if (res.miniprogram) {
                        // 在小程序中
                        resolve(true);
                    } else {
                        //在微信中
                        resolve(false);
                    }
                });
            }
        });
    },

    navigateTo (options) {
        wx.miniProgram.navigateTo(options);
    },
    switchTab (options) {
        wx.miniProgram.switchTab(options);
    },
    redirectTo (options) {
        wx.miniProgram.redirectTo(options);
    },

}