/**
 * 项目配置文件
 */

const CONFIG = {
    v: "1.1.0(build Time 2019-08-13 17:18)",
    //开发环境配置
    development: {
        NODE_ENV: process.env.NODE_ENV,
        // 活动code
        actityCode: "ACTITY_RECORD",
        // api host
        baseUrlHost: "https://graytest.bicai365.com",
        // baseUrlHost: "http://192.168.5.22:8080",
        // baseUrlHost: "http://192.168.5.44:8080",
        // baseUrlHost: "http://easy-mock.liuup.com/mock/5dbd3d460a2f9f42cfec17ff/activityHistory",
        // api path
        baseUrlPath: "/finsuitPhone/deal",
        baseUrlPath: "/finsuit/finsuitPhone/deal",
        // 阿里云静态文件地址
        aliyuncHost: "https://finsuit-test.oss-cn-beijing.aliyuncs.com/"
    },

    //测试环境配置
    productionTest: {
        NODE_ENV: process.env.NODE_ENV,
        // 活动code
        actityCode: "ACTITY_RECORD",
        // api host
        baseUrlHost: (window.location.protocol + '//' + window.location.host),
        // api path
        baseUrlPath: "/finsuit/finsuitPhone/deal",
        // 阿里云静态文件地址
        aliyuncHost: "https://finsuit-test.oss-cn-beijing.aliyuncs.com/"
    },

    //生产环境配置
    production: {
        NODE_ENV: process.env.NODE_ENV,
        // 活动code
        actityCode: "ACTITY_RECORD",
        // api host
        baseUrlHost: (window.location.protocol + '//' + window.location.host),
        // api path
        baseUrlPath: "/finsuit/finsuitPhone/deal",
        // 阿里云静态文件地址
        aliyuncHost: "https://finsuit.oss-cn-beijing.aliyuncs.com/"
    }
}
export default CONFIG[process.env.NODE_ENV];
