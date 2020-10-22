
/**
 * 导出浏览器用户信息储存方式
 * 支持更改储存方式：
 * 1、sessionStorage(默认值)
 * 2、localStorage(一般用于站外登陆场景 需在window中定义FINSUIT_STORE_STORAGE_TYPE为localStorage)
 */
export default window[window.FINSUIT_STORE_STORAGE_TYPE || "sessionStorage"];