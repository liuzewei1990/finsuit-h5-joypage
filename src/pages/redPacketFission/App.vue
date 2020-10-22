<template>
    <div id="main">
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
</template>

<script>
import bus from "@common/finsuit-h5/libs/bus.js";
export default {
    data() {
        return {
            shareConfig: [
                {
                    // 分享方式 0:图片   1:链接  2: 小程序
                    SHARE_TYPE: "1",
                    // 分享渠道 0:分享给朋友  1:分享到朋友圈   2: QQ 3:QQ空间
                    SHARE_PLACE: "",
                    // 分享图标（目前APP不支持自定义分享图标）
                    SHARE_HEAD_IMG: "",
                    // 分享标题
                    SHARE_TITLE: "每天都有红包雨",
                    // 分享描述
                    SHARE_DESC: "最高35元，快来拼手气～",
                    // 分享链接
                    SHARE_URL: "",
                    // 分享IOCN或者图片(当 SHARE_TYPE 为0的时候生效)
                    SHARE_IMAGE: "",
                    // 分享成功回调
                    SUCCESS: () => {},
                    // 取消分享回调 App内无效
                    CANCEL: () => {}
                }
            ]
        };
    },
    created() {
        this.shareConfig[0].SHARE_URL = this.getShareLink();
        // 监听token是否失效
        bus.$once("TOKEN_EXPIRE",()=> {
            this.$Toast("登录过期，请重新登录");
            this.$store.commit("USER_LOGIN", { TOKEN: "" });
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        })
    },
    mounted() {
        this.$wxShare.registerShare(this.shareConfig);
    },
    methods: {
        /**
         * 获取分享链接
         */
        getShareLink() {
            let url;
            url = window.location.href.split("#")[0];
            url += `?a=1`;
            url += `#/`;
            // 活动id
            url += `?ACTITY_ID=${this.$store.state.ACTITY_ID}`;
            // 站外打开时来源APP_FLAG
            url += `&FROM_APP_FLAG=${this.$store.state.FROM_APP_FLAG}`;
            url += `&SHARE_MEMBER_ID=${this.$localStore.get(
                "SHARE_MEMBER_ID"
            )}`;
            url += `&SHARE_DATE=${this.$localStore.get("SHARE_DATE")}`;
            // console.log(url);
            return url;
        },
    }
};
</script>

<style lang="less" scoped>
</style>
