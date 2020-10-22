export default function (params) {
    let prdType = {
        "1": "prdCurrencyFund", //货币基金
        "2": "prdManageMoney", //理财产品
        "3": "prdPuredebtFund", //纯债基金
        "5": "prdInsuranceMoney", //保险理财
        "6": "prdInvestmentFinancing", //投融资
        "8": "prdCurrentDeposit", //活期存款
        "9": "prdIntelligentDeposit", //智能存款
        "10": "prdStructuredDeposits", //结构性存款
        "11": "prdFixedTermDeposit" //定期存款
        // "12": "" //大额存单存款
    }
    if (!prdType[params]) {
        this.$showTips("产品类型错误");
        return;
    }

    return window.location.protocol + "//" + window.location.host + "/products/#/" + prdType[params]
    // return "https://finsuit.bicai365.com/products/#/" + prdType[params]
}


// prdCurrencyFund 货币基金
// prdCurrentDeposit 活期存款
// prdFixedTermDeposit 定期存款
// prdInsuranceMoney 保险理财
// prdIntelligentDeposit 智能存款
// prdInvestmentFinancing 投融资
// prdLargeDeposits 大额存单
// prdManageMoney 理财产品
// prdPuredebtFund 纯债基金
// prdStructuredDeposits 结构性存款
//接口： 产品类型id 1 - 货币基金 2 - 理财产品 3 - 纯债基金 5 - 保险理财 6 - 投融资 8 - 活期存款 9 - 智能存款 10 - 结构性存款 11 - 定期存款 12 - 大额存单存款
