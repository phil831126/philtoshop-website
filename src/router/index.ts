/**
 * 【控制畫面】全站網址（路由）
 * 【負責功能】/、/works、/works/<分類>、/about、404；切換頁面時的捲動位置與瀏覽器分頁標題。
 * 【資料來源】分類網址自動讀取 src/data/categories.ts 的 id。
 * 【常見修改】一般不需要修改。
 * 【注意事項】六個分類共用 CategoryPage.vue，不要為每個分類另外複製頁面。
 *            深層網址重新整理的支援在 vercel.json（Vercel）設定。
 */
import { createRouter, createWebHistory, type RouteLocationNormalized } from 'vue-router'
import { categories, getCategory } from '@/data/categories'
import { site } from '@/data/site'
import HomePage from '@/pages/HomePage.vue'

const categoryPattern = categories.map((c) => c.id).join('|')

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomePage, meta: { title: '' } },
    {
      path: '/works',
      name: 'works',
      component: () => import('@/pages/WorksPage.vue'),
      meta: { title: 'Works' },
    },
    {
      path: `/works/:categoryId(${categoryPattern})`,
      name: 'category',
      component: () => import('@/pages/CategoryPage.vue'),
      props: true,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/pages/AboutPage.vue'),
      meta: { title: 'About' },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/pages/NotFoundPage.vue'),
      meta: { title: 'Page not found' },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (savedPosition) return savedPosition
    if (to.hash) {
      const header = document.querySelector<HTMLElement>('.site-header')
      // 錨點可能是中文（例如 #被遺忘之人），用 id 直接找元素，不當成 CSS 選擇器
      let id = to.hash.slice(1)
      try {
        id = decodeURIComponent(id)
      } catch {
        /* 保留原字串 */
      }
      const el = document.getElementById(id)
      if (!el) return { top: 0 }
      return {
        el,
        top: (header?.offsetHeight ?? 64) + 12,
        behavior: reduce || to.path !== from.path ? 'auto' : 'smooth',
      }
    }
    if (to.path === from.path) return false
    return { top: 0 }
  },
})

function pageTitle(route: RouteLocationNormalized): string {
  let title = typeof route.meta.title === 'string' ? route.meta.title : ''
  if (route.name === 'category') {
    title = getCategory(String(route.params.categoryId))?.name ?? ''
  }
  return title ? `${title} — ${site.titleSuffix}` : `${site.brandName} ${site.brandSubtitle}`
}

/**
 * 網站更新後，舊分頁還開著時：點連結要載入的頁面檔案（/static/…js）已被換成新的而找不到，
 * 導覽會「沒反應」。這時改成整頁重新載入到要去的網址，就會拿到新版。
 * 10 秒內只重新載入一次，避免真的出錯時一直重新整理。
 */
const CHUNK_ERROR = /dynamically imported module|Importing a module script failed|Failed to load module script|MIME type/i

router.onError((error, to) => {
  if (CHUNK_ERROR.test(String((error as Error)?.message ?? error))) {
    let reload = true
    try {
      const last = Number(sessionStorage.getItem('chunk-reload-at') ?? 0)
      if (Date.now() - last < 10_000) reload = false
      else sessionStorage.setItem('chunk-reload-at', String(Date.now()))
    } catch {
      // sessionStorage 不能用時，仍然重新載入一次
    }
    if (reload) {
      window.location.assign(to.fullPath)
      return
    }
  }
  console.error(error)
})

router.afterEach((to) => {
  document.title = pageTitle(to)
})
