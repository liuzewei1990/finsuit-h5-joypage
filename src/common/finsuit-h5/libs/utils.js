export default {
    isPc () {
        let userAgentInfo = navigator.userAgent,
            flag = true,
            Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];

        for (let v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = false;
                break;
            }
        }
        return flag;
    },

    oSnow () {
        var agent = navigator.userAgent.toLowerCase();
        var isMac = /macintosh|mac os x/i.test(navigator.userAgent);
        if (agent.indexOf("win32") >= 0 || agent.indexOf("wow32") >= 0) {
            return "win32";
        }
        if (agent.indexOf("win64") >= 0 || agent.indexOf("wow64") >= 0) {
            return "win64";

        }
        if (isMac) {
            return "mac";
        }
    },

    /**
     * 获取url字符串参数
     * 注意：此方法为vue hash模式特定方法，不适用其他渠道，是解决兼容微信分享链接中取参错误的问题?from=singlemessage&isappinstalled=0
     */
    getQueryStr (urls = "") {
        let url = urls || (window.location.href.split("#")[1] || window.location.href);
        url = decodeURIComponent(url);
        let result = {};
        let arr = url.split("?");
        let params = arr[1] && arr[1].split("&");
        if (!params) return result;
        for (let i = 0; i < params.length; i++) {
            let item = params[i].split("=");
            item[0] = decodeURIComponent(item[0]);
            item[1] = decodeURIComponent(item[1]);
            result[item[0]] = item[1];
        }
        return result;
    },

    /**
     * 将json转换为url参数
     * @param {Object} queryObj 参数对象
     * @param {String} symbol 起始符号
     */
    createQueryStr (queryObj = {}, symbol = "") {
        let queryStr = "";
        if (!this.isObject(queryObj)) return queryStr;

        queryStr += symbol;
        for (const key in queryObj) {
            let item = queryObj[key];
            item && (queryStr += `${key}=${item}&`);
        }
        queryStr = queryStr.substring(0, queryStr.length - 1);
        return queryStr;
    },

    /**
     * 修改url参数值，若没有该参数则添加
     * @param {*} url url地址
     * @param {*} arg 参数名
     * @param {*} arg_val 新参数值
     */
    changeURLArg (url, arg, arg_val) {
        let pattern = arg + '=([^&]*)';
        let replaceText = arg + '=' + arg_val;
        if (url.match(pattern)) {
            let reg = new RegExp('(' + arg + '=)([^&]*)', "gi");
            return url.replace(reg, replaceText);
        } else {
            if (url.match('[\?]')) {
                return url + '&' + replaceText;
            } else {
                return url + '?' + replaceText;
            }
        }
    },

    /**
     * 获取浏览器类型和版本
     */
    userAgent () {
        var Sys = {};
        var ua = navigator.userAgent.toLowerCase();
        var re = /(msie|firefox|chrome|opera|version|safari).*?([\d.]+)/;
        var m = ua.match(re);
        if (!m) {
            return "其他浏览器";
        }
        Sys.browser = m[1].replace(/version/, "'safari");
        Sys.ver = m[2];
        return Sys;
    },
    /**
     * 图片转base64
     * @param {Str} src url
     * @param {Num} scale 缩放比例
     */
    toBase64 (src, scale = 1) {
        if (!src) return;
        return new Promise((resolve, reject) => {
            let img = document.createElement("img");
            let canvas = document.createElement("canvas");
            let ctx = canvas.getContext("2d");
            img.setAttribute('crossOrigin', 'anonymous');
            img.onload = () => {
                canvas.width = img.width / scale;
                canvas.height = img.height / scale;
                ctx.drawImage(img, 0, 0, img.width / scale, img.height / scale);
                let base64 = canvas.toDataURL("image/png", 0.01);
                resolve(base64);
            }
            img.onerror = (error) => {
                reject(error);
            }
            img.src = src;
        })
    },
    /**
    * 配置节流函数
    * 应用场景:
    * window.onscroll = throttle(testFn, 200);
    * window.onscroll = throttle(testFn, 100, 100);
    * @param  {[Function]}  fn     [要执行的函数]
    * @param  {[Number]}  delay    [延迟执行的毫秒数]
    * @return {[Function]}         [节流函数]
    */
    throttle (fn, delay) {
        var now, lastExec, timer, context, args; //eslint-disable-line

        var execute = function () {
            fn.apply(context, args);
            lastExec = now;
        };

        return function () {
            context = this;
            args = arguments;

            now = Date.now();

            if (timer) {
                clearTimeout(timer);
                timer = null;
            }

            if (lastExec) {
                var diff = delay - (now - lastExec);

                if (diff < 0) {
                    execute();
                } else {
                    timer = setTimeout(() => {
                        execute();
                    }, diff);
                }
            } else {
                execute();
            }
        };
    },

    /**
     * 获取项目url地址 例如：http://xxx.com/path/
     */
    getBaseUrl () {
        let url = window.location.href;
        let item_url;
        if (url.indexOf("?from=") == -1 && url.indexOf("?1=1&from=") == -1) {
            let url_arr = url.split("?");
            item_url = url_arr[0].split("#")[0];
        } else {
            let url_arr = url.split("#");
            item_url = encodeURIComponent(url_arr[0]);
        }
        return item_url;
    },

    /**
     * 设置网页标题
     * @param {Str} title 标题
     */
    setDocumentTitle (title) {
        document.title = title;
        let ua = navigator.userAgent;
        if (/\bMicroMessenger\/([\d\.]+)/.test(ua) && /ip(hone|od|ad)/i.test(ua)) {
            let i = document.createElement('iframe');
            //i.src = '/favicon.ico';
            i.style.display = 'none';
            i.onload = function () {
                setTimeout(function () {
                    i.remove();
                }, 9);
            };
            document.body.appendChild(i);
        }
    },

    /**
     * 获取当前日期 
     * @return {[Str]} 例如:2019-06-20
     */
    getNowFormatDate () {
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate;
        return currentdate;
    },

    /**
     * 版本号对比
     * @param {Str} v1 当前版本号
     * @param {Str} v2 目标版本号
     */
    isVersion (v1, v2) {
        if (typeof v1 !== "string" || typeof v2 !== "string") return false;
        var vs = [v1, v2].map(function (v) {
            return v
                .split(".")
                .map(function (n) {
                    return ("00000" + n).slice(-5);
                })
                .join("");
        });
        return vs[0] >= vs[1];
    },


    /**
    * 时间戳转化为年 月 日 时 分 秒
    * number: 传入时间戳
    * format：返回格式，支持自定义，但参数必须与formateArr里保持一致
    * 例如：formatTime (1234455234,'Y年M月D日 h:m:s')
    */
    formatTime (number, format) {

        var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
        var returnArr = [];

        var date = new Date(number * 1000);
        returnArr.push(date.getFullYear());
        returnArr.push(formatNumber(date.getMonth() + 1));
        returnArr.push(formatNumber(date.getDate()));

        returnArr.push(formatNumber(date.getHours()));
        returnArr.push(formatNumber(date.getMinutes()));
        returnArr.push(formatNumber(date.getSeconds()));

        for (var i in returnArr) {
            format = format.replace(formateArr[i], returnArr[i]);
        }

        function formatNumber (n) {
            n = n.toString()
            return n[1] ? n : '0' + n
        }
        return format;
    },

    /**
     * 将时间戳转换为几分钟前、几小时前
     * @param {*} dateTimeStamp 
     * @param {*} format 
     */
    timeago (dateTimeStamp, format) {
        // dateTimeStamp是一个时间毫秒，注意时间戳是秒的形式，在这个毫秒的基础上除以1000，就是十位数的时间戳。13位数的都是时间毫秒。
        var minute = 1000 * 60;      //把分，时，天，周，半个月，一个月用毫秒表示
        var hour = minute * 60;
        var day = hour * 24;
        var week = day * 7;
        var halfamonth = day * 15;
        var month = day * 30;

        var now = new Date().getTime();   //获取当前时间毫秒

        var diffValue = now - dateTimeStamp;//时间差

        if (diffValue < 0) { return; }

        var minC = diffValue / minute;  //计算时间差的分，时，天，周，月
        var hourC = diffValue / hour;
        var dayC = diffValue / day;
        var weekC = diffValue / week;
        var monthC = diffValue / month;
        var result = '';

        // if (monthC >= 1) {
        //   result = "" + parseInt(monthC) + "月前";
        // } else if (weekC >= 1) {
        //   result = "" + parseInt(weekC) + "周前";
        // } else 
        if (dayC >= 1 && dayC <= 3) {
            result = "" + parseInt(dayC) + "天前";
        } else if (hourC >= 1 && hourC <= 24) {
            result = "" + parseInt(hourC) + "小时前";
        } else if (minC >= 1 && minC <= 60) {
            result = "" + parseInt(minC) + "分钟前";
        } else if (minC < 1) {
            result = "刚刚";
        } else {
            result = this.formatTime(new Date(dateTimeStamp) / 1000, format)		//否则输出“format”(自定义格式)的时间
        }
        return result;
    },

    /**
     * 滚动条平滑滚动到指定位置
     * @param {*} pos 位置
     * @param {*} seep 速度
     */
    animateScroll (pos, seep = 20) {
        if (isNaN(pos)) {
            throw "Position must be a number";
        }
        if (pos < 0) {
            throw "Position can not be negative";
        }
        let currentPos = document.documentElement.scrollTop || window.scrollY || window.screenTop;
        if (currentPos < pos) {
            let time = 0;
            for (let i = currentPos; i <= pos; i += seep) {
                time += 4;
                setTimeout(function () {
                    window.scrollTo(0, i);
                }, time / 2);
            }
        } else {
            let time = 0;
            for (let i = currentPos; i >= pos; i -= seep) {
                time += 4;
                setTimeout(function () {
                    window.scrollTo(0, i);
                }, time / 2);
            }
        }
    },

    /**
     * 数字乘以100 或者 数字除以100 解决精度问题
     * accMul(number,100) //乘以100
     * accMul(number,1) // 除以100
     * @param {*} arg1 
     * @param {*} arg2 
     */
    accMul (arg1, arg2) {
        arg1 = arg1 || 0;
        var m = 0,
            s1 = arg1.toString(),
            s2 = arg2.toString();
        try {
            m += s1.split(".")[1].length
        } catch (e) { }
        try {
            m += s2.split(".")[1].length
        } catch (e) { }
        return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
    },

    /**
     * 金额格式化小数点两位
     * toFixed(0) 0.00
     * toFixed(12.2) 12.20
     * toFixed(12.22) 12.22
     * @param {*} s 
     */
    toFixed (s) {
        let a = this.accMul(s, 100);
        let _a = s * 100;
        // console.log("直接乘以 * 100", _a)
        // console.log("accMul * 100", a)
        let b = Math.round(a);
        let _b = Math.round(_a);

        // console.log("直接乘以-round", _b)
        // console.log("accMul-round", b)
        let c = this.accMul(b, 0.01);
        // console.log("accMul * 0.01", c)

        return c.toFixed(2)
        // (Math.round((cart.billAmount) * 100) / 100).toFixed(2)
    },

    /**
     * 格式化千分单位（支持分和元格式化）
     * moneyFormatCN(1000000,true) = "1,000,000.00" = 元转换
     * moneyFormatCN(1000000,false) = "10,000.00" = 分转换
     * @param {*} value 
     * @param {*} noAccMul 
     */
    moneyFormatCN (value, noAccMul) {
        if (!value) return "0.00";
        // value += "";
        // value = value.replace(/\./g, "");
        // if (!noAccMul) {
        //     //分到元
        //     value = utils.accMul(value, 0.01);
        // }
        var num = "";
        if (noAccMul) {
            // 格式化金额保留两位小数 10 =>> 10.00  12.12 =>> 12.12
            num = this.toFixed(value);
        } else {
            // 分到元 1000 =>> 10.00
            num = this.accMul(value, 0.01);
        }

        num += "";
        var reg = num.indexOf('.') > -1 ? /(\d{1,3})(?=(?:\d{3})+\.)/g : /(\d{1,3})(?=(?:\d{3})+$)/g;//千分符的正则
        num = num.replace(reg, '$1,');//千分位格式化
        if (num.indexOf('.') === -1) {
            return `${num}.00`;
        }
        num = num.split(".")[1] ? (num.split(".")[1].length == 1 ? num + "0" : num) : num;
        return `${num}`;
    },
    /**
     * 使用H5的history Api 修改浏览器历史状态
     * @param {*} query 参数对象
     * @param {*} type replace || push
     */
    historyGoState (query, type = "replace") {
        if (query instanceof Array) return;
        if (query instanceof Object) {
            let page_url = location.href;
            let queryStr = "?";

            for (const key in query) {
                const element = query[key];
                queryStr += `${key}=${element}&`;
            }
            queryStr = queryStr.substring(0, queryStr.length - 1);
            // 兼容微信分享后 双问号? 的链接
            page_url = page_url.includes('?') ? page_url.slice(0, page_url.lastIndexOf('?')) : page_url;
            page_url = page_url + queryStr;
            if (type == "replace") history.replaceState(query, '', page_url);
            else history.pushState(query, '', page_url);
        }
    },

    /**
     * 检测是否为半链接，为半链接拼接域名
     * @param {*} url 
     */
    mergeUrlHost (url) {
        return ((url + "").indexOf("http") === 0 || /^besharp|^pincai/.test(url)) ? url : (window.location.protocol + '//' + window.location.host) + url;
    },

    /**
     * 检测是否对象
     * @param {Object} obj 
     */
    isObject (obj) {
        return Object.prototype.toString.call(obj) === '[object Object]';
    },

    /**
     * 检查是否数组
     * @param {Array} obj 
     */
    isArray (obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    },

    isNull () {
        var d = null;
        if (!d && typeof (d) != "undefined" && d != 0) {
            alert("d为null");
        }
    },

    /**
     * 转换成字符串，null 或 undefined 转成空字符串
     * @param {*} v 
     */
    toStrType (v) {
        return !v && v != '0' ? '' : v + "";
    },

    /**
     * 检测是否为小程序地址
     * @param {*} url 
     */
    isPMPUrl (url) {
        return /^pmp:/.test(url);
    }
}