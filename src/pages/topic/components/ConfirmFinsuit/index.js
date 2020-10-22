import defer from './defer.js';
import IosAlertviewDefine from './alertview.vue';

// 默认选项
const defaults = {
    defaultOption: 'title',
    title: null,
    text: null,
    input: false,
    placeholder: '',
    cancelText: '取消',
    okText: '确认',
    remindDuration: 650,
    appendChildDom: "",
};

function install (Vue, globalOptions = {}) {
    if (typeof globalOptions !== 'object') {
        throw new Error('Expect Object options');
    }

    const IosAlertViewComponent = Vue.extend(IosAlertviewDefine);

    // override defaults
    Object.assign(defaults, globalOptions);

    function getPropsData (options = {}) {
        let propsData = Object.assign({}, defaults);

        if (typeof options === 'string') {
            propsData[defaults.defaultOption] = options;
        } else {
            propsData = Object.assign(propsData, options);
        }

        return propsData;
    }

    function IosAlertView (options) {
        var propsData = getPropsData(options);

        var instance = new IosAlertViewComponent({ propsData: propsData });

        var mount = document.createElement('div');
        mount.id = 'ios-alert-view-' + Date.now();
        if (options.appendChildDom) {
            options.appendChildDom.appendChild(mount);
        } else {
            document.body.appendChild(mount);
        }

        instance.$mount(mount);

        return instance.activate();
    }

    Vue.prototype.$Confirm = function (options) {
        var deferred = defer();
        var propsData = getPropsData(options);

        propsData.buttons = [{
            text: propsData.cancelText,
            onClick: deferred.reject
        }, {
            text: propsData.okText,
            onClick: deferred.resolve,
            bold: false
        }];

        IosAlertView(propsData);

        return deferred.promise;
    };

}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(install);
}

export default install;
