## 比财H5活动开发架构
[TOC]
> vue

### npm命令说明

``` bash
# install dependencies
npm install

# 启动开发环境 代表启动全部微项目 并设置开发环境配置
npm run dev
# 启动开发环境 代表启动指定微项目 并设置开发环境配置
npm run dev -project1 -project2 -project3 -project4......

# 发布测试包 打包指定的微项目 并设置测试环境配置
npm run build:test [项目名称必填]

# 发布生产包 打包指定的微项目 并设置生产环境配置
npm run build:prod [项目名称必填]

# 查看打包报告
npm run build:xxx [xxx] --report
```

### 微前端架构特点
- **项目规范 - 约束规范** ：多个微项目应用一套脚手架，一套公共库，一套公共模块，统一项目规范。
- **开发阶段 - 独立开发** ：一键启动所有微项目开发环境，支持微项目之间间接联调。独立开发所属项目包，完全解决代码冲突问题，公共模块分离；
- **发布阶段 - 独立发布** ：支持测试环境和生产环境发布，走不通配置，微项目单独打包，单独生成dist包；
- **部署阶段 - 独立部署** ：支持一键部署所有微项目生产包，支持独立项目部署，利用浏览器缓存机制，优化公共库的缓存。

### 源码目录结构
``` bash
├─common
│  ├─finsuit-assets --------------------所有微项目的公共资源
│  │  ├─icomoon
│  │  │  ├─demo-files
│  │  │  └─fonts
│  │  ├─images
│  │  └─less
│  ├─finsuit-components ----------------所有微项目的公共组件
│  │  ├─Button
│  │  │  └─less
│  │  ├─Confirm
│  │  ├─EllipsisText
│  │  ├─HttpErrorDialog
│  │  ├─Loading
│  │  ├─MaskBox
│  │  ├─Popup
│  │  └─Toast
│  ├─finsuit-h5 ------------------------所有微项目的比财H5开发插件包
│  │  └─libs
│  ├─finsuit-http ----------------------所有微项目的请求封装处理
│  └─finsuit-store ---------------------所有微项目的H5开发插件包辅助store
└─pages
    └─templateA ------------------------微项目A
    │ ├─apis
    │ ├─config
    │ ├─router
    │ ├─store
    │ └─view
    │      └─main
    │          └─modules
    └─templateB ------------------------微项目B
    │ ├─apis
    │ ├─config
    │ ├─router
    │ ├─store
    │ └─view
    │     └─main
    │         └─modules
```
### 打包目录结构
``` bash
├─templateA -------------------------- 微项目A dist包
│  └─static
│      ├─css
│      ├─fonts
│      ├─img
│      └─js
└─templateB -------------------------- 微项目B dist包
    └─static
        ├─css
        ├─fonts
        └─js
```
-------------------

### 全局vuex store字段说明【重要必看】
```
一、APP_FLAG字段：
    代表H5环境变量，也就是说当前的页面在哪个端，（拼财App里、比财App里、小程序中、还是站外环境里）。
    开发时可灵活运用APP_FLAG判断你的代码在各个端的逻辑。
    1、APP_FLAG的作用？
    答：前端作用是区分端的，一个页面在每个端长得不一样，逻辑不一样。后端作用会根据不同的值返回不同的内容。
    1、如何获取APP_FLAG？
    答：APP_FLAG字段储存在vuex中，访问通过 this.$store.state.APP_FLAG即可。
    2、站外如何指定APP_FLAG？
    答：站外通过地址上的链接参数指定，比如：xxx.com#/?PMP_FLAG=OUT_SIDE,站内（App内）无需指定。详情见src/common/finsuit-h5/libs/bootstrap.js 页面挂载函数。切记一点，App内千万不要指定。。。
    3、APP_FLAG环境变量会对common包中封装的内容会有关联吗？
    答：有关联，比如：封装的接口请求器（finsuit-http）、跳转包装页方法、登录拦截器、App下载方法、等等。

    H5环境变量说明：
    1.拼财==PC                   用途：拼财App环境使用，注意：所有接口的APP_FLAG全部走PC变量
    2.比财==BC                   用途：比财App环境使用，注意：所有接口的APP_FLAG全部走BC变量
    3.小程序==PMP                用途：小程序环境使用，注意：所有接口的APP_FLAG全部走PMP变量
    4.站外==OUT_SEDE(指定情况)    用途：站外H5环境使用，注意：所有接口的APP_FLAG全部走OUT_SIDE变量。使用拦截器后在站外可自动唤起H5登录框登录。
    5.站外==""(未指定情况)        用途：站外H5环境使用，注意：所有接口的APP_FLAG全部跟随FROM_APP_FLAG变量走。

二、FROM_APP_FLAG字段：
    代表H5页面在站外时的来源渠道，只能为三个值，PC || BC || PMP ，默认值为BC。
    作用：可以灵活使用APP_FLAG与FROM_APP_FLAG在站外组合使用，创造不同的环境。

三、ACTITY_ID字段：
    代表活动ID，一般用于埋点的来源ID。

四、其余字段见store说明。
```

### finsuit-h5插件包集成功能
- this.$bootstrap():使用插件包挂载app，同步挂载和app内异步挂载
- this.$Toast()：提示框
- this.$Loading("加载中")：加载loading
- this.$iosAlert()：对话框
- this.$login():唤起登录，兼容原生登录、H5登录、小程序Toast提示
- this.$h5Login()：只调用H5的登录框。
- this.$checkLogin(): 按钮登录拦截器，兼容原生登录、H5登录、小程序Toast提示
- this.$sendLoginResult():APP内主动触发loginResult 更新store用户信息
- this.$modalHelper():弹窗模态辅助器，用于蒙层防止滚动穿透。
- this.$downloadApp():去下载app弹窗，可指定下载的App名称。
- this.$transfromAliyunUrl():检测图片地址是否是半链接，如果是拼接阿里云地址
- this.$h5RealNameAuth():跳转到H5版实名认证

- this.$bcBridge对象：原生sdk
- this.$browser:浏览器和系统信息
- this.$utils:工具包
- this.$bus事件对象

- this.$h5PrdDetail():跳转到H5版包装页
- this.$formChecker():表单检查器
- this.$throwNewPage():common包公共组件抛出器，H5登录就是利用该方法实现。

- this.$px2rem():px转rem值
- this.$listenLoginResult() App内使用，监听用户登录退出，同步重写store信息，一般用不到，拼财首页会用。


### 站外打开App到指定页面，无法打开则跳转下载App
```
    实例对象：
    比财 this.$callapp.bicai
    拼财 this.$callapp.pincai

    实例方法：
    打开App首页
    this.$callapp.bicai.open({
        path: "applink"
    })

    打开App指定页面 参数见：App Scheme链接跳转.md
    this.$callapp.bicai.open({
        path: "applink",
        param: {
            pjsonkey: this.$bcBridge.base64Encode({ "LINK_TO": "WEB_H5", "H5_URL": "页面链接", "NEED_LOGIN": "0", "USE_LINK": "1" })
        }
    })

    获取Scheme地址 详细见：callapp-lib说明文档
    this.$callapp.bicai.generateScheme({});

```



### 分享配置
```
    创建分享json数组
    [
        {
            // 分享方式 0:图片   1:链接  2: 小程序
            SHARE_TYPE:"",
            // 分享渠道 0:分享给朋友  1:分享到朋友圈   2: QQ 3:QQ空间
            SHARE_PLACE:"",
            // 分享图标（目前APP不支持自定义分享图标）
            SHARE_HEAD_IMG:"",
            // 分享标题
            SHARE_TITLE:"",
            // 分享描述
            SHARE_DESC:"",
            // 分享链接
            SHARE_URL:"",
            // 分享IOCN或者图片(当 SHARE_TYPE 为0的时候生效)
            SHARE_IMAGE:"",
            <!-- 分享成功回调 -->
            SUCCESS:()=>{},
            <!-- 取消分享回调 App内无效 -->
            CANCEL:()=>{}
        },
        {
            // 分享方式 0:图片   1:链接  2: 小程序
            SHARE_TYPE:"",
            // 分享渠道 0:分享给朋友  1:分享到朋友圈   2: QQ 3:QQ空间
            SHARE_PLACE:"",
            // 分享图标（目前APP不支持自定义分享图标）
            SHARE_HEAD_IMG:"",
            // 分享标题
            SHARE_TITLE:"",
            // 分享描述
            SHARE_DESC:"",
            // 分享链接
            SHARE_URL:"",
            // 分享IOCN或者图片(当 SHARE_TYPE 为0的时候生效)
            SHARE_IMAGE:"",
            <!-- 分享成功回调 -->
            SUCCESS:()=>{},
            <!-- 取消分享回调 App内无效 -->
            CANCEL:()=>{}
        }
    ]

    App内分享：
    引入分享组件 <SharePopup ref="SharePopup"/>
    打开分享：this.$refs.SharePopup.open(分享配置json,callBack);

    微信内分享：
    import WxShare from "@common/finsuit-plugins/wxShare.js"
    Vue.prototype["$wxShare"] = new WxShare(options);
    this.$wxShare.registerShare(分享配置json);

    options [可选参数]
    options.signUrl = "" //生成签名url
    options.shareConfigJson = [] //分享配置json
```

### 公共组件
- Button loading按钮
- Confirm 系统各种弹窗
- EllipsisText 文本超出...
- MaskBox 创建一个蒙层 
- Popup 上下左右 弹出popup
- Scroll 局部滚动条
- ScrollFixedEnd 滚动定位容器
- 
-------------------

### 新项目上手指南

- 第一步：快速复制template项目集成包创建新的微项目，并启用新的名称，该名称也对应服务器部署目录名，也就是assetsPublicPath，例如：joyPage
- 第二步：将新项目目录中的template.js 和 template.html 重命名 : joyPage
- 第三步：npm run dev  浏览器输入http://0.0.0.0:7789/joyPage.html
- 第四步：npm run build:pord joyPage 打包到dist文件夹中。

### 注意事项
- 请勿随意修改common公共包文件
- 请勿随意修改common公共包文件
- 请勿随意修改common公共包文件
- 请勿随意修改common公共包文件
- 请勿随意修改common公共包文件
- 请勿随意修改common公共包文件

### this.$openWebview支持的链接地址规范
- H5半链接地址: /xxx/xxx/xxx.html (一般用于灰度环境)
- H5链接地址: https://finsuit.bicai365.com/xxx/xxx/xxx
- 小程序原生地址: pmp:/pages/xxx/xxx?a=1
- 原生App地址: besharp://finsuit/applink?pjsonkey=Base64({...}) 