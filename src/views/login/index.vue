<template>
  <div class="login_container">
    <el-row>
      <!--xs=0 表示屏幕缩小时 消失掉-->
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <!--登录表单-->
        <el-form
          class="login_from"
          :model="loginFrom"
          :rules="rules"
          ref="loginForms"
        >
          <h1>Hello</h1>
          <h2>欢迎来到小河豚后台管理</h2>
          <el-form-item prop="username">
            <el-input
              v-model="loginFrom.userName"
              :prefix-icon="User"
            ></el-input>
          </el-form-item>

          <el-form-item prop="password">
            <el-input
              v-model="loginFrom.password"
              type="password"
              :prefix-icon="Lock"
              show-password
            ></el-input>
          </el-form-item>

          <el-form-item prop="captcha">
            <div class="captcha">
              <el-input
                class="text"
                v-model="loginFrom.captcha"
                prefix-icon="Picture"
                placeholder="请输入验证码"
              ></el-input>
              <img
                :src="loginFrom.captchaSrc"
                @click="loginFrom.refreshCaptcha"
              />
            </div>
          </el-form-item>

          <el-form-item>
            <el-button
              :loading="loading"
              class="login_btn"
              type="primary"
              size="default"
              @click="login"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from "@element-plus/icons-vue";
import { reactive, ref, onMounted } from "vue";
//引入用户相关的小仓库
import useUserStore from "@/store/modules/user";
import { useRouter, useRoute } from "vue-router";
import { ElNotification } from "element-plus";
import { getTime } from "@/utils/time";
import { getValidateCode } from "@/api/user";

let userStore = useUserStore();
let loginFrom = reactive({
  userName: "小河豚",
  password: "123456",
  captcha: "",
  codeKey: " ",
  captchaSrc: "",

  refreshCaptcha: async () => {
    const { data } = await getValidateCode();
    loginFrom.codeKey = data.codeKey;
    loginFrom.captchaSrc = data.codeValue;
  },
});
//定义变量控制按钮加载效果
let loading = ref(false);
//获取路由器
let $router = useRouter();
//路由对象
let $route = useRoute();
//获取el-form组件
let loginForms = ref();

//登录按钮回调
const login = async () => {
  await loginForms.value.validate();

  //加载效果:开始加载
  loading.value = true;

  try {
    await userStore.userLogin(loginFrom);
    //编程式导航跳转到展示数据首页
    //判断登录的时候,路由路径当中是否有query参数，如果有就往query参数挑战，没有跳转到首页
    let redirect: any = $route.query.redirect;
    console.log(redirect);
    $router.push({ path: redirect || "/" });
    //登录成功提示信息
    ElNotification({
      type: "success",
      message: "欢迎回来",
      title: `HI,${getTime()}好`,
    });
    //登录成功加载效果也消失
    loading.value = false;
  } catch (error) {
    //登录失败加载效果消息
    loading.value = false;
    console.log(error);
    //登录失败的提示信息
    ElNotification({
      type: "error",
      message: (error as Error).message,
    });
  }
};

//获取验证码
onMounted(() => {
  loginFrom.refreshCaptcha();
});

const rules = {
  userName: [
    {
      required: true,
      min: 2,
      max: 10,
      message: "账号长度至少6位",
      trigger: "change",
    },
  ],
  password: [
    {
      required: true,
      min: 2,
      max: 15,
      message: "密码长度至少6位",
      trigger: "change",
    },
  ],
  captcha: [
    {
      required: true,
      min: 2,
      max: 8,
      message: "验证码是4位",
      trigger: "change",
    },
  ],
};
</script>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background: url("@/assets/images/background.jpg");
  background-size: cover;
  padding: 40px;

  .login_from {
    position: relative;
    width: 80%;
    top: 30vh;
    background: url("@/assets/images/login_form.png") no-repeat;
    background-size: cover;
    padding: 40px;

    h1 {
      color: white;
      font-size: 40px;
    }

    h2 {
      color: white;
      font-size: 20px;
      margin: 20px 0px;
    }

    .login_btn {
      width: 100%;
    }

    .captcha {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
    }

    .captcha img {
      cursor: pointer;
      margin-left: 20px;
      height: 30px;
      border-radius: 3px;
    }
  }
}
</style>
