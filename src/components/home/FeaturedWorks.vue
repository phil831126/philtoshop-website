<!--
【控制畫面】首頁「Selected works.」精選區（分隔線、標題、不對稱交錯照片）
【負責功能】把精選項目每 5 個分成一組，交給 FeaturedWorkItem 依版面代號排版。
【資料來源】src/data/home.ts 的 featured、featuredHeading。
【常見修改】
  - 標題文字（留空＝不顯示）：public/images/home/info.txt 的「精選標題」
  - 精選內容與順序：改 public/images/home/info.txt（位置依順序自動決定）
  - 區塊上下間距：本檔 .featured 的 margin／padding
【注意事項】每組的列結構（grid-template-rows）配合五種版面代號設計，請勿任意刪改。
-->
<script setup lang="ts">
import { computed } from 'vue'
import { featuredHeading, LAYOUTS, publishedFeatured } from '@/data/home'
import FeaturedWorkItem from './FeaturedWorkItem.vue'

/** 標題兩段都留空時不顯示 */
const hasHeading = computed(() => Boolean(featuredHeading.regular || featuredHeading.italic))

/** 每 5 個一組（一組用完五種版面） */
const groups = computed(() => {
  const size = LAYOUTS.length
  const out: (typeof publishedFeatured)[] = []
  for (let i = 0; i < publishedFeatured.length; i += size) out.push(publishedFeatured.slice(i, i + size))
  return out
})
</script>

<template>
  <section v-if="publishedFeatured.length" class="featured container" aria-labelledby="featured-title">
    <h2 v-if="hasHeading" id="featured-title" class="featured__title">
      {{ featuredHeading.regular }} <em v-if="featuredHeading.italic">{{ featuredHeading.italic }}</em>
    </h2>
    <!-- 標題留空時畫面不顯示，但保留給螢幕閱讀器的區塊名稱 -->
    <h2 v-else id="featured-title" class="visually-hidden">Selected works</h2>
    <div v-for="(group, gi) in groups" :key="gi" class="featured__group">
      <FeaturedWorkItem v-for="item in group" :key="item.id" :item="item" />
    </div>
  </section>
</template>

<style scoped>
.featured {
  margin-top: calc(3.6 * var(--u));
}

/* 分隔線（與內容同寬） */
.featured::before {
  content: '';
  display: block;
  height: 1px;
  background: var(--color-line);
}

.featured__title {
  margin-top: calc(2.4 * var(--u));
  font-size: var(--fs-display);
  line-height: 1.1;
  color: var(--color-text-soft);
}

/* 只有首頁這個 works. 使用斜體（依設計稿） */
.featured__title em {
  font-style: italic;
}

/* ───────── 桌面：48 欄編輯式格線，列結構：第一列、第二列、第三列（高圖延伸） ───────── */
.featured__group {
  display: grid;
  grid-template-columns: repeat(48, minmax(0, 1fr));
  grid-template-rows: auto auto auto auto;
  margin-top: calc(3.4 * var(--u));
}

.featured__group + .featured__group {
  margin-top: calc(7 * var(--u));
}

/* ───────── 平板：兩欄交錯 ───────── */
@media (max-width: 1023.98px) {
  .featured__group {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-template-rows: none;
    column-gap: 6%;
    row-gap: 0;
    align-items: start;
  }
}

/* ───────── 手機：單欄，保留輕微左右錯位 ───────── */
@media (max-width: 767.98px) {
  .featured {
    margin-top: 48px;
  }

  .featured__title {
    margin-top: 28px;
  }

  .featured__group {
    display: flex;
    flex-direction: column;
    gap: 44px;
    margin-top: 28px;
  }

  .featured__group + .featured__group {
    margin-top: 44px;
  }
}
</style>
