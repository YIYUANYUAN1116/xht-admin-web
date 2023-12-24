import SvgIcon from "./SvgIcon/index.vue";
const allGloablComponent: any = { SvgIcon };
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

export default {
  install(app: any) {
    //注册项目全部的全局组件
    Object.keys(allGloablComponent).forEach((key) => {
      //注册为全局组件
      app.component(key, allGloablComponent[key]);

      for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
        app.component(key, component);
      }
    });
  },
};
