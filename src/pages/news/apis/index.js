import http from '@common/finsuit-http/index.js'
import config from '@news/config/config.index.js'

/**
 * API统一管理规范
 * @param {Obj} params  私有域参数
 * @param {Obj} head    公共域参数
 * @returns Promise
 */

/**
 * 获取首页数据
 * @param {*} params 
 * @param {*} head 
 */
export const getHomeData = async (params, head) => {
    try {
        let newData = {};
        newData["banner"] = [];
        newData["news"] = [];
        let data = await http.post(config.baseUrlHost, config.baseUrlPath, "ACTIVITY_TRIAL_NEW_LIST", params, head, false, false, "获取首页数据");

        newData["banner"] = data.ZIXUN_TOP;

        newData["news"] = data.ACTIVE_TRIAL_NEWS_INFO.map(item => {
            let articleItem = {};
            articleItem["articleId"] = item.ID;
            articleItem["articleTitle"] = item.TITLE;
            articleItem["articleAuthor"] = item.SOURCE;
            articleItem["articleNums"] = item.REAL_CLICK_COUNT;
            articleItem["articleDateTime"] = item.NEWS_START_TIME;
            articleItem["articleCoverImg"] = item.IMG_URL;
            return articleItem;
        })

        return newData;
    } catch (error) {
        throw error;
    }
}

/**
 * 获取文章详情
 * @param {*} params 
 * @param {*} head 
 */
export const getArticleDetail = async (params, head) => {
    params["ID"] = String(params["ID"]);
    try {
        let newData = {};
        let data = await http.post(config.baseUrlHost, config.baseUrlPath, "GET_NEWS_INFO", params, head, false, false, "获取文章详情");

        newData["articleId"] = data.ID;
        newData["articleTitle"] = data.TITLE;
        newData["articleAuthor"] = data.SOURCE;
        newData["articleDateTime"] = data.NEW_TIME;
        newData["articleContent"] = data.CONTENT;
        newData["articleStars"] = data.LIKE_COUNT;
        newData["articleShareDesc"] = data.DESCRIPT;
        newData["articleUserIsLike"] = "0";


        // 产品列表
        newData["productsList"] = data.THREE_PRD_LIST.map(item => {
            return {
                prdId: item.PRD_INDEX_ID,
                prdHeader: item.LOGO_URL,
                prdName: item.PRD_NAME,
                prdBankName: item.ORG_NAME,
                prdRate: item.RATE,
                prdRateText: item.RATE_NAME,
                itemValue1: item.PERIOD,
                itemValue2: "期限",
                itemValue3: item.TOTALNUMBER,
                itemValue4: "累计购买笔数",
            }
        });

        return newData;
    } catch (error) {
        throw error;
    }
}


/**
 * 获取评论列表
 * @param {*} params 
 * @param {*} head 
 */
export const getCommentList = async (params, head) => {
    params["pageSize"] = String(params["pageSize"]);
    params["currentPage"] = String(params["currentPage"]);
    params["COMMENT_TYPE"] = String(params["COMMENT_TYPE"]);
    params["OBJ_ID"] = String(params["OBJ_ID"]);
    try {
        let newData = {};
        let data = await http.post(config.baseUrlHost, config.baseUrlPath, "GET_COMMENT_INFO", params, head, false, false, "获取评论列表");
        data = data.PAGE || {};
        newData["totalCount"] = data.totalCount;
        newData["totalPage"] = data.totalPage;
        newData["currentPage"] = data.currentPage;

        // 评论列表
        newData["retList"] = data.retList.map(item => {
            return {
                id: item.CREATE_ID,
                commentUserHeadImg: item.HEAD_ING_URL,
                commentOtherName: item.OTHER_NAME,
                commentPhoneNum: item.PHONE_NUM,
                commentContent: item.COMMENT,
                commentCreateTime: item.CREATE_TIME,
            }
        });

        return newData;
    } catch (error) {
        throw error;
    }
}


/**
 * 用户点赞
 * @param {*} params 
 * @param {*} head 
 */
export const postStars = (params, head) => {
    params["QRY_TYPE"] = String(params["QRY_TYPE"]);
    params["OBJ_TYPE"] = String(params["OBJ_TYPE"]);
    params["OBJ_ID"] = String(params["OBJ_ID"]);
    try {
        let data = http.post(config.baseUrlHost, config.baseUrlPath, "CLICK_LIKE_OR_NOT", params, head, false, false, "用户点赞")
        return data;
    } catch (error) {
        throw error;
    }
}

/**
 * 用户评论
 * @param {*} params 
 * @param {*} head 
 */
export const postComment = (params, head) => {
    params["COMMENT_TYPE"] = String(params["COMMENT_TYPE"]);
    params["OBJ_ID"] = String(params["OBJ_ID"]);
    try {
        let data = http.post(config.baseUrlHost, config.baseUrlPath, "ADD_COMMENT", params, head, false, false, "用户评论");
        return data;
    } catch (error) {
        throw error;
    }
}




/**
 * 公共接口
 * 
 */

// 获取分享按钮
export const getShareBtn = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "SYSTEM_SHARE", params, head, false, false, "获取分享按钮")

// 获取微信分享签名
export const getWxSign = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "GET_WEIXIN_SIGN", params, head, false, false)

// 获取产品详情入口
export const getProducdDetailUrl = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "GET_RECOMMEND_PRD_LIST", params, head, false, false)

// 获取下载app帮助页面图片地址
export const getDowloadAppHelpData = (params, head) => http.post(config.baseUrlHost, config.baseUrlPath, "SINGINF_GUIDE_PAGE_PIC", params, head, false, false)
