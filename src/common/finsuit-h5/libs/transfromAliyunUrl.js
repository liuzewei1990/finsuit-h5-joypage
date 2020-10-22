/**
 * 检测图片如果为半链接，根据环境 拼接阿里云地址
 */

export default function (url) {
    url += "";
    if (url.indexOf("http") !== 0) {
        url = this.$Config.aliyuncHost + url;
    }
    return url;
}