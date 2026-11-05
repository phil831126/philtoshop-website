<!--
【控制畫面】手機版（寬度 < 768px）展開的導覽選單
【負責功能】Home／Works／About；Works 可再展開「總覽＋六個分類」；選擇連結後自動關閉；Esc 關閉。
【資料來源】src/data/site.ts、src/data/categories.ts。
【常見修改】文字請改資料檔；字級與間距在本檔下方 <style>。
【注意事項】開啟時會鎖定背景捲動；關閉邏輯由 AppHeader 控制（換頁時自動關閉）。
-->
<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { nav } from '@/data/site'
import { sortedCategories } from '@/data/categories'
import IconArrow from '@/components/common/IconArrow.vue'

const props = defineProps<{ open: boolean }>()
const emit = defineEmits<{ close: [returnFocus: boolean] }>()

const route = useRoute()
const worksExpanded = ref(route.path.startsWith('/works'))
const panel = ref<HTMLElement | null>(null)

const isActive = (to: string) => (to === '/' ? route.path === '/' : route.path === to || route.path.startsWith(`${to}/`))

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') emit('close', true)
}

function onLinkClick() {
  emit('close', false)
}

watch(
  () => props.open,
  async (open) => {
    document.body.classList.toggle('is-scroll-locked', open)
    if (open) {
      worksExpanded.value = route.path.startsWith('/works')
      await nextTick()
      panel.value?.querySelector<HTMLElement>('a, button')?.focus()
    }
  },
)

onBeforeUnmount(() => document.body.classList.remove('is-scroll-locked'))
</script>

<template>
  <div v-show="open" id="mobile-menu" ref="panel" class="mobile-menu" @keydown="onKeydown">
    <nav class="container" aria-label="Main mobile">
      <ul class="mobile-menu__list">
        <li v-for="item in nav" :key="item.to" class="mobile-menu__item">
          <template v-if="item.to === '/works'">
            <button
              type="button"
              class="mobile-menu__link"
              :class="{ 'is-active': isActive('/works') }"
              :aria-expanded="worksExpanded"
              aria-controls="mobile-works-list"
              @click="worksExpanded = !worksExpanded"
            >
              <span>{{ item.label }}</span>
              <span class="mobile-menu__chevron" :class="{ 'is-open': worksExpanded }">
                <IconArrow direction="down" :size="20" />
              </span>
            </button>
            <ul v-show="worksExpanded" id="mobile-works-list" class="mobile-menu__sub">
              <li>
                <RouterLink
                  to="/works"
                  class="mobile-menu__sublink mobile-menu__sublink--all"
                  :aria-current="route.path === '/works' ? 'page' : undefined"
                  @click="onLinkClick"
                >
                  All works
                </RouterLink>
              </li>
              <li v-for="(cat, i) in sortedCategories" :key="cat.id">
                <RouterLink
                  :to="`/works/${cat.id}`"
                  class="mobile-menu__sublink"
                  :aria-current="route.path === `/works/${cat.id}` ? 'page' : undefined"
                  @click="onLinkClick"
                >
                  <span class="mobile-menu__num">{{ String(i + 1).padStart(2, '0') }}</span>
                  {{ cat.name }}
                </RouterLink>
              </li>
            </ul>
          </template>
          <RouterLink
            v-else
            :to="item.to"
            class="mobile-menu__link"
            :class="{ 'is-active': isActive(item.to) }"
            :aria-current="isActive(item.to) ? 'page' : undefined"
            @click="onLinkClick"
          >
            {{ item.label }}
          </RouterLink>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style scoped>
.mobile-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  height: calc(100dvh - var(--header-h));
  overflow-y: auto;
  overscroll-behavior: contain;
  background: rgba(20, 19, 18, 0.97);
  border-top: 1px solid var(--color-line);
}

.mobile-menu__list {
  padding-block: 12px 40px;
}

.mobile-menu__item {
  border-bottom: 1px solid var(--color-line);
}

.mobile-menu__link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: 64px;
  font-family: var(--font-serif);
  font-size: 30px;
  color: var(--color-text-soft);
  text-align: left;
}

.mobile-menu__link.is-active {
  color: var(--color-text);
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 8px;
}

.mobile-menu__chevron {
  display: inline-flex;
  transition: transform var(--dur) var(--ease);
}

.mobile-menu__chevron.is-open {
  transform: rotate(180deg);
}

.mobile-menu__sub {
  padding: 0 0 16px;
}

.mobile-menu__sublink {
  display: flex;
  align-items: baseline;
  gap: 14px;
  min-height: 46px;
  padding: 10px 0 10px 4px;
  font-family: var(--font-serif);
  font-size: 20px;
  color: var(--color-text-soft);
}

.mobile-menu__sublink--all {
  font-family: var(--font-sans);
  font-size: 12px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  align-items: center;
}

.mobile-menu__sublink[aria-current='page'] {
  color: var(--color-text);
}

.mobile-menu__num {
  font-family: var(--font-sans);
  font-size: 11px;
  letter-spacing: 0.14em;
  color: var(--color-muted);
}

/* 桌面寬度不顯示（即使狀態為開啟） */
@media (min-width: 768px) {
  .mobile-menu {
    display: none !important;
  }
}
</style>
