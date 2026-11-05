<!--
【控制畫面】首頁首屏：左側大幅照片、照片左下毛玻璃資訊卡、右側品牌標語、短線與 EXPLORE WORKS
【負責功能】依附圖排版；手機改成上圖下文。
【資料來源】src/data/home.ts 的 hero。
【常見修改】
  - 照片、裁切位置、標語、資訊卡文字：改 home.ts
  - 照片與文字欄比例：本檔 .hero 的 grid-template-columns
  - 照片比例：.hero__media 的 aspect-ratio
【注意事項】資訊卡固定在照片左下角，請透過 hero.image.objectPosition 調整照片，避免卡片遮住人物臉部。
-->
<script setup lang="ts">
import { computed } from 'vue'
import { hero } from '@/data/home'
import AppImage from '@/components/common/AppImage.vue'
import IconArrow from '@/components/common/IconArrow.vue'

const taglineLines = computed(() => hero.tagline.split('\n'))
</script>

<template>
  <section class="hero container" aria-labelledby="hero-title">
    <div class="hero__media">
      <AppImage
        :photo="hero.image"
        loading="eager"
        priority="high"
        sizes="(max-width: 767px) 100vw, 60vw"
      />
      <RouterLink :to="hero.card.to" class="hero-card">
        <span class="hero-card__label">{{ hero.card.label }}</span>
        <span class="hero-card__title">{{ hero.card.title }}</span>
        <span class="hero-card__arrow"><IconArrow direction="up-right" :size="18" /></span>
      </RouterLink>
    </div>

    <div class="hero__text">
      <h1 id="hero-title" class="hero__tagline">
        <span v-for="(line, i) in taglineLines" :key="i" class="hero__line">{{ line }}</span>
      </h1>
      <span class="rule-short hero__rule" aria-hidden="true" />
      <RouterLink :to="hero.ctaTo" class="hero__cta eyebrow">
        {{ hero.ctaLabel }}
        <IconArrow direction="up-right" :size="16" />
      </RouterLink>
    </div>
  </section>
</template>

<style scoped>
/* ───────── 桌面（附圖：照片約占內容寬 56.5%，比例約 4:3） ───────── */
.hero {
  display: grid;
  grid-template-columns: 56.6% minmax(0, 1fr);
  column-gap: 4.4%;
  align-items: center;
  padding-top: calc(3.4 * var(--u));
}

.hero__media {
  position: relative;
  aspect-ratio: 563 / 427;
}

/* 局部毛玻璃資訊卡 */
.hero-card {
  position: absolute;
  left: 3.6%;
  bottom: 5.1%;
  width: 56%;
  min-width: 220px;
  display: flex;
  flex-direction: column;
  gap: 0.55em;
  padding: calc(1.75 * var(--u)) calc(2 * var(--u)) calc(1.6 * var(--u));
  background: var(--glass-card-bg);
  -webkit-backdrop-filter: var(--glass-blur);
  backdrop-filter: var(--glass-blur);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-card);
  transition: background var(--dur) var(--ease);
}

.hero-card:hover {
  background: rgba(78, 74, 70, 0.5);
}

.hero-card__label {
  font-size: var(--fs-micro);
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-text-soft);
}

.hero-card__title {
  font-family: var(--font-serif);
  font-size: var(--fs-feature-title);
  line-height: 1.15;
  color: var(--color-text);
  padding-right: 1.4em;
}

.hero-card__arrow {
  position: absolute;
  top: calc(1.2 * var(--u));
  right: calc(1.6 * var(--u));
  color: var(--color-text);
}

/* 右側標語 */
.hero__text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-bottom: calc(1.2 * var(--u));
}

.hero__tagline {
  font-size: var(--fs-display);
  line-height: 1.14;
  letter-spacing: -0.008em;
  color: var(--color-text);
  font-weight: 400;
}

.hero__line {
  display: block;
}

.hero__rule {
  width: calc(5.2 * var(--u));
  margin-top: calc(3.6 * var(--u));
}

.hero__cta {
  display: inline-flex;
  align-items: center;
  gap: 0.9em;
  min-height: 44px;
  margin-top: calc(2.2 * var(--u));
  color: var(--color-text);
}

.hero__cta:hover {
  color: var(--color-text-soft);
}

/* ───────── 平板（768–1023px）：保留左右配置，縮小留白 ───────── */
@media (max-width: 1023.98px) {
  .hero {
    grid-template-columns: 55% minmax(0, 1fr);
    column-gap: 5%;
  }

  .hero-card {
    width: auto;
    min-width: 0;
    max-width: calc(100% - 7.2%);
    padding: 12px 44px 12px 16px;
  }

  .hero-card__title {
    font-size: 17px;
    padding-right: 0;
  }
}

/* ───────── 手機（< 768px）：上圖下文 ───────── */
@media (max-width: 767.98px) {
  .hero {
    grid-template-columns: 1fr;
    row-gap: 32px;
    padding-top: 16px;
  }

  .hero__media {
    aspect-ratio: 4 / 3.6;
  }

  .hero-card {
    left: 12px;
    bottom: 12px;
    width: auto;
    min-width: 0;
    max-width: calc(100% - 24px);
    padding: 12px 44px 12px 14px;
    gap: 6px;
  }

  .hero-card__label {
    font-size: 9px;
  }

  .hero-card__title {
    font-size: 17px;
    padding-right: 0;
  }

  .hero-card__arrow {
    top: 12px;
    right: 14px;
  }

  .hero__text {
    padding-bottom: 0;
  }

  /* 手機自然換行，不使用桌面指定的換行位置 */
  .hero__line {
    display: inline;
  }

  .hero__line + .hero__line::before {
    content: ' ';
  }

  .hero__rule {
    width: 48px;
    margin-top: 24px;
  }

  .hero__cta {
    margin-top: 10px;
  }
}
</style>
