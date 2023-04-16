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
        <a-button key="3" @click="toFavour">我的收藏</a-button>
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
  <a-input-search
    v-model:value="searchText"
    placeholder="搜索内容"
    enter-button="搜索"
    size="large"
    @search="onSearch"
  />
  <MyDivider />
  <a-upload
    v-model:file-list="fileList"
    name="file"
    type="file"
    @change="handleChange"
    :headers="headers"
    accept="application/pdf"
    action="http://localhost:8088/essay/upload"
    id="upload"
  >
    <a-button>
      <upload-outlined></upload-outlined>
      上传文件
    </a-button>
  </a-upload>
  <MyDivider />
  <CardList :essay-list="essayList" />
</template>
<script lang="ts" setup>
import { useRoute, useRouter } from "vue-router";
import { ref, watchEffect } from "vue";
import MyDivider from "@/components/MyDivider.vue";
import myAxios from "@/plugins/myAxios";
import { message } from "ant-design-vue";
import CardList from "@/components/CardList.vue";

const router = useRouter();
const route = useRoute();
const initSearchParams = {
  pageSize: 10,
  pageNum: 1,
};

const essayList = ref([]);

const searchText = ref(route.params.text || "");

const searchParams = ref(initSearchParams);

interface FileItem {
  uid: string;
  name?: string;
  status?: string;
  response?: string;
  url?: string;
}

interface FileInfo {
  file: FileItem;
  fileList: FileItem[];
}

const headers = () => {
  "authorization-text";
};

const toFavour = () => {
  router.push("/favour");
};

const toThumb = () => {
  router.push("/thumb");
};

const onSearch = (value: string) => {
  console.log(value);
  router.push({
    query: {
      ...searchParams.value,
      text: value,
    },
  });
};

const loadData = (params: any) => {
  const query = {
    ...initSearchParams,
    searchText: params.text,
  };
  myAxios.post("/essay/query", query).then((res: any) => {
    console.log(res.records);
    essayList.value = res.records;
  });
};

watchEffect(() => {
  searchParams.value = {
    ...initSearchParams,
    text: route.query.text,
    type: route.params.category,
  } as any;
  loadData(searchParams.value);
});

const handleChange = (info: FileInfo) => {
  if (info.file.status !== "uploading") {
    console.log(info.file, info.fileList);
  }
  if (info.file.status === "done") {
    message.success(`${info.file.name} 文件上传成功！`);
  } else if (info.file.status === "error") {
    message.error(`${info.file.name} 文件上传失败！`);
  }
};

const Logout = () => {
  myAxios.post("/user/logout").then(function (res) {
    if (res) {
      message.success("退出登录成功");
      router.push("/login");
    }
  });
};
</script>
<style></style>
