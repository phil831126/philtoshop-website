<!--
【控制畫面】全站頁尾（延伸設計：設計稿未包含頁尾，採極簡處理）
【負責功能】左側 Instagram／Email 毛玻璃按鈕（有填寫才顯示）、右側版權年份。
【資料來源】src/data/site.ts（site、contact）。
【常見修改】版權名稱與聯絡方式請改 public/images/info.txt。
【注意事項】聯絡欄位留空時不會產生連結。
-->
<script setup lang="ts">
import { contact, site } from '@/data/site'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="site-footer">
    <div class="container site-footer__inner">
      <!-- 左側：Instagram／Email 毛玻璃按鈕（沒填的不顯示；都沒填時留空位，版權維持靠右） -->
      <ul v-if="contact.instagramUrl || contact.email" class="site-footer__links">
        <li v-if="contact.instagramUrl">
          <a :href="contact.instagramUrl" target="_blank" rel="noopener noreferrer" class="glass-btn">Instagram</a>
        </li>
        <li v-if="contact.email">
          <a :href="`mailto:${contact.email}`" class="glass-btn">Email</a>
        </li>
      </ul>
      <span v-else aria-hidden="true" />

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

.site-footer__links {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

/* 頁尾按鈕比首頁的小一點 */
.site-footer__links .glass-btn {
  min-height: 40px;
  padding: 0.6em 1.3em;
  font-size: 12px;
  letter-spacing: 0.16em;
}
</style>
