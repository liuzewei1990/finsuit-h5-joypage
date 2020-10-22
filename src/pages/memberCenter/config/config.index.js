

/**
 * 项目配置文件
 */

const CONFIG = {
    //开发环境配置
    development: {
        NODE_ENV: process.env.NODE_ENV,
        // 活动code
        actityCode: "ACTIVITY_TASK",
        // api host
        baseUrlHost: "https://app-test4.bicai365.com",
        // baseUrlHost: "http://192.168.5.22:8080",
        // baseUrlHost: "http://192.168.100.249:8989",
        baseUrlHost: "http://easy-mock.liuup.com/mock/5ebbbf1e339f163501d4fffe/taskCenter",
        // api path
        baseUrlPath: "/finsuitPhone/deal",
        baseUrlPath: "/finsuit/finsuitPhone/deal",
        // 阿里云静态文件地址
        aliyuncHost: "https://finsuit-test.oss-cn-beijing.aliyuncs.com/",

        // 零花钱地址
        linghuaqianUrl: (window.location.protocol + '//' + window.location.host) + "/linghuaqian.html",
        // 每日一题地址
        topicUrl: (window.location.protocol + '//' + window.location.host) + "/topic.html",
        // 包装页服务器地址
        producdDetailHost: "https://finsuit.bicai365.com",

    },

    //测试环境配置
    productionTest: {
        NODE_ENV: process.env.NODE_ENV,
        // 活动code
        actityCode: "ACTIVITY_TASK",
        // api host
        baseUrlHost: (window.location.protocol + '//' + window.location.host),
        // api path
        baseUrlPath: "/finsuit/finsuitPhone/deal",
        // 阿里云静态文件地址
        aliyuncHost: "https://finsuit-test.oss-cn-beijing.aliyuncs.com/",
        // 零花钱地址
        linghuaqianUrl: (window.location.protocol + '//' + window.location.host) + "/activity/linghuaqian/index.html",
        // 每日一题地址
        topicUrl: (window.location.protocol + '//' + window.location.host) + "/activity/topic/index.html",
        // 包装页服务器地址
        producdDetailHost: (window.location.protocol + '//' + window.location.host),
    },

    //生产环境配置
    production: {
        NODE_ENV: process.env.NODE_ENV,
        // 活动code
        actityCode: "ACTIVITY_TASK",
        // api host
        baseUrlHost: (window.location.protocol + '//' + window.location.host),
        // api path
        baseUrlPath: "/finsuit/finsuitPhone/deal",
        // 阿里云静态文件地址
        aliyuncHost: "https://finsuit.oss-cn-beijing.aliyuncs.com/",
        // 零花钱地址
        linghuaqianUrl: (window.location.protocol + '//' + window.location.host) + "/activity/linghuaqian/index.html",
        // 每日一题地址
        topicUrl: (window.location.protocol + '//' + window.location.host) + "/activity/topic/index.html",
        // 包装页服务器地址
        producdDetailHost: (window.location.protocol + '//' + window.location.host),
    }
}
export default CONFIG[process.env.NODE_ENV];