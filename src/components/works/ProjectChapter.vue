<!--
【控制畫面】分類分頁中的「一組作品」章節（A 款章節式相簿）
【負責功能】桌面：左欄約 22.5%（編號、作品名稱、短線、模特名字、IG 連結、日期、選填介紹、照片數標籤）＋右欄橫向相簿；
            手機：上方介紹、下方相簿；章節之間以細線區隔。
【資料來源】由 CategoryPage.vue 傳入的作品（照片＋ public/images/works/<分類>/<作品>/info.txt 的文字）。
【常見修改】
  - 文字：改作品資料夾的 info.txt（標題、模特、IG、日期、介紹）
  - 左右欄比例：本檔 .chapter 的 grid-template-columns
  - 章節上下間距：.chapter 的 padding
【注意事項】章節 id 等於作品 id（由資料夾名稱產生，空白換成 -），首頁精選用它跳到指定章節（#Dark-Game）。照片數由 photos 自動計算。
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
/** 中文（含日文假名）作品名稱：字級較小，並依字數自動縮小，盡量一行放得下 */
const isCjk = computed(() => /[぀-ヿ㐀-鿿豈-﫿]/.test(props.project.title))
const titleChars = computed(() => [...props.project.title.trim()].length)
const hasMeta = computed(() => Boolean(props.project.model || props.project.instagram.length || props.project.date))
</script>

<template>
  <article :id="project.id" class="chapter" :aria-labelledby="titleId">
    <header class="chapter__info">
      <p class="chapter__num">{{ numberLabel }}</p>
      <h2
        :id="titleId"
        class="chapter__title"
        :class="{ 'chapter__title--cjk': isCjk }"
        :style="isCjk ? { '--chars': titleChars } : undefined"
      >
        {{ project.title }}
      </h2>
      <span class="chapter__rule" aria-hidden="true" />
      <!-- 依手稿排版：模特名字 → IG（連結）→ 日期 → 照片數；沒填的項目不顯示 -->
      <div v-if="hasMeta" class="chapter__meta">
        <p v-if="project.model" class="chapter__model"><RichText :text="project.model" /></p>
        <ul v-if="project.instagram.length" class="chapter__ig" aria-label="Instagram">
          <li v-for="ig in project.instagram" :key="ig.url">
            <a :href="ig.url" target="_blank" rel="noopener noreferrer" class="chapter__ig-link"
              >{{ ig.label }}<span class="visually-hidden"> on Instagram (opens in a new tab)</span></a
            >
          </li>
        </ul>
        <p v-if="project.date" class="chapter__date">{{ project.date }}</p>
      </div>
      <p v-if="project.description" class="chapter__desc"><RichText :text="project.description" /></p>
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
  /* 讓中文標題可以依這一欄的寬度（cqi）計算字級 */
  container-type: inline-size;
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

/* 中文作品名稱：思源宋體、字距稍開；字數多時縮小到一行放得下（最小 18px，再長才換行） */
.chapter__title--cjk {
  font-size: max(18px, min(var(--fs-chapter-title-cjk), calc(100cqi / (var(--chars) * 1.08))));
  line-height: 1.3;
  letter-spacing: 0.06em;
  font-weight: 450;
}

.chapter__rule {
  display: block;
  width: calc(3.6 * var(--u));
  height: 1px;
  margin-top: calc(3 * var(--u));
  background: var(--color-line-strong);
}

/* 模特名字、IG、日期：每一行間距相同（行距改 gap） */
.chapter__meta,
.chapter__ig {
  display: flex;
  flex-direction: column;
  gap: calc(1 * var(--u));
}
.chapter__meta {
  margin-top: calc(3 * var(--u));
  font-size: var(--fs-chapter-text);
  line-height: 1.4;
  letter-spacing: 0.01em;
  color: var(--color-text-soft);
}

.chapter__model {
  color: var(--color-text);
  white-space: pre-line;
}

.chapter__ig-link {
  color: var(--color-text-soft);
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 0.2em;
  text-decoration-color: color-mix(in srgb, currentColor 40%, transparent);
  transition:
    color 0.2s ease,
    text-decoration-color 0.2s ease;
}

.chapter__ig-link:hover,
.chapter__ig-link:focus-visible {
  color: var(--color-text);
  text-decoration-color: currentColor;
}

.chapter__date {
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.04em;
  color: var(--color-muted);
}

.chapter__desc {
  margin-top: calc(1.8 * var(--u));
  font-size: var(--fs-chapter-text);
  line-height: 1.5;
  letter-spacing: 0.01em;
  color: var(--color-text-soft);
}

.chapter__meta + .chapter__desc {
  margin-top: calc(1.4 * var(--u));
}

.chapter__rule + .chapter__desc {
  margin-top: calc(3 * var(--u));
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

  .chapter__meta {
    margin-top: 14px;
  }
  .chapter__meta,
  .chapter__ig {
    gap: 8px;
  }

  .chapter__desc,
  .chapter__rule + .chapter__desc {
    margin-top: 14px;
    max-width: 34em;
  }

  .chapter__meta + .chapter__desc {
    margin-top: 10px;
  }

  .chapter__count {
    margin-top: 18px;
  }
}
</style>
