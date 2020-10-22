
import { Base64 } from 'js-base64'
import wx from "weixin-js-sdk";

/**
 * 原型方法：登录和按钮拦截器
 */
export default {

    /**
     * 登录方法
     */
    login: function () {
        return new Promise((resolve, reject) => {
            // App端 调用原生登录
            if (this.$store.state.APP_FLAG === "PC" || this.$store.state.APP_FLAG === "BC") {
                this.$bcBridge.goLogin();
                window.loginResult = (argument) => {
                    const userInfo = JSON.parse(Base64.decode(argument));
                    this.$store.commit("USER_LOGIN", userInfo);
                    resolve(userInfo);
                }
                window.loginCanceled = () => {
                    // this.$Toast("已取消");
                    reject();
                }
            } else if (this.$store.state.APP_FLAG === "PMP") {
                // 小程序端： Toast提示,2秒后返回小程序首页
                this.$Toast("请先登录");
                setTimeout(() => {
                    console.log('wx.miniProgram.switchTab({ url: "/pages/index/index" })');
                    wx.miniProgram.switchTab({ url: "/pages/index/index" });
                }, 2000);
            } else if (this.$store.state.APP_FLAG === "OUT_SIDE") {
                // 站外端：唤起H5登录框
                this.$h5Login(resolve, reject);
            } else {
                this.$downloadApp();
            }
        })
    },

    /**
     * 检查是否登录，未登录先登录，登录成功执行回调
     * @param {Obj} target 拦截续函数和data
     * @param {Bol} isCallback 登录成功是否执行回调
     */
    checkLogin: function (target = {}, isCallback = true) {
        const action = target.action;
        const data = target.data;
        if (this.$store.getters.isLogin) {
            action(data);
        } else {
            this.$login().then(() => {
                isCallback && action(data);
            });
        }
    },

    /**
     * app内更新store用户信息
     * 适用于webview缓存页面时重新向原生拉取用户信息 【主动触发】
     */
    sendLoginResult: function (callBack) {
        window.loginResult = window.unloginResult = (argument) => {
            const userInfo = JSON.parse(Base64.decode(argument));
            // console.debug("🎙用🎙户🎙信🎙息🎙更🎙新🎙完🎙成🎙");
            this.$store.commit("USER_LOGIN", userInfo);
            callBack && callBack();
        }
        this.$bcBridge.sendLoginResult();
    },

    /**
     * app内更新store用户信息
     * 适用于webview缓存页面时重新向原生拉取用户信息 【被动触发，比如：拼财App首页,当返回时会主动 触发loginResult || unloginResult方法】
     */
    listenLoginResult: function (callBack) {
        window.loginResult = window.unloginResult = (argument) => {
            const userInfo = JSON.parse(Base64.decode(argument));
            // console.debug("🎙用🎙户🎙信🎙息🎙更🎙新🎙完🎙成🎙");
            this.$store.commit("USER_LOGIN", userInfo);
            callBack && callBack();
        }
    }
}