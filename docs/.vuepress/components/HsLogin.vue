<template>
  <div class="login border-box m0-p0">
    <div class="left">
      <img
        :class="['bg-login', isBgLoading && 'is-loading']"
        src="/images/login/login.png"
        @load="isBgLoading = false"
        @click.prevent.stop
        alt="" />
      <img
        class="logo"
        src="/images/logo.png"
        @click.prevent.stop />
    </div>
    <div class="right" id="login_right_content">
      <n-form
        ref="loginForm"
        class="form"
        :model="formModel"
        :rules="rules"
        label-placement="top"
        label-width="60px"
        :show-require-mark="false"
      >
        <img class="mobile-logo" src="/images/logo.png"/>
        <h1 class="title">登 录</h1>
        <n-form-item
          label="用户名"
          path="username"
        >
          <n-input
            class="text"
            v-model:value="formModel.username"
            allowClear
            placeholder="请输入用户名"
          >
            <template #prefix>
              <img src="/images/login/icon-user.png" />
            </template>
          </n-input>
        </n-form-item>
        <n-form-item
          class="pwd-form-item"
          label="密码"
          path="password"
        >
          <n-input
            class="text"
            v-model:value="formModel.password"
            :type="pwdType"
            allowClear
            placeholder="请输入密码"
            @keyup="pwdKeyupHandle"
          >
            <template #prefix>
              <img src="/images/login/icon-password.png" />
            </template>
            <template #suffix>
              <img
                v-show="!pwdType"
                src="/images/login/icon-hide.png"
                style="cursor: pointer;"
                @click.stop.prevent="changePwdType"
              />
              <img
                v-show="pwdType"
                src="/images/login/icon-show.png"
                style="cursor: pointer;"
                @click.stop.prevent="changePwdType"
              />
            </template>
          </n-input>
        </n-form-item>
        <n-form-item class="btn-form-item btn-form-item-up" :show-label="false" :show-feedback="false">
          <n-button class="btn" type="primary" @click="loginWithUP">
            <n-spin :show="loading">
              {{ btnText }}
            </n-spin>
          </n-button>
        </n-form-item>
      </n-form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { cookieSetToken } from "@/utils/cookie";
import { delayTimeout, __throttle } from '@/utils/tool.ts'
import { storageGet } from '@/utils/storage.ts'
// import { encryptByMd5 } from '@/utils/encrypt.js'

// const naiveMessage = window.$message ?? useMessage()
const router = useRouter();
const ud = "admin";
const pd = "123456";
const username = import.meta.env.DEV ? ud : ud;
const password = import.meta.env.DEV ? pd : pd;
const rules = {
  username: [{ required: true, message: "请输入用户名", trigger: ["input", "blur"] }],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    {
      min: 6,
      max: 12,
      message: "*长度在 6 到 12 个字符!",
      trigger: ["input", "blur"],
    },
  ],
};
const formModel = reactive({
  username,
  password,
});
const isBgLoading = ref(true);
const loginForm = ref(null);
const pwdType = ref("password");
const loginType = ref(0);
const isUucLogin = ref(false)
const loading = ref(false);
const btnText = computed(() => (loading.value ? "登录中..." : "登 录"));
const loadingUuc = ref(false);
const btnUccText = computed(() => (loadingUuc.value ? "UUC登录中..." : "UUC登 录"));
// 显示密码
const changePwdType = () => {
  pwdType.value === "password"
    ? (pwdType.value = "")
    : (pwdType.value = "password");
};
const pwdKeyupHandle = (ev) => {
  if (ev.keyCode !== 13) return
  formSubmit()
}
const formSubmit = __throttle(() => {
  loginForm.value
    .validate(async (errors) => {
      if (!!errors) {
        loading.value = false;
        return
      }
      loading.value = true;
      // 临时登录, 目前暂不使用
      if (loginType.value === 0) {
        if (ud !== formModel.username || pd !== formModel.password) {
          loading.value = false;
          // naiveMessage.error({
          //   content: "用户/密码错误",
          //   duration: 1,
          // });
          return;
        }
        await delayTimeout()
        loading.value = false;
        // naiveMessage.success({
        //   content: "登陆成功",
        //   duration: 1,
        // });
        const token = `${formModel.username}-${formModel.password}`
        cookieSetToken({ type: 0, token })
        router.replace("/");
        return
      }
      loading.value = false;
    })
}, 1000, { leading: true })

// 普通用户登录
const loginWithUP = __throttle(() => {
  formSubmit();
}, 1000, { leading: true });
// uuc登录
const loginWithUUC = __throttle(() => {
  if (loadingUuc.value) {
    console.log("...正在登录UUC");
    return;
  }
  loadingUuc.value = true;
}, 500, { leading: true });
onMounted(async() => {
  const type = storageGet('_HR_LOGINTYPE') || 0
  isUucLogin.value = type === 3
  if (type !== 3) {
    loginType.value = type
  }
});
onUnmounted(() => {});
</script>

<style lang="scss" scoped>
.login {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  transition: transform 1s;
  transform: scale(1);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20;
  .left {
    flex: 0 0 62.5%;
    position: relative;

    .bg-login {
      width: 100%;
      height: 100%;

      &.is-loading {
        filter: blur(0.2em);
      }
    }

    .logo {
      position: absolute;
      top: 40px;
      left: 40px;
      width: 180px;
    }
  }

  .right {
    flex: 0 0 37.5%;
    background: #fff;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    .mobile-logo {
      display: none;
    }
    .icon-window-mode {
      position: absolute;
      right: 55px;
      top: 21px;
      cursor: pointer;
    }

    .icon-power {
      position: absolute;
      right: 20px;
      top: 20px;
      cursor: pointer;
    }

    .form {
      width: 432px;
      max-width: 100%;
      .title {
        margin: 0 0 80px;
        color: var(--h-title);
        font-size: 40px;
        font-weight: bold;
      }
      .text {
        font-size: 16px;
      }
      .btn {
        width: 100%;
        height: 64px;
        font-size: 20px;
        font-weight: 400;
        border-radius: 4px;
      }
      .btn-form-item-up {
        box-shadow: 5px 8px 15px 0px rgba(141, 145, 153, 0.43);
        .btn {
          background: var(--h-brand);
          &:hover {
            background: rgba(66, 143, 255, 0.7);
          }
        }
      }
      .btn-form-item-uuc {
        position: relative;
        .btn-last-login{
          position: absolute;
          color:rgba(0,0,0,0.2);
          top: 3px;
          right: 5px;
          z-index: 1;
          user-select: none;
        }
        .btn {
          color: var(--h-brand);
          background: #ffffff;
          border: 1px solid var(--h-border-accent);
          &:hover {
            border-color: #ffffff;
            color: #ffffff;
            background: rgba(66, 143, 255, 0.7);
          }
        }
      }
    }
  }
}

:deep(.n-form) {
  .n-form-item {
    margin-bottom: 32px;
  }
  .n-form-item-label {
    > label {
      height: 14px;
      line-height: 14px;
      font-size: 14px;
      color: rgba(82, 88, 102, 1);
    }
  }
  .n-form-item-blank {
    background: #f2f2f4;
    border-radius: 4px;
    display: flex;
    align-items: center;

    .n-input__prefix,
    .n-input__suffix {
      img {
        width: 20px;
        user-select: none;
      }
    }
    .n-input__prefix {
      padding: 0 20px;
    }

    .n-input__suffix {
      padding: 0 10px 0 10px;
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
    }

    .n-input {
      font-size: 16px;
      height: 64px;
      line-height: 64px;
      background: #f2f2f4;

      &::-webkit-input-placeholder {
        color: rgba(141, 145, 153, 1);
      }
    }
  }
}

@media screen and (max-width: 950px) {
  .login {
    .left {
      display: none;
    }
    .right {
      flex: 1;
      padding: 0 20px;
      // background: url("/images/login/bg-login.webp") center/cover no-repeat;
      .mobile-logo {
        display: block;
        margin: auto;
        width: 90%;
        position: fixed;
        top: 30px;
        left: 0;
        right: 0;
      }
      .form {
        width: 100%;
        .title {
          margin: 40px 0;
          color: #ffffff;
          text-align: center;
        }
        .btn-form-item .btn {
          height: 48px;
        }
        .pwd-form-item {
          margin-bottom: 50px;
        }
        .form-item-type{
          top: 15px;
          .login-type-text{
            color: var(--h-text-white);
          }
        }
      }
    }
    :deep(.ant-form) {
      background-color: transparent;
      .ant-form-item-label {
        margin-bottom: 14px;
        padding-bottom: 0;
        line-height: 14px;
        > label {
          color: #ffffff;
        }
      }
      .ant-input {
        height: 48px;
        line-height: 48px;
      }
    }
  }
}
</style>
