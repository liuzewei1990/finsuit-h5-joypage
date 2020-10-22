import {
    Base64
} from "js-base64";


let u = navigator.userAgent;
let isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

let APP_FLAG;
if (u.indexOf("besharp") != -1) {
    APP_FLAG = 'BC'
} else if (u.indexOf("pincai") != -1) {
    APP_FLAG = 'PC'
} else {
    APP_FLAG = 'OUTLINK'
}

// 调用安卓和ios 必须双引号
export default {

    APP_FLAG: APP_FLAG,

    /**
     * 原生交互传递参数时 Ios和安卓 编码方式不同 2019-12-17增加
     * @param {*} data 
     */
    base64Encode(data = {}) {
        if (!(data instanceof Object)) return;
        if (isAndroid) {
            return Base64.encode(encodeURIComponent(JSON.stringify(data)));
        } else if (isIOS) {
            return Base64.encode(JSON.stringify(data));
        }
    },

    isApp() {
        if (u.indexOf("besharp") != -1) {
            sessionStorage.setItem("isAppPath", 1);
            return true
        } else if (u.indexOf("pincai") != -1) {
            sessionStorage.setItem("isAppPath", 1);
            return true
        } else {
            sessionStorage.setItem("isAppPath", 0);
            return false
        }
    },
    goLogin() { //跳原生登录页面
        let data = Base64.encode(JSON.stringify({
            type: "1"
        }))
        try {
            if (isAndroid && window.android) {
                window.android.jsNeedLogin(data)
            } else if (isIOS) {
                if (window.IOSWebJSInterface) {
                    window.IOSWebJSInterface.jsNeedLogin(data)
                } else if (window.webkit) {
                    try {
                        window.webkit.messageHandlers.jsNeedLogin.postMessage(data)
                    } catch (err) {
                        console.log("error window.webkit.messageHandlersjsNeedLogin.postMessage( )")
                    }
                }
            }
        } catch (err) {
            console.log(err);
            return false;
        }
    },
    /**
     * H5打开新的H5页面
     * @param {Str} url 目标地址
     * @param {Str} title 标题
     * @param {Str} needLogin 打开页面之前是否需要强制登录，“1”： 强制登录，不传或者传"0", 为正常打开。 默认不用传
     * @param {Str} closeThis 是否关闭当前的webview, 1：关闭 不传或者传0，为正常打开，默认不用传
     */
    openWebview(url = "", title = "", needLogin = "", closeThis = "") {

        let options = {
            url: "",
            title: "",
            needLogin: "",
            closeThis: ""
        };

        // url地址
        if (url) options["url"] = url;

        // 页面标题，只对App内有效
        if (title) options["title"] = title;

        // 链接中包含 needLogin 代表强制登陆
        if (/needLogin=1/.test(url) || needLogin == "1") options["needLogin"] = "1";

        // 链接中包含 closeThis 代表重定向
        if (/closeThis=1/.test(url) || closeThis == "1") options["closeThis"] = "1";


        // 链接为小程序原生地址，地址必须以/开头 代表小程序原生地址 例如：/pages/xxx/xxx?a=1&b=2
        if (/^pmp:/.test(options.url)) {
            console.error("this.$bcBridge.openWebview不支持小程序地址跳转，请改用this.$openWebview()方法！");
            return;
        }

        // 2、原生App跳转
        let data = {
            H5_URL: options.url,
            TITLE: options.title,
            NEED_LOGIN: options.needLogin,
            CLOSE_THIS: options.closeThis
        }
        if (this.APP_FLAG === "BC" || this.APP_FLAG === "PC") {
            this.gotoSecondaryH5Page(data);
            return;
        }

        // 3、H5跳转
        window.location.href = options.url;
    },
    /**
     * H5打开新的H5页面
     * @param {Str} data.H5_URL 目标地址
     * @param {Str} data.TITLE 标题
     * @param {Str} data.NEED_LOGIN 打开页面之前是否需要强制登录，“1”： 强制登录，不传或者传"0", 为正常打开。 默认不用传
     * @param {Str} data.CLOSE_THIS 是否关闭当前的webview, 1：关闭 不传或者传0，为正常打开，默认不用传
     */
    gotoSecondaryH5Page(data = {}) {
        let dataAndroid = Base64.encode(encodeURIComponent(JSON.stringify(data)));
        let dataIOS = Base64.encode(JSON.stringify(data))
        if (isAndroid && window.android) {
            window.android.gotoSecondaryH5Page(dataAndroid);
        } else if (isIOS) {
            if (window.IOSWebJSInterface) {
                window.IOSWebJSInterface.gotoSecondaryH5Page(dataIOS)
            } else if (window.webkit) {
                try {
                    window.webkit.messageHandlers.gotoSecondaryH5Page.postMessage(dataIOS);
                } catch (err) {
                    console.log("error window.webkit.gotoSecondaryH5Page( )")
                    window.location.href = data.H5_URL;
                }
            } else {
                window.location.href = data.H5_URL;
            }
        } else {
            window.location.href = data.H5_URL;
        }
    },
    /**
     * H5打开新的H5页面，注意：H5产品详情页专用，339/139版本支持
     * @param {Str} data.H5_URL 目标地址
     * @param {Str} data.TITLE 标题
     * @param {Str} data.NEED_LOGIN 打开页面之前是否需要强制登录，“1”： 强制登录，不传或者传"0", 为正常打开。 默认不用传
     * @param {Str} data.CLOSE_THIS 是否关闭当前的webview, 1：关闭 不传或者传0，为正常打开，默认不用传
     */
    gotoPrdDetailH5Page(data = {}) {
        let dataAndroid = Base64.encode(encodeURIComponent(JSON.stringify(data)));
        let dataIOS = Base64.encode(JSON.stringify(data))
        if (isAndroid && window.android) {
            window.android.gotoPrdDetailH5Page(dataAndroid);
        } else if (isIOS) {
            if (window.IOSWebJSInterface) {
                window.IOSWebJSInterface.gotoPrdDetailH5Page(dataIOS)
            } else if (window.webkit) {
                try {
                    window.webkit.messageHandlers.gotoPrdDetailH5Page.postMessage(dataIOS);
                } catch (err) {
                    console.log("error window.webkit.gotoPrdDetailH5Page( )")
                    window.location.href = data.H5_URL;
                }
            } else {
                window.location.href = data.H5_URL;
            }
        } else {
            window.location.href = data.H5_URL;
        }
    },

    /**
     * H5打开新的H5页面
     * @param {Str} url 目标地址
     * @param {Str} userLink
     * @param {Str} NEED_LOGIN 打开页面之前是否需要强制登录，“1”： 强制登录，不传或者传"0", 为正常打开。 默认不用传
     */
    gotoNewH5Page(url = "", userLink = "1", NEED_LOGIN = "") {
        let data = {
            H5_URL: url,
            USE_LINK: userLink,
            NEED_LOGIN: NEED_LOGIN
        }

        let dataAndroid = Base64.encode(encodeURIComponent(JSON.stringify(data)));
        let dataIOS = Base64.encode(JSON.stringify(data))
        if (isAndroid && window.android) {
            window.android.gotoNewH5Page(dataAndroid);
        } else if (isIOS) {
            if (window.IOSWebJSInterface) {
                window.IOSWebJSInterface.gotoNewH5Page(dataIOS)
            } else if (window.webkit) {

                try {
                    window.webkit.messageHandlers.gotoNewH5Page.postMessage(dataIOS);
                } catch (err) {
                    console.log("error window.webkit.gotoNewH5Page( )")
                    window.location.href = url;
                }
            } else {
                window.location.href = url;
            }
        } else {
            window.location.href = url;
        }
    },
    /**
     *
     * @param {obj} data 连连赚拉取原生发送短信邀请
     */
    launchSMS(data) {
        let dataAndroid = Base64.encode(encodeURIComponent(JSON.stringify(data)));
        let dataIOS = Base64.encode(JSON.stringify(data));
        if (isAndroid) {
            window.android.launchSMS(dataAndroid);
        } else if (isIOS) {
            if (window.IOSWebJSInterface) {
                window.IOSWebJSInterface.launchSMS(dataIOS)
            } else if (window.webkit) {
                try {
                    window.webkit.messageHandlers.launchSMS.postMessage(dataIOS);
                } catch (err) {
                    console.log("error window.webkit.launchSMS( )")
                }
            }
        }
    },
    /**
     * 分享文本+链接
     * @param {Obj} data
     * data.share_type: 1微信，2朋友圈，3 qq，4qq空间
     * data.share_title: 分享标题
     * data.share_msg: 分享内容
     * data.share_url: 分享链接
     */
    h5Share(data) {
        let dataAndroid = Base64.encode(encodeURIComponent(JSON.stringify(data)));
        let dataIOS = Base64.encode(JSON.stringify(data))
        if (isAndroid && window.android) {
            window.android.h5Share(dataAndroid);
        } else if (isIOS) {
            if (window.IOSWebJSInterface) {
                window.IOSWebJSInterface.h5Share(dataIOS)
            } else if (window.webkit) {
                try {
                    window.webkit.messageHandlers.h5Share.postMessage(dataIOS);
                } catch (err) {
                    console.log("error window.webkit.h5Share( )")
                }
            }
        }
    },
    /**
     * 分享图片到朋友圈
     * @param {Obj} data
     * data.type: 1微信，2朋友圈，3 qq，4qq空间
     * data.img: 分享的图片:base 64 字符串
     * data.thumb: 缩略图 base64 字符串
     */
    h5ShareImage(data) {
        let dataAndroid = JSON.stringify(data);
        let dataIOS = JSON.stringify(data)
        if (isAndroid && window.android) {
            window.android.h5ShareImage(dataAndroid);
        } else if (isIOS) {
            if (window.IOSWebJSInterface) {
                window.IOSWebJSInterface.h5ShareImage(dataIOS)
            } else if (window.webkit) {
                try {
                    window.webkit.messageHandlers.h5ShareImage.postMessage(dataIOS);
                } catch (err) {
                    console.log("error window.webkit.h5ShareImage( )")
                }
            }
        }
    },
    updateTitle(title) {
        document.title = title
        let dataAndroid = Base64.encode(encodeURIComponent(title));
        if (isAndroid && window.android) {
            window.android.updateTitle(dataAndroid);
        } else if (isIOS) {
            if (window.IOSWebJSInterface) {
                window.IOSWebJSInterface.updateTitle(title)
            } else if (window.webkit) {
                try {
                    window.webkit.messageHandlers.updateTitle.postMessage(title);
                } catch (err) {
                    console.log("error window.webkit.updateTitle( )")
                }
            }
        }
    },
    h5OpenApiBuy(data) {
        let dataAndroid = Base64.encode(encodeURIComponent(JSON.stringify(data)));
        let dataIOS = Base64.encode(JSON.stringify(data))
        if (isAndroid && window.android) {
            window.android.h5OpenApiBuy(dataAndroid);
        } else if (isIOS) {
            if (window.IOSWebJSInterface) {
                window.IOSWebJSInterface.h5OpenApiBuy(dataIOS)
            } else if (window.webkit) {
                try {
                    window.webkit.messageHandlers.h5OpenApiBuy.postMessage(dataIOS);
                } catch (err) {
                    console.log("error window.webkit.h5OpenApiBuy( )")
                }
            }
        }
    },
    saveImgAlbumForBack(data) {
        if (isAndroid && window.android) {
            window.android.saveImgAlbumForBack(data);
        } else if (isIOS) {
            if (window.IOSWebJSInterface) {
                window.IOSWebJSInterface.saveImgAlbumForBack(data)
            } else if (window.webkit) {
                try {
                    window.webkit.messageHandlers.saveImgAlbumForBack.postMessage(data);
                } catch (err) {
                    console.log("error window.webkit.saveImgAlbumForBack( )")
                }
            }
        }
    },
    sendLoginResult() {
        if (isAndroid && window.android) {
            window.android.sendLoginResult();
        } else if (isIOS) {
            if (window.IOSWebJSInterface) {
                window.IOSWebJSInterface.sendLoginResult()
            } else if (window.webkit) {
                try {
                    window.webkit.messageHandlers.sendLoginResult.postMessage('');
                } catch (err) {
                    console.log("error window.webkit.sendLoginResult( )")
                }
            }
        }
    },
    gotoMainPage() {
        if (isAndroid && window.android) {
            window.android.gotoMainPage();
        } else if (isIOS) {
            if (window.IOSWebJSInterface) {
                window.IOSWebJSInterface.gotoMainPage()
            } else if (window.webkit) {
                try {
                    window.webkit.messageHandlers.gotoMainPage.postMessage('');
                } catch (err) {
                    console.log("error window.webkit.gotoMainPage( )")
                }
            }
        }
    },
    /**
     * 分享微信小程序
     * @param {Obj} data
     * data.share_type: 1
     * data.type : 分享小程序的版本: 正式版:0，测试版:1，体验版:2
     * data.url: ""
     * data.user_name:
     * data.path: 打开小程序的路径
     * data.title: 分享标题
     * data.description: 分享描述
     * data.img: 分享图片
     * data.thumb: 兼容旧版节点的图片，小于32k， 新版优先使用hdImageData
     *
     */
    h5ShareWXProgram(data) {
        let dataAndroid = Base64.encode(encodeURIComponent(JSON.stringify(data)));
        let dataIOS = Base64.encode(JSON.stringify(data))
        if (isAndroid && window.android) {
            window.android.h5ShareWXProgram(dataAndroid);
        } else if (isIOS) {
            if (window.IOSWebJSInterface) {
                window.IOSWebJSInterface.h5ShareWXProgram(dataIOS)
            } else if (window.webkit) {
                try {
                    window.webkit.messageHandlers.h5ShareWXProgram.postMessage(dataIOS);
                } catch (err) {
                    console.log("error window.webkit.h5ShareWXProgram( )")
                }
            }
        }
    },
    // H5获取加密请求参数
    h5SaltSign(data) {
        let newData = Base64.encode(JSON.stringify(data));
        if (window.android) {
            window.android.h5SaltSign(newData)
        }
        if (window.IOSWebJSInterface) {
            window.IOSWebJSInterface.h5SaltSign(newData)
        }
        if (window.webkit && window.webkit.messageHandlers) {
            try {
                window.webkit.messageHandlers.h5SaltSign.postMessage(newData)
            } catch (err) {
                console.log("error window.webkit.messageHandlers.h5SaltSign.postMessage('')")
            }
        }
    },

    /**
     * 获取scheme地址
     * @param {*} data 
     * @param {*} appFlag 
     */
    getSchemeUrl(data = {}, appFlag = "") {
        let param = Base64.encode(JSON.stringify(data));
        let httpType = {
            "BC": "besharp",
            "PC": "pincai"
        }
        let url = httpType[appFlag || APP_FLAG] + '://finsuit/applink?pjsonkey=' + param;
        return url;
    },

    /**
     * 支持外部浏览器或比财App内部活动H5页面跳转到比财App对应页面
     */
    toAppPage(data = {}) {
        let base = Base64.encode(JSON.stringify(data));
        let http = APP_FLAG === "BC" ? "besharp" : "pincai";
        let url = http + '://finsuit/applink?pjsonkey=' + base;
        if (window.android || window.IOSWebJSInterface || window.webkit) {
            window.location.href = url
        } else {
            console.error("该浏览器不支持跳转")
        }
    },

    /**
     * 跳转到产品详情
     */
    toAppPrdDetailPage() {
        this.toAppPage({
            LINK_TO: "PRD_DETAIL",
            PRD_TYPE: "1",
            PRD_ID: "320",
            RATEID: "12"
        });
    },

    /**
     * 跳转到福利页面
     */
    toAppWelfarePage() {
        this.toAppPage({
            LINK_TO: "WELFARE"
        });
    },

    /**
     * 跳转到我的钱包
     */
    toAppWalletPage() {
        this.toAppPage({
            LINK_TO: "WALLET"
        });
    },

    /**
     * 进入零花钱页面(点击右上角按钮调用H5的tappedRightShare方法)
     * data.url 零花钱H5url地址
     * data.title
     */
    gotoPocketMoney(data = {}) {
        let dataAndroid = Base64.encode(encodeURIComponent(JSON.stringify(data)));
        let dataIOS = Base64.encode(JSON.stringify(data))
        if (isAndroid && window.android) {
            window.android.gotoPocketMoney(dataAndroid);
        } else if (isIOS) {
            if (window.IOSWebJSInterface) {
                window.IOSWebJSInterface.gotoPocketMoney(dataIOS)
            } else if (window.webkit) {
                try {
                    window.webkit.messageHandlers.gotoPocketMoney.postMessage(dataIOS);
                } catch (err) {
                    console.log("error window.webkit.gotoPocketMoney( )")
                }
            }
        }
    },

    /**
     * H5打开原生实名认证页面
     * options.success 认证结果 : 1 成功， 0， 失败
     * options.fail 调用失败执行
     * 暂无参数， 空字符串， 之后可能有Base64({....})具体的数据
     */
    h5Certify(options = {}) {
        let dataAndroid = Base64.encode(encodeURIComponent(JSON.stringify(options.data || {})));
        let dataIOS = Base64.encode(JSON.stringify(options.data || {}));
        if (isAndroid && window.android) {
            window.android.h5Certify(dataAndroid);
        } else if (isIOS) {
            if (window.IOSWebJSInterface) {
                window.IOSWebJSInterface.h5Certify(dataIOS)
            } else if (window.webkit) {
                try {
                    window.webkit.messageHandlers.h5Certify.postMessage(dataIOS);
                } catch (err) {
                    console.log("error window.webkit.h5Certify()")
                }
            }
        }
        window.certifyResult = function (argument) {
            console.log("原生实名回调argument------", argument);
            // result: 1 成功， 0， 失败
            let data = JSON.parse(Base64.decode(argument));
            console.log("原生实名回调data------", data);
            if (data.result == "1") {
                options.success();
            } else {
                options.fail();
            }
        };
    },

    /**
     * 银行开户(对xx银行开户) (比财3.2.0）
     * data.ORG_ID  机构id
     * data.ORG_NAME  名称
     * data.LOGO_URL  logo地址
     * data.BANK_DOCK_TYPE  0 普通， 1， sdk接入， 2，王冰洋H5
     * data.SKIP_PAGE_INFO  过度页面文案
     * data.BANK_TIPS_PAGE  1 显示过度页面， 2 不显示
     */
    openBankAccount(data, callBack) {
        let dataAndroid = Base64.encode(encodeURIComponent(JSON.stringify(data)));
        let dataIOS = Base64.encode(JSON.stringify(data))
        if (isAndroid && window.android) {
            window.android.openBankAccount(dataAndroid);
        } else if (isIOS) {
            if (window.IOSWebJSInterface) {
                window.IOSWebJSInterface.openBankAccount(dataIOS)
            } else if (window.webkit) {
                try {
                    window.webkit.messageHandlers.openBankAccount.postMessage(dataIOS);
                } catch (err) {
                    console.log("error window.webkit.openBankAccount( )")
                }
            }
        }
    },
    // 兼容老版本，每日一题
    openBankAccountTopic(data, callBack) {
        let dataAndroid = Base64.encode(encodeURIComponent(JSON.stringify(data)));
        let dataIOS = Base64.encode(JSON.stringify(data))
        if (isAndroid && window.android) {
            window.android.openBankAccount(dataAndroid);
        } else if (isIOS) {
            if (window.IOSWebJSInterface) {
                window.IOSWebJSInterface.openBankAccount(dataIOS)
            } else if (window.webkit) {
                try {
                    window.webkit.messageHandlers.openBankAccount.postMessage(dataIOS);
                } catch (err) {
                    console.log("error window.webkit.openBankAccount( )")
                }
            }
        }

        window.pageAppear = function () {
            callBack();
            window.pageAppear = function () {};
        }
    },
    /**
     * 切换到开户列表页面
     * @param {*} data
     */
    openAccount() {
        if (isAndroid && window.android) {
            window.android.openAccount();
        } else if (isIOS) {
            if (window.IOSWebJSInterface) {
                window.IOSWebJSInterface.openAccount('')
            } else if (window.webkit) {
                try {
                    window.webkit.messageHandlers.openAccount.postMessage('');
                } catch (err) {
                    console.log("error window.webkit.openAccount( )")
                }
            }
        }
    },
    /**
     * 进行活体检测
     * @param {*} data
     */
    faceDiscern(data, callBack) {
        let dataAndroid = Base64.encode(encodeURIComponent(JSON.stringify(data)));
        let dataIOS = Base64.encode(JSON.stringify(data))
        if (isAndroid && window.android) {
            window.android.faceDiscern(dataAndroid);
        } else if (isIOS) {
            if (window.IOSWebJSInterface) {
                window.IOSWebJSInterface.faceDiscern(dataIOS)
            } else if (window.webkit) {
                try {
                    window.webkit.messageHandlers.faceDiscern.postMessage(dataIOS);
                } catch (err) {
                    console.log("error window.webkit.faceDiscern( )")
                }
            }
        }
        window.faceDiscernResult = function (res) {
            callBack(res);
        };
    },

    /**
     * 打开产品持仓页面
     * @param {Obj} data
     */
    holdingAssets(data) {
        let dataAndroid = Base64.encode(encodeURIComponent(JSON.stringify(data)));
        let dataIOS = Base64.encode(JSON.stringify(data))
        if (isAndroid && window.android) {
            window.android.holdingAssets(dataAndroid);
        } else if (isIOS) {
            if (window.IOSWebJSInterface) {
                window.IOSWebJSInterface.holdingAssets(dataIOS)
            } else if (window.webkit) {
                try {
                    window.webkit.messageHandlers.holdingAssets.postMessage(dataIOS);
                } catch (err) {
                    console.log("error window.webkit.holdingAssets( )")
                }
            }
        }
    },
    /**
     * 进入OpenAPI二类户银行资产页面
     * @param {Obj} data
     */
    gotoOpenAPIBankDetail(data) {
        let dataAndroid = Base64.encode(encodeURIComponent(JSON.stringify(data)));
        let dataIOS = Base64.encode(JSON.stringify(data))
        if (isAndroid && window.android) {
            window.android.gotoOpenAPIBankDetail(dataAndroid);
        } else if (isIOS) {
            if (window.IOSWebJSInterface) {
                window.IOSWebJSInterface.gotoOpenAPIBankDetail(dataIOS)
            } else if (window.webkit) {
                try {
                    window.webkit.messageHandlers.gotoOpenAPIBankDetail.postMessage(dataIOS);
                } catch (err) {
                    console.log("error window.webkit.gotoOpenAPIBankDetail( )")
                }
            }
        }
    },
    // 3.1.4卡券专用
    nativeOnClickMoneyCardService() {
        if (isAndroid && window.android) {
            window.android.nativeOnClickMoneyCardService();
        } else if (window.IOSWebJSInterface) {
            window.IOSWebJSInterface.nativeOnClickMoneyCardService();
        } else if (window.webkit && window.webkit.messageHandlers) {
            try {
                window.webkit.messageHandlers.nativeOnClickMoneyCardService.postMessage('')
            } catch (err) {
                console.log("error window.webkit.messageHandlers.nativeOnClickMoneyCardService.postMessage('')")
            }
        }
    },

    /**
     * 切换到资产首页
     * @param {*} data
     */
    gotoAssetPage() {
        if (isAndroid && window.android) {
            window.android.gotoAssetPage();
        } else if (isIOS) {
            if (window.IOSWebJSInterface) {
                window.IOSWebJSInterface.gotoAssetPage('')
            } else if (window.webkit) {
                try {
                    window.webkit.messageHandlers.gotoAssetPage.postMessage('');
                } catch (err) {
                    console.log("error window.webkit.gotoAssetPage( )")
                }
            }
        }
    },

    /**
     * 调用原生页面的loading方法： (比财328， 拼财128）
     * @param {Obj} data
     * data.style: "1218", 1218 loading， 不传默认是普通的loaidng
     */
    showLoading(data) {
        let dataAndroid = Base64.encode(encodeURIComponent(JSON.stringify(data)));
        let dataIOS = Base64.encode(JSON.stringify(data))
        if (isAndroid && window.android) {
            window.android.showLoading(dataAndroid);
        } else if (isIOS) {
            if (window.IOSWebJSInterface) {
                window.IOSWebJSInterface.showLoading(dataIOS)
            } else if (window.webkit) {
                try {
                    window.webkit.messageHandlers.showLoading.postMessage(dataIOS);
                } catch (err) {
                    console.log("error window.webkit.showLoading( )")
                }
            }
        }
    },

    /**
     * 关闭原生页面的loading
     */
    stopLoading() {
        if (isAndroid && window.android) {
            window.android.stopLoading("");
        } else if (isIOS) {
            if (window.IOSWebJSInterface) {
                window.IOSWebJSInterface.stopLoading("")
            } else if (window.webkit) {
                try {
                    window.webkit.messageHandlers.stopLoading.postMessage("");
                } catch (err) {
                    console.log("error window.webkit.stopLoading( )")
                }
            }
        }
    },


    /**
     * 原生数据存储
     * @param {Obj} data
     * {"key": "home_pop_date", "value": "20191010"}
     */
    storeFlag(data) {
        let dataAndroid = Base64.encode(encodeURIComponent(JSON.stringify(data)));
        let dataIOS = Base64.encode(JSON.stringify(data))
        if (isAndroid && window.android) {
            window.android.storeFlag(dataAndroid);
        } else if (isIOS) {
            if (window.IOSWebJSInterface) {
                window.IOSWebJSInterface.storeFlag(dataIOS)
            } else if (window.webkit) {
                try {
                    window.webkit.messageHandlers.storeFlag.postMessage(dataIOS);
                } catch (err) {
                    console.log("error window.webkit.storeFlag( )")
                }
            }
        }
    },


    /**
     * 获取原生数据存储
     * @param {Obj} data
     * {"key": "home_pop_date"}
     */
    sendFlagValue(data, callBack) {
        let dataAndroid = Base64.encode(encodeURIComponent(JSON.stringify(data)));
        let dataIOS = Base64.encode(JSON.stringify(data))
        if (isAndroid && window.android) {
            window.android.sendFlagValue(dataAndroid);
        } else if (isIOS) {
            if (window.IOSWebJSInterface) {
                window.IOSWebJSInterface.sendFlagValue(dataIOS)
            } else if (window.webkit) {
                try {
                    window.webkit.messageHandlers.sendFlagValue.postMessage(dataIOS);
                } catch (err) {
                    console.log("error window.webkit.sendFlagValue( )")
                }
            }
        }
        window.sendFlagValue = (argument) => {
            if (argument) {
                if (isAndroid && window.android) {
                    let dataAndroid = decodeURIComponent(Base64.decode(argument));
                    callBack(JSON.parse(dataAndroid));
                } else if (isIOS) {
                    let dataIOS = Base64.decode(argument);
                    callBack(JSON.parse(dataIOS));
                }
            } else {
                callBack({});
            }
        }
    },

    /**
     * 跳转前一个页面
     */
    gotoPreviousPage() {
        if (isAndroid && window.android) {
            window.android.gotoPreviousPage();
        } else if (isIOS) {
            if (window.IOSWebJSInterface) {
                window.IOSWebJSInterface.gotoPreviousPage("")
            } else if (window.webkit) {
                try {
                    window.webkit.messageHandlers.gotoPreviousPage.postMessage("");
                } catch (err) {
                    console.log("error window.webkit.gotoPreviousPage( )")
                }
            }
        }
    },

    /**
     * 关掉所有h5打开的二级页面回到主活动页面
     */
    gotoMainActivityPage() {
        if (isAndroid && window.android) {
            window.android.gotoPreviousPage();
        } else if (isIOS) {
            if (window.IOSWebJSInterface) {
                window.IOSWebJSInterface.gotoPreviousPage("")
            } else if (window.webkit) {
                try {
                    window.webkit.messageHandlers.gotoPreviousPage.postMessage("");
                } catch (err) {
                    console.log("error window.webkit.gotoPreviousPage( )")
                }
            }
        }
    },

    /**
     * 进入超级账户页面(点击右上角按钮调用H5的tappedRightShare方法)
     */
    gotoSuperAccount(data = {}) {
        let dataAndroid = Base64.encode(encodeURIComponent(JSON.stringify(data)));
        let dataIOS = Base64.encode(JSON.stringify(data))
        if (isAndroid && window.android) {
            window.android.gotoSuperAccount(dataAndroid);
        } else if (isIOS) {
            if (window.IOSWebJSInterface) {
                window.IOSWebJSInterface.gotoSuperAccount(dataIOS)
            } else if (window.webkit) {
                try {
                    window.webkit.messageHandlers.gotoSuperAccount.postMessage(dataIOS);
                } catch (err) {
                    console.log("error window.webkit.gotoSuperAccount( )")
                }
            }
        }
    },
    /**
     * 根据页面id回退到之前的h5页面
     * @param {要返回的页面id，在前者url参数中指定} data.page_id
     */
    backToPrevisouPageWithPageId(data = {}) {
        let dataAndroid = Base64.encode(encodeURIComponent(JSON.stringify(data)));
        let dataIOS = Base64.encode(JSON.stringify(data))
        if (isAndroid && window.android) {
            window.android.backToPrevisouPageWithPageId(dataAndroid);
        } else if (isIOS) {
            if (window.IOSWebJSInterface) {
                window.IOSWebJSInterface.backToPrevisouPageWithPageId(dataIOS)
            } else if (window.webkit) {
                try {
                    window.webkit.messageHandlers.backToPrevisouPageWithPageId.postMessage(dataIOS);
                } catch (err) {
                    console.log("error window.webkit.backToPrevisouPageWithPageId( )")
                }
            }
        }
    },
    /**
     * 拉起微信小程序
     * @param {Object} data {user_name:原始ID,path:拉起小程序页面的路径，不填默认拉起小程序首页,type:正式版:0，测试版:1，体验版:2}
     */
    h5LaunchWXProgram(data = {}) {
        let dataAndroid = Base64.encode(encodeURIComponent(JSON.stringify(data)));
        let dataIOS = Base64.encode(JSON.stringify(data))
        if (isAndroid && window.android) {
            window.android.h5LaunchWXProgram(dataAndroid);
        } else if (isIOS) {
            if (window.IOSWebJSInterface) {
                window.IOSWebJSInterface.h5LaunchWXProgram(dataIOS)
            } else if (window.webkit) {
                try {
                    window.webkit.messageHandlers.h5LaunchWXProgram.postMessage(dataIOS);
                } catch (err) {
                    console.log("error window.webkit.h5LaunchWXProgram( )")
                }
            }
        }
    },
    /**
     * 设置导航栏右侧按钮
     * @param {*} data
     */
    setupRightItems (data = [], callBack) {
        let dataAndroid = Base64.encode(encodeURIComponent(JSON.stringify(data)));
        let dataIOS = Base64.encode(JSON.stringify(data))
        if (isAndroid && window.android) {
            window.android.setupRightItems(dataAndroid);
        } else if (isIOS) {
            if (window.IOSWebJSInterface) {
                window.IOSWebJSInterface.setupRightItems(dataIOS)
            } else if (window.webkit) {
                try {
                    window.webkit.messageHandlers.setupRightItems.postMessage(dataIOS);
                } catch (err) {
                    console.log("error window.webkit.setupRightItems( )")
                }
            }
        }

        window.tappedRightItem = (argument) => {
            if (argument) {
                if (isAndroid && window.android) {
                    let dataAndroid = decodeURIComponent(Base64.decode(argument));
                    callBack(JSON.parse(dataAndroid));
                } else if (isIOS) {
                    let dataIOS = Base64.decode(argument);
                    callBack(JSON.parse(dataIOS));
                }
            } else {
                callBack({});
            }
        }
    }

}
