/**
 * 【控制畫面】/about（About 頁）
 * 【負責功能】攝影師照片、品牌與攝影理念、自我介紹。
 * 【資料來源】照片放在 public/images/about/（寬高自動帶入，依原比例完整顯示）；聯絡連結讀取 site.ts 的 contact。
 * 【常見修改】heading、philosophy（理念段落）、bio（自我介紹段落）、image（照片路徑與描述）。
 * 【注意事項】⚠ 目前文字為「待替換」的示意內容，沒有編造任何經歷、獎項或客戶。
 */
import type { AboutContent } from '@/types/portfolio'
import { imageFile } from './images'

export const about: AboutContent = {
  image: imageFile('/images/about/01.jpg', {
    alt: 'Portrait of the photographer', // ✎ 請改成照片內容的簡短描述
  }),
  heading: 'The unreserved version of you.', // ✎
  philosophy: [
    // ✎ 待替換：品牌與攝影理念
    '[Placeholder] One or two sentences about what PHILTOSHOP looks for in a photograph — the light, the pace, the people.',
    '[Placeholder] How a session feels: quiet, unhurried, honest.',
  ],
  bio: [
    // ✎ 待替換：簡短自我介紹（請只寫真實資訊）
    '[Placeholder] A short introduction about the photographer goes here.',
  ],
}
