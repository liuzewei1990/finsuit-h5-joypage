
let bc = require('../../finsuit-assets/images/logo.png');
let pc = require('../../finsuit-assets/images/pincai.png');
/**
 * 公共组件
 * 站外H5登陆popup组件
 */
export default function (res = () => { }, rej = () => { }) {
    let resolve = res;
    let reject = rej;

    if (!(this.$api.login && this.$api.sendCode)) {
        this.$Toast("注意：请在api中声明【login与sendCode】接口配置");
        return;
    }

    let dialog = this.$throwNewPage({
        // 调用登陆ui组件
        componentName: "H5_LOGIN",
        // 是否每次显示重载组件
        isReload: true,
        // 是否显示默认关闭按钮
        defaultcloseBtnVisible: false,
        // 是否透明蒙层
        isTransparent: false,

        // 页面配置
        applogo: { PC: pc, PMP: pc, BC: bc }[this.$store.state.FROM_APP_FLAG],
        appName: { PC: "拼财", PMP: "拼财", BC: "比财" }[this.$store.state.FROM_APP_FLAG],

        // 发送验证码
        sendCode: async (mobile, saftCode, startTimeFn) => {
            let params = { PHONE_NUM: mobile, SAFT_CODE: saftCode };
            let head = {};
            let data = await this.$api.sendCode(params, head);
            startTimeFn();
        },

        // 保存sessionId到store中
        saveSessionId: (sessionId) => {
            this.$store.commit("USER_LOGIN", { SESSION_ID: sessionId });
        },

        // 点击登录
        login: async (mobile, code) => {
            let params = { PHONE_NUM: mobile, PHONE_CODE: code };
            let head = {};
            let data = await this.$api.login(params, head);
            let userInfo = {
                ID: data.ID,
                PHONE_NUM: data.PHONE_NUM,
                TOKEN: data.PHONE_TOKEN,
            };
            this.$store.commit("USER_LOGIN", userInfo);
            this.$Toast("登陆成功");
            setTimeout(() => {
                dialog.close();
                resolve(userInfo);
            }, 1000);
        },

        // 用户取消登录
        cancelLogin: () => {
            dialog.close();
            reject("用户取消登录");
        }

    })
}