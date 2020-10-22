

/**
 * 项目配置文件
 */

const CONFIG = {
    v: "1.1.0(build Time 2019-08-13 17:18)",
    //开发环境配置
    development: {
        NODE_ENV: process.env.NODE_ENV,
        // 活动code
        actityCode: "",
        // api host
        baseUrlHost: "https://app-test4.bicai365.com",
        // baseUrlHost: "http://192.168.5.22:8080",
        // baseUrlHost: "http://192.168.100.249:8989",
        // baseUrlHost: "http://easy-mock.liuup.com/mock/5edf533c339f163501d50145/teamItem",
        // api path
        baseUrlPath: "/finsuitPhone/deal",
        baseUrlPath: "/finsuit/finsuitPhone/deal",
        // 阿里云静态文件地址
        aliyuncHost: "https://finsuit-test.oss-cn-beijing.aliyuncs.com/",

        // 包装页地址【拼人数】
        prsDetailUrl: "https://finsuit.bicai365.com/prs/index.html",
        // 包装页服务器地址
        producdDetailHost: "https://finsuit.bicai365.com",
        // 拼财app地址
        pincaiUrl: "https://finsuit.bicai365.com/activity/pincai/index.html",
        // 拼团活动
        teamItemUrl: "http://192.168.137.1:8080/teamItem.html",
        // 活动投资
        activityHistoryUrl: "https://finsuit.bicai365.com/activity/activityHistory/index.html",
        // 比财零花钱页面地址
        gotoSuperAccount: "https://finsuit.bicai365.com/asset/index.html"
    },

    //测试环境配置
    productionTest: {
        NODE_ENV: process.env.NODE_ENV,
        // 活动code
        actityCode: "",
        // api host
        baseUrlHost: (window.location.protocol + '//' + window.location.host),
        // api path
        baseUrlPath: "/finsuit/finsuitPhone/deal",
        // 阿里云静态文件地址
        aliyuncHost: "https://finsuit-test.oss-cn-beijing.aliyuncs.com/",

        // 包装页地址【拼人数】
        prsDetailUrl: (window.location.protocol + '//' + window.location.host) + "/prs/index.html",
        // 包装页服务器地址
        producdDetailHost: (window.location.protocol + '//' + window.location.host),
        // 拼财app地址
        pincaiUrl: (window.location.protocol + '//' + window.location.host) + "/activity/pincai/index.html",
        // 拼团活动
        teamItemUrl: (window.location.protocol + '//' + window.location.host) + "/activity/teamItem/index.html",
        // 活动投资
        activityHistoryUrl: (window.location.protocol + '//' + window.location.host) + "/activity/activityHistory/index.html",
        // 比财零花钱页面地址
        gotoSuperAccount: (window.location.protocol + '//' + window.location.host) + "/asset/index.html"
    },

    //生产环境配置
    production: {
        NODE_ENV: process.env.NODE_ENV,
        // 活动code
        actityCode: "",
        // api host
        baseUrlHost: (window.location.protocol + '//' + window.location.host),
        // api path
        baseUrlPath: "/finsuit/finsuitPhone/deal",
        // 阿里云静态文件地址
        aliyuncHost: "https://finsuit.oss-cn-beijing.aliyuncs.com/",

        // 包装页地址【拼人数】
        prsDetailUrl: (window.location.protocol + '//' + window.location.host) + "/prs/index.html",
        // 包装页服务器地址
        producdDetailHost: (window.location.protocol + '//' + window.location.host),
        // 拼财app地址
        pincaiUrl: (window.location.protocol + '//' + window.location.host) + "/activity/pincai/index.html",
        // 拼团活动
        teamItemUrl: (window.location.protocol + '//' + window.location.host) + "/activity/teamItem/index.html",
        // 活动投资
        activityHistoryUrl: (window.location.protocol + '//' + window.location.host) + "/activity/activityHistory/index.html",
        // 比财零花钱页面地址
        gotoSuperAccount: (window.location.protocol + '//' + window.location.host) + "/asset/index.html"
    }
}
export default CONFIG[process.env.NODE_ENV];