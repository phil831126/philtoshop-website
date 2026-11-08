/**
 * 【控制畫面】/（首頁）：首屏主照片、品牌標語、毛玻璃資訊卡、精選區
 * 【負責功能】讀取首頁文字與照片設定。
 * 【資料來源】✎ 請改 public/images/home/info.txt（主照片、標語、小卡、精選標題、【精選 1】【精選 2】…）。
 *            這個檔案只負責讀取，平常不需要打開。
 * 【常見修改】無。
 * 【注意事項】
 *   - 首頁照片依版面「裁切」顯示（附圖設計），用 info.txt 的「對焦」調整；作品頁、大圖、Works 總覽一律完整顯示。
 *   - 精選每 4 個一組，位置依序為 wide-left → offset-right → inset-left → tall-right（說明見 src/types/portfolio.ts）。
 *   - 「連結」寫分類 id（emotional）或「分類/作品資料夾」（emotional/被遺忘之人），寫錯時開發模式主控台會提示。
 */
import type { CategoryId, FeaturedLayout, FeaturedWork, HomeHero } from '@/types/portfolio'
import { imageFile } from './images'
import { getProject } from './projects'
import { focus, imagePath, pick, textFile, yes } from './text'

const FOLDER = 'home'
const home = textFile(FOLDER)
const t = home.fields

/** 「emotional/被遺忘之人」→ 分類與作品（作品可寫資料夾名稱或標題，轉成網址錨點） */
function parseLink(value: string): { categoryId: CategoryId; projectId?: string } {
  const [cat, project] = value
    .replace(/^\/?works\//, '')
    .split(/[/#]/)
    .map((s) => s.trim())
  const categoryId = (cat || 'emotional') as CategoryId
  if (!project) return { categoryId }
  return { categoryId, projectId: getProject(project, categoryId)?.id ?? project }
}

const cardLink = parseLink(pick(t, '小卡連結', 'emotional'))

export const hero: HomeHero = {
  image: imageFile(imagePath(FOLDER, t['主照片'], 'hero.jpg'), {
    alt: pick(t, '主照片描述', 'Photograph by Philtoshop'),
    objectPosition: focus(t['主照片對焦']),
  }),
  tagline: pick(t, '標語', 'Capturing every\nmoment, the\nunreserved\nversion of you.'),
  ctaLabel: pick(t, '按鈕文字', 'EXPLORE WORKS'),
  ctaTo: '/works',
  card: {
    label: pick(t, '小卡小字'),
    title: pick(t, '小卡大字'),
    to: `/works/${cardLink.categoryId}${cardLink.projectId ? `#${cardLink.projectId}` : ''}`,
  },
}

/** 精選區標題：*星號* 包起來的字為斜體；留空＝不顯示 */
const headingText = pick(t, '精選標題')
const italic = /\*([^*]+)\*/.exec(headingText)
export const featuredHeading = {
  regular: (italic ? headingText.slice(0, italic.index) : headingText).trim(),
  italic: italic?.[1]?.trim() ?? '',
}

const LAYOUTS: FeaturedLayout[] = ['wide-left', 'offset-right', 'inset-left', 'tall-right']

export const featured: FeaturedWork[] = home.sections.map((s, i) => {
  const f = s.fields
  const link = parseLink(pick(f, '連結', 'emotional'))
  return {
    id: `featured-${i + 1}`,
    label: s.title,
    categoryId: link.categoryId,
    projectId: link.projectId,
    image: imageFile(imagePath(FOLDER, f['照片'], `featured-${i + 1}.jpg`), {
      alt: pick(f, '照片描述', 'Photograph by Philtoshop'),
      objectPosition: focus(f['對焦']),
    }),
    number: pick(f, '編號'),
    heading: pick(f, '標題'),
    text: pick(f, '介紹'),
    layout: LAYOUTS[i % LAYOUTS.length]!,
    order: i + 1,
    published: yes(f['顯示']),
  }
})

/** 要顯示的精選項目（依 info.txt 的先後順序） */
export const publishedFeatured: FeaturedWork[] = featured.filter((f) => f.published)
