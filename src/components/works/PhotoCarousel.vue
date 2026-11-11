<!--
【控制畫面】分類分頁每組作品右側的橫向相簿（照片列＋左右箭頭＋「目前／總數」）
【負責功能】
  - 依這組照片「實際的比例」決定格子大小（2:3、9:16 都適用）：桌面剛好 3 張、平板 2 張、手機 1 張，
    邊緣不會出現被切到一半的照片；每張照片完整顯示，不裁切、不拉伸（比例不同的照片會置中縮小放進格子）。
  - 支援箭頭按鈕、觸控滑動、觸控板橫向捲動；scroll-snap 讓停留位置自然。
  - 計數＝最左側主要可見照片序號／總張數，依實際捲動位置更新。
  - 點擊照片開啟大圖（PhotoLightbox）；關閉後焦點回到原本照片。
【資料來源】由 ProjectChapter.vue 傳入該組作品的 photos。
【常見修改】一次顯示幾張、間距、手機最高高度：改 src/styles/tokens.css 的 --carousel-visible、--carousel-gap、--carousel-max-h。
【注意事項】捲動與計數邏輯在 src/composables/usePhotoCarousel.ts，一般不需要修改。
-->
<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import type { Photo } from '@/types/portfolio'
import { usePhotoCarousel } from '@/composables/usePhotoCarousel'
import AppImage from '@/components/common/AppImage.vue'
import IconArrow from '@/components/common/IconArrow.vue'
import PhotoLightbox from './PhotoLightbox.vue'

/** wide：相簿滿版時（沒有左欄），桌面版一次多顯示一張（4 張） */
const props = defineProps<{ photos: Photo[]; title: string; wide?: boolean }>()

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

/** 這組照片的代表比例（高÷寬，取中位數）：2:3 直式＝1.5、9:16 直式≈1.78 */
const photoHeightRatio = computed(() => {
  const ratios = props.photos.map((p) => p.height / p.width).sort((a, b) => a - b)
  if (!ratios.length) return 1.5
  const mid = Math.floor(ratios.length / 2)
  return ratios.length % 2 ? ratios[mid]! : (ratios[mid - 1]! + ratios[mid]!) / 2
})
</script>

<template>
  <div class="carousel" :class="{ 'is-static': !hasOverflow, 'carousel--wide': wide }" :style="{ '--photo-hw': photoHeightRatio.toFixed(4) }">
    <div
      ref="viewport"
      class="carousel__viewport"
      role="region"
      aria-roledescription="carousel"
      :aria-label="`${title} — ${photos.length} photos`"
    >
      <ul class="carousel__track">
        <li v-for="(photo, i) in props.photos" :key="photo.id" class="carousel__slide" data-slide>
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

/* 滿版相簿：桌面一次 4 張（平板、手機不變） */
@media (min-width: 1024px) {
  .carousel--wide {
    --carousel-visible: 4;
  }
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
 * 每個格子：寬度＝相簿寬度平均分成 --carousel-visible 份（剛好排滿，不會露出半張）；
 * 高度＝格子寬 × 這組照片的比例（--photo-hw），並以 --carousel-max-h 限制最高高度。
 * 照片以 contain 完整放進格子，不裁切也不拉伸。
 */
.carousel__slide {
  --cell: calc((100cqi - (var(--carousel-visible) - 1) * var(--carousel-gap)) / var(--carousel-visible));
  flex: 0 0 auto;
  width: var(--cell);
  height: min(calc(var(--cell) * var(--photo-hw, 1.5)), var(--carousel-max-h));
  scroll-snap-align: start;
}

/* 載入完成後格子不留底色：照片比例不同時，看起來只是置中縮小（載入前保留深色底，避免看起來空白） */
.carousel__slide :deep(.app-image.is-loaded) {
  background: transparent;
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
