<!--
【控制畫面】首頁精選區的單一項目（一張照片＋編號／分類名稱／短介紹／細線）
【負責功能】依 layout 代號放到附圖對應位置；點擊照片或標題進入分類（有 projectId 時跳到該組作品章節）。
【資料來源】由 FeaturedWorks.vue 傳入 src/data/home.ts 的 featured 項目。
【常見修改】
  - 文字與照片：改 public/images/home/info.txt 的【精選 N】
  - 桌面位置：本檔「桌面」區段的 grid-column／grid-row／margin-top（以 48 欄計算）
  - 手機大小與錯位：本檔「手機」區段的 width／margin
【注意事項】桌面版 article 使用 display: contents，讓照片與文字各自成為格線中的一格；
            文字放在深色留白區，不壓在照片上（第 2 張 offset-right 的文字在照片上方）。
-->
<script setup lang="ts">
import RichText from '@/components/common/RichText.vue'
import { computed } from 'vue'
import type { FeaturedWork } from '@/types/portfolio'
import AppImage from '@/components/common/AppImage.vue'

const props = defineProps<{ item: FeaturedWork }>()

const to = computed(() => ({
  path: `/works/${props.item.categoryId}`,
  hash: props.item.projectId ? `#${props.item.projectId}` : '',
}))

/** 標題後面接一條細線的版面（第一張是線在標題上方） */
const lineAfter = computed(() => props.item.layout !== 'wide-left')
</script>

<template>
  <article class="fw" :class="`fw--${item.layout}`">
    <RouterLink :to="to" class="fw__media" :aria-label="`${item.heading} — view works`">
      <AppImage :photo="item.image" fit="cover" sizes="(max-width: 767px) 90vw, (max-width: 1023px) 45vw, 40vw" />
    </RouterLink>

    <div class="fw__text">
      <span v-if="item.layout === 'wide-left'" class="fw__rule" aria-hidden="true" />
      <h3 class="fw__title">
        <RouterLink :to="to" tabindex="-1" class="fw__title-link">
          <span v-if="item.number" class="fw__num">{{ item.number }} /</span>
          {{ item.heading }}
        </RouterLink>
        <span v-if="lineAfter" class="fw__line" aria-hidden="true" />
      </h3>
      <p v-if="item.text" class="fw__desc"><RichText :text="item.text" /></p>
    </div>
  </article>
</template>

<style scoped>
/* ───────── 共用 ───────── */
.fw__media {
  position: relative;
  display: block;
  overflow: hidden;
}

.fw__media :deep(img) {
  transition: transform 900ms var(--ease), opacity 500ms var(--ease);
}

.fw__media:hover :deep(img) {
  transform: scale(1.02);
}

.fw__title {
  display: flex;
  align-items: center;
  gap: 0.5em;
  font-size: var(--fs-feature-title);
  line-height: 1.2;
}

.fw__title-link {
  color: var(--color-text);
}

.fw__title-link:hover {
  color: var(--color-text-soft);
}

.fw__num {
  color: var(--color-text-soft);
  font-weight: 350;
}

/* 編號與名稱盡量同一行；名稱過長時才換行 */
.fw__title-link {
  min-width: 0;
}

.fw__num {
  white-space: nowrap;
}

.fw__desc {
  margin-top: 0.75em;
  font-size: var(--fs-body);
  line-height: 1.5;
  letter-spacing: 0.02em;
  color: var(--color-muted);
  white-space: pre-line;
}

.fw__rule {
  display: block;
  width: calc(4.1 * var(--u));
  height: 1px;
  margin-bottom: calc(3 * var(--u));
  background: var(--color-line-strong);
}

.fw__line {
  flex: 1 1 auto;
  min-width: 0.7em;
  max-width: 4.5em;
  height: 1px;
  background: var(--color-line-strong);
}

/* ───────── 桌面（≥ 1024px）：依附圖座標換算（48 欄） ───────── */
@media (min-width: 1024px) {
  .fw {
    display: contents;
  }

  /* 01 左側大圖＋右側文字 */
  .fw--wide-left .fw__media {
    grid-column: 1 / 20;
    grid-row: 1;
    aspect-ratio: 401 / 290;
  }
  .fw--wide-left .fw__text {
    grid-column: 21 / 31;
    grid-row: 1;
    align-self: center;
    padding-left: calc(0.4 * var(--u));
  }

  /* 02 右側直式圖，文字在圖片上方 */
  .fw--offset-right {
    display: flex;
    flex-direction: column;
    grid-column: 35 / 49;
    grid-row: 1;
    align-self: start;
    margin-top: calc(1.2 * var(--u));
  }
  .fw--offset-right .fw__text {
    order: -1;
    margin-bottom: calc(2 * var(--u));
  }
  .fw--offset-right .fw__media {
    aspect-ratio: 4 / 5;
  }

  /* 03 左側文字＋內縮直式圖片（比原圖矮一點，保留版面變化） */
  .fw--inset-left .fw__text {
    grid-column: 1 / 11;
    grid-row: 2;
    align-self: center;
    padding-right: calc(0.5 * var(--u));
  }
  .fw--inset-left .fw__media {
    grid-column: 11 / 25;
    grid-row: 2;
    align-self: start;
    /* 負值＝往上拉，靠近第一張的下緣 */
    margin-top: calc(-14 * var(--u));
    aspect-ratio: 4 / 5;
  }

  /* 04 右側橫式圖＋圖片左下方文字（文字與圖片下緣對齊） */
  .fw--low-right .fw__media {
    grid-column: 29 / 48;
    grid-row: 2 / 4;
    align-self: end;
    aspect-ratio: 3 / 2;
  }
  .fw--low-right .fw__text {
    grid-column: 14 / 28;
    grid-row: 3;
    align-self: end;
    /* 上方留白：避免貼到左邊 03 的圖片下緣 */
    margin-top: calc(2.4 * var(--u));
    padding-bottom: calc(0.4 * var(--u));
  }

  /* 05 下方偏左的直式圖＋右側文字（文字與圖片下緣對齊）。
     比 06 早一點開始（圖片上緣較高），和 06 的高度錯開 */
  .fw--low-left {
    display: flex;
    align-items: flex-end;
    gap: calc(2 * var(--u));
    grid-column: 6 / 34;
    grid-row: 4;
    align-self: start;
    margin-top: calc(4.2 * var(--u));
  }
  .fw--low-left .fw__media {
    flex: 0 0 50%;
    aspect-ratio: 4 / 5;
  }
  .fw--low-left .fw__text {
    flex: 1 1 auto;
    min-width: 0;
    padding-bottom: calc(1.2 * var(--u));
  }

  /* 06 右側直式圖（緊鄰 05 右側、位在 04 正下方）＋文字在圖片上方；和 05 的圖片下緣對齊 */
  .fw--end-right {
    display: flex;
    flex-direction: column;
    grid-column: 35 / 48;
    grid-row: 4;
    align-self: end;
    margin-top: calc(4 * var(--u));
  }
  .fw--end-right .fw__text {
    order: -1;
    margin-bottom: calc(2 * var(--u));
  }
  .fw--end-right .fw__media {
    aspect-ratio: 4 / 5;
  }
}

/* ───────── 平板（768–1023px）：兩欄交錯，文字在照片下方 ───────── */
@media (min-width: 768px) and (max-width: 1023.98px) {
  .fw {
    display: flex;
    flex-direction: column;
    gap: 18px;
    margin-bottom: 56px;
  }
  .fw__rule {
    display: none;
  }
  .fw--wide-left .fw__media {
    aspect-ratio: 401 / 290;
  }
  .fw--offset-right {
    margin-top: 64px;
  }
  .fw--offset-right .fw__media {
    width: 70%;
    margin-left: auto;
    aspect-ratio: 4 / 5;
  }
  .fw--offset-right .fw__text {
    width: 70%;
    margin-left: auto;
  }
  .fw--inset-left {
    margin-top: -24px;
  }
  .fw--inset-left .fw__media {
    width: 84%;
    margin-left: 8%;
    aspect-ratio: 4 / 5;
  }
  .fw--inset-left .fw__text {
    margin-left: 8%;
  }
  .fw--low-right {
    margin-top: 40px;
  }
  .fw--low-right .fw__media {
    aspect-ratio: 3 / 2;
  }
  .fw--low-left .fw__media,
  .fw--low-left .fw__text {
    width: 74%;
  }
  .fw--low-left .fw__media {
    aspect-ratio: 4 / 5;
  }
  .fw--end-right .fw__media,
  .fw--end-right .fw__text {
    width: 72%;
    margin-left: auto;
  }
  .fw--end-right .fw__media {
    aspect-ratio: 4 / 5;
  }
}

/* ───────── 手機（< 768px）：單欄、輕微錯位與尺寸變化，文字跟隨照片 ───────── */
@media (max-width: 767.98px) {
  .fw {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
  .fw__rule {
    display: none;
  }
  .fw--wide-left .fw__media {
    width: 100%;
    aspect-ratio: 401 / 290;
  }
  .fw--offset-right .fw__media,
  .fw--offset-right .fw__text {
    width: 72%;
    margin-left: auto;
  }
  .fw--offset-right .fw__media {
    aspect-ratio: 4 / 5;
  }
  .fw--inset-left .fw__media,
  .fw--inset-left .fw__text {
    width: 80%;
    margin-left: 6%;
  }
  .fw--inset-left .fw__media {
    aspect-ratio: 4 / 5;
  }
  .fw--low-right .fw__media,
  .fw--low-right .fw__text {
    width: 92%;
    margin-left: auto;
  }
  .fw--low-right .fw__media {
    aspect-ratio: 3 / 2;
  }
  .fw--low-left .fw__media,
  .fw--low-left .fw__text {
    width: 76%;
    margin-left: 2%;
  }
  .fw--low-left .fw__media {
    aspect-ratio: 4 / 5;
  }
  .fw--end-right .fw__media,
  .fw--end-right .fw__text {
    width: 74%;
    margin-left: auto;
  }
  .fw--end-right .fw__media {
    aspect-ratio: 4 / 5;
  }
}

@media (prefers-reduced-motion: reduce) {
  .fw__media:hover :deep(img) {
    transform: none;
  }
}
</style>
