
import Vue from "vue"
import container from "./container.vue"

export default class ThrowComponent {

    constructor() {

        // 子组件
        this.componentInstance = null;

        const Constructor = Vue.extend(container);

        this.maskInstance = new Constructor({
            el: document.createElement('div')
        });

        // 监听打开事件
        this.maskInstance.$on("onShow", () => {
            this.componentInstance.$emit("onShow");
        });
        // 监听关闭事件
        this.maskInstance.$on("onHide", () => {
            this.componentInstance.$emit("onHide");
        });
    }

    // 打开方法
    throw (options = {}) {
        // 组件选项
        let component = options.component;
        // 组件创建后插入的dom
        let targetMountDom = options.targetMountDom;
        // maskConfig蒙层配置选项,详情先去了解MaskBox支持的功能
        let maskConfig = options.maskConfig || {};

        let targetDom = targetMountDom || document.body;
        targetDom.appendChild(this.maskInstance.$el);

        this.maskInstance.$props.visible = true;
        this.maskInstance.$props.appendElement = targetDom;
        this.maskInstance.$props.maskConfig = maskConfig;


        if (!component) return;
        // 获取子组件实例
        this.componentInstance = this.getComponentInstance(component);

        let mountEle = this.maskInstance.$el.querySelector(".container");
        this.maskInstance.$nextTick(() => {
            mountEle.innerHTML = "";
            mountEle.appendChild(this.componentInstance.$el);
        })


        return this.componentInstance;
    }

    close () {
        this.maskInstance.$props.visible = false;
    }

    // 获取子组件实例
    getComponentInstance (component) {

        let ComponentConstructor = Vue.extend(component);
        return new ComponentConstructor({
            el: document.createElement('div')
        });
    }

}

