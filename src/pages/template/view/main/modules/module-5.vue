<!--  -->
<template>
  <section class=''>
    <h2 class="mar-top-30">组件抛出器演示</h2>
    <aaa></aaa>
    <Button type="primary" @click.native="show">抛出【实例1】弹窗1号</Button>
    <Button type="primary" @click.native="show2">抛出【实例1】弹窗2号</Button>
    <Button type="primary" @click.native="show3">抛出【实例2】弹窗1号</Button>
  </section>
</template>

<script>
import Button from "@common/finsuit-components/Button"

// 第一步：引入插件
import ThrowComponent from "@common/finsuit-plugins/throwComponent/index.js"
import module1 from "./module-1"
import Vue from "vue"

let component = Vue.extend({
  props: ["name"],
  components: { module1, Button },
  data () {
    return {
      text: "抛出【实例1】弹窗2号"
    }
  },
  render: function (c) {
    return c("div", { style: "width:250px;min-height:300px;background:#fff;padding:20px; border-radius:10px;" }, [c("module1"), c("p", this.name), c("Button", { nativeOn: { click: this.handleClick } }, this.text), c("Button", { nativeOn: { click: this.handleClick2 } }, "抛出【实例2】弹窗1号")])
  },
  methods: {
    handleClick () {
      this.$emit("ClickBtn");
    },
    handleClick2 () {
      this.$emit("ClickBtn2");
    }
  }
});

export default {
  components: { Button },
  data () {
    return {
      $throwComponent: null,
      $throwComponent2: null,
    };
  },
  created () {
    // 第二步：创建throwComponent实例，一般在入口文件中挂载vue原型中,多个实例多次挂载即可。
    this.$throwComponent = new ThrowComponent();
    this.$throwComponent2 = new ThrowComponent();
  },

  //方法集合
  methods: {

    // 单一实例
    show () {

      // 第三步：使用这个throwComponent实例抛出子组件，返回子组件实例
      let testComponent = this.$throwComponent.throw({
        // 组件
        component: component,
        // 挂载dom
        targetMountDom: document.querySelector("#main"),
        // 蒙层配置选项
        maskConfig: {
          // 是否点击蒙层关闭
          hideOnBlur: true,
          // 是否显示蒙层底部默认关闭按钮
          defaultcloseBtnVisible: true,
          // 是否是透明蒙层
          isTransparent: false
        }
      })

      // 第四步：和组件进行交互

      // 给子组件props传参
      testComponent.$props.name = "我是谁";
      setTimeout(() => {
        testComponent.$props.name = "我是谁：冰河先森";
      }, 4000);


      // 给子组件绑定事件,注意先解绑。
      testComponent.$off("ClickBtn").$on("ClickBtn", () => {
        console.log("点击事件");
        this.show2();
      })
      testComponent.$off("ClickBtn2").$on("ClickBtn2", () => {
        console.log("点击事件");
        this.show3();
      })

      // 组件展示了
      testComponent.$off("onShow").$on("onShow", () => {
        console.log("组件展示了");
        this.$Toast("组件展示了")
      })

      // 组件关闭了
      testComponent.$off("onHide").$on("onHide", () => {
        console.log("组件关闭了");
        this.$Toast("组件关闭了")
      })
    },

    show2 () {
      let testComponent = this.$throwComponent.throw({
        // 组件
        component: require("./projectNav").default,
        // 挂载dom
        targetMountDom: document.querySelector("#main"),
        // 蒙层配置选项
        maskConfig: {
          // 是否点击蒙层关闭
          hideOnBlur: true,
          // 是否显示蒙层底部默认关闭按钮
          defaultcloseBtnVisible: true,
          // 是否是透明蒙层
          isTransparent: false
        },
        onShow () {

        }
      })

      // 组件展示了
      testComponent.$off("onShow").$on("onShow", () => {
        console.log("组件展示了");
        this.$Toast("组件展示了")
      })

      // 组件关闭了
      testComponent.$off("onHide").$on("onHide", () => {
        console.log("组件关闭了");
        this.$Toast("组件关闭了")
      })
    },

    show3 () {
      let testComponent = this.$throwComponent2.throw({
        // 组件
        component: require("./projectNav").default,
        // 挂载dom
        targetMountDom: document.querySelector("#main"),
        // 蒙层配置选项
        maskConfig: {
          // 是否点击蒙层关闭
          hideOnBlur: true,
          // 是否显示蒙层底部默认关闭按钮
          defaultcloseBtnVisible: true,
          // 是否是透明蒙层
          isTransparent: false
        },
        onShow () {

        }
      })
    }
  },
}
</script>
<style lang='less' scoped>
</style>