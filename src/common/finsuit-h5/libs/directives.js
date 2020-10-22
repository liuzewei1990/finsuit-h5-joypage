export default {
    install: Vue => {

        /**
         * 解决微信ios中input失去焦点不回弹问题
         * v-wxBlur
         */
        Vue.directive('wxBlur', {
            inserted: function (el) {

                // 获取微信版本号
                function getWxVersion () {
                    var wechatInfo = navigator.userAgent.match(/MicroMessenger\/([\d\.]+)/i);
                    if (wechatInfo && wechatInfo instanceof Array && wechatInfo.length > 1) {
                        let wxVersion = wechatInfo[1];
                        return wxVersion;
                    }
                }

                // 微信版本号对比
                function isVersion (v1, v2) {
                    if (typeof v1 !== "string" || typeof v2 !== "string") return false;
                    var vs = [v1, v2].map(function (v) {
                        return v
                            .split(".")
                            .map(function (n) {
                                return ("00000" + n).slice(-5);
                            })
                            .join("");
                    });
                    return vs[0] > vs[1];
                }

                var isiOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
                // 解决微信浏览器ios版本 6.7.4版本以上出现的input失去焦点后不回弹的bug
                if (isiOS && isVersion(getWxVersion(), "6.7.3")) {
                    let $el = el.tagName == "INPUT" ? el : el.querySelector("input");
                    $el.onblur = function () {
                        setTimeout(function () {
                            var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
                            window.scrollTo(0, Math.max(scrollHeight - 1, 0));
                        }, 100)
                    }
                }
            }
        })

    }
}
