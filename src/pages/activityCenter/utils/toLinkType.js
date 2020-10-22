/**
 * 公共原型方法：
 * 根据linkType类型跳转指定地址.
 */
// let linkType = item.linkType;
// let target = item[linkType];
// let isLogin = item.isLogin;


export default function (itemData) {

    // 检测是否需要登录
    if (itemData.isLogin == "1") {
        this.$checkLogin({ action: doLink.bind(this), data: itemData });
    } else {
        doLink.call(this, itemData);
    }
}

/**
 * 调转方法
 * @param {*} data 
 */

function doLink (itemData = {}) {
    // 跳转链接类型
    let linkType = itemData.linkType;

    switch (linkType) {
        // 活动列表
        case "1":
            url = window.location.href.split("#")[0];
            url += `#/list`;
            url += `?ACTITY_ID=${this.$store.state.ACTITY_ID}`;
            url += `&id=${itemData[linkType]}`;
            this.$bcBridge.openWebview(url);
            break;
        // 活动详情
        case "2":
            url = window.location.href.split("#")[0];
            url += `#/detail`;
            url += `?ACTITY_ID=${this.$store.state.ACTITY_ID}`;
            url += `&id=${itemData[linkType]}`;
            this.$bcBridge.openWebview(url);
            break;
        // H5链接
        case "3":
            let url = itemData[linkType];
            if (url.indexOf("http") !== 0) {
                this.$Toast("请检查跳转链接");
                return;
            }
            this.$bcBridge.openWebview(url);
            break;
        // 文章跳转
        case "4":
            let articleData = { articleId: itemData.articleId, articleTitle: itemData.articleTitle, articleAuthor: itemData.articleAuthor, articleDateTime: itemData.articleDateTime }
            let newsUrl = this.$Config.newsServerHost;
            newsUrl += `#/detail`;
            newsUrl += `?ACTITY_ID=${this.$store.state.ACTITY_ID}`;
            newsUrl += `&finsuit=finsuit`;
            newsUrl += `&articleData=${encodeURIComponent(JSON.stringify(articleData))}`;
            this.$bcBridge.openWebview(newsUrl);
            break;
        default:
            this.$Toast("未知跳转类型");
            break;
    }
}