import jsStorage from "js-storage"
// 资讯列表是否点击
export const isReadStorage = jsStorage.initNamespaceStorage('@news_isRead').localStorage;
// 文章详情是否点赞
export const isLikeStorage = jsStorage.initNamespaceStorage('@news_isLike').localStorage;