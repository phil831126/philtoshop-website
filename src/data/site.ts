/**
 * 【控制畫面】全站：導覽列（品牌名稱、選單）、頁尾、瀏覽器分頁標題、聯絡連結
 * 【負責功能】品牌基本資訊與全站共用設定。
 * 【資料來源】✎ 文字請改 public/images/info.txt（網站名稱、副標、分頁標題、版權、Instagram、Email）。
 *            這個檔案只負責讀取，平常不需要打開。
 * 【常見修改】導覽選單文字：nav 的 label（to 是網址，請勿隨意修改）
 * 【注意事項】Works 的六個分類選單會自動讀取各分類的 info.txt，不用在這裡重複填寫。
 *            Instagram／Email 留空＝網站上不顯示，不會產生假的連結。
 */
import type { ContactLinks, NavItem } from '@/types/portfolio'
import { instagramLinks, pick, textFile } from './text'

const t = textFile('').fields

export const site = {
  brandName: pick(t, '網站名稱', 'PHILTOSHOP'),
  brandSubtitle: pick(t, '副標', 'PHOTOGRAPHY PORTFOLIO'),
  /** 瀏覽器分頁標題的後綴，例如「Emotional — PHILTOSHOP」 */
  titleSuffix: pick(t, '分頁標題', 'PHILTOSHOP'),
  copyrightName: pick(t, '版權', 'PHILTOSHOP'),
}

/** 主要導覽（只保留 Home、Works、About） */
export const nav: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'Works', to: '/works' },
  { label: 'About', to: '/about' },
]

/** Instagram：可填帳號（@your_account、your_account）或完整網址 */
const ig = instagramLinks(pick(t, 'Instagram'))[0]

export const contact: ContactLinks = {
  instagramUrl: ig?.url ?? '',
  instagramLabel: ig ? pick(t, 'Instagram顯示文字', ig.label) : '',
  email: pick(t, 'Email'),
}
