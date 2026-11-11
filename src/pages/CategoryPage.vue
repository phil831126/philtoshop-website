<!--
【控制畫面】/works/emotional、/works/style、/works/monochrome、/works/ordinary、/works/shore、/works/viscera
【負責功能】六個分類「共用」的頁面：依網址讀取分類資料，顯示頁首與每組作品章節；沒有作品時顯示空狀態。
            分類只有一組作品時（例如 Viscera），不顯示編號與作品名稱，照片數移到頁首、相簿滿版。
【資料來源】src/data/categories.ts、src/data/projects/（皆讀取 public/images/works/ 的資料夾與 info.txt）。
【常見修改】內容請改資料檔；章節外觀請改 components/works/ProjectChapter.vue。
【注意事項】請勿為各分類複製此頁面；新增作品只需修改資料檔。
-->
<script setup lang="ts">
import { computed } from 'vue'
import { getCategory, isCategoryId } from '@/data/categories'
import { getPublishedProjects } from '@/data/projects'
import CategoryHeader from '@/components/works/CategoryHeader.vue'
import ProjectChapter from '@/components/works/ProjectChapter.vue'

const props = defineProps<{ categoryId: string }>()

const category = computed(() => getCategory(props.categoryId))
const projects = computed(() => (isCategoryId(props.categoryId) ? getPublishedProjects(props.categoryId) : []))
/** 這個分類只有一組作品：不顯示編號與作品名稱，照片數移到頁首，相簿滿版 */
const single = computed(() => projects.value.length === 1)
</script>

<template>
  <div v-if="category" class="category-page container">
    <CategoryHeader :category="category" :photo-count="single ? projects[0]?.photos.length : undefined" />
    <div class="category-page__chapters">
      <ProjectChapter v-for="(project, i) in projects" :key="project.id" :project="project" :number="i + 1" :single="single" />
    </div>
    <div v-if="!projects.length" class="category-page__empty">
      <p>New work for {{ category.name }} is on the way.</p>
      <RouterLink to="/works" class="eyebrow category-page__back">Back to works</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.category-page__empty {
  padding: 64px 0 24px;
  color: var(--color-muted);
  border-top: 1px solid var(--color-line);
  margin-top: calc(3.3 * var(--u));
}

.category-page__back {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  margin-top: 12px;
  color: var(--color-text);
}
</style>
