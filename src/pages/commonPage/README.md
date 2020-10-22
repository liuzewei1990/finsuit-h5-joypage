### 活动名称
[TOC]
> 公共页面
- npm启动：npm run dev -commonPage
- 打测试包：npm run build:test commonPage
- 打生产包：npm run build:prod commonPage
- 访问地址：http://localhost:8080/commonPage.html
- 部署目录：/activity
- 线上地址：https://finsuit.bicai365.com/activity/项目/index.html
- 兼容平台：拼财，比财，小程序，站外

### 需求来源
- 产品经理：xxx
- 禅道地址：xxx
- 蓝湖地址：xxx

### 活动路由
- #/ xxx
- #/ xxx
- #/ xxx

### 活动说明
- 1、commonPage做为公共项目使用，不属于任何活动，适合存放一些活动中共享的页面。
- 2、注意点：尽量不要随意引入第三方库，避免项目过大，加载速度变慢。
- 3、commonPage.js入口文件中不要引入私用的全局依赖，避免过大，应在自己路由引入。
- 4、使用路由模式，一个路由对应一个公共页面。
- 5、注意除了view目录以外的共享文件，合并代码避免误删，导致未知问题。

### 字体说明
