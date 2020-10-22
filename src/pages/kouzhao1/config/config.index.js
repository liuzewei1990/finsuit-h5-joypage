/**
 * 项目配置文件
 */

const CONFIG = {
    //开发环境配置
    development: {
        NODE_ENV: process.env.NODE_ENV,
        // 口罩活动code
        actityCode: "MASK_ACTIVITY",
        // api host
        baseUrlHost: "https://app-test4.bicai365.com",
        // baseUrlHost: "http://192.168.5.22:8080",
        // baseUrlHost: "http://192.168.100.249:8989",
        // baseUrlHost: "http://easy-mock.liuup.com/mock/5e6b5656b7eeed4e76fec6bd/kouzhao",
        // api path
        baseUrlPath: "/finsuitPhone/deal",
        baseUrlPath: "/finsuit/finsuitPhone/deal",
        // 阿里云静态文件地址
        aliyuncHost: "https://finsuit-test.oss-cn-beijing.aliyuncs.com/",
        // 口罩活动地址
        kouzhaoHost: 'http://192.168.10.103:8080/kouzhao1.html',
        // 包装页地址
        producdDetailHost: 'https://app-test4.bicai365.com',
        // 零花钱地址
        xktHost: 'https://app-test4.bicai365.com/xkt/index.html',
    },

    //测试环境配置
    productionTest: {
        NODE_ENV: process.env.NODE_ENV,
        // 口罩活动code
        actityCode: "MASK_ACTIVITY",
        // api host
        baseUrlHost: (window.location.protocol + '//' + window.location.host),
        // api path
        baseUrlPath: "/finsuit/finsuitPhone/deal",
        // 阿里云静态文件地址
        aliyuncHost: "https://finsuit-test.oss-cn-beijing.aliyuncs.com/",
        // 口罩活动地址
        kouzhaoHost: (window.location.protocol + '//' + window.location.host) + "/activity/kouzhao1/index.html",
        // 包装页地址
        producdDetailHost: (window.location.protocol + '//' + window.location.host),
        // 零花钱地址
        xktHost: (window.location.protocol + '//' + window.location.host) + "/xkt/index.html",
    },

    //生产环境配置
    production: {
        NODE_ENV: process.env.NODE_ENV,
        // 口罩活动code
        actityCode: "MASK_ACTIVITY",
        // api host
        baseUrlHost: (window.location.protocol + '//' + window.location.host),
        // api path
        baseUrlPath: "/finsuit/finsuitPhone/deal",
        // 阿里云静态文件地址
        aliyuncHost: "https://finsuit.oss-cn-beijing.aliyuncs.com/",
        // 口罩活动地址
        kouzhaoHost: (window.location.protocol + '//' + window.location.host) + "/activity/kouzhao1/index.html",
        // 包装页地址
        producdDetailHost: (window.location.protocol + '//' + window.location.host),
        // 零花钱地址
        xktHost: (window.location.protocol + '//' + window.location.host) + "/xkt/index.html",
    }
}
export default CONFIG[process.env.NODE_ENV];
