

/**
 * 组合后台产品类型及子类型 字段
 * @param {*} type 
 * @param {*} subtype 
 */
h5Detail.handelPrdType = function (type, subtype) {
    if (type == "4") {
        return `${type}-${subtype}`
    } else {
        return type;
    }
}


/**
 * 跳转到H5产品详情页
 * @param {Obj} options 选项参数
 * 
 * 注意：链接中PRD_INDEX_ID参数字段原生在用。必加字段。
 */

export default function h5Detail (prdType = "", options = {}) {

    let defaultOptions = {
        ID: "",
        PRD_INDEX_ID: "",
        ORG_ID: "",
        RATE_ID: "",
        MEN_COUPON_ID: "",
        h5HandleRightItems: "1",
        _k: "1"
    }

    let prdTypes = {
        // 货币基金
        "1": "prdCurrencyFund",
        // 理财产品
        "2": "prdManageMoney",
        // 纯债基金
        "3": "prdPuredebtFund",
        // 保险理财
        "5": "prdInsuranceMoney",
        // 投融资
        "6": "prdInvestmentFinancing",
        // 组合购买
        "7": "prdDoubleBuy",

        // 活期存款
        "4-1": "prdCurrentDeposit",
        // 智能存款
        "4-2": "prdIntelligentDeposit",
        // 结构性存款
        "4-3": "prdStructuredDeposits",
        // 定期
        "4-4": "prdFixedTermDeposit",
        // 大额存款
        "4-5": "prdLargeDeposits",
    }
    let h5DetailUrl = this.$conf.activityUrls.h5DetailUrl;

    let prdTypeRoute = prdTypes[prdType];

    if (!prdTypeRoute) {
        this.$showTips("产品类型错误");
        return;
    }

    let url = h5DetailUrl + `#/${prdTypeRoute}`;
    url += this.$utils.createQueryStr({ ...defaultOptions, ...options }, "?");// 返回示例：?a=1&b=2
    url += `&ACTITY_CODE=${this.$Config.actityCode}`;


    console.debug(`🐧🐧🐧🐧🐧🐧🐧🐧🐧🐧🐧🐧🐧🐧🐧\n`, `产品详情页跳转地址\n`, `${url}\n`);
    this.$openWebview(url);
}
