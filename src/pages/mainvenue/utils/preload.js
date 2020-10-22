
function preLoad (imgs, options) {
    //传入imgs参数是图片 还是 数组
    this.imgs = (typeof imgs === 'string') ? [imgs] : imgs;
    //处理传入参数
    this.opts = { ...preLoad.DEFAULTS, ...options };
    this._ordered();
}

preLoad.DEFAULTS = {
    each: null,  // 每一张图片加载完毕后执行
    all: null,   // 所有图片加载完后执行
}
preLoad.prototype._ordered = function () {
    var opts = this.opts,
        imgs = this.imgs,
        len = imgs.length,
        count = 0;
    load();
    //有序预加载
    function load () {
        //实例化Image对象
        var imgObj = new Image();
        //监听load和error事件
        imgObj.onload = imgObj.onerror = function () {
            //每加载一张图片触发的事件
            opts.each && opts.each(count);
            if (count >= len) {
                //所有的图片已经加载完 触发的事件
                opts.all && opts.all();
            } else {
                load();
            }
            count++;
        }
        //图片路径赋值
        imgObj.src = imgs[count];
    }
};


export default function (imgs = [], options = {}) {
    new preLoad(imgs, options);
};
