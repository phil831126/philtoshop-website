<!--
【控制畫面】分類分頁頁首：Works / 分類名稱 麵包屑、大型非斜體分類標題、一句介紹、短分隔線
【負責功能】六個分類共用的頁首。
【資料來源】由 CategoryPage.vue 傳入 src/data/categories.ts 的分類。
【常見修改】標題與介紹文字：改 public/images/works/<分類>/info.txt 的「名稱」「介紹」；字級：tokens.css 的 --fs-page-title。
【注意事項】標題固定使用非斜體襯線字，請勿加上 font-style: italic。
-->
<script setup lang="ts">
import RichText from '@/components/common/RichText.vue'
import type { Category } from '@/types/portfolio'

defineProps<{ category: Category }>()
</script>

<template>
  <header class="category-header">
    <nav aria-label="Breadcrumb">
      <ol class="breadcrumb">
        <li><RouterLink to="/works" class="breadcrumb__link">Works</RouterLink></li>
        <li aria-hidden="true" class="breadcrumb__sep">/</li>
        <li><span aria-current="page">{{ category.name }}</span></li>
      </ol>
    </nav>
    <h1 class="category-header__title">{{ category.name }}</h1>
    <p class="category-header__intro"><RichText :text="category.intro" /></p>
    <span class="category-header__rule" aria-hidden="true" />
  </header>
</template>

<style scoped>
.category-header {
  padding-top: calc(3.4 * var(--u));
  padding-left: calc(1.1 * var(--u));
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.55em;
  font-size: var(--fs-breadcrumb);
  letter-spacing: 0.02em;
  color: var(--color-text);
}

.breadcrumb__link {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  margin-block: -12px;
}

.breadcrumb__link:hover {
  color: var(--color-text-soft);
  text-decoration: underline;
  text-underline-offset: 4px;
}

.breadcrumb__sep {
  color: var(--color-muted);
}

.category-header__title {
  margin-top: calc(1.5 * var(--u));
  font-size: var(--fs-page-title);
  font-style: normal;
  line-height: 1.04;
  color: var(--color-text);
}

.category-header__intro {
  margin-top: calc(1.2 * var(--u));
  font-size: var(--fs-page-intro);
  letter-spacing: 0.015em;
  color: var(--color-text-soft);
}

.category-header__rule {
  display: block;
  width: calc(5.6 * var(--u));
  height: 1px;
  margin-top: calc(3 * var(--u));
  background: var(--color-line-strong);
}

@media (max-width: 767.98px) {
  .category-header {
    padding-top: 28px;
    padding-left: 0;
  }

  .category-header__title {
    margin-top: 14px;
  }

  .category-header__intro {
    margin-top: 10px;
  }

  .category-header__rule {
    width: 48px;
    margin-top: 22px;
  }
}
</style>
