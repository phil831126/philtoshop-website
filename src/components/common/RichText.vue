<!--
【控制畫面】全站可放超連結的文字（作品介紹、分類介紹、首頁精選短介紹、About 段落、大圖說明）
【負責功能】把文字中的 [顯示文字](網址) 轉成超連結，其餘文字照原樣顯示。
【資料來源】由使用的元件傳入 text。
【常見修改】一般不需修改。連結顏色與底線樣式在本檔下方的 .rich-link。
【注意事項】
  - 支援的網址：https://…、http://…、mailto:…（Email）、/ 開頭的站內網址（例如 /works/shore）。
    其他寫法（例如 javascript:）一律當成一般文字顯示，避免不安全的連結。
  - 外部網址（https://…）會在新分頁開啟，並加上 rel="noopener noreferrer"；站內網址與 Email 在原分頁開啟。
  - 不使用 v-html，文字中的 HTML 標籤不會被執行。
-->
<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ text: string }>()

type Part = { kind: 'text'; value: string } | { kind: 'link'; label: string; href: string; internal: boolean }

const LINK = /\[([^\]\n]+)\]\(([^)\s]+)\)/g

function isSafe(href: string) {
  return /^(https?:\/\/|mailto:)/i.test(href) || (href.startsWith('/') && !href.startsWith('//'))
}

const parts = computed<Part[]>(() => {
  const out: Part[] = []
  let last = 0
  for (const m of props.text.matchAll(LINK)) {
    const [whole, label, href] = m
    const start = m.index ?? 0
    if (!label || !href || !isSafe(href)) continue
    if (start > last) out.push({ kind: 'text', value: props.text.slice(last, start) })
    out.push({ kind: 'link', label, href, internal: href.startsWith('/') })
    last = start + whole.length
  }
  if (last < props.text.length) out.push({ kind: 'text', value: props.text.slice(last) })
  return out
})
</script>

<template>
  <template v-for="(part, i) in parts" :key="i">
    <template v-if="part.kind === 'text'">{{ part.value }}</template>
    <RouterLink v-else-if="part.internal" :to="part.href" class="rich-link">{{ part.label }}</RouterLink>
    <a v-else-if="part.href.toLowerCase().startsWith('mailto:')" :href="part.href" class="rich-link">{{ part.label }}</a>
    <a v-else :href="part.href" class="rich-link" target="_blank" rel="noopener noreferrer"
      >{{ part.label }}<span class="visually-hidden"> (opens in a new tab)</span></a
    >
  </template>
</template>

<style scoped>
.rich-link {
  color: var(--color-text);
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 0.2em;
  text-decoration-color: color-mix(in srgb, currentColor 45%, transparent);
  transition: text-decoration-color 0.2s ease;
}

.rich-link:hover,
.rich-link:focus-visible {
  text-decoration-color: currentColor;
}
</style>
