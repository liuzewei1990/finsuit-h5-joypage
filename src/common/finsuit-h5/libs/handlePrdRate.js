/**
 * 公共原型方法
 * 个投利率+加息处理
 */

export default {

    // 是否为汉字
    isTextReg: /[\u4e00-\u9fa5]/,
    // 是否为费率以及金额
    isRateReg: /(^[0-9]([0-9]+)?(\.[0-9]{1,10})?$)/,

    /**
     * 个投利率处理
     * @param {*} rateText 利率文案
     * @param {*} prdRate 利率
     */
    handlePrdRate (rateText, prdRate) {
        // 利率为汉字的情况
        if (rateText) return { type: "利率_汉字", value: rateText.slice(0, 10), unit: "" };
        // 利率为汉字的情况
        if (this.isTextReg.test(prdRate)) return { type: "利率_汉字", value: prdRate.slice(0, 10), unit: "" };
        // 利率的情况 0.21233
        if (this.isRateReg.test(prdRate)) return { type: "利率_数字", value: prdRate, unit: "%" };
        // 不在匹配条件中
        return false;
    },

    /**
     * 加息文案处理
     * @param {*} couponRate 加息文案
     */
    handleCouponRate (couponRate) {
        // 汉字的情况
        if (this.isTextReg.test(couponRate)) return { type: "加息_汉字", symbol: "+", value: couponRate.slice(0, 8), unit: "" };
        // 加息费率
        if (this.isRateReg.test(couponRate) && couponRate < 5) return { type: "加息_费率", symbol: "+", value: couponRate, unit: "%" };
        // 加息红包
        if (this.isRateReg.test(couponRate) && couponRate >= 5) return { type: "加息_红包", symbol: "+", value: couponRate, unit: "元" };
        // 不在匹配条件中
        return false;
    },


    /**
     * 处理 产品利率 和 加息类型 【现金券或加息券】 垃圾版本
     * @param {*} prdRate       产品利率
     * @param {*} couponType    加息类型
     * @param {*} couponRate    加息券
     * @param {*} couponAmount  现金券
     */
    handleRateAndCouponRate (prdRate, couponType, couponRate, couponAmount) {
        if (!this.isRateReg.test(prdRate)) {
            console.error("产品利率有误");
            return;
        }
        // 定购券
        if (couponType == "1" && this.isRateReg.test(couponAmount)) {
            return { type: "利率_红包", prdRate: prdRate, prdRateUnit: "%", symbol: "+", couponRate: couponAmount, couponRateUnit: "元" }
        }
        // 加息券
        else if (couponType == "2" && this.isRateReg.test(couponRate)) {
            return { type: "利率_利率", prdRate: prdRate, prdRateUnit: "%", symbol: "+", couponRate: couponRate, couponRateUnit: "%" }
        }
        // 无加息
        else {
            return { type: "利率", prdRate: prdRate, prdRateUnit: "%", symbol: "", couponRate: "", couponRateUnit: "" }
        }
    },

    /**
     * 处理 产品利率 和 加息类型 【现金券或加息券】 世帅版本
     * @param {*} prdRate       产品利率
     * @param {*} couponType    加息类型
     * @param {*} couponRate    加息券
     * @param {*} couponAmount  现金券
     */
    handlePrdRateAndCouponType (prdRate, couponType, couponValue) {
        if (!this.isRateReg.test(prdRate)) {
            console.error("产品利率有误");
            return;
        }
        // 定购券
        if (couponType == "1") {
            return { type: "利率_红包", prdRate: prdRate, prdRateUnit: "%", symbol: "+", couponRate: couponValue, couponRateUnit: "元" }
        }
        // 积分
        else if (couponType == "2") {
            return { type: "利率_红包", prdRate: prdRate, prdRateUnit: "%", symbol: "+", couponRate: couponValue, couponRateUnit: "积分" }
        }
        // 加息券
        else if (couponType == "3") {
            return { type: "利率_利率", prdRate: prdRate, prdRateUnit: "%", symbol: "+", couponRate: couponValue, couponRateUnit: "%" }
        }
        // 无加息
        else {
            return { type: "利率", prdRate: prdRate, prdRateUnit: "%", symbol: "", couponRate: "", couponRateUnit: "" }
        }
    },


    /**
     * 【拼团】 利率 + 加息组合法
     * @param {*} rateText 利率文案
     * @param {*} prdRate 利率
     * @param {*} couponRate 加息文案
     */
    handleTeamRateAndCouponRate (rateText, prdRate, couponRate) {
        prdRate = (rateText || prdRate) + "".slice(0, 10);
        couponRate = couponRate && (couponRate + "").slice(0, 8);

        // 情况一 ：利率 + 利率
        if (this.isRateReg.test(prdRate) && this.isRateReg.test(couponRate) && couponRate < 5)
            return { type: "利率_利率", prdRate: prdRate, prdRateUnit: "%", symbol: "+", couponRate: couponRate, couponRateUnit: "%" }
        // 情况二 ：利率 + 红包
        if (this.isRateReg.test(prdRate) && this.isRateReg.test(couponRate) && couponRate >= 5)
            return { type: "利率_红包", prdRate: prdRate, prdRateUnit: "%", symbol: "+", couponRate: couponRate, couponRateUnit: "%" }
        // 情况三 ：利率 + 汉字
        if (this.isRateReg.test(prdRate) && this.isTextReg.test(couponRate))
            return { type: "利率_文案", prdRate: prdRate, prdRateUnit: "%", symbol: "+", couponRate: couponRate, couponRateUnit: "" }
        // 情况四 ：利率
        if (this.isRateReg.test(prdRate) && !couponRate)
            return { type: "利率", prdRate: prdRate, prdRateUnit: "%", symbol: "", couponRate: "", couponRateUnit: "" }

        // 情况五 ：文案 + 利率
        if (this.isTextReg.test(prdRate) && this.isRateReg.test(couponRate) && couponRate < 5)
            return { type: "文案_利率", prdRate: prdRate, prdRateUnit: "", symbol: "+", couponRate: couponRate, couponRateUnit: "%" }
        // 情况六 ：文案 + 红包
        if (this.isTextReg.test(prdRate) && this.isRateReg.test(couponRate) && couponRate >= 5)
            return { type: "文案_红包", prdRate: prdRate, prdRateUnit: "", symbol: "+", couponRate: couponRate, couponRateUnit: "%" }
        // 情况七 ：文案 + 文案
        if (this.isTextReg.test(prdRate) && this.isTextReg.test(couponRate))
            return { type: "文案_文案", prdRate: prdRate, prdRateUnit: "", symbol: "+", couponRate: couponRate, couponRateUnit: "" }
        // 情况八 ：文案
        if (this.isTextReg.test(prdRate) && !couponRate)
            return { type: "文案", prdRate: prdRate, prdRateUnit: "", symbol: "", couponRate: "", couponRateUnit: "" }

        return false;
    },
}