/**
 * 【控制畫面】無（資料工具）
 * 【負責功能】imageFile()：只要寫照片路徑，寬高會從自動產生的清單 src/data/generated/images.ts 帶入。
 *            首頁主圖、首頁精選、About 照片都用它。
 * 【資料來源】src/data/generated/images.ts（自動產生，請勿手動修改）。
 * 【常見修改】不需要修改。
 * 【注意事項】路徑找不到時會用 4:3 暫代並在開發模式主控台提示，npm run build 也會列出錯誤。
 */
import type { Photo } from '@/types/portfolio'
import { imageSizes, imageVersions } from './generated/images'

interface ImageOptions {
  /** 照片描述（替代文字） */
  alt: string
  /** 裁切對焦位置，例如 'center 30%' */
  objectPosition?: string
  caption?: string
}

/**
 * 照片的網址：加上內容指紋 ?v=xxxx。
 * 換掉同檔名的照片後，指紋會變，訪客的瀏覽器就會抓新照片，不會一直顯示舊的暫存。
 */
export function photoUrl(src: string): string {
  const v = imageVersions[src]
  return encodeURI(src) + (v ? `?v=${v}` : '')
}

/** 以照片路徑建立照片資料，寬高自動帶入 */
export function imageFile(src: string, options: ImageOptions): Photo {
  const size = imageSizes[src]
  if (!size && import.meta.env.DEV) console.warn(`[內容檢查] 找不到照片 ${src}（請確認檔名與大小寫）`)
  return {
    id: src,
    src: photoUrl(src),
    width: size?.[0] ?? 1600,
    height: size?.[1] ?? 1200,
    ...options,
  }
}
