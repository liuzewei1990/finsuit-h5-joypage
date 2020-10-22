

/**
 * 检测当前App是否满足当前版本号
 * @param {*} version 版本号
 */
export default function (version) {
    return this.$utils.isVersion(this.$store.state.VERSION, version);
}