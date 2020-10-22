

/**
 * 项目配置文件
 */

const CONFIG = {
    //开发环境配置
    development: {
        NODE_ENV: process.env.NODE_ENV,
        // 活动code
        actityCode: "ACTIVITY_CHENTER_CODE",
        // api host
        baseUrlHost: "https://app-test3.bicai365.com",
        // baseUrlHost: "http://192.168.5.45:8080",
        // baseUrlHost: "http://192.168.100.249:8989",
        baseUrlHost: "http://easy-mock.liuup.com/mock/5d8202530a2f9f42cfec1627/activityCenter",
        // api path
        baseUrlPath: "/finsuitPhone/deal",
        baseUrlPath: "/finsuit/finsuitPhone/deal",
        // 阿里云静态文件地址
        aliyuncHost: "https://finsuit-test.oss-cn-beijing.aliyuncs.com/",
        // 资讯模块页面地址
        newsServerHost: (window.location.protocol + '//' + window.location.host) + "/news.html"
    },

    //测试环境配置
    productionTest: {
        NODE_ENV: process.env.NODE_ENV,
        // 活动code
        actityCode: "ACTIVITY_CHENTER_CODE",
        // api host
        baseUrlHost: (window.location.protocol + '//' + window.location.host),
        // api path
        baseUrlPath: "/finsuit/finsuitPhone/deal",
        // 阿里云静态文件地址
        aliyuncHost: "https://finsuit-test.oss-cn-beijing.aliyuncs.com/",
        // 资讯模块页面地址
        newsServerHost: (window.location.protocol + '//' + window.location.host) + "/activity/news/index.html"
    },

    //生产环境配置
    production: {
        NODE_ENV: process.env.NODE_ENV,
        // 活动code
        actityCode: "ACTIVITY_CHENTER_CODE",
        // api host
        baseUrlHost: (window.location.protocol + '//' + window.location.host),
        // api path
        baseUrlPath: "/finsuit/finsuitPhone/deal",
        // 阿里云静态文件地址
        aliyuncHost: "https://finsuit.oss-cn-beijing.aliyuncs.com/",
        // 资讯模块页面地址
        newsServerHost: (window.location.protocol + '//' + window.location.host) + "/activity/news/index.html"
    }
}
export default CONFIG[process.env.NODE_ENV];