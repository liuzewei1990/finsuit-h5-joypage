

import utils from "./utils.js"
export default {
    install: Vue => {
        // xxxx-xx-xx xx:xx:xx 转 xxxx-xx-xx
        Vue.filter("toDate", (v) => {
            if (!v) return "- -";
            v += "";
            return v.slice(0, 10);
        });

        /**
         * 显示消息时间为 几天前 几小时前 几分钟前；同时一年以上的日期直接显示YYY：MM：DD形式
         */
        Vue.filter('dateTimeToRelativeTime', function (dateTimeStamp) {
            dateTimeStamp += "";
            // 时间字符串转时间戳 兼容ios
            var timestamp = new Date(dateTimeStamp.replace(/-/g, '/')).getTime();
            return utils.timeago(timestamp, "Y年M月D日");
        });

        /**
         * 格式化日期格式
         * dateTimeStamp：日期
         * params：格式 Y年M月D日 h:m:s'
         */
        Vue.filter('formatTime', function (dateTimeStamp, params) {
            dateTimeStamp += "";
            // 时间字符串转时间戳 兼容ios
            var timestamp = new Date(dateTimeStamp.replace(/-/g, '/')).getTime();
            return utils.formatTime(timestamp / 1000, params);
        })


        /**
         * 利率格式化三位小数
         * 注意：该方式存在精度问题
         */
        Vue.filter('rateToFixed', function (rate) {
            let a = Number(rate);
            if (a) return a.toFixed(3);
            else return rate;
        })
    }
}
