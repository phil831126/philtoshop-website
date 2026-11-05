<!--
【控制畫面】分類分頁每組作品右側的橫向相簿（照片列＋左右箭頭＋「目前／總數」）
【負責功能】
  - 照片以相同展示高度排列：9:16 直式完整呈現；非 9:16 依原比例調整寬度，不裁切、不拉伸。
  - 支援箭頭按鈕、觸控滑動、觸控板橫向捲動；scroll-snap 讓停留位置自然。
  - 計數＝最左側主要可見照片序號／總張數，依實際捲動位置更新。
  - 點擊照片開啟大圖（PhotoLightbox）；關閉後焦點回到原本照片。
【資料來源】由 ProjectChapter.vue 傳入該組作品的 photos。
【常見修改】一次顯示幾張、間距、手機最高高度：改 src/styles/tokens.css 的 --carousel-visible、--carousel-gap、--carousel-max-h。
【注意事項】捲動與計數邏輯在 src/composables/usePhotoCarousel.ts，一般不需要修改。
-->
<script setup lang="ts">
import { nextTick, ref } from 'vue'
import type { Photo } from '@/types/portfolio'
import { usePhotoCarousel } from '@/composables/usePhotoCarousel'
import AppImage from '@/components/common/AppImage.vue'
import IconArrow from '@/components/common/IconArrow.vue'
import PhotoLightbox from './PhotoLightbox.vue'

const props = defineProps<{ photos: Photo[]; title: string }>()

const viewport = ref<HTMLElement | null>(null)
const { current, canPrev, canNext, hasOverflow, next, prev } = usePhotoCarousel(viewport)

const pad = (n: number) => String(n).padStart(2, '0')

// 大圖檢視
const lightboxOpen = ref(false)
const lightboxIndex = ref(0)
let openerIndex = 0

function openLightbox(index: number) {
  openerIndex = index
  lightboxIndex.value = index
  lightboxOpen.value = true
}

async function closeLightbox() {
  lightboxOpen.value = false
  await nextTick()
  // 焦點還給原本點擊的照片
  viewport.value?.querySelectorAll<HTMLButtonElement>('.carousel__open')[openerIndex]?.focus()
}

function slideStyle(photo: Photo) {
  return { aspectRatio: `${photo.width} / ${photo.height}` }
}
</script>

<template>
  <div class="carousel" :class="{ 'is-static': !hasOverflow }">
    <div
      ref="viewport"
      class="carousel__viewport"
      role="region"
      aria-roledescription="carousel"
      :aria-label="`${title} — ${photos.length} photos`"
    >
      <ul class="carousel__track">
        <li v-for="(photo, i) in props.photos" :key="photo.id" class="carousel__slide" data-slide :style="slideStyle(photo)">
          <button
            type="button"
            class="carousel__open"
            :aria-label="`Open photo ${i + 1} of ${photos.length}: ${photo.alt}`"
            @click="openLightbox(i)"
          >
            <AppImage :photo="photo" fit="contain" sizes="(max-width: 767px) 80vw, (max-width: 1023px) 35vw, 25vw" />
          </button>
        </li>
      </ul>
    </div>

    <div class="carousel__controls">
      <button
        type="button"
        class="carousel__arrow carousel__arrow--prev"
        :disabled="!canPrev"
        aria-label="Previous photos"
        @click="prev"
      >
        <IconArrow direction="left" :size="20" />
      </button>
      <p class="carousel__counter" aria-live="polite" aria-atomic="true">
        <span class="visually-hidden">Showing photo </span>{{ pad(current + 1) }}
        <span aria-hidden="true">/</span><span class="visually-hidden"> of </span>
        {{ pad(photos.length) }}
      </p>
      <button
        type="button"
        class="carousel__arrow carousel__arrow--next"
        :disabled="!canNext"
        aria-label="Next photos"
        @click="next"
      >
        <IconArrow direction="right" :size="20" />
      </button>
    </div>

    <PhotoLightbox
      v-model:index="lightboxIndex"
      :open="lightboxOpen"
      :photos="photos"
      :title="title"
      @close="closeLightbox"
    />
  </div>
</template>

<style scoped>
.carousel {
  min-width: 0;
  container-type: inline-size;
}

.carousel__viewport {
  position: relative;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  overscroll-behavior-x: contain;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
}

.carousel__viewport::-webkit-scrollbar {
  display: none;
}

.carousel__track {
  display: flex;
  gap: var(--carousel-gap);
  width: max-content;
}

/*
 * 每張照片的展示高度：依「一次顯示幾張 9:16」換算，並以 --carousel-max-h 限制最高高度。
 * 寬度由照片自身比例（aspect-ratio）決定 → 直式完整、橫式依比例變寬，不裁切也不拉伸。
 */
.carousel__slide {
  flex: 0 0 auto;
  height: min(
    calc((100cqi - (var(--carousel-visible) - 1) * var(--carousel-gap)) / var(--carousel-visible) * 16 / 9),
    var(--carousel-max-h)
  );
  max-width: 100cqi;
  scroll-snap-align: start;
  background: var(--color-img-bg);
}

.carousel__open {
  display: block;
  width: 100%;
  height: 100%;
  cursor: zoom-in;
}

.carousel__open:focus-visible {
  outline-offset: -3px;
}

/* 控制列：左箭頭、計數、右箭頭 */
.carousel__controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: calc(0.6 * var(--u));
}

.carousel__arrow {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 44px;
  color: var(--color-text);
  transition: opacity var(--dur) var(--ease);
}

.carousel__arrow--prev {
  justify-content: flex-start;
  padding-left: 4px;
}

.carousel__arrow--next {
  justify-content: flex-end;
  padding-right: 4px;
}

.carousel__arrow:disabled {
  opacity: 0.28;
}

.carousel__arrow:not(:disabled):hover {
  color: var(--color-text-soft);
}

.carousel__counter {
  font-family: var(--font-serif);
  font-size: var(--fs-counter);
  letter-spacing: 0.04em;
  font-variant-numeric: tabular-nums;
  color: var(--color-text);
}

/* 照片數不足以捲動：箭頭維持停用並淡化，保留與設計稿一致的章節節奏 */
.carousel.is-static .carousel__arrow {
  opacity: 0.14;
}
</style>
