;
(function (_global, undefined) {
    var _global = _global || window;
    var utils = {
        center: function (dom) {
            dom.style.position = 'absolute';
            dom.style.top = '50%';
            dom.style.left = '50%';
            dom.style['margin-top'] = -dom.offsetHeight / 2 + 'px';
            dom.style['margin-left'] = -dom.offsetWidth / 2 + 'px';
        },

        /** dom相关 * */
        isDom: (typeof HTMLElement === 'object') ?
            function (obj) {
                return obj instanceof HTMLElement;
            } : function (obj) {
                return obj && typeof obj === 'object' && obj.nodeType === 1 && typeof obj.nodeName === 'string';
            },

        /** 数组相关 * */
        isArray: function (obj) {
            return obj.constructor.toString().indexOf('Array') != -1;
        },
        Color(opacity = '0.1') {
            let r = Math.floor(Math.random() * 255),
                g = Math.floor(Math.random() * 255),
                b = Math.floor(Math.random() * 255);
            return 'rgba(' + r + ',' + g + ',' + b + ', ' + opacity + ')';
        }
    }
    var SetBgColor = function (options = {}) {
        var me = this;
        me.version = '1.0.0';

        var u = navigator.userAgent;
        var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // 是否为ios设备
        var isPC = typeof window.orientation === 'undefined'; // 是否为PC端
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; // 是否为android端
        var isWx = u.toLowerCase().match(/MicroMessenger/i) == 'micromessenger'; // 是否为微信端,此处不能为===,因为match的结果可能是null或数组
        me.os = {
            ios: isIOS,
            pc: isPC,
            android: isAndroid,
            wx: isWx
        }

        var def = {
            opacity: "0.1",
            callback1: function () {},
            callback2: function () {},
        }
        me.def = me.myExtend(options, def);
        if (!options.el) return;
        /** 1. 传入的是id * */
        if (options.el.toString().indexOf('#') != -1) {
            options.el = options.el.replace('#', '');
            me.el = document.getElementById(options.el);
        }

        /** 2. 传入的是class * */
        else if (options.el.toString().indexOf('.') != -1) {
            options.el = options.el.replace('.', '');
            me.el = document.getElementsByClassName(options.el);
        }

        /** 3. 传入的是dom元素 * */
        else if (utils.isDom(options.el)) {
            me.el = options.el;
        }

        /** 4. 传入的是标签 * */
        else if (typeof options.el === 'string') {
            me.el = document.getElementsByTagName(options.el);
            return me.el;
        }

    }
    SetBgColor.prototype = {
        init: function () {},
        setBg: function (bg) {
            try {
                [].forEach.call(this.el, (element) => {
                    element.style.background = utils.Color(this.def.opacity)
                })
            } catch (error) {
                console.log("[].forEach.call error:", error);
            }

        },
        /* 删除dom元素 */
        removeChild: function (dom) {
            if (dom) {
                var parent = dom.parentNode;
                parent && parent.removeChild(dom);
                dom = null;
            }
        },
        myExtend: function (userOption, defaultOption) {
            if (!userOption) return defaultOption;
            for (var key in defaultOption) {
                if (userOption[key] == null) {
                    userOption[key] = defaultOption[key];
                } else if (typeof userOption[key] === 'object') {
                    myExtend(userOption[key], defaultOption[key]); // 深度匹配
                }
            }
            return userOption;
        }
    }

    _global = (function () {
        return this || (0, eval)('this');
    }());
    if (typeof module !== "undefined" && module.exports) {
        module.exports = SetBgColor;
    } else if (typeof define === "function" && define.amd) {
        define(function () {
            return SetBgColor;
        });
    } else {
        !('SetBgColor' in _global) && (_global.SetBgColor = SetBgColor);
    }
})(this, undefined)
