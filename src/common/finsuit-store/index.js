/**
 * 模块公共store 用户信息
 * 支持更改储存方式：
 * 1、sessionStorage(默认值)
 * 2、localStorage(一般用于站外登陆场景 需在window中定义FINSUIT_STORE_STORAGE_TYPE为localStorage)
 */



import storage from "./storage.js"

export const state = {
    ID: storage.getItem("ID") || "",                                                   // 用户id
    PHONE_NUM: storage.getItem("PHONE_NUM") || "",                                     // 用户手机号
    TOKEN: storage.getItem("TOKEN") || "",                                             // 用户登录token
    SESSION_ID: storage.getItem("SESSION_ID") || "",                                   // 会话id
    DEVICE_ID: storage.getItem("DEVICE_ID") || "",                                     // 设备id
    SYSTEM_TYPE: storage.getItem("SYSTEM_TYPE") || "",                                 // 手机类型 ios || android
    VERSION: storage.getItem("VERSION") || "",                                         // 设备版本号
    CHANNEL_ID: storage.getItem("CHANNEL_ID") || "",                                   // 渠道ID
    APP_FLAG: storage.getItem("APP_FLAG") || "",                                       // PC(拼财) || BC(比财) || PMP(小程序)
    CHANNEL: storage.getItem("CHANNEL") || "",                                         // 未知
    CT_VER: storage.getItem("CT_VER") || "",                                           // 未知
    MODEL: storage.getItem("MODEL") || "",                                             // 未知
    OPEN_API_CHANNEL_ID: storage.getItem("OPEN_API_CHANNEL_ID") || "",                 // 未知 实名认证需要

    // 站外APP_FLAG
    FROM_APP_FLAG: storage.getItem("FROM_APP_FLAG") || "",                              // 来源FROM_APP_FLAG适用站外适用  PC(拼财) || BC(比财) || PMP(小程序)

    ACTITY_ID: storage.getItem("ACTITY_ID") || "",
}

export const getters = {
    isLogin: state => {
        if (state.TOKEN) return true;
        else return false;
    }
}


export const mutations = {
    ["USER_LOGIN"] (state, userInfo) {
        for (const key in userInfo) {
            const element = userInfo[key];
            // 兼容值为 0 的情况
            if (element || element == 0) {
                state[key] = element || "";
                storage.setItem(key, String(element || ""));
            }
        }
    },


    ["FROM_APP_FLAG"] (state, params) {
        state.FROM_APP_FLAG = params.FROM_APP_FLAG || "";
        storage.setItem("FROM_APP_FLAG", String(params.FROM_APP_FLAG || ""));
    },


    ["ACTITY_ID"] (state, params) {
        state.ACTITY_ID = params.ACTITY_ID || "";
        storage.setItem("ACTITY_ID", String(params.ACTITY_ID || ""));
    },

}
