import router from "@/router";
//@ts-ignore
import nprogress from "nprogress";
//引入进度条样式
import "nprogress/nprogress.css";
import useUserStore from "./store/modules/user";
import pinia from "./store";
import setting from "./setting";
import { Console } from "console";

let userStore = useUserStore(pinia);
let username = userStore.username;
router.beforeEach(async (to: any, from: any, next: any) => {
  nprogress.start();
  let token = userStore.token;

  if (token) {
    if (to.path == "/login") {
      next({ path: "/" });
    } else {
      if (username) {
        next();
      } else {
        //如果没有用户信息,在守卫这里发请求获取到了用户信息再放行
        try {
          //获取用户信息
          await userStore.userInfo();
          //放行
          next();
        } catch (error) {
          //token过期:获取不到用户信息了
          //用户手动修改本地存储token
          //退出登录->用户相关的数据清空
          await userStore.userLogout();
          next({ path: "/login", query: { redirect: to.path } });
        }
      }
    }
  } else {
    //用户未登录判断
    if (to.path == "/login") {
      next();
    } else {
      next({ path: "/login", query: { redirect: to.path } });
    }
  }
});

//全局后置守卫
router.afterEach((to: any, from: any) => {
  document.title = `${setting.title}-${to.meta.title}`;
  nprogress.done();
});

//1:任意路由切换实现进度条业务 ---nprogress
//2:路由鉴权(路由组件访问权限的设置)
//全部路由组件:登录|404|任意路由|首页|数据大屏|权限管理(三个子路由)|商品管理(四个子路由)

//用户未登录:可以访问login,其余六个路由不能访问(指向login)
//用户登录成功:不可以访问login[指向首页],其余的路由可以访问
