

import wx from "weixin-js-sdk";
import http from '@common/finsuit-http/index.js'
import * as store from "@common/finsuit-store/index.js"
import browser from "@common/finsuit-h5/libs/browser.js"
import defaultMaskComponent from "@common/finsuit-components/WxShare/defaultMask.vue"
import Vue from "vue"

/**
 * 微信二次分享
 * shareConfigJson 与 app内通用json一致 详情了解app的分享配置json信息。
 * @param {*} shareConfigJson
 */

export default class WxShare {
    constructor(options = {}) {
        let defaultOptinons = {
            // 生成签名url
            signUrl: this.getBaseUrl(),
            // 分享配置
            shareConfigJson: []
        }

        this.options = { ...defaultOptinons, ...options };

        // 遮罩组件实例
        this.maskInstance = null;

        // 微信sdk
        this.wx = wx;

        // 微信签名
        this.wxParam = null;


        if (this.options.shareConfigJson.length > 0) {
            this.registerShare(this.options.shareConfigJson);
        }

    }

    async initwxParam () {

        let params = { POSTFIXURL: this.options.signUrl };
        let head = {};
        let baseUrl = process.env.NODE_ENV === "development" ? "https://finsuit.bicai365.com" : (window.location.protocol + '//' + window.location.host);
        // 获取微信分享签名
        let data = await http.post(baseUrl, "/finsuit/finsuitPhone/deal", "GET_WEIXIN_SIGN", params, head, false, false);

        this.wxParam = data.wxParam;

        this.wx.config({
            debug: false,
            appId: this.wxParam.appId,
            timestamp: this.wxParam.timestamp,
            nonceStr: this.wxParam.nonceStr,
            signature: this.wxParam.signature,
            jsApiList: ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone', 'hideMenuItems', 'showMenuItems', 'hideAllNonBaseMenuItem', 'showAllNonBaseMenuItem', 'translateVoice', 'startRecord', 'stopRecord', 'onVoiceRecordEnd', 'playVoice', 'onVoicePlayEnd', 'pauseVoice', 'stopVoice', 'uploadVoice', 'downloadVoice', 'chooseImage', 'previewImage', 'uploadImage', 'downloadImage', 'getNetworkType', 'openLocation', 'getLocation', 'hideOptionMenu', 'showOptionMenu', 'closeWindow', 'scanQRCode', 'chooseWXPay', 'openProductSpecificView', 'addCard', 'chooseCard', 'openCard']
        });

    }


    async registerShare (shareConfigJson = []) {
        if (!(browser.BROWSER_NAME === '微信浏览器' || browser.BROWSER_NAME === 'qq内置浏览器')) return;

        if (!(this.wx && this.wxParam)) await this.initwxParam();

        this.wx.ready(() => {

            let shareConfig = this.filterShareConfig(shareConfigJson);

            // 若没有配置分享icon 则使用默认icon
            if (!shareConfig["SHARE_HEAD_IMG"]) {
                shareConfig["SHARE_HEAD_IMG"] = this.defaultShareIcon();
            }

            if (!shareConfig.SHARE_TITLE) {
                console.error("请配置站外微信分享标题！");
                return;
            }
            if (!shareConfig.SHARE_DESC) {
                console.error("请配置站外微信分享描述！");
                return;
            }
            if (!shareConfig.SHARE_URL) {
                console.error("请配置站外微信分享链接！");
                return;
            }
            if (!shareConfig.SHARE_HEAD_IMG) {
                console.error("请配置站外微信分享图标！");
                return;
            }

            shareConfig.SUCCESS = shareConfig.SUCCESS || function () { }
            shareConfig.CANCEL = shareConfig.CANCEL || function () { }

            // 分享给朋友
            this.wx.onMenuShareAppMessage({
                title: shareConfig.SHARE_TITLE,
                desc: shareConfig.SHARE_DESC,
                link: shareConfig.SHARE_URL,
                imgUrl: shareConfig.SHARE_HEAD_IMG,
                type: "link",
                success: shareConfig.SUCCESS,
                cancel: shareConfig.CANCEL
            });

            // 分享到朋友圈
            this.wx.onMenuShareTimeline({
                title: shareConfig.SHARE_TITLE,
                link: shareConfig.SHARE_URL,
                imgUrl: shareConfig.SHARE_HEAD_IMG,
                success: shareConfig.SUCCESS,
                cancel: shareConfig.CANCEL
            });

            console.info("微信分享配置信息:", shareConfig);
        });
    }

    filterShareConfig (shareConfigJson) {
        let item = {};
        // 返回通用json中的分享链接配置对象
        for (let index = 0; index < shareConfigJson.length; index++) {
            const element = shareConfigJson[index];
            if (element.SHARE_TYPE == "1") item = element;
        }
        return item;
    }

    defaultShareIcon () {
        let icons = {
            "PC": "https://finsuit.bicai365.com/fhc/pic/pincai.png",
            "BC": "https://finsuit.bicai365.com/fhc/pic/bicai.png"
        }
        return icons[store.state.FROM_APP_FLAG];
    }

    getBaseUrl () {
        let url = window.location.href;
        let item_url = url.split("#")[0];
        return encodeURIComponent(item_url);
    }

    showMask (component, targetMountDom) {
        // 创建默认遮罩
        this._createDefaultMask(targetMountDom);

        this.maskInstance.$props.show = true;

        if (!component) return;

        let ComponentConstructor = Vue.extend(component);
        let componentInstance = new ComponentConstructor();
        this.maskInstance.$nextTick(() => {
            componentInstance.$mount("#wxShare");
        })
    }

    _createDefaultMask (targetMountDom) {
        if (this.maskInstance) return;
        let targetDom = targetMountDom || document.body;
        let MaskComponentConstructor = Vue.extend(defaultMaskComponent);
        this.maskInstance = new MaskComponentConstructor({
            el: document.createElement("div"),
        });
        targetDom.appendChild(this.maskInstance.$el);
    }

}



