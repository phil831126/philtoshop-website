<!--
【控制畫面】首頁精選區的單一項目（一張照片＋編號／分類名稱／短介紹／細線）
【負責功能】依 layout 代號放到附圖對應位置；點擊照片或標題進入分類（有 projectId 時跳到該組作品章節）。
【資料來源】由 FeaturedWorks.vue 傳入 src/data/home.ts 的 featured 項目。
【常見修改】
  - 文字與照片：改 home.ts
  - 桌面位置：本檔「桌面」區段的 grid-column／grid-row／margin-top（以 48 欄計算）
  - 手機大小與錯位：本檔「手機」區段的 width／margin
【注意事項】桌面版 article 使用 display: contents，讓照片與文字各自成為格線中的一格；
            文字放在深色留白區，不壓在照片上（offset-right 依附圖只顯示小型毛玻璃標籤）。
-->
<script setup lang="ts">
import RichText from '@/components/common/RichText.vue'
import { computed } from 'vue'
import type { FeaturedWork } from '@/types/portfolio'
import AppImage from '@/components/common/AppImage.vue'
import IconArrow from '@/components/common/IconArrow.vue'

const props = defineProps<{ item: FeaturedWork }>()

const to = computed(() => ({
  path: `/works/${props.item.categoryId}`,
  hash: props.item.projectId ? `#${props.item.projectId}` : '',
}))

const lineAfter = computed(() => props.item.layout === 'inset-left' || props.item.layout === 'tall-right')
</script>

<template>
  <article class="fw" :class="`fw--${item.layout}`">
    <RouterLink :to="to" class="fw__media" :aria-label="`${item.heading} — view works`">
      <AppImage :photo="item.image" fit="cover" sizes="(max-width: 767px) 90vw, (max-width: 1023px) 45vw, 40vw" />
      <span v-if="item.layout === 'offset-right'" class="fw__tag" aria-hidden="true">
        {{ item.heading }}
        <IconArrow direction="up-right" :size="13" />
      </span>
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

/* 小型毛玻璃標籤（offset-right 桌面版） */
.fw__tag {
  position: absolute;
  left: calc(1.4 * var(--u));
  bottom: calc(1.4 * var(--u));
  display: inline-flex;
  align-items: center;
  gap: 0.7em;
  padding: 0.65em 1em;
  font-size: var(--fs-micro);
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-text);
  background: var(--glass-card-bg);
  -webkit-backdrop-filter: var(--glass-blur);
  backdrop-filter: var(--glass-blur);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-pill);
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

  /* 右側較低的圖（只顯示小型標籤） */
  .fw--offset-right .fw__media {
    grid-column: 31 / 49;
    grid-row: 1;
    align-self: start;
    margin-top: calc(6.2 * var(--u));
    aspect-ratio: 366 / 270;
  }
  .fw--offset-right .fw__text {
    display: none;
  }

  /* 02 左側文字＋內縮圖片 */
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
    margin-top: calc(-0.4 * var(--u));
    aspect-ratio: 293 / 222;
  }

  /* 03 右側直式高圖＋圖片左下方文字 */
  .fw--tall-right .fw__media {
    grid-column: 29 / 48;
    grid-row: 2 / 4;
    align-self: start;
    margin-top: calc(3.7 * var(--u));
    aspect-ratio: 4 / 5;
  }
  .fw--tall-right .fw__text {
    grid-column: 18 / 28;
    grid-row: 3;
    align-self: start;
    margin-top: calc(4.6 * var(--u));
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
  .fw__tag {
    display: none;
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
    width: 88%;
    margin-left: auto;
    aspect-ratio: 366 / 270;
  }
  .fw--offset-right .fw__text {
    width: 88%;
    margin-left: auto;
  }
  .fw--inset-left {
    margin-top: -24px;
  }
  .fw--inset-left .fw__media {
    width: 84%;
    margin-left: 8%;
    aspect-ratio: 293 / 222;
  }
  .fw--inset-left .fw__text {
    margin-left: 8%;
  }
  .fw--tall-right {
    margin-top: 40px;
  }
  .fw--tall-right .fw__media {
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
  .fw__tag,
  .fw__rule {
    display: none;
  }
  .fw--wide-left .fw__media {
    width: 100%;
    aspect-ratio: 401 / 290;
  }
  .fw--offset-right .fw__media,
  .fw--offset-right .fw__text {
    width: 84%;
    margin-left: auto;
  }
  .fw--offset-right .fw__media {
    aspect-ratio: 366 / 270;
  }
  .fw--inset-left .fw__media,
  .fw--inset-left .fw__text {
    width: 80%;
    margin-left: 6%;
  }
  .fw--inset-left .fw__media {
    aspect-ratio: 293 / 222;
  }
  .fw--tall-right .fw__media,
  .fw--tall-right .fw__text {
    width: 86%;
    margin-left: auto;
  }
  .fw--tall-right .fw__media {
    aspect-ratio: 4 / 5;
  }
}

@media (prefers-reduced-motion: reduce) {
  .fw__media:hover :deep(img) {
    transform: none;
  }
}
</style>
