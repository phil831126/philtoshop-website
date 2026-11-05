<!--
【控制畫面】點擊相簿照片後開啟的大圖檢視
【負責功能】完整比例顯示大圖；上一張／下一張／關閉；鍵盤 Esc、←、→；手機左右滑動切換；
            開啟時鎖定背景捲動、焦點移入；關閉後由 PhotoCarousel 把焦點還給原本照片。
【資料來源】由 PhotoCarousel.vue 傳入同一組作品的 photos。
【常見修改】背景深淺：.lightbox::backdrop；照片最大尺寸：.lightbox__figure 的 width 計算。
【注意事項】使用瀏覽器原生 <dialog>（showModal），背景內容自動不可操作；不循環播放，到頭尾時箭頭停用。
-->
<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import type { Photo } from '@/types/portfolio'
import AppImage from '@/components/common/AppImage.vue'
import IconArrow from '@/components/common/IconArrow.vue'

const props = defineProps<{ open: boolean; photos: Photo[]; title: string }>()
const model = defineModel<number>('index', { required: true })
const emit = defineEmits<{ close: [] }>()

const dialog = ref<HTMLDialogElement | null>(null)
/** 本地序號：立即更新，並同步回上層 */
const index = ref(model.value)
watch(model, (v) => (index.value = v))
watch(index, (v) => (model.value = v))
let active = false
const closeButton = ref<HTMLButtonElement | null>(null)

const photo = computed(() => props.photos[index.value])
const canPrev = computed(() => index.value > 0)
const canNext = computed(() => index.value < props.photos.length - 1)
const pad = (n: number) => String(n).padStart(2, '0')

const figureStyle = computed(() => {
  const p = photo.value
  if (!p) return {}
  const ratio = p.width / p.height
  return {
    aspectRatio: `${p.width} / ${p.height}`,
    width: `min(var(--lb-max-w), calc(var(--lb-max-h) * ${ratio.toFixed(4)}))`,
  }
})

function prev() {
  if (canPrev.value) index.value -= 1
}
function next() {
  if (canNext.value) index.value += 1
}

/** 關閉並清理；不依賴 close 事件的觸發時機 */
function finish() {
  if (!active) return
  active = false
  lockScroll(false)
  emit('close')
}

function requestClose() {
  if (dialog.value?.open) dialog.value.close()
  finish()
}

/** Esc：改走自己的關閉流程 */
function onCancel(e: Event) {
  e.preventDefault()
  requestClose()
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'ArrowLeft') {
    e.preventDefault()
    prev()
  } else if (e.key === 'ArrowRight') {
    e.preventDefault()
    next()
  }
}

/** 點擊照片以外的深色背景關閉 */
function onDialogClick(e: MouseEvent) {
  if (e.target === dialog.value || (e.target as HTMLElement).classList.contains('lightbox__stage')) requestClose()
}

// 手機滑動切換
let startX = 0
let startY = 0
function onPointerDown(e: PointerEvent) {
  startX = e.clientX
  startY = e.clientY
}
function onPointerUp(e: PointerEvent) {
  if (e.pointerType === 'mouse') return
  const dx = e.clientX - startX
  const dy = e.clientY - startY
  if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
    if (dx < 0) next()
    else prev()
  }
}

function lockScroll(lock: boolean) {
  document.body.classList.toggle('is-scroll-locked', lock)
}

watch(
  () => props.open,
  async (open) => {
    const el = dialog.value
    if (!el) return
    if (open && !el.open) {
      index.value = model.value
      el.showModal()
      active = true
      lockScroll(true)
      await nextTick()
      closeButton.value?.focus()
    } else if (!open && el.open) {
      el.close()
    }
  },
)

/** 備援：若 dialog 被其他方式關閉，同樣完成清理 */
function onClose() {
  finish()
}

onBeforeUnmount(() => lockScroll(false))
</script>

<template>
  <dialog
    ref="dialog"
    class="lightbox"
    :aria-label="`${title} — photo viewer`"
    @cancel="onCancel"
    @close="onClose"
    @keydown="onKeydown"
    @click="onDialogClick"
  >
    <div v-if="open && photo" class="lightbox__stage">
      <figure class="lightbox__figure" :style="figureStyle" @pointerdown="onPointerDown" @pointerup="onPointerUp">
        <AppImage :key="photo.id" :photo="photo" fit="contain" loading="eager" sizes="92vw" />
        <figcaption v-if="photo.caption" class="lightbox__caption">{{ photo.caption }}</figcaption>
      </figure>

      <div class="lightbox__bar">
        <button type="button" class="lightbox__btn" :disabled="!canPrev" aria-label="Previous photo" @click="prev">
          <IconArrow direction="left" :size="20" />
        </button>
        <p class="lightbox__counter" aria-live="polite" aria-atomic="true">
          {{ pad(index + 1) }} <span aria-hidden="true">/</span><span class="visually-hidden">of</span>
          {{ pad(photos.length) }}
        </p>
        <button type="button" class="lightbox__btn" :disabled="!canNext" aria-label="Next photo" @click="next">
          <IconArrow direction="right" :size="20" />
        </button>
      </div>

      <button ref="closeButton" type="button" class="lightbox__close" aria-label="Close photo viewer" @click="requestClose">
        <span aria-hidden="true" class="lightbox__x" />
      </button>
    </div>
  </dialog>
</template>

<style scoped>
.lightbox {
  --lb-max-w: calc(100vw - 48px);
  --lb-max-h: calc(100svh - 150px);
  width: 100vw;
  max-width: none;
  height: 100svh;
  max-height: none;
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--color-text);
  overflow: hidden;
}

.lightbox::backdrop {
  background: rgba(12, 11, 10, 0.94);
}

.lightbox__stage {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
  width: 100%;
  height: 100%;
  padding: 60px 24px 24px;
}

.lightbox__figure {
  position: relative;
  max-width: 100%;
  touch-action: pan-y;
}

.lightbox__caption {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  padding-top: 8px;
  font-size: 13px;
  color: var(--color-muted);
  text-align: center;
}

.lightbox__bar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 28px;
  margin-top: 18px;
}

.lightbox__btn,
.lightbox__close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  color: var(--color-text);
}

.lightbox__btn:disabled {
  opacity: 0.25;
}

.lightbox__btn:not(:disabled):hover,
.lightbox__close:hover {
  background: rgba(236, 230, 220, 0.08);
}

.lightbox__counter {
  min-width: 5.5em;
  text-align: center;
  font-family: var(--font-serif);
  font-size: 17px;
  font-variant-numeric: tabular-nums;
}

.lightbox__close {
  position: absolute;
  top: 10px;
  right: 12px;
}

.lightbox__x {
  position: relative;
  width: 22px;
  height: 22px;
}

.lightbox__x::before,
.lightbox__x::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 1.3px;
  background: currentColor;
  transform: rotate(45deg);
}

.lightbox__x::after {
  transform: rotate(-45deg);
}

@media (max-width: 767.98px) {
  .lightbox {
    --lb-max-w: calc(100vw - 24px);
    --lb-max-h: calc(100svh - 150px);
  }

  .lightbox__stage {
    padding: 56px 12px 16px;
  }
}
</style>
