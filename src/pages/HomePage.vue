<!--
【控制畫面】/（首頁）
【負責功能】組合首屏（HomeHero）與精選區（FeaturedWorks）。
【資料來源】src/data/home.ts（由子元件讀取）。
【常見修改】內容請改 home.ts；排版請改 components/home/ 內的元件。
【注意事項】此檔只負責組合區塊，不放資料與大段樣式。
-->
<script setup lang="ts">
import HomeHero from '@/components/home/HomeHero.vue'
import FeaturedWorks from '@/components/home/FeaturedWorks.vue'
</script>

<template>
  <div class="home-page">
    <HomeHero />
    <FeaturedWorks />
  </div>
</template>
