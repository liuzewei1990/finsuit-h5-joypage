import Vue from 'vue'
export default {
  getCommonStyle : function(x, y, w, h, img = false) {
    let style = {}
    style["position"] = "absolute";
    style["left"] = Vue.prototype.$px2rem(x*2);
    style["top"] = Vue.prototype.$px2rem(y*2);
    style["width"] = Vue.prototype.$px2rem(w*2);
    style["height"] = Vue.prototype.$px2rem(h*2);

    if (img === false) return style;
    style["backgroundImage"] = `url(${img})`;
    style["backgroundRepeat"] = "no-repeat";
    style["backgroundSize"] = "cover";
    style["backgroundPosition"] = "center center";
    return style;
  },
  px2rem: function (px) {
    return `${px * 2 / 75}rem`;
  }
}
