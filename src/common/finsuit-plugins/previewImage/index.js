import preview from "./preview.vue"
import Vue from "vue"

let previewPool = [];

let getAnInstance = () => {
    if (previewPool.length > 0) {
        let instance = previewPool[0];
        previewPool.splice(0, 1);
        return instance;
    }

    const PreviewConstructor = Vue.extend(preview);
    return new PreviewConstructor({
        el: document.createElement('div')
    });

};

let returnAnInstance = instance => {
    if (instance) {
        previewPool.push(instance);
    }
};

let previewImage = (options = {}) => {
    let instance = getAnInstance();
    let ele = options.appendElement || document.body;
    instance.list = options.list || [];
    instance.index = options.index || 0;
    instance.options = options.options || {};
    ele.appendChild(instance.$el);
    instance.show(options.index);
    instance.$once("on-close", () => { returnAnInstance(instance) })
    return instance;
};

export default previewImage;