/**
 * 【控制畫面】Works 總覽頁、六個分類分頁的頁首、導覽列的分類選單
 * 【負責功能】六個作品分類的名稱、介紹、排序與代表圖。
 * 【資料來源】✎ Works 總覽頁的大標、副標請改 public/images/works/info.txt。
 *            分類文字請改 public/images/works/<分類>/info.txt（名稱、介紹、總覽介紹、總覽封面、作品順序、順序）。
 *            這個檔案只負責讀取，平常不需要打開。
 * 【常見修改】無。
 * 【注意事項】六個分類的 id（emotional、style…）同時是網址 /works/<id> 與資料夾名稱，拼字固定，請勿修改。
 *            info.txt 沒寫的欄位會使用下方的預設值。
 */
import type { Category, CategoryId, Photo, PhotoRef } from '@/types/portfolio'
import { imageFolders } from './generated/images'
import { imageFile } from './images'
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

/** 「作品順序」：一行一組（也可以用「、」分開；行首的 1. 2. 編號會被忽略），回傳作品名稱清單 */
function listFrom(value: string): string[] {
  return value
    .split(/[\n、]/)
    .map((s) => s.replace(/^\s*\d+\s*[.、．)]\s*/, '').trim())
    .filter(Boolean)
}

const stem = (name: string) => name.replace(/\.[^.]+$/, '').normalize('NFC').toLowerCase()

/**
 * 另外上傳的代表圖：直接放在分類資料夾（和 info.txt 同一層）的照片。
 * 放了好幾張時，「總覽封面」寫檔名就用那張；沒寫或寫的是作品照片時，用檔名排序的第一張。
 */
function uploadedCover(id: CategoryId, name: string, wanted: string): Photo | undefined {
  const files = imageFolders[`works/${id}`] ?? []
  if (!files.length) return undefined
  const want = wanted.includes('/') ? '' : stem(wanted)
  const src = files.find((f) => want && stem(f.slice(f.lastIndexOf('/') + 1)) === want) ?? files[0]!
  return imageFile(src, { alt: `${name} — cover photo` })
}

export const categories: Category[] = defaults.map((d, i) => {
  const t = textFile(`works/${d.id}`).fields
  const name = pick(t, '名稱', d.name)
  const wanted = pick(t, '總覽封面')
  const coverImage = uploadedCover(d.id, name, wanted)
  return {
    id: d.id,
    name,
    intro: pick(t, '介紹'),
    summary: pick(t, '總覽介紹'),
    order: num(t['順序'], i + 1),
    coverImage,
    // 有另外上傳的代表圖時，就不用作品裡的照片
    cover: coverImage ? undefined : parseCover(wanted),
    seriesOrder: listFrom(pick(t, '作品順序')),
  }
})

/** Works 總覽頁（/works）最上方的大標與副標；public/images/works/info.txt 的「大標」「副標」 */
const worksText = textFile('works').fields
export const worksPage = {
  title: pick(worksText, '大標', 'Works'),
  intro: pick(worksText, '副標', 'Six chapters of personal photography.'),
}

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
