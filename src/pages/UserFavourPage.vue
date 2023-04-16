<template>
  <div class="components-page-header-demo-content">
    <a-page-header
      title="测试用户"
      class="site-page-header"
      :avatar="{
        src: 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4',
      }"
      :breadcrumb="{ routes }"
    >
      <template #tags>
        <a-tag color="blue">医师</a-tag>
      </template>
      <template #extra>
        <a-button key="3" @click="toSearch">搜索文献</a-button>
        <a-button key="2" @click="toThumb">我的点赞</a-button>
        <a-button key="1" type="primary" @click="Logout">退出登录</a-button>
        <a-dropdown key="more">
          <a-button :style="{ border: 'none', padding: 0 }">
            <EllipsisOutlined
              :style="{ fontSize: '20px', verticalAlign: 'top' }"
            />
          </a-button>
        </a-dropdown>
      </template>
    </a-page-header>
  </div>
  <MyDivider />
  <CardList :essay-list="essayList" />
</template>

<script setup lang="ts">
import MyDivider from "@/components/MyDivider.vue";
import myAxios from "@/plugins/myAxios";
import { message } from "ant-design-vue";
import { useRouter } from "vue-router";
import CardList from "@/components/CardList.vue";
import { onMounted, ref, watchEffect } from "vue";

const essayList = ref([]);

const router = useRouter();

const Logout = () => {
  myAxios.post("/user/logout").then(function (res) {
    if (res) {
      message.success("退出登录成功");
      router.push("/login");
    }
  });
};

const toSearch = () => {
  router.push("/index");
};

const toThumb = () => {
  router.push("/thumb");
};

onMounted(() => {
  loadData();
});

const loadData = () => {
  let query;
  query = {
    userId: 1,
  };
  myAxios.post("/essay_favour/list/page", query).then((res: any) => {
    console.log(res.records);
    essayList.value = res.records;
  });
};

watchEffect(() => {
  loadData();
});
</script>

<style scoped></style>
