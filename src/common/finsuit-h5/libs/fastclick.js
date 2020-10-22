import FastClick from 'fastclick'

// vue移动端项目在IOS上点击输入框失效， 需要点击多次
FastClick.prototype.focus = function (targetElement) {
    let length;
    if (targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
        length = targetElement.value.length;
        targetElement.focus();
        targetElement.setSelectionRange(length, length);
    } else {
        targetElement.focus();
    }
};

console.warn("引入fastclick支持！")
if (process.env.NODE_ENV == "production" || process.env.NODE_ENV == "productionTest") {
    FastClick.attach(document.body);
}
