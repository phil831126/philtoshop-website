/**
 * 【控制畫面】/（首頁）：首屏主照片、品牌標語、毛玻璃資訊卡、Selected works 精選區
 * 【負責功能】首頁所有可替換的內容。首頁精選與一般作品「分開設定」，新增一般作品不會打亂首頁。
 * 【資料來源】照片放在 public/images/home/（也可以直接使用作品資料夾中的照片路徑）。
 *            imageFile('路徑', {...}) 會自動帶入照片寬高，不用手動填。
 * 【常見修改】
 *   - 主照片：換掉 public/images/home/hero.jpg（同檔名直接覆蓋即可），或修改 hero.image 的路徑
 *   - 主照片裁切位置：objectPosition（例如 'center 30%' 讓畫面往上對焦，避免切到臉）
 *   - 標語：hero.tagline（\n 是桌面版的換行位置，手機版會自然換行）
 *   - 精選作品：featured 陣列；每 4 個一組，layout 決定位置（說明見 src/types/portfolio.ts 的 FeaturedLayout）
 * 【注意事項】首頁照片依版面「裁切」顯示（附圖設計）；作品分頁、大圖、Works 總覽一律完整顯示照片。
 *            projectId 必須存在於 src/data/projects/ 中，否則點擊只會到分類頁頂端（開發模式會在主控台提示）。
 */
import type { FeaturedWork, HomeHero } from '@/types/portfolio'
import { imageFile } from './images'

export const hero: HomeHero = {
  image: imageFile('/images/home/hero.jpg', {
    alt: 'Photograph by Philtoshop', // ✎ 請改成照片內容的簡短描述（給看不到圖片的人）
    objectPosition: 'center 40%', // ✎ 裁切對焦位置
  }),
  tagline: 'Capturing every\nmoment, the\nunreserved\nversion of you.', // ✎
  ctaLabel: 'EXPLORE WORKS', // ✎
  ctaTo: '/works',
  card: {
    label: '01 / EMOTIONAL', // ✎
    title: 'Ordinary moments.', // ✎
    to: '/works/emotional',
  },
}

/**
 * 精選區標題：前半一般字、後半斜體（設計稿原為 Selected works.）
 * 目前不顯示：兩個都留空字串＝畫面上沒有標題（螢幕閱讀器仍會讀到「Selected works」區塊名稱）。
 * 想恢復時填回，例如 regular: 'Selected', italic: 'works.'
 */
export const featuredHeading = {
  regular: '', // ✎
  italic: '', // ✎
}

export const featured: FeaturedWork[] = [
  {
    id: 'featured-emotional',
    categoryId: 'emotional',
    projectId: 'quiet-light', // 點擊後跳到 Emotional 頁的 Quiet Light 章節
    image: imageFile('/images/home/featured-emotional.jpg', {
      alt: 'Photograph by Philtoshop', // ✎ 請改成照片內容的簡短描述（給看不到圖片的人）
      objectPosition: 'center 35%',
    }),
    number: '01', // ✎
    heading: 'Emotional', // ✎
    text: 'Quiet moments,\nhonestly seen.', // ✎
    layout: 'wide-left',
    order: 1,
    published: true,
  },
  {
    id: 'featured-ordinary',
    categoryId: 'ordinary',
    image: imageFile('/images/home/featured-ordinary.jpg', {
      alt: 'Photograph by Philtoshop', // ✎ 請改成照片內容的簡短描述（給看不到圖片的人）
    }),
    number: '', // 設計稿此張不顯示編號
    heading: 'Ordinary', // ✎ 桌面版以照片上的小型毛玻璃標籤顯示
    text: 'Small rituals and familiar rooms.', // ✎ 手機版顯示於照片下方
    layout: 'offset-right',
    order: 2,
    published: true,
  },
  {
    id: 'featured-monochrome',
    categoryId: 'monochrome',
    projectId: 'grey-hours',
    image: imageFile('/images/home/featured-monochrome.jpg', {
      alt: 'Photograph by Philtoshop', // ✎ 請改成照片內容的簡短描述（給看不到圖片的人）
    }),
    number: '02', // ✎
    heading: 'Monochrome', // ✎
    text: 'A study in light\nand silence.', // ✎
    layout: 'inset-left',
    order: 3,
    published: true,
  },
  {
    id: 'featured-shore',
    categoryId: 'shore',
    projectId: 'low-tide',
    image: imageFile('/images/home/featured-shore.jpg', {
      alt: 'Photograph by Philtoshop', // ✎ 請改成照片內容的簡短描述（給看不到圖片的人）
      objectPosition: 'center 30%',
    }),
    number: '03', // ✎
    heading: 'Shore', // ✎
    text: 'Where the sea\nmeets memory.', // ✎
    layout: 'tall-right',
    order: 4,
    published: true,
  },
]

/** 已公開、依 order 排序的精選項目 */
export const publishedFeatured: FeaturedWork[] = featured
  .filter((f) => f.published)
  .sort((a, b) => a.order - b.order)
