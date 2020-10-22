

/**
 * 项目配置文件
 */

const CONFIG = {
    v: "1.1 (build Time 2019-10-11 16:21)",
    //开发环境配置
    development: {
        NODE_ENV: process.env.NODE_ENV,
        // 活动code
        actityCode: "ANSWER_ACTIVITY",
        // 活动Id
        actityId: "1010",
        // api host
        baseUrlHost: "https://app-test4.bicai365.com",
        // baseUrlHost: "http://192.168.5.22:8080",
        // baseUrlHost: "http://192.168.100.249:8989",
        baseUrlHost: "http://easy-mock.liuup.com/mock/5d352de7d360c27a130ae973/oneTopic",
        // api path
        baseUrlPath: "/finsuitPhone/deal",
        baseUrlPath: "/finsuit/finsuitPhone/deal",
        // 阿里云静态文件地址
        aliyuncHost: "https://finsuit-test.oss-cn-beijing.aliyuncs.com/",

        // 当前活动地址
        currActityUrl: "activity/topic/",

        // 公共页面地址
        commonPageUrl: (window.location.protocol + '//' + window.location.host) + "/commonPage.html",
        // 比财零花钱页面地址
        gotoSuperAccount: "https://finsuit.bicai365.com/asset/index.html",
        // 券地址
        useCouponsUrl: "https://finsuit.bicai365.com/activity/useCoupons/index.html",
    },

    //测试环境配置
    productionTest: {
        NODE_ENV: process.env.NODE_ENV,
        // 活动code
        actityCode: "ANSWER_ACTIVITY",
        // 活动Id
        actityId: "1010",
        // api host
        baseUrlHost: (window.location.protocol + '//' + window.location.host),
        // api path
        baseUrlPath: "/finsuit/finsuitPhone/deal",
        // 阿里云静态文件地址
        aliyuncHost: "https://finsuit-test.oss-cn-beijing.aliyuncs.com/",

        // 当前活动地址
        currActityUrl: "activity/topic/",

        // 公共页面地址
        commonPageUrl: (window.location.protocol + '//' + window.location.host) + "/activity/commonPage/index.html",
        // 比财零花钱页面地址
        gotoSuperAccount: (window.location.protocol + '//' + window.location.host) + "/asset/index.html",
        // 券地址
        useCouponsUrl: (window.location.protocol + '//' + window.location.host) + "/activity/useCoupons/index.html",
    },

    //生产环境配置
    production: {
        NODE_ENV: process.env.NODE_ENV,
        // 活动code
        actityCode: "ANSWER_ACTIVITY",
        // 活动Id
        actityId: "1010",
        // api host
        baseUrlHost: (window.location.protocol + '//' + window.location.host),
        // api path
        baseUrlPath: "/finsuit/finsuitPhone/deal",
        // 阿里云静态文件地址
        aliyuncHost: "https://finsuit.oss-cn-beijing.aliyuncs.com/",

        // 当前活动地址
        currActityUrl: "activity/topic/",

        // 公共页面地址
        commonPageUrl: (window.location.protocol + '//' + window.location.host) + "/activity/commonPage/index.html",
        // 比财零花钱页面地址
        gotoSuperAccount: (window.location.protocol + '//' + window.location.host) + "/asset/index.html",
        // 券地址
        useCouponsUrl: (window.location.protocol + '//' + window.location.host) + "/activity/useCoupons/index.html",
    }
}
export default CONFIG[process.env.NODE_ENV];



