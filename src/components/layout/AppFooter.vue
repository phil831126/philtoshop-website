<!--
【控制畫面】全站頁尾（延伸設計：設計稿未包含頁尾，採極簡處理）
【負責功能】品牌名稱、版權年份；有填寫時顯示 Instagram／Email。
【資料來源】src/data/site.ts（site、contact）。
【常見修改】版權名稱與聯絡方式請改 site.ts。
【注意事項】聯絡欄位留空時不會產生連結。
-->
<script setup lang="ts">
import { contact, site } from '@/data/site'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="site-footer">
    <div class="container site-footer__inner">
      <p class="site-footer__brand">{{ site.brandName }}</p>
      <ul v-if="contact.instagramUrl || contact.email" class="site-footer__links">
        <li v-if="contact.instagramUrl">
          <a :href="contact.instagramUrl" target="_blank" rel="noopener noreferrer">Instagram</a>
        </li>
        <li v-if="contact.email">
          <a :href="`mailto:${contact.email}`">Email</a>
        </li>
      </ul>
      <p class="site-footer__copy">© {{ year }} {{ site.copyrightName }}. All rights reserved.</p>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  margin-top: calc(8 * var(--u) + 24px);
  border-top: 1px solid var(--color-line);
}

.site-footer__inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px 32px;
  padding-block: 28px 36px;
  font-size: 12px;
  letter-spacing: 0.14em;
  color: var(--color-muted);
}

.site-footer__brand {
  font-family: var(--font-serif);
  font-size: 16px;
  letter-spacing: 0.02em;
  color: var(--color-text-soft);
}

.site-footer__links {
  display: flex;
  gap: 24px;
}

.site-footer__links a {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  text-transform: uppercase;
}

.site-footer__links a:hover {
  color: var(--color-text);
}
</style>
