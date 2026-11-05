<!--
【控制畫面】全站箭頭圖示（EXPLORE WORKS ↗、相簿左右箭頭、大圖切換）
【負責功能】細線箭頭 SVG，顏色跟隨文字顏色。
【資料來源】無。
【常見修改】線條粗細：stroke-width。
【注意事項】純裝飾圖示，已設定 aria-hidden；按鈕的文字說明請寫在按鈕 aria-label。
-->
<script setup lang="ts">
withDefaults(defineProps<{ direction?: 'left' | 'right' | 'up-right' | 'down'; size?: number }>(), {
  direction: 'right',
  size: 20,
})
</script>

<template>
  <svg
    class="icon-arrow"
    :width="direction === 'up-right' || direction === 'down' ? size * 0.8 : size * 1.2"
    :height="direction === 'up-right' || direction === 'down' ? size * 0.8 : size"
    :viewBox="direction === 'up-right' || direction === 'down' ? '0 0 16 16' : '0 0 24 20'"
    fill="none"
    stroke="currentColor"
    stroke-width="1.3"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <template v-if="direction === 'right'">
      <path d="M2 10h20M15 3l7 7-7 7" />
    </template>
    <template v-else-if="direction === 'left'">
      <path d="M22 10H2M9 3l-7 7 7 7" />
    </template>
    <template v-else-if="direction === 'down'">
      <path d="M3.5 6l4.5 4.5L12.5 6" />
    </template>
    <template v-else>
      <path d="M3 13L13 3M5 3h8v8" />
    </template>
  </svg>
</template>

<style scoped>
.icon-arrow {
  display: inline-block;
  flex: none;
  vertical-align: middle;
}
</style>
