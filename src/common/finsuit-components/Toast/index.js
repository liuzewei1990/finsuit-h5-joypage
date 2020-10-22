import Vue from 'vue';
import toast from './toast.vue'
const ToastConstructor = Vue.extend(toast);
let toastPool = [];

// 获取一个toast组件实例
let getAnInstance = () => {
    if (toastPool.length > 0) {
        let instance = toastPool[0];
        toastPool.splice(0, 1);
        return instance;
    }
    return new ToastConstructor({
        el: document.createElement('div')
    });
};


let returnAnInstance = instance => {
    if (instance) {
        toastPool.push(instance);
    }
};

ToastConstructor.prototype.close = function () {
    this.visible = false;
    this.closed = true;
    returnAnInstance(this);
};

let Toast = (options = {}) => {
    let duration = options.duration || 2000;
    let instance = getAnInstance();
    instance.close();
    instance.closed = false;
    clearTimeout(instance.timer);
    instance.message = typeof options === 'string' ? options : options.message;
    // 三种可选位置 top middle bottom
    instance.position = options.position || 'middle';
    // 自定义Toast样式类名
    instance.className = options.className || '';
    // 自定义icon类名
    instance.iconClass = options.iconClass || '';
    // 自定义transition动画类名
    instance.trsiClass = options.trsiClass || '';
    // 当显示时，点击是否可穿透，false不可穿透
    instance.pointerEventsNone = options.pointerEventsNone || false;

    document.body.appendChild(instance.$el);
    Vue.nextTick(function () {
        instance.visible = true;
        instance.timer = setTimeout(function () {
            if (instance.closed) return;
            instance.close();
        }, duration);
    });
    return instance;
};

export default Toast;