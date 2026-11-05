/**
 * 【控制畫面】全站：導覽列（品牌名稱、選單）、頁尾、瀏覽器分頁標題、聯絡連結
 * 【負責功能】品牌基本資訊與全站共用設定。
 * 【資料來源】無（此檔即資料來源）。
 * 【常見修改】
 *   - 品牌名稱與副標：brandName、brandSubtitle
 *   - 主要導覽文字：nav 的 label（to 是網址，請勿隨意修改）
 *   - Instagram／Email：contact（留空字串＝網站上不顯示）
 *   - 頁尾版權文字：copyrightName
 * 【注意事項】Works 的六個分類選單會自動讀取 categories.ts，不用在這裡重複填寫。
 */
import type { ContactLinks, NavItem } from '@/types/portfolio'

export const site = {
  brandName: 'PHILTOSHOP', // ✎
  brandSubtitle: 'PERSONAL PHOTOGRAPHY', // ✎
  /** 瀏覽器分頁標題的後綴，例如「Emotional — PHILTOSHOP」 */
  titleSuffix: 'PHILTOSHOP', // ✎
  copyrightName: 'PHILTOSHOP', // ✎
}

/** 主要導覽（只保留 Home、Works、About） */
export const nav: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'Works', to: '/works' },
  { label: 'About', to: '/about' },
]

/**
 * 聯絡方式：⚠ 尚未提供正式資料，因此全部留空，網站不會顯示假的連結。
 * 填寫範例：
 *   instagramUrl: 'https://www.instagram.com/your_account/',
 *   instagramLabel: '@your_account',
 *   email: 'hello@example.com',
 */
export const contact: ContactLinks = {
  instagramUrl: '', // ✎
  instagramLabel: '', // ✎
  email: '', // ✎
}
