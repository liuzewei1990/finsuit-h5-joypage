
import CallApp from "callapp-lib"


/**微信内：
 * 安卓微信可以打开App（无法打开指定的页面）, 点击打开-跳转到应用宝-应用宝唤起App
 * Ios微信跳转到apple store（无法打开指定的页面）, 点击打开-提示即将离开微信，是否跳转到apple store下载
 */

/**
 * 浏览器内：
 * 安卓可以打开浏览器并到指定的页面，点击打开-通过URL scheme打开。
 * Ios 可以打开浏览器并到指定的页面，点击打开-通过URL scheme打开。
 */


/**
 * 比财
 */
const bicai = new CallApp({
    scheme: { protocol: "besharp", host: "finsuit" },
    intent: {
        package: "com.bs.finance",
        scheme: "besharp"
    },
    timeout: 2000,
    //apple store
    appstore: "https://itunes.apple.com/cn/app/%E6%AF%94%E8%B4%A2/id1149189800?mt=8",
    //应用宝
    yingyongbao: "https://android.myapp.com/myapp/detail.htm?apkName=com.bs.finance",
    fallback: "https://finsuit.bicai365.com/activity/downloadApp/index.html?FROM_APP_FLAG=BC" //唤端失败后跳转的地址
});

/**
 * 拼财
 */
const pincai = new CallApp({
    scheme: { protocol: "pincai", host: "finsuit" },
    intent: {
        package: "com.pc.finance",
        scheme: "pincai"
    },
    timeout: 2000,
    //apple store
    appstore: "https://itunes.apple.com/app/id1450232395?mt=8",
    //应用宝
    yingyongbao: "https://android.myapp.com/myapp/detail.htm?apkName=com.pc.finance&apkCode=108",
    fallback: "https://finsuit.bicai365.com/activity/downloadApp/index.html?FROM_APP_FLAG=PC" //唤端失败后跳转的地址
})


export default { bicai, pincai }
