<!--
【控制畫面】/about — 延伸設計：設計稿未提供此頁，沿用全站風格簡約處理
【負責功能】攝影師照片、品牌與攝影理念、簡短自我介紹、Instagram／Email 聯絡連結。
【資料來源】src/data/about.ts（照片與文字）、src/data/site.ts（contact 聯絡方式）。
【常見修改】文字與照片：public/images/about/info.txt；聯絡方式：public/images/info.txt。
【注意事項】聯絡方式留空時，不會顯示假的連結，而是顯示「尚未設定」的提示（僅開發模式）。
-->
<script setup lang="ts">
import RichText from '@/components/common/RichText.vue'
import { about } from '@/data/about'
import { contact } from '@/data/site'
import AppImage from '@/components/common/AppImage.vue'
import IconArrow from '@/components/common/IconArrow.vue'

const hasContact = Boolean(contact.instagramUrl || contact.email)
const isDev = import.meta.env.DEV
</script>

<template>
  <div class="about-page container">
    <div class="about">
      <div class="about__media" :style="{ aspectRatio: `${about.image.width} / ${about.image.height}` }">
        <AppImage :photo="about.image" fit="cover" loading="eager" sizes="(max-width: 767px) 92vw, 40vw" />
      </div>

      <div class="about__body">
        <p class="eyebrow about__eyebrow">About</p>
        <h1 class="about__title">{{ about.heading }}</h1>
        <span class="rule-short about__rule" aria-hidden="true" />

        <section class="about__section" aria-labelledby="about-philosophy">
          <h2 id="about-philosophy" class="about__label">Philosophy</h2>
          <p v-for="(para, i) in about.philosophy" :key="i" class="about__text"><RichText :text="para" /></p>
        </section>

        <section class="about__section" aria-labelledby="about-bio">
          <h2 id="about-bio" class="about__label">The photographer</h2>
          <p v-for="(para, i) in about.bio" :key="i" class="about__text"><RichText :text="para" /></p>
        </section>

        <section class="about__section" aria-labelledby="about-contact">
          <h2 id="about-contact" class="about__label">Contact</h2>
          <ul v-if="hasContact" class="about__contact">
            <li v-if="contact.instagramUrl">
              <a :href="contact.instagramUrl" target="_blank" rel="noopener noreferrer" class="about__link">
                <span class="about__link-kind">Instagram</span>
                <span>{{ contact.instagramLabel || contact.instagramUrl }}</span>
                <IconArrow direction="up-right" :size="14" />
              </a>
            </li>
            <li v-if="contact.email">
              <a :href="`mailto:${contact.email}`" class="about__link">
                <span class="about__link-kind">Email</span>
                <span>{{ contact.email }}</span>
                <IconArrow direction="up-right" :size="14" />
              </a>
            </li>
          </ul>
          <p v-else class="about__text about__text--muted">
            Contact details coming soon.
            <span v-if="isDev" class="about__dev-note">（開發模式提示：請在 public/images/info.txt 填入 Instagram 與 Email）</span>
          </p>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ───────── 桌面：左照片、右文字 ───────── */
.about {
  display: grid;
  grid-template-columns: 42% minmax(0, 1fr);
  column-gap: 7%;
  align-items: start;
  padding-top: calc(4 * var(--u));
}

.about__media {
  /* 比例依照片本身（寫在 template 的 style），完整顯示不裁切 */
  position: sticky;
  top: calc(var(--header-h) + 24px);
}

.about__body {
  padding-top: calc(2 * var(--u));
}

.about__eyebrow {
  color: var(--color-muted);
}

.about__title {
  margin-top: 18px;
  font-size: var(--fs-display);
  line-height: 1.12;
}

.about__rule {
  margin-top: calc(3 * var(--u));
}

.about__section {
  margin-top: calc(4 * var(--u));
}

.about__label {
  font-family: var(--font-sans);
  font-size: 11px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--color-muted);
}

.about__text {
  margin-top: 14px;
  max-width: 34em;
  font-size: var(--fs-body);
  line-height: 1.65;
  color: var(--color-text-soft);
}

.about__text--muted {
  color: var(--color-muted);
}

.about__dev-note {
  display: block;
  margin-top: 6px;
  font-size: 12px;
  color: #c9a27a;
}

.about__contact {
  margin-top: 10px;
  border-top: 1px solid var(--color-line);
}

.about__link {
  display: flex;
  align-items: center;
  gap: 16px;
  min-height: 56px;
  border-bottom: 1px solid var(--color-line);
  font-family: var(--font-serif);
  font-size: 19px;
}

.about__link:hover {
  color: var(--color-text-soft);
}

.about__link-kind {
  width: 7.5em;
  font-family: var(--font-sans);
  font-size: 11px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-muted);
}

.about__link :deep(svg) {
  margin-left: auto;
}

/* ───────── 平板 ───────── */
@media (max-width: 1023.98px) {
  .about {
    grid-template-columns: 44% minmax(0, 1fr);
    column-gap: 6%;
  }
}

/* ───────── 手機：上照片、下文字 ───────── */
@media (max-width: 767.98px) {
  .about {
    grid-template-columns: minmax(0, 1fr);
    row-gap: 32px;
    padding-top: 16px;
  }

  .about__media {
    position: static;
  }

  .about__body {
    padding-top: 0;
  }

  .about__section {
    margin-top: 36px;
  }

  .about__link-kind {
    width: 6.5em;
  }

  .about__link {
    font-size: 16px;
    overflow-wrap: anywhere;
  }
}
</style>
