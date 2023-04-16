<template>
  <div style="padding-top: 20%; padding-right: 30%">
    <a-form
      :model="formState"
      name="basic"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <a-form-item
        label="账号"
        name="userAccount"
        :rules="[{ required: true, message: '请输入你的账号!' }]"
      >
        <a-input v-model:value="formState.userAccount" />
      </a-form-item>

      <a-form-item
        label="密码"
        name="userPassword"
        :rules="[{ required: true, message: '请输入你的密码' }]"
      >
        <a-input-password v-model:value="formState.userPassword" />
      </a-form-item>
      <div style="padding-left: 35%">
        <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
          <a-checkbox v-model:checked="formState.remember"
            >Remember me
          </a-checkbox>
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
          <a-button type="primary" html-type="submit">Submit</a-button>
        </a-form-item>
      </div>
    </a-form>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from "vue";
import myAxios from "@/plugins/myAxios";
import { message } from "ant-design-vue";
import { useRouter } from "vue-router";

const router = useRouter();

interface FormState {
  userAccount: string;
  userPassword: string;
  remember: boolean;
}

const formState = reactive<FormState>({
  userAccount: "",
  userPassword: "",
  remember: true,
});
const onFinish = (values: any) => {
  console.log("Success:", values);
  myAxios.post("/user/login", values).then(function (res: any) {
    console.log(res);
    if (res) {
      message.success("登录成功");
    }
    router.push("/index");
  });
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};
</script>
