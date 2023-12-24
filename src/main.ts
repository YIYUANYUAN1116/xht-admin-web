import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
//@ts-ignore  ts忽略类型检测
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
//svg插件需要配置代码
import "virtual:svg-icons-register";
//引入自定义插件对象:注册整个项目全局组件
import gloalComponent from "@/components";
import "@/styles/index.scss";
import router from "./router";
//引入仓库
import pinia from "./store";

import App from "./App.vue";

const app = createApp(App);

app.use(ElementPlus, {
  locale: zhCn,
});
//安装自定义插件
app.use(gloalComponent);

app.use(pinia);
app.use(router);

//引入路由鉴权文件
import "./permisstion";

app.mount("#app");
