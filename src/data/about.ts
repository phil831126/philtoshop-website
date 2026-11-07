/**
 * 【控制畫面】/about（About 頁）
 * 【負責功能】攝影師照片、品牌與攝影理念、自我介紹。
 * 【資料來源】✎ 請改 public/images/about/info.txt（照片、照片描述、標題、理念、自我介紹）。
 *            聯絡連結讀取 public/images/info.txt 的 Instagram／Email。這個檔案只負責讀取，平常不需要打開。
 * 【常見修改】無。
 * 【注意事項】照片依原比例完整顯示。理念與自我介紹「空一行＝新段落」。請只寫真實資訊。
 */
import type { AboutContent } from '@/types/portfolio'
import { imageFile } from './images'
import { imagePath, paragraphs, pick, textFile } from './text'

const FOLDER = 'about'
const t = textFile(FOLDER).fields

export const about: AboutContent = {
  image: imageFile(imagePath(FOLDER, t['照片'], 'portrait.jpg'), {
    alt: pick(t, '照片描述', 'Portrait of the photographer'),
  }),
  heading: pick(t, '標題'),
  philosophy: paragraphs(pick(t, '理念')),
  bio: paragraphs(pick(t, '自我介紹')),
}
