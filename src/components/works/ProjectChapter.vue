<!--
【控制畫面】分類分頁中的「一組作品」章節（A 款章節式相簿）
【負責功能】桌面：左欄約 22.5%（編號、非斜體作品名稱、短線、介紹、照片數標籤）＋右欄橫向相簿；
            手機：上方介紹、下方相簿；章節之間以細線區隔。
【資料來源】由 CategoryPage.vue 傳入的作品（照片＋ public/images/works/<分類>/<作品>/info.txt 的文字）。
【常見修改】
  - 文字、照片：改作品資料檔
  - 左右欄比例：本檔 .chapter 的 grid-template-columns
  - 章節上下間距：.chapter 的 padding
【注意事項】章節 id 等於作品 id，首頁精選用它跳到指定章節（#quiet-light）。照片數由 photos 自動計算。
-->
<script setup lang="ts">
import RichText from '@/components/common/RichText.vue'
import { computed } from 'vue'
import type { Project } from '@/types/portfolio'
import { formatPhotoCount } from '@/data/projects'
import PhotoCarousel from './PhotoCarousel.vue'

const props = defineProps<{ project: Project; number: number }>()

const numberLabel = computed(() => `${String(props.number).padStart(2, '0')} /`)
const titleId = computed(() => `${props.project.id}-title`)
</script>

<template>
  <article :id="project.id" class="chapter" :aria-labelledby="titleId">
    <header class="chapter__info">
      <p class="chapter__num">{{ numberLabel }}</p>
      <h2 :id="titleId" class="chapter__title">{{ project.title }}</h2>
      <span class="chapter__rule" aria-hidden="true" />
      <p class="chapter__desc"><RichText :text="project.description" /></p>
      <p class="pill chapter__count">{{ formatPhotoCount(project.photos.length) }}</p>
    </header>

    <PhotoCarousel v-if="project.photos.length" :photos="project.photos" :title="project.title" />
    <p v-else class="chapter__empty">Photos coming soon.</p>
  </article>
</template>

<style scoped>
/* ───────── 桌面（≥ 1024px）：左欄約 22.5%，右欄約 77.5% ───────── */
.chapter {
  display: grid;
  grid-template-columns: 22.5% minmax(0, 1fr);
  align-items: start;
  padding-block: calc(3.2 * var(--u)) calc(2.2 * var(--u));
  border-bottom: 1px solid var(--color-line);
}

.chapter__info {
  padding: calc(5.4 * var(--u)) calc(1.2 * var(--u)) 0 calc(1.1 * var(--u));
  min-width: 0;
}

.chapter__num {
  font-family: var(--font-sans);
  font-size: var(--fs-chapter-num);
  letter-spacing: 0.04em;
  color: var(--color-text-soft);
}

.chapter__title {
  margin-top: calc(0.3 * var(--u));
  font-size: var(--fs-chapter-title);
  line-height: 1.12;
  color: var(--color-text);
  overflow-wrap: break-word;
  hyphens: auto;
}

.chapter__rule {
  display: block;
  width: calc(3.6 * var(--u));
  height: 1px;
  margin-top: calc(3 * var(--u));
  background: var(--color-line-strong);
}

.chapter__desc {
  margin-top: calc(3 * var(--u));
  font-size: var(--fs-chapter-text);
  line-height: 1.5;
  letter-spacing: 0.01em;
  color: var(--color-text-soft);
}

.chapter__count {
  margin-top: calc(3.4 * var(--u));
}

.chapter__empty {
  align-self: center;
  padding: 48px 0;
  color: var(--color-muted);
}

/* ───────── 平板（768–1023px）：左欄加寬，避免文字欄過窄；相簿約 2 張 ───────── */
@media (max-width: 1023.98px) {
  .chapter {
    grid-template-columns: 30% minmax(0, 1fr);
    padding-block: 36px 24px;
  }

  .chapter__info {
    padding: 40px 24px 0 4px;
  }
}

/* ───────── 手機（< 768px）：上方介紹、下方相簿 ───────── */
@media (max-width: 767.98px) {
  .chapter {
    grid-template-columns: minmax(0, 1fr);
    row-gap: 22px;
    padding-block: 32px 20px;
  }

  .chapter__info {
    padding: 0;
  }

  .chapter__title {
    margin-top: 4px;
  }

  .chapter__rule {
    width: 32px;
    margin-top: 16px;
  }

  .chapter__desc {
    margin-top: 14px;
    max-width: 34em;
  }

  .chapter__count {
    margin-top: 18px;
  }
}
</style>
