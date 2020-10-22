/*!
 * 获取浏览器和操作系统的信息
 */


export default (function () {
    try {
        var boInfo = {};

        var ua = navigator.userAgent.toLowerCase();
        var platform = navigator.platform;

        /**
         * 1.获取浏览器类型和版本号
         */


        boInfo.UA = ua;

        var browserText = {

            pincai: {
                name: "拼财浏览器",
                ua: ua.match(/(pincai iOS|pincai android(?=\/))\/?\s*([\d.]+)/i)
            },
            besharp: {
                name: "比财浏览器",
                ua: ua.match(/(besharp iOS|besharp android(?=\/))\/?\s*([\d.]+)/i)
            },
            micromessenger: {
                name: "微信浏览器",
                ua: ua.match(/(micromessenger(?=\/))\/?\s*([\d.]+)/i)
            },
            qq: {
                name: "qq内置浏览器",
                ua: ua.match(/(qq(?=\/))\/?\s*([\d.]+)/i)
            },
            mqqbrowser: {
                name: "qq浏览器",
                ua: ua.match(/(mqqbrowser(?=\/))\/?\s*([\d.]+)/i)
            },
            miuibrowser: {
                name: "小米浏览器",
                ua: ua.match(/(miuibrowser(?=\/))\/?\s*([\d.]+)/i)
            },
            alipayclient: {
                name: "支付宝浏览器",
                ua: ua.match(/(alipayclient(?=\/))\/?\s*([\d.]+)/i)
            },
            ucbrowser: {
                name: "uc浏览器",
                ua: ua.match(/(ucbrowser(?=\/))\/?\s*([\d.]+)/i)
            },
            weibo: {
                name: "微博浏览器",
                ua: ua.match(/(weibo(?=\/))\/?\s*([\d.]+)/i)
            },
            opera: {
                name: "opera浏览器",
                ua: ua.match(/(opera(?=\/))\/?\s*([\d.]+)/i)
            },
            chrome: {
                name: "chrome浏览器",
                ua: ua.match(/(chrome(?=\/))\/?\s*([\d.]+)/i)
            },
            safari: {
                name: "safari浏览器",
                ua: ua.match(/(safari(?=\/))\/?\s*([\d.]+)/i)
            },
            firefox: {
                name: "火狐浏览器",
                ua: ua.match(/(firefox(?=\/))\/?\s*([\d.]+)/i)
            }
        }

        var currBrowser = {};

        for (const key in browserText) {
            if (browserText.hasOwnProperty(key)) {
                const element = browserText[key].ua;
                if (element) {
                    currBrowser = browserText[key];
                    break;
                }
            }
        }

        boInfo.BROWSER = currBrowser.ua[1];
        boInfo.BROWSER_VERSION = currBrowser.ua[2];
        boInfo.BROWSER_NAME = currBrowser.name || "?";


        /**
         * 2.获取系统类型和系统版本号
         */

        var clientStrings = [
            { s: 'Windows 10', r: /(Windows 10.0|Windows NT 10.0)/ },
            { s: 'Windows 8.1', r: /(Windows 8.1|Windows NT 6.3)/ },
            { s: 'Windows 8', r: /(Windows 8|Windows NT 6.2)/ },
            { s: 'Windows 7', r: /(Windows 7|Windows NT 6.1)/ },
            { s: 'Windows Vista', r: /Windows NT 6.0/ },
            { s: 'Windows Server 2003', r: /Windows NT 5.2/ },
            { s: 'Windows XP', r: /(Windows NT 5.1|Windows XP)/ },
            { s: 'Windows 2000', r: /(Windows NT 5.0|Windows 2000)/ },
            { s: 'Windows ME', r: /(Win 9x 4.90|Windows ME)/ },
            { s: 'Windows 98', r: /(Windows 98|Win98)/ },
            { s: 'Windows 95', r: /(Windows 95|Win95|Windows_95)/ },
            { s: 'Windows NT 4.0', r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/ },
            { s: 'Windows CE', r: /Windows CE/ },// 微软掌上电脑
            { s: 'Windows 3.11', r: /Win16/ },
            { s: 'Android', r: /Android/ },
            { s: 'Open BSD', r: /OpenBSD/ },
            { s: 'Sun OS', r: /SunOS/ },
            { s: 'Linux', r: /(Linux|X11)/ },
            { s: 'IOS', r: /(iPhone|iPad|iPod)/ },
            { s: 'Mac OS X', r: /Mac OS X/ },
            { s: 'Mac OS', r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/ },
            { s: 'QNX', r: /QNX/ },
            { s: 'UNIX', r: /UNIX/ },
            { s: 'BeOS', r: /BeOS/ },
            { s: 'OS/2', r: /OS\/2/ },
            { s: 'Search Bot', r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/ },
        ];

        var os;
        var osVersion;

        for (var id in clientStrings) {
            var cs = clientStrings[id];

            // 注意不要用ua，ua是小写化
            if (cs.r.test(navigator.userAgent)) {
                os = cs.s;
                break;
            }
        }

        if (/Windows/.test(os)) {
            osVersion = /Windows (.*)/.exec(os)[1];
            os = 'Windows';
        }

        switch (os) {
            case 'Mac OS X':
                osVersion = /Mac OS X (10[\.\_\d]+)/.exec(navigator.userAgent)[1];
                break;

            case 'Android':
                osVersion = /Android ([\.\_\d]+)/.exec(navigator.userAgent)[1];
                break;

            case 'IOS':
                osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(navigator.appVersion);
                osVersion = osVersion[1] + '.' + osVersion[2] + '.' + (osVersion[3] | 0);
                break;
        }

        boInfo.OS = os;
        boInfo.OS_VERSION = osVersion;

        /**
         * 3.获取网络类型
         */

        var ua = navigator.userAgent;
        var networkStr = ua.match(/NetType\/\w+/) ? ua.match(/NetType\/\w+/)[0] : 'NetType/other';
        networkStr = networkStr.toLowerCase().replace('nettype/', '');
        var networkType;
        switch (networkStr) {
            case 'wifi':
                networkType = 'wifi';
                break;
            case '4g':
                networkType = '4g';
                break;
            case '3g':
                networkType = '3g';
                break;
            case '3gnet':
                networkType = '3g';
                break;
            case '2g':
                networkType = '2g';
                break;
            default:
                networkType = 'other';
        }

        boInfo.NETWORK_TYPE = networkType;

        return boInfo;
    } catch (error) {
        console.error(error);
    }
})()

