/**
 * 项目配置文件
 */

const CONFIG = {
    //开发环境配置
    development: {
        NODE_ENV: process.env.NODE_ENV,
        // 资讯模块页面地址?
        newsServerUrl: "https://finsuit.bicai365.com/activity/news/index.html",
        // 卡券地址
        cardBaseUrl: "https://finsuit.bicai365.com/tcc/#/coupons_index",
        //  口罩
        kouzhaoUrl: "https://finsuit.bicai365.com/activity/kouzhao1/index.html",
        // 包装页地址【拼人数】
        prsDetailUrl: "https://finsuit.bicai365.com/prs/#/prs_detail",
        // 包装页服务器地址【拼金额--比财】
        personalUrl: "https://finsuit.bicai365.com/nay/#/personal",
        // 包装页服务器地址【拼金额--拼财】
        personalUrl: "https://finsuit.bicai365.com/pc/#/personal",
        // 包装页服务器地址【拼金额--小程序】
        personalUrl: "https://finsuit.bicai365.com/mp/#/personal",
        // 拼财app地址
        pchomeUrl: "https://finsuit.bicai365.com/activity/pchome/index.html",
        // 拼团活动
        teamItemUrl: "https://finsuit.bicai365.com/activity/teamItem/index.html",
        // 活动投资
        activityHistoryUrl: "https://finsuit.bicai365.com/activity/activityHistory/index.html",
        // 比财零花钱页面地址?
        linghuaqianUrl: "https://finsuit.bicai365.com/activity/linghuaqian/index.html",
        // 连连赚
        llzUrl: "https://finsuit.bicai365.com/activity/llz/index.html",
        // 每日一题
        topicUrl: "https://finsuit.bicai365.com/activity/topic/index.html",
        // 新手专享
        npsUrl: "https://finsuit.bicai365.com/nps/",
        // 任务中心
        oneTaskUrl: "https://finsuit.bicai365.com/activity/oneTask/index.html",
        // 个投
        aloneItemUrl: "https://finsuit.bicai365.com/activity/aloneItem/index.html",
        // 预约领券
        collectCouponUrl: "https://finsuit.bicai365.com/activity/collectCoupon/index.html",
        // 公共页面
        commonPageUrl: "https://finsuit.bicai365.com/activity/commonPage/index.html",
        // 村村乐
        cuncunleUrl: "https://finsuit.bicai365.com/activity/cuncunle/index.html",
        // 下载引导页
        downloadAppUrl: "https://finsuit.bicai365.com/activity/downloadApp/index.html",
        // 红包裂变
        redPacketFissionUrl: "https://finsuit.bicai365.com/activity/redPacketFission/index.html",
        // 会员中心
        memberCenterUrl: "https://finsuit.bicai365.com/activity/memberCenter/index.html",
        // 活动中心列表
        activityListUrl: "https://finsuit.bicai365.com/activity/activityList/index.html",

        // 产品详情页
        h5DetailUrl: "https://finsuit.bicai365.com/products/",
    },

    //测试环境配置
    productionTest: {
        NODE_ENV: process.env.NODE_ENV,
        // 资讯模块页面地址
        newsUrl: (window.location.protocol + '//' + window.location.host) + "/activity/news/index.html",
        // 卡券地址
        cardBaseUrl: (window.location.protocol + '//' + window.location.host) + "/tcc/#/coupons_index",
        //  口罩
        kouzhaoUrl: (window.location.protocol + '//' + window.location.host) + "/activity/kouzhao1/index.html",
        // 包装页地址【拼人数】
        prsDetailUrl: (window.location.protocol + '//' + window.location.host) + "/prs/#/prs_detail",
        // 包装页服务器地址【拼金额--比财】
        personalUrl: (window.location.protocol + '//' + window.location.host) + "/nay/#/personal ",
        // 包装页服务器地址【拼金额--拼财】
        personalUrl: (window.location.protocol + '//' + window.location.host) + "/pc/#/personal ",
        // 包装页服务器地址【拼金额--小程序】
        personalUrl: (window.location.protocol + '//' + window.location.host) + "/mp/#/personal ",
        // 拼财app首页
        pchomeUrl: (window.location.protocol + '//' + window.location.host) + "/activity/pchome/index.html",
        // 拼团活动
        teamItemUrl: (window.location.protocol + '//' + window.location.host) + "/activity/teamItem/index.html",
        // 活动投资
        activityHistoryUrl: (window.location.protocol + '//' + window.location.host) + "/activity/activityHistory/index.html",
        // 比财零花钱页面地址
        linghuaqianUrl: (window.location.protocol + '//' + window.location.host) + "/activity/linghuaqian/index.html",
        // 连连赚
        llzUrl: (window.location.protocol + '//' + window.location.host) + "/activity/llz/index.html",
        // 每日一题
        topicUrl: (window.location.protocol + '//' + window.location.host) + "/activity/topic/index.html",
        // 新手专享
        npsUrl: (window.location.protocol + '//' + window.location.host) + "/nps/",
        // 任务中心
        oneTaskUrl: (window.location.protocol + '//' + window.location.host) + "/activity/oneTask/index.html",
        // 个投
        aloneItemUrl: (window.location.protocol + '//' + window.location.host) + "/activity/aloneItem/index.html",
        // 预约领券
        collectCouponUrl: (window.location.protocol + '//' + window.location.host) + "/activity/collectCoupon/index.html",
        // 公共页面
        commonPageUrl: (window.location.protocol + '//' + window.location.host) + "/activity/commonPage/index.html",
        // 村村乐
        cuncunleUrl: (window.location.protocol + '//' + window.location.host) + "/activity/cuncunle/index.html",
        // 下载引导页
        downloadAppUrl: (window.location.protocol + '//' + window.location.host) + "/activity/downloadApp/index.html",
        // 红包裂变
        redPacketFissionUrl: (window.location.protocol + '//' + window.location.host) + "/activity/redPacketFission/index.html",
        // 会员中心
        memberCenterUrl: (window.location.protocol + '//' + window.location.host) + "/activity/memberCenter/index.html",
        // 活动中心列表
        activityListUrl: (window.location.protocol + '//' + window.location.host) + "/activity/activityList/index.html",

        // 产品详情页
        h5DetailUrl: (window.location.protocol + '//' + window.location.host) + "/products/",
    },

    //生产环境配置
    production: {
        NODE_ENV: process.env.NODE_ENV,
        // 资讯模块页面地址
        newsServerHost: (window.location.protocol + '//' + window.location.host) + "/activity/news/index.html",
        // 卡券地址
        cardBaseUrl: (window.location.protocol + '//' + window.location.host) + "/tcc/#/coupons_index",
        //  口罩
        kouzhaoUrl: (window.location.protocol + '//' + window.location.host) + "/activity/kouzhao1/index.html",
        // 包装页地址【拼人数】
        prsDetailUrl: (window.location.protocol + '//' + window.location.host) + "/prs/#/prs_detail",
        // 包装页服务器地址【拼金额--比财】
        personalUrl: (window.location.protocol + '//' + window.location.host) + "/nay/#/personal",
        // 包装页服务器地址【拼金额--拼财】
        personalUrl: (window.location.protocol + '//' + window.location.host) + "/pc/#/personal",
        // 包装页服务器地址【拼金额--小程序】
        personalUrl: (window.location.protocol + '//' + window.location.host) + "/mp/#/personal",
        // 拼财app地址
        pincaiUrl: (window.location.protocol + '//' + window.location.host) + "/activity/pchome/index.html",
        // 拼团活动
        teamItemUrl: (window.location.protocol + '//' + window.location.host) + "/activity/teamItem/index.html",
        // 活动投资
        activityHistoryUrl: (window.location.protocol + '//' + window.location.host) + "/activity/activityHistory/index.html",
        // 比财零花钱页面地址
        linghuaqianUrl: (window.location.protocol + '//' + window.location.host) + "/activity/linghuaqian/index.html",
        // 连连赚
        llzUrl: (window.location.protocol + '//' + window.location.host) + "/activity/llz/index.html",
        // 每日一题
        topicUrl: (window.location.protocol + '//' + window.location.host) + "/activity/topic/index.html",
        // 新手专享
        npsUrl: (window.location.protocol + '//' + window.location.host) + "/nps/",
        // 任务中心
        oneTaskUrl: (window.location.protocol + '//' + window.location.host) + "/activity/oneTask/index.html",
        // 个投
        aloneItemUrl: (window.location.protocol + '//' + window.location.host) + "/activity/aloneItem/index.html",
        // 预约领券
        collectCouponUrl: (window.location.protocol + '//' + window.location.host) + "/activity/collectCoupon/index.html",
        // 公共页面
        commonPageUrl: (window.location.protocol + '//' + window.location.host) + "/activity/commonPage/index.html",
        // 村村乐
        cuncunleUrl: (window.location.protocol + '//' + window.location.host) + "/activity/cuncunle/index.html",
        // 下载引导页
        downloadAppUrl: (window.location.protocol + '//' + window.location.host) + "/activity/downloadApp/index.html",
        // 红包裂变
        redPacketFissionUrl: (window.location.protocol + '//' + window.location.host) + "/activity/redPacketFission/index.html",
        // 会员中心
        memberCenterUrl: (window.location.protocol + '//' + window.location.host) + "/activity/memberCenter/index.html",
        // 活动中心列表
        activityListUrl: (window.location.protocol + '//' + window.location.host) + "/activity/activityList/index.html",

        // 产品详情页
        h5DetailUrl: (window.location.protocol + '//' + window.location.host) + "/products/",
    }
}
export default CONFIG[process.env.NODE_ENV];
