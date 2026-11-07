<!--
【控制畫面】全站頂部導覽列（毛玻璃、底部細線）
【負責功能】品牌名稱與副標、Home／Works／About；Works 點擊後展開「總覽＋六個分類」選單；
            手機寬度改為「Menu」按鈕，展開 MobileMenu。
【資料來源】src/data/site.ts（品牌、導覽文字）、src/data/categories.ts（六個分類）。
【常見修改】網站名稱與副標請改 public/images/info.txt；導覽文字請改 site.ts 的 nav；導覽列高度與字級請改 tokens.css（--header-h、--fs-nav）。
【注意事項】展開／收合狀態、Esc 關閉與點擊外部關閉的邏輯請勿刪除（無障礙與觸控操作需要）。
-->
<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { nav, site } from '@/data/site'
import { sortedCategories } from '@/data/categories'
import IconArrow from '@/components/common/IconArrow.vue'
import MobileMenu from './MobileMenu.vue'

const route = useRoute()
const worksOpen = ref(false)
const mobileOpen = ref(false)
const worksItem = ref<HTMLElement | null>(null)
const worksButton = ref<HTMLButtonElement | null>(null)
const menuButton = ref<HTMLButtonElement | null>(null)

// 位於 v-for 內的元素使用函式 ref，避免 Vue 把 ref 變成陣列
const setWorksItem = (el: unknown) => {
  worksItem.value = el as HTMLElement | null
}
const setWorksButton = (el: unknown) => {
  worksButton.value = el as HTMLButtonElement | null
}

/** 逐字拆開（空白改成不換行空白，才不會被瀏覽器吃掉） */
const letters = (text: string) => Array.from(text).map((ch) => (ch === ' ' ? ' ' : ch))
const brandLetters = computed(() => letters(site.brandName))
const subLetters = computed(() => letters(site.brandSubtitle))

const isActive =(to: string) => (to === '/' ? route.path === '/' : route.path === to || route.path.startsWith(`${to}/`))
const worksActive = computed(() => isActive('/works'))

function closeAll() {
  worksOpen.value = false
  mobileOpen.value = false
}

watch(() => route.fullPath, closeAll)

function onDocumentClick(e: MouseEvent) {
  if (worksOpen.value && worksItem.value && !worksItem.value.contains(e.target as Node)) {
    worksOpen.value = false
  }
}

function onWorksKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && worksOpen.value) {
    worksOpen.value = false
    worksButton.value?.focus()
  }
}

function onWorksFocusOut(e: FocusEvent) {
  const next = e.relatedTarget as Node | null
  if (next && worksItem.value && !worksItem.value.contains(next)) worksOpen.value = false
}

function closeMobile(returnFocus = false) {
  mobileOpen.value = false
  if (returnFocus) menuButton.value?.focus()
}

onMounted(() => document.addEventListener('click', onDocumentClick))
onBeforeUnmount(() => document.removeEventListener('click', onDocumentClick))
</script>

<template>
  <header class="site-header" :class="{ 'is-menu-open': mobileOpen }">
    <div class="container site-header__inner">
      <RouterLink to="/" class="brand" :aria-label="`${site.brandName} ${site.brandSubtitle} — Home`">
        <!-- 網站名稱與副標都逐字拆開、平均分散：較短的一行會自動拉開到與較長的一行同寬（連結本身有 aria-label，螢幕閱讀器會讀完整名稱） -->
        <span class="brand__name" aria-hidden="true">
          <span v-for="(ch, i) in brandLetters" :key="i">{{ ch }}</span>
        </span>
        <span class="brand__sub" aria-hidden="true">
          <span v-for="(ch, i) in subLetters" :key="i">{{ ch }}</span>
        </span>
      </RouterLink>

      <!-- 桌面／平板導覽 -->
      <nav class="nav" aria-label="Main">
        <ul class="nav__list">
          <li v-for="item in nav" :key="item.to" class="nav__item">
            <!-- Works：按鈕＋下拉選單（點擊操作，不依賴滑鼠懸停） -->
            <div
              v-if="item.to === '/works'"
              :ref="setWorksItem"
              class="nav__works"
              @keydown="onWorksKeydown"
              @focusout="onWorksFocusOut"
            >
              <button
                :ref="setWorksButton"
                type="button"
                class="nav__link"
                :class="{ 'is-active': worksActive }"
                :aria-expanded="worksOpen"
                aria-controls="works-menu"
                @click="worksOpen = !worksOpen"
              >
                {{ item.label }}
                <span class="visually-hidden">menu</span>
              </button>
              <div v-show="worksOpen" id="works-menu" class="works-menu">
                <RouterLink to="/works" class="works-menu__all">
                  <span>All works</span>
                  <IconArrow direction="up-right" :size="14" />
                </RouterLink>
                <ul class="works-menu__list">
                  <li v-for="(cat, i) in sortedCategories" :key="cat.id">
                    <RouterLink
                      :to="`/works/${cat.id}`"
                      class="works-menu__link"
                      :aria-current="route.path === `/works/${cat.id}` ? 'page' : undefined"
                    >
                      <span class="works-menu__num">{{ String(i + 1).padStart(2, '0') }}</span>
                      {{ cat.name }}
                    </RouterLink>
                  </li>
                </ul>
              </div>
            </div>
            <RouterLink
              v-else
              :to="item.to"
              class="nav__link"
              :class="{ 'is-active': isActive(item.to) }"
              :aria-current="isActive(item.to) ? 'page' : undefined"
            >
              {{ item.label }}
            </RouterLink>
          </li>
        </ul>
      </nav>

      <!-- 手機選單按鈕 -->
      <button
        ref="menuButton"
        type="button"
        class="menu-toggle"
        :aria-expanded="mobileOpen"
        aria-controls="mobile-menu"
        @click="mobileOpen = !mobileOpen"
      >
        <span class="menu-toggle__label">{{ mobileOpen ? 'Close' : 'Menu' }}</span>
        <span class="menu-toggle__lines" aria-hidden="true"><span /><span /></span>
      </button>
    </div>

    <MobileMenu :open="mobileOpen" @close="closeMobile" />
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: var(--glass-header-bg);
  -webkit-backdrop-filter: var(--glass-blur);
  backdrop-filter: var(--glass-blur);
  border-bottom: 1px solid var(--color-line);
}

.site-header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--header-h);
}

/* 品牌 */
.brand {
  display: inline-flex;
  flex-direction: column;
  gap: 0.35em;
  line-height: 1;
  padding-block: 6px;
}

.brand__name {
  font-family: var(--font-serif);
  font-size: var(--fs-brand);
  font-weight: 450;
  color: var(--color-text);
  /* 字母平均分散，第一個字母靠左、最後一個字母靠右，與副標同寬（名稱較短時會拉開） */
  display: flex;
  justify-content: space-between;
}

.brand__sub {
  font-family: var(--font-sans);
  font-size: var(--fs-brand-sub);
  letter-spacing: 0.24em;
  /* 抵銷最後一個字母後面多出的字距，讓副標右緣＝最後一個字母，上下兩行才會精準對齊 */
  margin-right: -0.24em;
  white-space: nowrap;
  /* 副標比網站名稱短時，也會平均分散到同寬 */
  display: flex;
  justify-content: space-between;
  color: var(--color-text-soft);
}

/* 桌面導覽 */
.nav__list {
  display: flex;
  align-items: center;
  gap: calc(3.4 * var(--u));
}

.nav__item {
  position: relative;
}

.nav__link {
  position: relative;
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  font-family: var(--font-serif);
  font-size: var(--fs-nav);
  color: var(--color-muted);
  transition: color var(--dur) var(--ease);
}

.nav__link:hover,
.nav__link.is-active,
.nav__link[aria-expanded='true'] {
  color: var(--color-text);
}

/* 當前頁面：細底線 */
.nav__link.is-active::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 2px;
  height: 1.5px;
  background: var(--color-text);
}

/* Works 下拉選單（局部毛玻璃） */
.works-menu {
  position: absolute;
  top: calc(100% + 14px);
  right: -18px;
  min-width: 240px;
  padding: 10px;
  background: rgba(36, 34, 32, 0.86);
  -webkit-backdrop-filter: var(--glass-blur);
  backdrop-filter: var(--glass-blur);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-card);
}

.works-menu__all {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 44px;
  padding: 0 12px;
  font-size: 12px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-text-soft);
  border-bottom: 1px solid var(--color-line);
}

.works-menu__list {
  padding-top: 6px;
}

.works-menu__link {
  display: flex;
  align-items: baseline;
  gap: 12px;
  min-height: 44px;
  padding: 10px 12px;
  border-radius: 6px;
  font-family: var(--font-serif);
  font-size: 18px;
  color: var(--color-text-soft);
}

.works-menu__all:hover,
.works-menu__link:hover,
.works-menu__link[aria-current='page'] {
  color: var(--color-text);
  background: rgba(236, 230, 220, 0.06);
}

.works-menu__num {
  font-family: var(--font-sans);
  font-size: 11px;
  letter-spacing: 0.14em;
  color: var(--color-muted);
}

/* 手機選單按鈕（預設隱藏） */
.menu-toggle {
  display: none;
  align-items: center;
  gap: 10px;
  min-width: 44px;
  min-height: 44px;
  margin-right: -8px;
  padding: 0 8px;
  font-size: 12px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.menu-toggle__lines {
  display: inline-flex;
  flex-direction: column;
  gap: 6px;
  width: 22px;
}

.menu-toggle__lines span {
  display: block;
  height: 1px;
  background: currentColor;
  transition: transform var(--dur) var(--ease);
}

.is-menu-open .menu-toggle__lines span:first-child {
  transform: translateY(3.5px) rotate(45deg);
}

.is-menu-open .menu-toggle__lines span:last-child {
  transform: translateY(-3.5px) rotate(-45deg);
}

/* ───────── 手機（< 768px）：改用選單按鈕 ───────── */
@media (max-width: 767.98px) {
  .nav {
    display: none;
  }

  .menu-toggle {
    display: inline-flex;
  }

  .brand__name {
    font-size: 22px;
  }

  .brand__sub {
    font-size: 9px;
  }
}
</style>
