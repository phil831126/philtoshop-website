<!--
【控制畫面】/works（作品分類總覽）— 延伸設計：設計稿未提供此頁，沿用分頁風格簡約處理
【負責功能】顯示六個分類的代表圖、名稱、短介紹與作品組數；點擊進入分類分頁。
【資料來源】頁面大標、副標：public/images/works/info.txt；各分類資料夾的 info.txt（名稱、總覽介紹、總覽封面），經 src/data/categories.ts 讀取；作品組數自動計算。
【常見修改】代表圖：把照片直接放進分類資料夾（例如 public/images/works/emotional/cover.jpg），或分類 info.txt 的「總覽封面」；介紹：「總覽介紹」；卡片比例：本檔 .works-card__media 的 aspect-ratio（目前 2:3，照片完整顯示不裁切）。
【注意事項】代表圖未設定時，自動使用該分類第一組已公開作品的封面；都沒有時顯示替代區塊。
-->
<script setup lang="ts">
import { sortedCategories, worksPage } from '@/data/categories'
import { getCoverPhoto, getPhoto, getPublishedProjects } from '@/data/projects'
import type { Category, Photo } from '@/types/portfolio'
import AppImage from '@/components/common/AppImage.vue'
import IconArrow from '@/components/common/IconArrow.vue'

function coverFor(cat: Category): Photo | undefined {
  // ① 另外上傳的代表圖（放在分類資料夾裡的照片）
  if (cat.coverImage) return cat.coverImage
  // ② info.txt「總覽封面」指定的作品照片
  if (cat.cover) {
    const p = getPhoto(cat.cover, cat.id)
    if (p) return p
  }
  const first = getPublishedProjects(cat.id)[0]
  return first ? getCoverPhoto(first) : undefined
}

const items = sortedCategories.map((cat, i) => ({
  cat,
  number: String(i + 1).padStart(2, '0'),
  cover: coverFor(cat),
  count: getPublishedProjects(cat.id).length,
}))
</script>

<template>
  <div class="works-page container">
    <header class="works-page__header">
      <h1 class="works-page__title">{{ worksPage.title }}</h1>
      <p class="works-page__intro">{{ worksPage.intro }}</p>
      <span class="works-page__rule" aria-hidden="true" />
    </header>

    <ul class="works-grid">
      <li v-for="item in items" :key="item.cat.id">
        <RouterLink :to="`/works/${item.cat.id}`" class="works-card">
          <span class="works-card__media">
            <AppImage v-if="item.cover" :photo="item.cover" fit="contain" sizes="(max-width: 767px) 92vw, (max-width: 1023px) 46vw, 31vw" />
            <span v-else class="works-card__placeholder" aria-hidden="true" />
          </span>
          <span class="works-card__meta">
            <span class="works-card__num">{{ item.number }} /</span>
            <span class="works-card__name">{{ item.cat.name }}</span>
            <IconArrow direction="up-right" :size="15" />
          </span>
          <span class="works-card__summary">{{ item.cat.summary }}</span>
          <span class="works-card__count">{{ String(item.count).padStart(2, '0') }} SERIES</span>
        </RouterLink>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.works-page__header {
  padding-top: calc(3.4 * var(--u));
  padding-left: calc(1.1 * var(--u));
}

.works-page__title {
  font-size: var(--fs-page-title);
  line-height: 1.04;
}

.works-page__intro {
  margin-top: calc(1.2 * var(--u));
  font-size: var(--fs-page-intro);
  color: var(--color-text-soft);
}

.works-page__rule {
  display: block;
  width: calc(5.6 * var(--u));
  height: 1px;
  margin-top: calc(3 * var(--u));
  background: var(--color-line-strong);
}

/* ───────── 桌面：三欄 ───────── */
.works-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: calc(5 * var(--u)) calc(2.4 * var(--u));
  margin-top: calc(4 * var(--u));
  padding-top: calc(4 * var(--u));
  border-top: 1px solid var(--color-line);
}

.works-card {
  display: flex;
  flex-direction: column;
}

.works-card__media {
  display: block;
  aspect-ratio: 2 / 3; /* 與照片相同的 2:3 直式，代表圖不被裁切（其他比例會完整縮放顯示） */
  overflow: hidden;
  background: var(--color-img-bg);
}

.works-card__media :deep(img) {
  transition: transform 900ms var(--ease), opacity 500ms var(--ease);
}

.works-card:hover .works-card__media :deep(img) {
  transform: scale(1.02);
}

.works-card__placeholder {
  display: block;
  width: 100%;
  height: 100%;
  border: 1px dashed var(--color-line);
}

.works-card__meta {
  display: flex;
  align-items: baseline;
  gap: 0.3em;
  margin-top: 18px;
  font-family: var(--font-serif);
  font-size: var(--fs-feature-title);
}

.works-card__meta :deep(svg) {
  margin-left: auto;
  align-self: center;
  color: var(--color-text-soft);
}

.works-card__num {
  color: var(--color-text-soft);
}

.works-card__summary {
  margin-top: 8px;
  font-size: var(--fs-body);
  line-height: 1.5;
  color: var(--color-muted);
}

.works-card__count {
  margin-top: 14px;
  font-size: 11px;
  letter-spacing: 0.18em;
  color: var(--color-text-soft);
}

/* ───────── 平板：兩欄 ───────── */
@media (max-width: 1023.98px) {
  .works-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

/* ───────── 手機：單欄 ───────── */
@media (max-width: 767.98px) {
  .works-page__header {
    padding-top: 28px;
    padding-left: 0;
  }

  .works-grid {
    grid-template-columns: minmax(0, 1fr);
    gap: 44px;
    margin-top: 28px;
    padding-top: 28px;
  }

  .works-card__media {
    aspect-ratio: 2 / 3;
  }
}

@media (prefers-reduced-motion: reduce) {
  .works-card:hover .works-card__media :deep(img) {
    transform: none;
  }
}
</style>
