import Vue from 'vue';
import DialogComponent from './Dialog.vue'
const ToastConstructor = Vue.extend(DialogComponent);
let toastPool = [];

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

let removeDom = event => {
    if (event.target.parentNode) {
        event.target.parentNode.remove();
    }
};

ToastConstructor.prototype.close = function () {
    this.visible = false;
    this.$el.addEventListener('transitionend', removeDom);
    returnAnInstance(this);
};

let Dialog = (options = {}) => {
    let instance = getAnInstance();
    instance.close();
    instance.visible = true;

    instance.propsData = options;

    if (options.appendElement) {
        options.appendElement.appendChild(instance.$el);
    } else {
        document.body.appendChild(instance.$el);
    }

    return instance;
};

export default Dialog;