

/**
 * 项目配置文件
 */

const CONFIG = {
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
    }
}
export default CONFIG[process.env.NODE_ENV];