

/**
 * 项目配置文件
 */

const CONFIG = {
    v: "1.1.0(build Time 2019-08-13 17:18)",
    //开发环境配置
    development: {
        NODE_ENV: process.env.NODE_ENV,
        // 活动code
        actityCode: "COLLAGE_CLUB_ACTIVITY",
        // api host
        baseUrlHost: "https://app-test4.bicai365.com",
        // baseUrlHost: "http://192.168.5.22:8080",
        // baseUrlHost: "http://192.168.100.249:8989",
        // baseUrlHost: "http://easy-mock.liuup.com/mock/5dcbc5480a2f9f42cfec18ae/mainvenue",
        // api path
        baseUrlPath: "/finsuitPhone/deal",
        baseUrlPath: "/finsuit/finsuitPhone/deal",
        // 阿里云静态文件地址
        aliyuncHost: "https://finsuit-test.oss-cn-beijing.aliyuncs.com/",
        // 预约抢券
        collectCouponHost: (window.location.protocol + '//' + window.location.host) + "/collectCoupon.html",
        // 投资记录
        activityHistoryHost: (window.location.protocol + '//' + window.location.host) + "/activityHistory.html",
        // 活动攻略
        mainvenueh5: (window.location.protocol + '//' + window.location.host) + "/mainvenueh5.html",
        // 新手分会场链接
        nps: "https://finsuit.bicai365.com/nps/index.html",
        // 单单返分会场链接
        ddf: "https://finsuit.bicai365.com/ddf/index.html",
        // 比财拼团分会场首页
        nay: "https://finsuit.bicai365.com/nay/index.html",
        // 比财零花钱页面地址
        gotoSuperAccount: "https://app-test1.bicai365.com/asset/index.html"
    },

    //测试环境配置
    productionTest: {
        NODE_ENV: process.env.NODE_ENV,
        // 活动code
        actityCode: "COLLAGE_CLUB_ACTIVITY",
        // api host
        baseUrlHost: (window.location.protocol + '//' + window.location.host),
        // api path
        baseUrlPath: "/finsuit/finsuitPhone/deal",
        // 阿里云静态文件地址
        aliyuncHost: "https://finsuit-test.oss-cn-beijing.aliyuncs.com/",
        // 预约抢券
        collectCouponHost: (window.location.protocol + '//' + window.location.host) + "/activity/collectCoupon/index.html",
        // 投资记录
        activityHistoryHost: (window.location.protocol + '//' + window.location.host) + "/activity/activityHistory/index.html",
        // 活动攻略
        mainvenueh5: (window.location.protocol + '//' + window.location.host) + "/activity/mainvenueh5/index.html",
        // 新手分会场链接
        nps: (window.location.protocol + '//' + window.location.host) + "/nps/index.html",
        // 单单返
        ddf: (window.location.protocol + '//' + window.location.host) + "/ddf/index.html",
        // 比财拼团分会场首页
        nay: (window.location.protocol + '//' + window.location.host) + "/nay/index.html",
        // 比财零花钱页面地址
        gotoSuperAccount: (window.location.protocol + '//' + window.location.host) + "/asset/index.html"
    },

    //生产环境配置
    production: {
        NODE_ENV: process.env.NODE_ENV,
        // 活动code
        actityCode: "COLLAGE_CLUB_ACTIVITY",
        // api host
        baseUrlHost: (window.location.protocol + '//' + window.location.host),
        // api path
        baseUrlPath: "/finsuit/finsuitPhone/deal",
        // 阿里云静态文件地址
        aliyuncHost: "https://finsuit.oss-cn-beijing.aliyuncs.com/",
        // 预约抢券
        collectCouponHost: (window.location.protocol + '//' + window.location.host) + "/activity/collectCoupon/index.html",
        // 投资记录
        activityHistoryHost: (window.location.protocol + '//' + window.location.host) + "/activity/activityHistory/index.html",
        // 活动攻略
        mainvenueh5: (window.location.protocol + '//' + window.location.host) + "/activity/mainvenueh5/index.html",
        // 新手分会场链接
        nps: (window.location.protocol + '//' + window.location.host) + "/nps/index.html",
        // 单单返
        ddf: (window.location.protocol + '//' + window.location.host) + "/ddf/index.html",
        // 比财拼团分会场首页
        nay: (window.location.protocol + '//' + window.location.host) + "/nay/index.html",
        // 比财零花钱页面地址
        gotoSuperAccount: (window.location.protocol + '//' + window.location.host) + "/asset/index.html"
    }
}
export default CONFIG[process.env.NODE_ENV];