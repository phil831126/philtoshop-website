/**
 * 【控制畫面】Works 總覽頁、六個分類分頁的頁首、導覽列的分類選單
 * 【負責功能】六個作品分類的名稱、介紹、排序與代表圖。
 * 【資料來源】✎ 文字請改 public/images/works/<分類>/info.txt（名稱、介紹、總覽介紹、總覽封面、順序）。
 *            這個檔案只負責讀取，平常不需要打開。
 * 【常見修改】無。
 * 【注意事項】六個分類的 id（emotional、style…）同時是網址 /works/<id> 與資料夾名稱，拼字固定，請勿修改。
 *            info.txt 沒寫的欄位會使用下方的預設值。
 */
import type { Category, CategoryId, PhotoRef } from '@/types/portfolio'
import { num, pick, textFile } from './text'

/** 六個分類與預設文字（info.txt 有寫就以 info.txt 為準） */
const defaults: { id: CategoryId; name: string }[] = [
  { id: 'emotional', name: 'Emotional' },
  { id: 'style', name: 'Style' },
  { id: 'monochrome', name: 'Monochrome' },
  { id: 'ordinary', name: 'Ordinary' },
  { id: 'shore', name: 'Shore' },
  { id: 'viscera', name: 'Viscera' },
]

/** 「被遺忘之人/01」→ { projectId: '被遺忘之人', photoId: '01' }；只寫作品＝該作品的封面（作品可寫資料夾名稱或標題） */
function parseCover(value: string): PhotoRef | undefined {
  const [projectId, photo] = value.split('/').map((s) => s.trim())
  if (!projectId) return undefined
  return { projectId, photoId: (photo ?? '').replace(/\.[a-z]+$/i, '') }
}

export const categories: Category[] = defaults.map((d, i) => {
  const t = textFile(`works/${d.id}`).fields
  return {
    id: d.id,
    name: pick(t, '名稱', d.name),
    intro: pick(t, '介紹'),
    summary: pick(t, '總覽介紹'),
    order: num(t['順序'], i + 1),
    cover: parseCover(pick(t, '總覽封面')),
  }
})

/** 依 order 排序後的分類（導覽與總覽頁使用） */
export const sortedCategories: Category[] = [...categories].sort((a, b) => a.order - b.order)

/** 依 id 取得分類 */
export function getCategory(id: string): Category | undefined {
  return categories.find((c) => c.id === id)
}

/** 檢查字串是否為有效的分類 id */
export function isCategoryId(id: string): id is CategoryId {
  return categories.some((c) => c.id === id)
}
