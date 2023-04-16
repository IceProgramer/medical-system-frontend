<template>
  <a-list item-layout="horizontal" :data-source="props.essayList">
    <template #renderItem="{ item }">
      <a-list-item>
        <a-list-item-meta :description="item.content">
          <template #title>
            <a :href="item.path">{{ item.title }}</a>
          </template>
          <template #avatar>
            <a-avatar :src="shen" />
          </template>
        </a-list-item-meta>
      </a-list-item>
    </template>
  </a-list>
</template>

<script setup lang="ts">
import shen from "../assets/shen.jpg";
import { withDefaults, defineProps } from "vue";
import { EssayType } from "@/models/essay";

interface Props {
  essayList: EssayType[];
}

const props = withDefaults(defineProps<Props>(), {
  essayList: () => [],
});
</script>

<style scoped></style>
