<!--
【控制畫面】全站外框：導覽列＋各頁內容＋頁尾
【負責功能】放置 AppHeader、目前網址對應的頁面、AppFooter。
【資料來源】無（各區塊自行讀取 src/data）。
【常見修改】一般不需要修改。
【注意事項】請不要把頁面內容、資料或大段 CSS 放進這個檔案。
-->
<script setup lang="ts">
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
</script>

<template>
  <a class="skip-link" href="#main">Skip to content</a>
  <AppHeader />
  <main id="main" tabindex="-1">
    <RouterView v-slot="{ Component, route }">
      <component :is="Component" :key="route.path" />
    </RouterView>
  </main>
  <AppFooter />
</template>

<style>
#main {
  display: block;
  min-height: calc(100vh - var(--header-h) - 120px);
  outline: none;
}
</style>
