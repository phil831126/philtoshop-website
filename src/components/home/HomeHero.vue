<!--
【控制畫面】首頁首屏：左側大幅照片、照片左下毛玻璃資訊卡、右側品牌標語、短線與 EXPLORE WORKS
【負責功能】左側主照片、右側品牌標語、短線與 EXPLORE WORKS 毛玻璃按鈕；手機改成上圖下文。
【資料來源】src/data/home.ts 的 hero。
【常見修改】
  - 照片、對焦位置、標語、按鈕文字：改 public/images/home/info.txt
  - 照片與文字欄比例：本檔 .hero 的 grid-template-columns
  - 照片比例：.hero__media 的 aspect-ratio；照片最高不超過一個視窗高度：.hero__media 的 max-height
【注意事項】按鈕樣式（毛玻璃、無框線）共用 base.css 的 .glass-btn。
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
    </div>

    <div class="hero__text">
      <h1 id="hero-title" class="hero__tagline">
        <span v-for="(line, i) in taglineLines" :key="i" class="hero__line">{{ line }}</span>
      </h1>
      <span class="rule-short hero__rule" aria-hidden="true" />
      <RouterLink :to="hero.ctaTo" class="hero__cta glass-btn">
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
  width: 100%;
  aspect-ratio: 563 / 427;
  /* 一進網頁就完整看到整張主照片：最高＝視窗高度扣掉頁首與上下留白（螢幕較矮時照片會變扁一點） */
  max-height: calc(100svh - var(--header-h) - 2 * calc(3.4 * var(--u)));
  min-height: 300px;
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
  margin-top: calc(2.2 * var(--u));
}

/* ───────── 平板（768–1023px）：保留左右配置，縮小留白 ───────── */
@media (max-width: 1023.98px) {
  .hero {
    grid-template-columns: 55% minmax(0, 1fr);
    column-gap: 5%;
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
    max-height: none;
    min-height: 0;
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
    margin-top: 20px;
  }
}
</style>
