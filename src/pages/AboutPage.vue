<!--
【控制畫面】/about — 延伸設計：設計稿未提供此頁，沿用全站風格簡約處理
【負責功能】攝影師照片、中文標題、英文副標、自我介紹、Instagram／Email 聯絡連結。
【資料來源】src/data/about.ts（照片與文字）、src/data/site.ts（contact 聯絡方式）。
【常見修改】文字與照片：public/images/about/info.txt；聯絡方式：public/images/info.txt。
【注意事項】聯絡方式留空時，不會顯示假的連結，而是顯示「尚未設定」的提示（僅開發模式）。
-->
<script setup lang="ts">
import RichText from '@/components/common/RichText.vue'
import { about } from '@/data/about'
import { contact } from '@/data/site'
import AppImage from '@/components/common/AppImage.vue'

const hasContact = Boolean(contact.instagramUrl || contact.email || contact.formUrl)
/** 開發模式提示：還沒填的聯絡項目 */
const missing = [
  !contact.instagramUrl && 'Instagram',
  !contact.email && 'Email',
  !contact.formUrl && '委託表單',
].filter((v): v is string => Boolean(v))
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
        <!-- 中文標題（換行照 info.txt）→ 英文副標 → 短線 → 自我介紹 -->
        <h1 class="about__title">{{ about.heading }}</h1>
        <p v-if="about.subheading" class="about__subtitle" lang="en">{{ about.subheading }}</p>
        <span class="rule-short about__rule" aria-hidden="true" />

        <section v-if="about.bio.length" class="about__intro" aria-label="About the photographer">
          <p v-for="(para, i) in about.bio" :key="i" class="about__text"><RichText :text="para" /></p>
        </section>

        <section class="about__section" aria-labelledby="about-contact">
          <h2 id="about-contact" class="about__label">Contact</h2>
          <!-- 「項目： 連結」一行一個；沒填的項目不顯示（public/images/info.txt） -->
          <ul v-if="hasContact" class="about__contact">
            <li v-if="contact.instagramUrl" class="about__contact-row">
              <span class="about__contact-kind">Instagram：</span>
              <a :href="contact.instagramUrl" target="_blank" rel="noopener noreferrer" class="about__contact-link"
                >{{ contact.instagramLabel || contact.instagramUrl
                }}<span class="visually-hidden"> (opens in a new tab)</span></a
              >
            </li>
            <li v-if="contact.email" class="about__contact-row">
              <span class="about__contact-kind">Email：</span>
              <a :href="`mailto:${contact.email}`" class="about__contact-link">{{ contact.email }}</a>
            </li>
            <li v-if="contact.formUrl" class="about__contact-row">
              <span class="about__contact-kind">委託表單：</span>
              <a :href="contact.formUrl" target="_blank" rel="noopener noreferrer" class="about__contact-link"
                >{{ contact.formLabel }}<span class="visually-hidden"> (opens in a new tab)</span></a
              >
            </li>
          </ul>
          <p v-else class="about__text about__text--muted">
            Contact details coming soon.
          </p>
          <p v-if="isDev && missing.length" class="about__dev-note">
            （開發模式提示：public/images/info.txt 的「{{ missing.join('」「') }}」還沒填，網站上不會顯示這幾項）
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

/* 中文大標題：思源宋體，換行位置照 info.txt */
.about__title {
  margin-top: 18px;
  font-size: calc(var(--fs-display) * 0.86);
  line-height: 1.35;
  letter-spacing: 0.04em;
  white-space: pre-line;
}

/* 英文副標：標題下方一行小字 */
.about__subtitle {
  margin-top: calc(1.4 * var(--u));
  font-family: var(--font-serif);
  font-size: max(15px, calc(1.6 * var(--u)));
  line-height: 1.4;
  letter-spacing: 0.02em;
  color: var(--color-text-soft);
  /* 放得下就一行；窄螢幕要換行時兩行長度平均，不會只剩一個字掉到下一行 */
  text-wrap: balance;
}

.about__rule {
  margin-top: calc(3 * var(--u));
}

/* 自我介紹 */
.about__intro {
  margin-top: calc(3.2 * var(--u));
}

.about__intro .about__text:first-child {
  margin-top: 0;
}

/* 自我介紹：照 info.txt 的位置換行 */
.about__intro .about__text {
  white-space: pre-line;
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

/* 聯絡方式：「項目： 連結」一行一個 */
.about__contact {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 10px;
}

.about__contact-row {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0 0.4em;
  font-size: var(--fs-body);
  line-height: 1.5;
}

.about__contact-kind {
  color: var(--color-muted);
}

.about__contact-link {
  display: inline-flex;
  align-items: center;
  min-height: 40px;
  color: var(--color-text);
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 0.25em;
  text-decoration-color: color-mix(in srgb, currentColor 35%, transparent);
  overflow-wrap: anywhere;
  transition:
    color 0.2s ease,
    text-decoration-color 0.2s ease;
}

.about__contact-link:hover,
.about__contact-link:focus-visible {
  color: var(--color-text-soft);
  text-decoration-color: currentColor;
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

  .about__intro {
    margin-top: 24px;
  }

  .about__body {
    padding-top: 0;
  }

  .about__section {
    margin-top: 36px;
  }
}
</style>
