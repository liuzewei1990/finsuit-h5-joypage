/**
 * 项目配置文件
 */

const CONFIG = {
    v: "1.1.0(build Time 2019-08-13 17:18)",
    //开发环境配置
    development: {
        NODE_ENV: process.env.NODE_ENV,
        // 活动code
        actityCode: "ANSWER_ACTIVITY",
        // api host
        // baseUrlHost: "https://app-test4.bicai365.com",
        // baseUrlHost: "http://192.168.5.22:8080",
        // baseUrlHost: "http://192.168.100.249:8989",
        baseUrlHost: "http://easy-mock.liuup.com/mock/5f8d4fb1fbb9ab35953bf251/inviteUsers/inviteUsers",
        // 新手专享
        baseUrlHostNps: (window.location.protocol + '//' + window.location.host + "/nps"),
        // api path
        // baseUrlPath: "/finsuitPhone/deal",
        // baseUrlPath: "/finsuit/finsuitPhone/deal",
        // 阿里云静态文件地址
        aliyuncHost: "https://finsuit-test.oss-cn-beijing.aliyuncs.com/",
        realNameAuthHost: "https://finsuit.bicai365.com",
    },

    //测试环境配置
    productionTest: {
        NODE_ENV: process.env.NODE_ENV,
        // 活动code
        actityCode: "EARN",
        // api host
        baseUrlHost: (window.location.protocol + '//' + window.location.host),
        // 新手专享
        baseUrlHostNps: (window.location.protocol + '//' + window.location.host + "/nps"),
        // api path
        baseUrlPath: "/finsuit/finsuitPhone/deal",
        // 阿里云静态文件地址
        aliyuncHost: "https://finsuit-test.oss-cn-beijing.aliyuncs.com/",
        realNameAuthHost: (window.location.protocol + '//' + window.location.host),
    },

    //生产环境配置
    production: {
        NODE_ENV: process.env.NODE_ENV,
        // 活动code
        actityCode: "EARN",
        // api host
        baseUrlHost: (window.location.protocol + '//' + window.location.host),
        // 新手专享
        baseUrlHostNps: (window.location.protocol + '//' + window.location.host + "/nps"),
        // api path
        baseUrlPath: "/finsuit/finsuitPhone/deal",
        // 阿里云静态文件地址
        aliyuncHost: "https://finsuit.oss-cn-beijing.aliyuncs.com/",
        realNameAuthHost: (window.location.protocol + '//' + window.location.host),
    }
}
export default CONFIG[process.env.NODE_ENV];
