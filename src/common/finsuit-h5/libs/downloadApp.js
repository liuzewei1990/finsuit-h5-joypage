


/**
 * 站外下载app使用
 * 说明：url参数中指定FROM_APP_FLAG = PC | BC 来源appFlag标识可下载指定的APP,默认下载比财
 * 按钮配置：
 * options.title
 * options.text
 * options.input
 * options.placeholder
 * options.cancelText
 * options.okText
 * options.remindDuration
 * options.appendChildClass
 * 
 * 指定下载PC或BC：
 * options.FROM_APP_FLAG
 * 
 * 
 */

export default function (options = {}, isShowConfirm = true) {

    const FROM_APP_FLAG = options.FROM_APP_FLAG || this.$store.state.FROM_APP_FLAG;
    const OS = this.$browser.OS;
    const APP_FLAG_TEXT = {
        BC: "比财",
        PC: "拼财",
        PMP: "拼财"
    }

    let defaultOpts = {
        title: "提示",
        text: `是否前往下载${APP_FLAG_TEXT[FROM_APP_FLAG]}APP参与活动`,
        input: false,
        placeholder: '',
        cancelText: '稍后下载',
        okText: '去下载',
        remindDuration: 650,
        appendChildClass: "",
    }

    let opts = { ...defaultOpts, ...options }

    if (isShowConfirm) {
        this.$iosConfirm(opts).then((btn) => {
            setTimeout(() => {
                window.location.href = getUrl();
            }, 500);
        }).catch(() => { })
    } else {
        setTimeout(() => {
            window.location.href = getUrl();
        }, 500);
    }

    function getUrl () {
        let url;
        if (FROM_APP_FLAG == "PC" || FROM_APP_FLAG == "PMP") {
            if (OS === "Android") {
                url = 'https://android.myapp.com/myapp/detail.htm?apkName=com.pc.finance&apkCode=108';
            } else {
                url = 'https://itunes.apple.com/app/id1450232395?mt=8';
            }
        } else {
            url = (window.location.protocol + '//' + window.location.host) + "/finsuit/static/finsuit/vue/#/mine/shareApp?SOURCE=OTHERS";
        }
        return url;
    }
}