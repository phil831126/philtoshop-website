/**
 * 【控制畫面】分類分頁中每一組橫向相簿
 * 【負責功能】讀取相簿實際捲動位置，計算：
 *            - 目前序號：「最左側主要可見照片」的序號（照片超過一半在可視範圍內的第一張）
 *            - 是否可往前／往後（到頭尾時停用箭頭）
 *            - 照片是否多到需要捲動（不需要時隱藏控制列）
 *            並提供 prev()／next()／scrollToIndex() 給箭頭與大圖檢視使用。
 * 【資料來源】相簿元素本身（由 PhotoCarousel.vue 傳入）。
 * 【常見修改】不需要修改。每次顯示幾張、尺寸請改 tokens.css 的 --carousel-*。
 * 【注意事項】每組相簿各自呼叫一次，狀態互不影響；不自動播放、不無限循環。
 */
import { onBeforeUnmount, onMounted, ref, type Ref } from 'vue'

export function usePhotoCarousel(viewport: Ref<HTMLElement | null>) {
  const current = ref(0)
  const canPrev = ref(false)
  const canNext = ref(false)
  const hasOverflow = ref(false)

  let resizeObserver: ResizeObserver | null = null

  const slides = (): HTMLElement[] =>
    viewport.value ? Array.from(viewport.value.querySelectorAll<HTMLElement>('[data-slide]')) : []

  function measure() {
    const el = viewport.value
    if (!el) return
    const maxScroll = el.scrollWidth - el.clientWidth
    const left = el.scrollLeft
    hasOverflow.value = maxScroll > 2
    canPrev.value = left > 2
    canNext.value = left < maxScroll - 2

    // 最左側主要可見照片：第一張「右半邊」仍在可視範圍內的照片
    const list = slides()
    let index = 0
    for (let i = 0; i < list.length; i++) {
      const s = list[i]!
      if (s.offsetLeft + s.offsetWidth / 2 > left + 1) {
        index = i
        break
      }
      index = i
    }
    current.value = index
  }

  // 直接在捲動事件中計算（只讀取位置，成本很低），不依賴 requestAnimationFrame，
  // 避免背景分頁或節能模式下計數停止更新。
  function schedule() {
    measure()
  }

  function behavior(): ScrollBehavior {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
  }

  function scrollToIndex(index: number, smooth = true) {
    const el = viewport.value
    const target = slides()[index]
    if (!el || !target) return
    el.scrollTo({ left: target.offsetLeft, behavior: smooth ? behavior() : 'auto' })
  }

  function next() {
    const el = viewport.value
    if (!el || !canNext.value) return
    const list = slides()
    // 從目前序號往後找第一張起點超過目前位置的照片，避免卡在同一張
    const nextIndex = list.findIndex((s, i) => i > current.value && s.offsetLeft > el.scrollLeft + 2)
    if (nextIndex === -1) el.scrollTo({ left: el.scrollWidth, behavior: behavior() })
    else scrollToIndex(nextIndex)
  }

  function prev() {
    const el = viewport.value
    if (!el || !canPrev.value) return
    const list = slides()
    let target = -1
    for (let i = list.length - 1; i >= 0; i--) {
      if (list[i]!.offsetLeft < el.scrollLeft - 2) {
        target = i
        break
      }
    }
    if (target <= 0) el.scrollTo({ left: 0, behavior: behavior() })
    else scrollToIndex(target)
  }

  onMounted(() => {
    const el = viewport.value
    if (!el) return
    el.addEventListener('scroll', schedule, { passive: true })
    resizeObserver = new ResizeObserver(schedule)
    resizeObserver.observe(el)
    // 照片載入或尺寸改變時重新計算
    slides().forEach((s) => resizeObserver?.observe(s))
    measure()
  })

  onBeforeUnmount(() => {
    viewport.value?.removeEventListener('scroll', schedule)
    resizeObserver?.disconnect()
  })

  return { current, canPrev, canNext, hasOverflow, next, prev, scrollToIndex, refresh: schedule }
}
