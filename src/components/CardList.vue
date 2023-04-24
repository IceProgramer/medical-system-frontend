<template>
  <a-list
    item-layout="vertical"
    size="large"
    :pagination="pagination"
    :data-source="props.essayList"
  >
    <template #renderItem="{ item }">
      <a-list-item key="item.title">
        <template #actions>
          <span v-for="{ type, text } in actions" :key="type">
            <component
              :is="type"
              style="margin-right: 8px"
              @click="onClick(type, item.id)"
            />
            {{ text }}
          </span>
        </template>
        <template #extra>
          <img width="272" alt="logo" :src="medicalPic" />
        </template>
        <a-list-item-meta :description="item.author">
          <template #title>
            <a :href="item.href">{{ item.title }}</a>
          </template>
          <template #avatar>
            <a-avatar :src="item.user.userAvatar" />
          </template>
        </a-list-item-meta>
        {{ item.content }}
      </a-list-item>
    </template>
  </a-list>
</template>
<script lang="ts" setup>
import {
  StarOutlined,
  LikeOutlined,
  MessageOutlined,
} from "@ant-design/icons-vue";
import { defineProps, withDefaults } from "vue";
import { EssayType } from "@/models/essay";
import medicalPic from "@/assets/medicalPic.jpg";
import myAxios from "@/plugins/myAxios";
import { message } from "ant-design-vue";

const pagination = {
  onChange: (page: number) => {
    console.log(page);
  },
  pageSize: 3,
};

interface Props {
  essayList: EssayType[];
}

const onClick = (type: any, essayId: number) => {
  if (!type.toString().split(" ")[1].search("StarOutlined")) {
    doFavour(essayId);
  }
  if (!type.toString().split(" ")[1].search("LikeOutlined")) {
    doThumb(essayId);
  }
  if (!type.toString().split(" ")[1].search("MessageOutlined")) {
    console.log(type.toString().split(" ")[1]);
  }
};

const doThumb = (essayId: number) => {
  let param;
  param = {
    essayId: essayId,
  };
  myAxios.post("/essay_thumb/thumb", param).then(function (res: any) {
    console.log(res);
    if (res === 1) {
      message.success("点赞成功");
      console.log("点赞成功");
    }
    if (res === -1) {
      message.success("取消点赞成功");
      console.log("取消点赞成功");
    }
  });
  console.log(essayId);
};

const num: number[] = [1, 2, 3];

const doFavour = (essayId: number) => {
  let param;
  param = {
    essayId: essayId,
  };
  myAxios.post("/essay_favour/favour", param).then(function (res: any) {
    console.log(res);
    if (res === 1) {
      message.success("收藏成功");
      console.log("收藏成功");
    }
    if (res === -1) {
      message.success("取消收藏成功");
      console.log("取消收藏成功");
    }
  });
  console.log(essayId);
};

const props = withDefaults(defineProps<Props>(), {
  essayList: () => [],
});

const actions: Record<any, any>[] = [
  { type: StarOutlined, text: "10" },
  { type: LikeOutlined, text: "4" },
  { type: MessageOutlined, text: "5" },
];
</script>
