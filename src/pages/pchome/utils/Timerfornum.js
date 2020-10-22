

let timer = null;

export default class Timerfornum {
    constructor(options = {}) {
        // 执行次数
        this.num = options.num || 1;
        // 间隔时间执行一次
        this.timerms = options.timerms || 1000;
    }

    exec (callback) {
        callback && callback();
        if (this.num === 0) return;
        clearTimeout(timer);
        timer = setTimeout(() => {
            this.num--;
            this.exec(callback);
        }, this.timerms);
    }
}
