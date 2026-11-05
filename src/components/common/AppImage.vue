<!--
【控制畫面】全站所有照片（首頁、Works、分類相簿、大圖、About）
【負責功能】顯示一張照片：寫入寬高避免版面跳動、延遲載入、淡入、載入失敗時顯示穩定的替代區塊。
【資料來源】由上層元件傳入 Photo 資料（src/data）。
【常見修改】不需要修改；照片內容請改資料檔。
【注意事項】fit="cover" 會裁切（首頁、總覽用），fit="contain" 完整顯示（分類相簿、大圖用）。
            外層容器負責決定尺寸與比例，這個元件只會填滿外層。
-->
<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Photo } from '@/types/portfolio'

const props = withDefaults(
  defineProps<{
    photo: Photo
    fit?: 'cover' | 'contain'
    /** 裁切對焦位置；未傳入時使用 photo.objectPosition */
    position?: string
    /** 首屏主圖用 eager，其餘 lazy */
    loading?: 'lazy' | 'eager'
    priority?: 'high' | 'low' | 'auto'
    sizes?: string
  }>(),
  { fit: 'cover', loading: 'lazy', priority: 'auto', sizes: undefined, position: undefined },
)

const loaded = ref(false)
const failed = ref(false)

watch(
  () => props.photo.src,
  () => {
    loaded.value = false
    failed.value = false
  },
)

function onLoad() {
  loaded.value = true
}
function onError() {
  failed.value = true
}
</script>

<template>
  <span class="app-image" :class="{ 'is-loaded': loaded, 'is-failed': failed }">
    <img
      v-if="!failed"
      :src="photo.src"
      :alt="photo.alt"
      :width="photo.width"
      :height="photo.height"
      :loading="loading"
      :fetchpriority="priority"
      :sizes="sizes"
      decoding="async"
      draggable="false"
      :style="{
        objectFit: fit,
        objectPosition: fit === 'cover' ? (position ?? photo.objectPosition ?? 'center') : 'center',
      }"
      @load="onLoad"
      @error="onError"
    />
    <span v-else class="app-image__fallback" role="img" :aria-label="photo.alt">
      <span class="app-image__fallback-text" aria-hidden="true">Image unavailable</span>
    </span>
  </span>
</template>

<style scoped>
.app-image {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: var(--color-img-bg);
}

.app-image img {
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 500ms var(--ease);
}

.app-image.is-loaded img {
  opacity: 1;
}

.app-image__fallback {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 80px;
  border: 1px dashed var(--color-line);
}

.app-image__fallback-text {
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-muted);
}

@media (prefers-reduced-motion: reduce) {
  .app-image img {
    transition: none;
  }
}
</style>
